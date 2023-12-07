<?php

namespace WP_Table_Builder_Pro\Inc\Admin\Views;

use WP_Table_Builder\Inc\Admin\Managers\Controls_Manager as Controls_Manager;
use WP_Table_Builder_Pro as WPTBNS;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

class Table_Setting_Element {

	/**
	 * Table_Settings_Element constructor.
	 */
	public function __construct() {
		add_action( 'wp-table-builder/register_controls/' . $this->get_name(), array(
			$this,
			'_register_controls'
		), 10, 1 );
		add_filter( 'wp-table-builder/register-controls-section-group/table_settings_border', array(
			$this,
			'_add_group_controls'
		), 10, 2 );
		add_filter( 'wp-table-builder/register-controls-section-group/table_settings_general', array(
			$this,
			'_add_group_controls'
		), 10, 2 );
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
		return 'table_setting';
	}

	/**
	 * Return js script file directory for element
	 *
	 * @since 1.2.1
	 * @access public
	 */
	public function element_script_add() {
		return wp_normalize_path( WPTBNS\WP_TABLE_BUILDER_PRO_DIR . 'inc/admin/views/table-element-scripts/table-setting-element.js' );
	}

	/**
	 * Return additional group controls
	 *
	 * @since 1.2.1
	 *
	 * @access protected
	 */
	public function get_additional_group_controls( $section_id ) {
		$group_controls = array();
		$controls       = [
			'table_settings_border'  =>
				[
					'tableDifferentBorderColors'         =>
						[
							'label'                 => __( 'Different Border Colors', 'wp_table_builder' ),
							'type'                  => Controls_Manager::TOGGLE,
							'selectors'             => [
								'{{{data.container}}}' => [ 'data-table-different-border-colors', 'true', null ]
							],
							'appearDependOnControl' => [
								[ 'applyInnerBorder', [ 'checked' ], [ 'unchecked' ] ],
								[ 'separateColumnsRows', [ 'checked' ], [ 'unchecked' ] ]
							]
						],
					'tableDifferentBorderColorsControls' => [
						'label'           => esc_html__( 'Border Colors', 'wp-table-builder' ),
						'type'            => Controls_Manager::DIFFERENT_BORDER,
						'appearDependOnControl' => [
							'applyInnerBorder'           => 'checked',
							'separateColumnsRows'        => 'checked',
							'tableDifferentBorderColors' => 'checked',
						]

					],
					'columnBorderOnly'                   =>
						[
							'label'                 => __( 'Column Border Only', 'wp_table_builder' ),
							'type'                  => Controls_Manager::TOGGLE,
							'selectors'             => [
								'{{{data.container}}}' => [ 'data-table-border-only-column', '1', null ]
							],
							'appearDependOnControl' => [ 'applyInnerBorder', [ 'checked' ], [ 'unchecked' ] ],
                            'toggleSwitch' => [ 'unchecked', ['rowBorderOnly' => 'checked'] ]
						],
					'rowBorderOnly'                      =>
						[
							'label'                 => __( 'Row Only Border', 'wp_table_builder' ),
							'type'                  => Controls_Manager::TOGGLE,
							'selectors'             => [
								'{{{data.container}}}' => [ 'data-table-border-only-row', '1', null ]
							],
							'appearDependOnControl' => [ 'applyInnerBorder', [ 'checked' ], [ 'unchecked' ] ],
                            'toggleSwitch' => [ 'unchecked', ['columnBorderOnly' => 'checked'] ]
						],
                    'tableCellsBorderRadius'                  =>
                        [
                            'label'                 => __( 'Table Cells Border Radius', 'wp_table_builder' ),
                            'type'                  => Controls_Manager::SIZE,
                            'selectors'             => [
                                '{{{data.container}}} td' => [ 'border-radius' ]
                            ],
                            'min'                   => '0',
                            'max'                   => '50',
                            'defaultValue'          => '0',
                            'dimension'             => 'px',
                            'appearDependOnControl' => [
                                [ 'separateColumnsRows', [ 'checked' ], [ 'unchecked' ] ],
                                [ 'applyInnerBorder', [ 'checked' ], [ 'unchecked' ] ],
                                [ 'columnBorderOnly', [ 'unchecked' ], [ 'checked' ] ],
                                [ 'rowBorderOnly', [ 'unchecked' ], [ 'checked' ] ]
                            ]
                        ],
                    'tableRowsBorderRadius'                  =>
                        [
                            'label'                 => __( 'Table Rows Border Radius', 'wp_table_builder' ),
                            'type'                  => Controls_Manager::SIZE,
                            'selectors'             => [
                                '{{{data.container}}} tr td:first-child' => [ 'border-top-left-radius', 'border-bottom-left-radius' ],
                                '{{{data.container}}} tr td:last-child' => [ 'border-top-right-radius', 'border-bottom-right-radius' ]
                            ],
                            'min'                   => '0',
                            'max'                   => '50',
                            'defaultValue'          => '0',
                            'dimension'             => 'px',
                            'appearDependOnControl' => [
                                [ 'separateColumnsRows', [ 'checked' ], [ 'unchecked' ] ],
                                [ 'applyInnerBorder', [ 'checked' ], [ 'unchecked' ] ],
                                [ 'rowBorderOnly', [ 'checked' ], [ 'unchecked' ] ]
                            ]
                        ],
                    'tableColumnsBorderRadius'                  =>
                        [
                            'label'                 => __( 'Table Columns Border Radius', 'wp_table_builder' ),
                            'type'                  => Controls_Manager::SIZE,
                            'selectors'             => [
                                '{{{data.container}}} tr:first-child td' => [ 'border-top-left-radius', 'border-top-right-radius' ],
                                '{{{data.container}}} tr:last-child td' => [ 'border-bottom-left-radius', 'border-bottom-right-radius' ]
                            ],
                            'min'                   => '0',
                            'max'                   => '50',
                            'defaultValue'          => '0',
                            'dimension'             => 'px',
                            'appearDependOnControl' => [
                                [ 'separateColumnsRows', [ 'checked' ], [ 'unchecked' ] ],
                                [ 'applyInnerBorder', [ 'checked' ], [ 'unchecked' ] ],
                                [ 'columnBorderOnly', [ 'checked' ], [ 'unchecked' ] ]
                            ]
                        ],
				],
			'table_settings_general' =>
				[
					'topRowSticky' =>
						[
							'label'     => __( 'Make Top Row Sticky', 'wp_table_builder' ),
							'type'      => Controls_Manager::TOGGLE,
							'selectors' => [
								'{{{data.container}}} tbody tr:nth-child(1)' => [ 'data-wptb-sticky-row', 'true', null ]
							],
						],
					'separateColumnsRows' =>
						[
							'label'     => __( 'Separate Columns/Rows', 'wp_table_builder' ),
							'type'      => Controls_Manager::TOGGLE,
							'selectors' => [
								'{{{data.container}}}' => [ 'border-collapse', 'separate', 'collapse' ]
							]
						],
					'spaceBetweenColumns' =>
						[
							'label'                 => __( 'Space Between Columns', 'wp_table_builder' ),
							'type'                  => Controls_Manager::SIZE,
							'selectors'             => [
								'{{{data.container}}}' => 'data-border-spacing-columns',
							],
							'min'                   => '0',
							'max'                   => '50',
							'defaultValue'          => 3,
							'dimension'             => 'px',
							'appearDependOnControl' => [ 'separateColumnsRows', [ 'checked' ], [ 'unchecked' ] ]
						],
					'spaceBetweenRows'    =>
						[
							'label'                 => __( 'Space Between Rows', 'wp_table_builder' ),
							'type'                  => Controls_Manager::SIZE,
							'selectors'             => [
								'{{{data.container}}}' => 'data-border-spacing-rows',
							],
							'min'                   => '0',
							'max'                   => '50',
							'defaultValue'          => 3,
							'dimension'             => 'px',
							'appearDependOnControl' => [ 'separateColumnsRows', [ 'checked' ], [ 'unchecked' ] ]
						]
				]
		];

		$border_section_group_controls = [
			'tableDifferentBorderColors'    =>
				[
					'label'                 => __( 'Different Border Colors', 'wp_table_builder' ),
					'type'                  => Controls_Manager::TOGGLE,
					'selectors'             => [
						'{{{data.container}}}' => [ 'data-table-different-border-colors', 'true', null ]
					],
					'appearDependOnControl' => [
						[ 'applyInnerBorder', [ 'checked' ], [ 'unchecked' ] ],
						[ 'separateColumnsRows', [ 'checked' ], [ 'unchecked' ] ]
					]
				],
			'tableBorderColorColumnsNumber' =>
				[
					'label'                 => __( 'BorderColor Column Number', 'wp_table_builder' ),
					'type'                  => Controls_Manager::NUMBER,
					'min'                   => 1,
					'max'                   => 'control_param_calculate_value',
					'selectors'             => [
						'{{{data.container}}}' => 'data-wptb-table-border-color-columns-number',
					],
					'defaultValue'          => 5,
					'appearDependOnControl' => [
						[ 'applyInnerBorder', [ 'checked' ], [ 'unchecked' ] ],
						[ 'separateColumnsRows', [ 'checked' ], [ 'unchecked' ] ],
						[ 'tableDifferentBorderColors', [ 'checked' ], [ 'unchecked' ] ]
					]
				],
			'tableBorderColorColumns'       =>
				[
					'label'                       => __( 'BorderColor Column', 'wp_table_builder' ),
					'type'                        => Controls_Manager::COLOR,
					'selectors'                   => [
						'{{{data.container}}} [data-x-index="{{{data.valueDependOnControl}}}"]' => [ 'border-color' ]
					],
					'valueDependOnControl'        => 'tableBorderColorColumnsNumber',
					'valueDependOnControlCorrect' => - 1,
					'appearDependOnControl'       => [
						[ 'applyInnerBorder', [ 'checked' ], [ 'unchecked' ] ],
						[ 'separateColumnsRows', [ 'checked' ], [ 'unchecked' ] ],
						[ 'tableDifferentBorderColors', [ 'checked' ], [ 'unchecked' ] ]
					]
				],
			'tableBorderColorRowsNumber'    =>
				[
					'label'                 => __( 'BorderColor Row Number', 'wp_table_builder' ),
					'type'                  => Controls_Manager::NUMBER,
					'min'                   => 1,
					'max'                   => 'control_param_calculate_value',
					'selectors'             => [
						'{{{data.container}}}' => 'data-wptb-table-border-color-rows-number',
					],
					'defaultValue'          => 5,
					'appearDependOnControl' => [
						[ 'applyInnerBorder', [ 'checked' ], [ 'unchecked' ] ],
						[ 'separateColumnsRows', [ 'checked' ], [ 'unchecked' ] ],
						[ 'tableDifferentBorderColors', [ 'checked' ], [ 'unchecked' ] ]
					]
				],
			'tableBorderColorRows'          =>
				[
					'label'                       => __( 'BorderColor Row', 'wp_table_builder' ),
					'type'                        => Controls_Manager::COLOR,
					'selectors'                   => [
						'{{{data.container}}} [data-y-index="{{{data.valueDependOnControl}}}"]' => [ 'border-color' ]
					],
					'valueDependOnControl'        => 'tableBorderColorRowsNumber',
					'valueDependOnControlCorrect' => - 1,
					'appearDependOnControl'       => [
						[ 'applyInnerBorder', [ 'checked' ], [ 'unchecked' ] ],
						[ 'separateColumnsRows', [ 'checked' ], [ 'unchecked' ] ],
						[ 'tableDifferentBorderColors', [ 'checked' ], [ 'unchecked' ] ]
					]
				]
		];

		if ( $section_id && array_key_exists( $section_id, $controls ) ) {
			return $controls[ $section_id ];
		} else {
			return array();
		}
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
	public function _register_controls( $table_settings_main ) {
		$table_settings_main->setDefaultControlArg( 'elementOptionsGroupId', 'wptb-bar-top' );

		$table_settings_main->add_control(
			'duplicateColumn',
			[
				'label'            => __( 'Duplicate Column', 'wp_table_builder' ),
				'type'             => Controls_Manager::BUTTON2,
				'additionsClasses' => 'wptb-table_change_button wptb-single-action',
				'title'            => __( 'Duplicate Column', 'wp-table-builder' )
			],
			- 6
		);

		$table_settings_main->add_control(
			'duplicateRow',
			[
				'label'            => __( 'Duplicate Row', 'wp_table_builder' ),
				'type'             => Controls_Manager::BUTTON2,
				'additionsClasses' => 'wptb-table_change_button wptb-single-action',
				'title'            => __( 'Duplicate Row', 'wp-table-builder' )
			],
			- 6
		);
	}

	/**
	 * Add controls to section croup
	 *
	 * @since 1.2.0
	 *
	 * @access protected
	 */
	public function _add_group_controls( $section_controls, $section_id ) {
		$additional_group_controls = $this->get_additional_group_controls( $section_id );
		if ( $section_controls && is_array( $section_controls ) ) {
			$section_controls = array_merge( $section_controls, $additional_group_controls );
		} else {
			$section_controls = $additional_group_controls;
		}

		return $section_controls;
	}


}
