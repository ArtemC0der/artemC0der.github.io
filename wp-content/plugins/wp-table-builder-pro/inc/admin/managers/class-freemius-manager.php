<?php

namespace WP_Table_Builder_Pro\Inc\Admin\Managers;

use function WP_Table_Builder_Pro\wptb_pro;

if ( ! defined( 'WPINC' ) ) {
	die();
}

/**
 * Class Freemius_Manager.
 *
 * Manager for freemius instance.
 * @package WP_Table_Builder_Pro\Inc\Admin\Managers
 */
class Freemius_Manager {

	public static function init() {
		if ( static::wptb_pro_is_parent_active_and_loaded() ) {
			// If parent already included, init add-on.
			static::wptb_pro_init();
		} else if ( static::wptb_pro_is_parent_active() ) {
			// Init add-on only after the parent is loaded.
			add_action( 'wptb_fs_loaded', [ __CLASS__, 'wptb_pro_init' ] );
		} else {
			// Even though the parent is not activated, execute add-on for activation / uninstall hooks.
			static::wptb_pro_init();
		}

	}

	protected static function wptb_pro_is_parent_active_and_loaded() {
		// Check if the parent's init SDK method exists.
		return function_exists( 'WP_Table_Builder\wptb_fs' );
	}

	protected static function wptb_pro_is_parent_active() {
		$active_plugins = get_option( 'active_plugins', array() );

		if ( is_multisite() ) {
			$network_active_plugins = get_site_option( 'active_sitewide_plugins', array() );
			$active_plugins         = array_merge( $active_plugins, array_keys( $network_active_plugins ) );
		}

		foreach ( $active_plugins as $basename ) {
			if ( 0 === strpos( $basename, 'wp-table-builder/' ) ||
			     0 === strpos( $basename, 'wp-table-builder-premium/' )
			) {
				return true;
			}
		}

		return false;
	}

	public static function wptb_pro_init() {
		if ( static::wptb_pro_is_parent_active_and_loaded() ) {
			// Init Freemius.
			wptb_pro();

			// Signal that the add-on's SDK was initiated.
			if ( static::is_premium_activated() )  {
				do_action( 'wptb_pro_loaded' );
			}

		} else {
			// Parent is inactive, add your error handling here.
			Admin_Notices_Manager::show_notice( esc_html__( 'An error occured while activating freemius, please check your licence and try again', 'wp-table-builder-pro' ), Admin_Notices_Manager::ERROR );
		}
	}

	/**
	 * Check if current addon is premium only and a valid license is activated.
	 * @return bool is premium active
	 */
	public static function is_premium_activated() {
		return wptb_pro()->is__premium_only() && wptb_pro()->can_use_premium_code();

	}
}