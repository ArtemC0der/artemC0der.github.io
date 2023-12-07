<?php

namespace WP_Table_Builder_Pro\Inc\Admin\Controls;

use WP_Table_Builder\Inc\Admin\Managers\Controls_Manager;

if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Class Margin_Padding_Control.
 *
 * Add margin and padding controls to table elements.
 *
 * @package WP_Table_Builder_Pro\Inc\Admin\Controls
 */
class Margin_Padding_Control extends Pro_Control_Base {
	/**
	 * Get label of the section that controls will be grouped into.
	 *
	 * Use a translated string for HTML display.
	 *
	 * @return string section label
	 */
	public function section_label() {
		return esc_html__( 'spacing', 'wp-table-builder-pro' );
	}

	/**
	 * Assign filter type to filter out elements to append the control.
	 *
	 * Available filter types are defined as constants within Pro_Control_Base class.
	 *
	 * @return string filter type
	 */
	public function filter_type() {
		return self::FILTER_BLACKLIST;
	}

	/**
	 * Get blacklisted element names.
	 *
	 * Controls of the derived object will not be applied to this elements. An empty array indicates controls are available for all available elements.
	 *
	 * @return array an array containing blacklisted element names that this control can not be appended to
	 */
	public function get_element_blacklist() {
		return [ 'ribbon_element' ];
	}

	/**
	 * Add class specific controls to element object.
	 *
	 * @return array an array containing controls with keys as control ids and values as control arguments
	 */
	public function pro_controls() {
		return [
			'proControlPadding' => [
				'type'          => Controls_Manager::SIDES,
				'label'         => esc_html__( 'Padding', 'wp-table-builder-pro' ),
				'selectors'     => [
					[
						'query' => '{{{data.container}}}',
						'type'  => Controls_Manager::STYLE,
						'key'   => 'padding'
					]
				],
				'defaultValue'  => '0 0 0 0',
				'allowNegative' => false
			],
			'proControlMargin'  => [
				'type'          => Controls_Manager::SIDES,
				'label'         => esc_html__( 'Margin', 'wp-table-builder-pro' ),
				'selectors'     => [
					[
						'query' => '{{{data.container}}}',
						'type'  => Controls_Manager::STYLE,
						'key'   => 'margin'
					]
				],
				'defaultValue'  => '0 0 0 0',
				'allowNegative' => true
			],
		];
	}
}
