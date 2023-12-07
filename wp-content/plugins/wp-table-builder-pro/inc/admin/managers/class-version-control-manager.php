<?php

namespace WP_Table_Builder_Pro\Inc\Admin\Managers;

use WP_Error;
use WP_Table_Builder\Inc\Common\Traits\Singleton_Trait;
use WP_Table_Builder\Inc\Core\Init;
use WP_Table_Builder\WP_Table_Builder;
use WP_Table_Builder_Pro as WPTBNS;
use WP_Table_Builder_Pro\Inc\Admin\Base\Version_Sync_Base;
use function is_wp_error;
use function wp_remote_get;
use function wp_remote_retrieve_body;

// if called directly, abort
if ( ! defined( 'WPINC' ) ) {
	die();
}

/**
 * Class Version_Control_Manager.
 *
 * Pro addon version control manager.
 *
 * TODO [erdembircan] after v1.3.4, extend the class from the base plugin version.
 * @package WP_Table_Builder_Pro\Inc\Admin\Managers
 */
class Version_Control_Manager extends Version_Sync_Base {

	use Singleton_Trait;

	/**
	 * Freemius api base url.
	 */
	const FREEMIUS_API_BASE = 'https://api.freemius.com';

	/**
	 * Manager initialization status.
	 * @var bool
	 */
	private static $initialized = false;

	/**
	 * Settings control name for version sync enable.
	 */
	private static $version_sync_enable_option = 'enable_version_sync';

	/**
	 * Initialize manager.
	 */
	public static function init() {
		if ( ! static::$initialized ) {
			// subscribe to version sync manager
			if ( Init::instance()->settings_manager->get_option_value( static::$version_sync_enable_option ) ) {
				static::get_instance()->subscribe_to_version_sync();
			}
			add_filter( 'wp-table-builder/filter/settings_defaults', [
				__CLASS__,
				'add_pro_sync_settings_defaults'
			], 10, 1 );

			add_filter( 'wp-table-builder/filter/settings_manager_frontend_data', [
				__CLASS__,
				'add_pro_sync_controls_to_frontend'
			], 10, 1 );

			add_filter( 'wp-table-builder/filter/settings_sanitization_rules', [
				__CLASS__,
				'add_pro_sync_sanitization_rules'
			], 10, 1 );
		}

		static::$initialized = true;
	}

	/**
	 * Add version sync related options' sanitization rules to settings manager.
	 *
	 * @param array $rules sanitization rules
	 *
	 * @return array filtered sanitization rules
	 */
	public static function add_pro_sync_sanitization_rules( $rules ) {
		$rules[ static::$version_sync_enable_option ] = 'rest_sanitize_boolean';

		return $rules;
	}

	/**
	 * Add version sync related options to settings menu frontend.
	 *
	 * @param array $frontend_data frontend data
	 *
	 * @return array filtered frontend data
	 */
	public static function add_pro_sync_controls_to_frontend( $frontend_data ) {
		$frontend_data['sectionsData']['general']['fields'][ static::$version_sync_enable_option ] = [
			'type'    => 'checkbox',
			'section' => 'general',
			'label'   => esc_html__( 'Enable version sync', 'wp-table-builder' )
		];

		return $frontend_data;
	}

	/**
	 * Add version sync related defaults to setting defaults.
	 *
	 * @param array $defaults settings defaults
	 *
	 * @return array setting defaults
	 */
	public static function add_pro_sync_settings_defaults( $defaults ) {
		$defaults[ static::$version_sync_enable_option ] = false;

		return $defaults;
	}


	/**
	 * Get slug of plugin/addon used in its distribution API.
	 * @return string slug
	 */
	public function get_version_slug() {
		return 'wp-table-builder-pro';
	}

	/**
	 * Parse version number from package url.
	 *
	 * @param string $package package url
	 *
	 * @return string|null version number
	 */
	public function parse_version_from_package( $package ) {
		$parsed_version = null;
		$match          = [];

		preg_match( '/.+\/(.+)\.zip/', $package, $match );

		if ( isset( $match[1] ) ) {
			$parsed_version_id = $match[1];
			$versions          = $this->plugin_versions();

			$parsed_version = array_reduce( $versions, function ( $carry, $version_info ) use ( $parsed_version_id ) {
				if ( $version_info['id'] === $parsed_version_id ) {
					$carry = $version_info['version'];
				}

				return $carry;
			}, null );
		}

		return $parsed_version;
	}

