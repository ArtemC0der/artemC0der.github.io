<?php

namespace WP_Table_Builder_Pro\Inc\Admin\Views;

use WP_Table_Builder\Inc\Admin\Managers\Controls_Manager as Controls_Manager;
use WP_Table_Builder_Pro as WPTBNS;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

class Table_Cell_Setting_Element {
	/**
	 * Table_Cell_Setting_Element constructor.
	 */
	public function __construct() {
		add_action( 'wp-table-builder/register_controls/' . $this->get_name(), array(
			$this,
			'_register_controls'
		), 10, 1 );
		add_filter( 'wp-table-builder/element-scripts-launcher/' . $this->get_name(), array(
			$this,
			'element_script_add'
		) );
	}

	/**
	 * Get name.
	 *
	 * @return string Section name.
	 * @since 1.2.1
	 * @access public
	 *
	 */
	public function get_name() {
		return 'table_cell_setting';
	}

	/**
	 * Return js script file directory for element
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function element_script_add() {
		return wp_normalize_path( WPTBNS\WP_TABLE_BUILDER_PRO_DIR . 'inc/admin/views/table-element-scripts/table-cell-setting-element.js' );
	}

	/**
	 * Register the element controls.
	 *
	 * Adds different fields to allow the user to change and customize the element settings.
	 *
	 * @since 1.2.0
	 *
	 * @access protected
	 */
	public function _register_controls( $cell_settings_main ) {

		// deprecated
//        $cell_settings_main->add_control(
//            'rowBackgroundColor',
//            [
//                'label' => __( 'Row Background Color', 'wp_table_builder' ),
//                'type' => Controls_Manager::COLOR,
//                'selectors' => [
//                    '{{{data.container}}}' => ['data-wptb-row-bg-color']
//                ]
//            ]
//        );
//
//        $cell_settings_main->add_control(
//            'columnBackgroundColor',
//            [
//                'label' => __( 'Column Background Color', 'wp_table_builder' ),
//                'type' => Controls_Manager::COLOR,
//                'selectors' => [
//                    '{{{data.container}}}' => ['data-wptb-column-bg-color']
//                ]
//            ]
//        );
//
//        $cell_settings_main->add_control(
//            'cellBackgroundColor',
//            [
//                'label' => __( 'Cell Background Color', 'wp_table_builder' ),
//                'type' => Controls_Manager::COLOR,
//                'selectors' => [
//                    '{{{data.container}}}' => ['background-color', 'data-wptb-own-bg-color']
//                ]
//            ]
//        );

		$cell_settings_main->add_control(
			'emptyCell',
			[
				'label'    => __( 'Empty Cell Enable', 'wp_table_builder' ),
				'labelOn'  => __( 'Fixed', 'wp_table_builder' ),
				'labelOff' => __( 'Auto', 'wp_table_builder' ),
				'type'     => Controls_Manager::TOGGLE
			]
		);
	}
}
