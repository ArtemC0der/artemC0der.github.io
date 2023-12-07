<?php

namespace WP_Table_Builder_Pro\Inc\Admin\Controls;

// if called directly, abort
use WP_Table_Builder\Inc\Admin\Controls\Control_Section_Group_Tabbed;
use WP_Table_Builder\Inc\Admin\Managers\Controls_Manager;
use WP_Table_Builder\Inc\Admin\Managers\Elements_Manager;

if ( ! defined( 'WPINC' ) ) {
	die();
}

/**
 * Pro button controls.
 *
 * Class for control injection tests.
 *
 * @deprecated
 */
class Pro_Button_Control extends Pro_Control_Base {

	/**
	 * Add class specific controls to element object.
	 *
	 * @return array an array containing controls with keys as control ids and values as control arguments
	 */
	public function pro_controls() {
		return [];
	}

	/**
	 * Register any other controls that don't automatically will be grouped under section collapse.
	 *
	 * @param object $element element object
	 * @param Elements_Manager $element_manager_main element manager instance
	 */
	public function register_other_controls( $element, $element_manager_main ) {
		Control_Section_Group_Tabbed::inject_to_section( 'button', [
			'buttonInjectTest' =>
				[
					'label'        => __( 'Injected Control', 'wp_table_builder' ),
					'type'         => Controls_Manager::RANGE,
					'selectors'    => [
						[
							'query'  => '{{{data.container}}} .wptb-button-wrapper p',
							'type'   => Controls_Manager::STYLE,
							'key'    => 'fontSize',
							'format' => '{$}px',
						],
					],
					'min'          => 10,
					'max'          => 50,
					'defaultValue' => 15,
					'postFix'      => 'px'
				],
		], 'buttonElementOptions', 'general', [ $element, 'add_control' ], $element, $element_manager_main, 0 );
	}

	/**
	 * List of disabled controls list for normal version of element.
	 *
	 * Disabling normal element controls comes in handy if pro version has advanced version of that very same control.
	 *
	 * @return array disabled element control list
	 */
	public static function disabled_normal_controls_list() {
		return [ 'buttonLink' ];
	}


}
