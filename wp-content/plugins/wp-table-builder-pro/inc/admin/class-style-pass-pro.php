<?php

namespace WP_Table_Builder_Pro\Inc\Admin;

use WP_Table_Builder\Inc\Admin\Style_Pass;
use WP_Table_Builder_Pro as WPTBNS;

// if called directly, abort
if ( ! defined( 'WPINC' ) ) {
	die();
}

/**
 * Class Style_Pass_Pro.
 *
 * Handles necessary adjustments of style pass for pro version.
 * @package WP_Table_Builder_Pro\Inc\Admin
 */
class Style_Pass_Pro {

	/**
	 * Initialize style pass pro.
	 */
	public static function init() {
		add_filter( 'wp-table-builder/filter/style-pass-frontend-data', [
			__CLASS__,
			'style_pass_pro_frontend_data'
		], 1, 1 );
	}

	/**
	 * Add pro related data to base style pass frontend data.
	 *
	 * @param array $style_pass_data frontend data for style pass
	 *
	 * @return array frontend data for style pass
	 */
	public static function style_pass_pro_frontend_data( $style_pass_data ) {
		$version = WPTBNS\WP_TABLE_BUILDER_PRO_VERSION;
		$base    = WPTBNS\WP_TABLE_BUILDER_PRO_URL;

		$pro_stylesheets = [
			'wp-table-builder-procommon-css' => Style_Pass::prepare_stylesheet_url( 'inc/common/css/wp-table-builder-pro.css', $version, $base )
		];

		$style_pass_data['stylesheets']['create'] = array_merge( $style_pass_data['stylesheets']['create'], $pro_stylesheets );

		return $style_pass_data;
	}

}
