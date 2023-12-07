<?php

namespace WP_Table_Builder_Pro\Inc\Admin\Elements\Element_Classes;

use WP_Table_Builder\Inc\Admin\Controls\Control_Section_Group_Collapse;
use WP_Table_Builder\Inc\Admin\Element_Classes\Elements\List_Element as List_Element;
use WP_Table_Builder\Inc\Admin\Managers\Controls_Manager as Controls_Manager;
use WP_Table_Builder_Pro as WPTBNS;
use WP_Table_Builder as NS;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

class List_Pro_Element extends List_Element {

	/**
	 * Include file with js script for element list
	 *
	 * @since 1.1.2
	 * @access protected
	 */
	public function element_script() {
		return wp_normalize_path( WPTBNS\WP_TABLE_BUILDER_PRO_DIR . 'inc/admin/elements/element-scripts/list-element.js' );
	}

	/**
	 * Register the element controls.
	 *
	 * Adds different fields to allow the user to change and customize the element settings.
	 *
	 * @since 1.1.2
	 *
	 * @access protected
	 */
	protected function _register_controls() {
		$tooltip_controls = [
			'tooltip'   =>
				[
					'label'       => __( 'Tooltip', 'wp-table-builder-pro' ),
					'type'        => Controls_Manager::TEXTAREA,
					'placeholder' => __( 'Insert Tooltip text Here', 'wp-table-builder-pro' ),
					'rows'        => 5
				],
			'tPosition' =>
				[
					'label'           => __( 'Tooltip Position', 'wp-table-builder-pro' ),
					'type'            => Controls_Manager::SELECT,
					'options'         => [
						[ 'Top', 'top', 'wptb-tooltip-top' ],
						[ 'Right', 'right', 'wptb-tooltip-right' ],
						[ 'Bottom', 'bottom', 'wptb-tooltip-bottom' ],
						[ 'Left', 'left', 'wptb-tooltip-left' ]
					],
					'selectedDefault' => 0
				]
		];

		Control_Section_Group_Collapse::add_section( 'wptb_list_element_pro_tooltip', esc_html__( 'tooltip', 'wp-table-builder-pro' ), $tooltip_controls, [
			$this,
			'add_control'
		] );
	}

	protected function _content_template() {
		?>
        <ul>
            <li class="wptb-in-element">
                <div class="wptb-list-item-content"
                     style="position: relative;" spellcheck="false" contenteditable="true">
                    <p data-list-style-type-index="1."><?php esc_html_e( 'List Item 1', 'wp-table-builder' ); ?></p>
                </div>
                <div class="tooltip">
                </div>
            </li>
            <li class="wptb-in-element">
                <div class="wptb-list-item-content"
                     style="position: relative;" spellcheck="false" contenteditable="true">
                    <p data-list-style-type-index="2."><?php esc_html_e( 'List Item 2', 'wp-table-builder' ); ?></p>
                </div>
                <div class="tooltip">
                </div>
            </li>
            <li class="wptb-in-element">
                <div class="wptb-list-item-content"
                     style="position: relative;" spellcheck="false" contenteditable="true">
                    <p data-list-style-type-index="3."><?php esc_html_e( 'List Item 3', 'wp-table-builder' ); ?></p>
                </div>
                <div class="tooltip">
                </div>
            </li>
        </ul>
		<?php
	}
}
