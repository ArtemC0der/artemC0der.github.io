<?php

namespace WP_Table_Builder_Pro\Inc\Admin\Controls;

// if called directly, abort
use WP_Table_Builder\Inc\Admin\Managers\Controls_Manager;

if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Class Text_Icon_Control.
 *
 * Add icon controls for text element.
 *
 * @package WP_Table_Builder_Pro\Inc\Admin\Controls
 * @deprecated
 */
class Text_Icon_Control extends Pro_Control_Base {

	public $priority = 1;

	/**
	 * Get label of the section that controls will be grouped into.
	 *
	 * Use a translated string for HTML display.
	 *
	 * @return string section label
	 */
	public function section_label() {
		return esc_html__( 'icon', 'wp-table-builder-pro' );
	}

	/**
	 * Get whitelisted element names.
	 *
	 * Controls of the derived object will be applied to this elements. An empty array indicates controls are available for all available elements.
	 *
	 * @return array an array containing element names that this control can be appended to
	 */
	public function get_element_whitelist() {
		return [ 'text' ];
	}

	/**
	 * Add class specific controls to element object.
	 *
	 * @return array an array containing controls with keys as control ids and values as control arguments
	 */
	public function pro_controls() {
		return [
			'iconColor' => [
				'label'     => esc_html__( 'Icon Color', 'wp-table-builder-pro' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{{data.container}}}' => [ 'color' ]
				]
			]
		];
	}
}