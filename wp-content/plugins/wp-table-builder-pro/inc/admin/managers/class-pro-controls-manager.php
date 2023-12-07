<?php

namespace WP_Table_Builder_Pro\Inc\Admin\Managers;

use WP_Table_Builder\Inc\Admin\Controls\Control_Section_Group_Collapse;
use WP_Table_Builder\Inc\Admin\Managers\Elements_Manager;
use WP_Table_Builder_Pro\Inc\Admin\Controls\Pro_Control_Base;
use function add_action;
use function add_filter;

// if called directly, abort process
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Class Pro_Controls_Manager.
 *
 * Class for maintaining pro related additional controls for both normal and pro version of the plugin.
 * @package WP_Table_Builder_Pro\Inc\Admin\Managers
 */
class Pro_Controls_Manager {

	/**
	 * Registered pro control names.
	 * @var string[]
	 */
	private $registered_controls = [ 'margin_padding', 'dev_local_files', 'image_size' ];

	/**
	 * Pro_Controls_Manager constructor.
	 */
	public function __construct() {
		add_action( 'wp-table-builder-pro/elements_registered', [ $this, 'elements_registered' ], 10, 1 );

		add_filter( 'wp-table-builder/filter/output_control_stacks_shortcircuit', [
			$this,
			'filter_normal_controls'
		], 10, 1 );
	}

	/**
	 * Filter normal version element controls.
	 *
	 * @param string $control_stack element controls data
	 */
	public function filter_normal_controls( $control_stack ) {
		$black_list = array_reduce( $this->get_registered_control_names(), function ( $carry, $control_name ) {
			$control_class_name = $this->prepare_control_class_name( $control_name );

			$disabled_list = method_exists( $control_class_name, 'disabled_normal_controls_list' ) ? $control_class_name::disabled_normal_controls_list() : [];

			return array_merge( $carry, $disabled_list );
		}, [] );

		foreach ( $black_list as $filter_name ) {
			unset( $control_stack[ $filter_name ] );
		}

		return $control_stack;
	}

	/**
	 * Callback for elements_registered hook.
	 *
	 * @param Elements_Manager $element_manager_main main element manager instance
	 */
	public function elements_registered( $element_manager_main ) {
		$element_objects = $element_manager_main->get_element_objects();

		// iterate over available elements
		foreach ( $element_objects as $element ) {
			// iterate over registered controls
			foreach ( $this->get_registered_control_names( true ) as $control_name ) {
				$control_object = $this->get_control( $control_name );

				$control_section_id = join( '_', [ $element->get_name(), $control_name, 'pro_controls_group' ] );

				$element_pro_controls = $control_object->get_pro_controls( $element );

				// only add pro group if there are controls available to avoid rendering an empty section group or development related control on production
				if ( sizeof( $element_pro_controls ) > 0 ) {
					Control_Section_Group_Collapse::add_section( $control_section_id, $control_object->section_label(), $element_pro_controls, [
						$element,
						'add_control'
					], $control_object->open_state );
				}

				$control_object->register_other_controls( $element, $element_manager_main );
			}
		}
	}

	/**
	 * Retrieve registered control names.
	 *
	 * @param false $use_priority whether to use priority sorting
	 *
	 * @return string[] registered control names
	 */
	public function get_registered_control_names( $use_priority = false ) {
		if ( $use_priority === true ) {
			$sorted_names = $this->registered_controls;

			usort( $sorted_names, function ( $a, $b ) {
				$element_a_prio = $this->get_control( $a )->priority;
				$element_b_prio = $this->get_control( $b )->priority;

				return ( $element_a_prio - $element_b_prio );
			} );

			return $sorted_names;
		}

		return $this->registered_controls;
	}

	/**
	 * Prepare control name with necessary namespace prefix.
	 *
	 * @param string $control_name control name
	 *
	 * @return string prepared control class name
	 */
	private function prepare_control_class_name( $control_name ) {
		$compatible_control_name = implode( '_', array_map( 'ucfirst', explode( '_', $control_name ) ) );

		return '\WP_Table_Builder_Pro\Inc\Admin\Controls\\' . $compatible_control_name . '_Control';

	}

	/**
	 * Get pro control object.
	 *
	 * This factory function will return an instance of the pro control element with a given name.
	 *
	 * @param $control_name string control name
	 *
	 * @return Pro_Control_Base pro control object
	 */
	private function get_control( $control_name ) {
		$control_class_name = $this->prepare_control_class_name( $control_name );

		return new $control_class_name;
	}
}
