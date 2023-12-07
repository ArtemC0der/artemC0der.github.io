<?php

namespace WP_Table_Builder_Pro\Inc\Core;

use Plugin_Upgrader;
use WP_Table_Builder\Inc\Admin\Admin;
use WP_Table_Builder_Pro\Inc\Admin\Managers\Admin_Notices_Manager;
use WP_Table_Builder_Pro as WPTBNS;
use function activate_plugin;
use function deactivate_plugins;
use function get_current_screen;
use function get_plugins;
use function is_wp_error;
use function wp_die;
use function wp_enqueue_script;

/**
 * Fired during plugin activation
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @link       https://wptablebuilder.com
 * @since      1.0.0
 *
 * @author     WP Table Builder
 **/
class Activator {

	/**
	 * Short Description.
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function activate() {
		$min_php = '5.6.0';

		// Check PHP Version and deactivate & die if it doesn't meet minimum requirements.
		if ( version_compare( PHP_VERSION, $min_php, '<' ) ) {
			deactivate_plugins( plugin_basename( __FILE__ ) );
			wp_die( 'This plugin requires a minimum PHP Version of ' . $min_php );
		}

		static::check_normal_version();
	}

	/**
	 * Check if normal version of the plugin is installed or not.
	 * @return mixed|null true for plugin is installed, null for not
	 */
	protected static function is_normal_version_installed() {
		$plugin_list = get_plugins();

		return array_reduce( array_keys( $plugin_list ), function ( $carry, $item ) use ( $plugin_list ) {
			$name = $plugin_list[ $item ]['Name'];

			return $name === 'WP Table Builder' ? $item : $carry;
		}, null );
	}

	/**
	 * Check for normal version of plugin.
	 *
	 * If normal version is deactivated, activate it.
	 * If no normal version is found, download and activate it.
	 */
	public static function check_normal_version() {
		require_once( ABSPATH . 'wp-admin/includes/file.php' );
		require_once( ABSPATH . 'wp-admin/includes/misc.php' );
		require_once( ABSPATH . 'wp-admin/includes/class-wp-upgrader.php' );

		$normal_version = static::is_normal_version_installed();

		if ( $normal_version !== null ) {
			// if normal version is installed, activate it
			$activate_result = activate_plugin( $normal_version );

			// check normal version activation result
			if ( is_wp_error( $activate_result ) ) {
				Admin_Notices_Manager::show_notice( $activate_result->get_error_message(), Admin_Notices_Manager::ERROR );
			}
		} else {
			require_once( ABSPATH . 'wp-admin/includes/plugin-install.php' );
			$plugin = plugins_api( 'plugin_information', [ 'slug' => 'wp-table-builder' ] );

			require_once( ABSPATH . 'wp-admin/includes/class-plugin-upgrader.php' );
			$upgrader = new Plugin_Upgrader( new Quiet_Activator() );

			// install normal version of the plugin
			$install_result = $upgrader->install( $plugin->download_link );

			// check install result for normal version
			if ( is_wp_error( $install_result ) ) {
				Admin_Notices_Manager::show_notice( $install_result->get_error_message(), Admin_Notices_Manager::ERROR );
			} else {
				$activate_result = activate_plugin( 'wp-table-builder/wp-table-builder.php' );

				// check activation result for normal version
				if ( is_wp_error( $activate_result ) ) {
					Admin_Notices_Manager::show_notice( $activate_result->get_error_message(), Admin_Notices_Manager::ERROR );
				} else {
					$message = sprintf( esc_html__( '%1$s requires %2$s to be installed, it is automatically installed for you.', 'wp-table-builder-pro' ), 'WP Table Builder Pro', 'WP Table Builder' );
					Admin_Notices_Manager::show_notice( $message, Admin_Notices_Manager::INFO );
				}
			}
		}
	}
}