	/**
	 * Callback hook for version sync manager when a subscriber attempted an install operation.
	 *
	 * @param string $slug subscriber slug
	 * @param string $version version to install
	 *
	 * @return false|WP_Error false to permit install(i know, but it is what it is) or WP_Error to cancel it
	 */
	public function version_sync_logic( $slug, $version ) {
		// override this value for return values of separate version sync logic results
		$return_value = false;

		// only continue sync logic if install in questing belongs to base version of the plugin
		if ( $slug === 'wp-table-builder' ) {
			// use generic sync logic
			$return_value = $this->generic_sync_logic( $slug, $version );
		}

		return $return_value;
	}

	/**
	 * Plugin specific logic for fetching versions and their info.
	 *
	 * Use plugin version for keys and info for their values. Use 'url' property key for download link.
	 * @return array|WP_Error versions array
	 */
	protected function get_plugin_versions() {
		$path         = $this->freemius_installs_base_path( '/updates.json' );
		$auth_headers = $this->prepare_freemius_auth_headers( $path );

		// using a trick of supplying minimum version of 1.0.0 to get all available versions
		$version_tags_api_url = $this->get_freemius_api_url( $path, [
			'version' => '1.0.0',
		] );

		$response = wp_remote_get( $version_tags_api_url, [
			'timeout' => 120,
			'headers' => $auth_headers
		] );

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$body_raw     = wp_remote_retrieve_body( $response );
		$decoded_body = (array) json_decode( $body_raw, true );

		if ( isset( $decoded_body['tags'] ) ) {
			return array_reduce( $decoded_body['tags'], function ( $carry, $version_info ) {
				if ( isset( $version_info['version'] ) ) {
					$carry[ $version_info['version'] ] = $version_info;
				}

				return $carry;
			}, [] );
		}

		return new WP_Error( 501, esc_html__( 'Problem with Freemius API, please try again later' ) );
	}

	/**
	 * Get Freemius api url.
	 *
	 * @param string $path slash prefixed path that will be combined with Freemius API base
	 * @param array $query_args an array of query args with keys as arg name and values as values
	 *
	 * @return string url
	 */
	private function get_freemius_api_url( $path, $query_args = [] ) {
		$url = self::FREEMIUS_API_BASE . $path;

		return add_query_arg( $query_args, $url );
	}

	/**
	 * Freemius api installs path base path.
	 *
	 * This function will form a base path for installs path with dynamic properties.
	 *
	 * @param string $path extra path that with slash prefixed to add to base path
	 *
	 * @return string installs base path
	 */
	private function freemius_installs_base_path( $path = '' ) {
		global $wptb_pro;

		//return '/v1/installs/' . $wptb_pro->get_site()->id . $path;
	}

	/**
	 * Prepare a download path for given Freemius plugin version tag.
	 *
	 * @param string $version_tag Freemius plugin version tag.
	 *
	 * @return string download path
	 */
	private function prepare_freemius_download_path( $version_tag ) {
		return $this->freemius_installs_base_path( '/updates/' . $version_tag . '.zip' );
	}

	/**
	 * Prepare Freemius API authorization key.
	 *
	 * This function will only be generating valid authorization headers for 'installs' api path.
	 *
	 * @param string $path api path
	 *
	 * @return array authorization key
	 */
	private function prepare_freemius_auth_headers( $path ) {
		return;
		global $wptb_pro;

		$site         = $wptb_pro->get_site();
		$site_id      = $site->id;
		$content_type = '';
		$content_body = '';
		$public_key   = $site->public_key;
		$secret_key   = $site->secret_key;
		$date         = date( 'r' );

		$string_to_sign = <<<STS
GET
$content_type
$content_body
$date
$path
STS;

		$signature = str_replace( '=', '', strtr( base64_encode( hash_hmac( 'sha256', $string_to_sign, $secret_key ) ), '+/', '-_' ) );

		return [
			'date'          => $date,
			'authorization' => 'FS ' . $site_id . ':' . $public_key . ':' . $signature
		];
	}

	/**
	 * Plugin __FILE__
	 * @return string plugin file
	 */
	public function plugin_file() {
		return WPTBNS\PLUGIN__FILE__;
	}

	/**
	 * Get text domain of the plugin.
	 *
	 * It will be used for ajax upgraders to identify our plugin since slug is not supplied in plugin info property of that upgrader skin.
	 * @return string
	 */
	public function get_text_domain() {
		return 'wp-table-builder-pro';
	}
}
