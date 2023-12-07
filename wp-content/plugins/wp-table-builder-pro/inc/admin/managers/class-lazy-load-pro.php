<?php

namespace WP_Table_Builder_Pro\Inc\Admin\Managers;

use WP_Table_Builder\Inc\Admin\Base\Setting_Base;
use WP_Table_Builder\Inc\Admin\Managers\Lazy_Load_Manager;
use WP_Table_Builder\Inc\Common\Traits\Init_Once;
use WP_Table_Builder\Inc\Common\Traits\Singleton_Trait;
use WP_Table_Builder\Inc\Core\Init;
use function add_action;
use function update_option;

/**
 * If called directly, abort.
 */
if ( ! defined( 'WPINC' ) ) {
	die();
}

/**
 * Class Lazy_Load_Pro
 *
 * Lazy load manager for pro version.
 * @package WP_Table_Builder_Pro\Inc\Admin\Managers
 */
class Lazy_Load_Pro extends Setting_Base {
	use Init_Once;
	use Singleton_Trait;

	/**
	 * Lazy load option keys that will be customized by pro version.
	 * @var string[]
	 */
	private static $option_keys = [
		'visibilityPercentage',
		'backgroundColor',
		'iconName',
		'iconColor',
		'iconSize',
		'iconAnimation',
		'imageLoadAnimation',
		'imageLoadAnimationSpeed',
		'imageLoadAnimationDirection',
		'imageLoadAnimationPerspective',
		'flashColor',
	];

	/**
	 * Function to be called during initialization process.
	 */
	public static function init_process() {
		static::get_instance()->register_settings( esc_html__( 'lazy load pro settings', 'wp-table-builder' ) );

		add_action( 'wp-table-builder/action/lazy_load_settings_updated', [ __CLASS__, 'update_settings' ], 10, 1 );

		add_filter( 'wp-table-builder/filter/lazy_load_settings', [ __CLASS__, 'lazy_load_settings' ], 10, 1 );

		add_filter( 'wp-table-builder/filter/settings_manager_frontend_data', [
			__CLASS__,
			'settings_menu_data'
		], 100, 1 );

		add_filter( 'wp-table-builder/filter/style-pass-frontend-data', [
			__CLASS__,
			'lazy_load_style_pass_integration'
		], 1, 10 );
	}

	/**
	 * Add lazy load related data to style pass frontend.
	 *
	 * @param array $style_pass_data frontend data for style pass
	 *
	 * @return array filtered style pass frontend data
	 */
	public static function lazy_load_style_pass_integration( $style_pass_data ) {
		$lazy_load_stylesheets = [ 'style[id="wptb-lazy-load-styles"]' ];

		$style_pass_data['stylesheets']['copy'] = array_merge( $style_pass_data['stylesheets']['copy'], $lazy_load_stylesheets );

		return $style_pass_data;

	}

	/**
	 * Add various extra settings data to settings manager menu for pro version.
	 *
	 * @param array $settings_data settings menu data
	 *
	 * @return array updates settings menu data
	 */
	public static function settings_menu_data( $settings_data ) {
		$default_icon_animation_options = $settings_data['data']['lazyLoad']['settings']['iconAnimationOptions'];
		$default_load_animation_options = $settings_data['data']['lazyLoad']['settings']['imageLoadAnimationOptions'];

		$pro_icon_animation_options = [
			'heartBeat' => esc_html__( 'heartbeat', 'wp-table-builder-pro' ),
			'rotate'    => esc_html__( 'rotate', 'wp-table-builder-pro' ),
			'flip'      => esc_html__( 'flip', 'wp-table-builder-pro' ),
			'jump'      => esc_html__( 'jump', 'wp-table-builder-pro' ),
		];

		$pro_load_animation_options = [
			'slideIn'   => esc_html__( 'slide in', 'wp-table-builder-pro' ),
			'growSling' => esc_html__( 'grow sling', 'wp-table-builder-pro' ),
			'flash'     => esc_html__( 'flash', 'wp-table-builder-pro' ),
			'flip'      => esc_html__( 'flip', 'wp-table-builder-pro' ),
		];

		$settings_data['data']['lazyLoad']['settings']['iconAnimationOptions'] = array_merge( $default_icon_animation_options, $pro_icon_animation_options );

		$settings_data['data']['lazyLoad']['settings']['imageLoadAnimationOptions'] = array_merge( $default_load_animation_options, $pro_load_animation_options );

		return $settings_data;
	}


	/**
	 * Merge pro settings with lazy load settings.
	 *
	 * @param array $settings frontend settings
	 *
	 * @return array merged lazy load settings
	 */
	public static function lazy_load_settings( $settings ) {
		$pro_settings = static::get_instance()->get_settings();
		if ( isset( $pro_settings['iconName']['name'] ) ) {
			$pro_settings['iconSvg'] = Init::instance()->get_icon_manager()->get_icon( $pro_settings['iconName']['name'] );
		}

		return array_merge( $settings, $pro_settings );
	}

	/**
	 * Update pro related lazy load settings.
	 *
	 * @param array $settings
	 */
	public static function update_settings( $settings ) {
		update_option( static::get_instance()->get_settings_id(), $settings );
	}

	/**
	 * Get id of settings.
	 *
	 * @return string settings id
	 */
	public function get_settings_id() {
		return 'wptb_lazy_load_pro';
	}

	/**
	 * Get default settings.
	 *
	 * @return array default settings array
	 */
	protected function get_default_settings() {
		$frontend_options = Lazy_Load_Manager::get_frontend_options();

		return array_reduce( static::$option_keys, function ( $carry, $key ) use ( $frontend_options ) {
			if ( isset( $frontend_options[ $key ] ) ) {
				$carry[ $key ] = $frontend_options[ $key ];
			}

			return $carry;

		}, [] );
	}

	/**
	 * Get sanitization rules for component options.
	 * @return array sanitization rules
	 */
	protected function get_sanitization_rules() {
		return [
			'visibilityPercentage'          => 'sanitize_text_field',
			'backgroundColor'               => 'sanitize_text_field',
			'iconName'                      => [
				'name' => 'sanitize_text_field',
			],
			'iconColor'                     => 'sanitize_text_field',
			'iconSize'                      => 'sanitize_text_field',
			'iconAnimation'                 => 'sanitize_text_field',
			'imageLoadAnimation'            => 'sanitize_text_field',
			'imageLoadAnimationSpeed'       => 'sanitize_text_field',
			'imageLoadAnimationDirection'   => 'sanitize_text_field',
			'imageLoadAnimationPerspective' => 'sanitize_text_field',
			'flashColor'                    => 'sanitize_text_field',
		];
	}
}

