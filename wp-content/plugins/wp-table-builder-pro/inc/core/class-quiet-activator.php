<?php

namespace WP_Table_Builder_Pro\Inc\Core;

// if called directly, abort
use WP_Upgrader_Skin;

if ( ! defined( 'WPINC' ) ) {
	die;
}

class Quiet_Activator extends WP_Upgrader_Skin {
	/**
	 * @param string $string
	 * @param mixed ...$args Optional text replacements.
	 */
	public function feedback( $string, ...$args ) {
		// keep it quiet
	}

	/**
	 */
	public function header() {
		// keep it quiet
	}

	/**
	 */
	public function footer() {
		// keep it quiet
	}
}