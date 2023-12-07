<?php

namespace WP_Table_Builder_Pro\Inc\Admin\Controls;

use WP_Table_Builder\Inc\Admin\Element_Classes\Base\Element_Base;
use WP_Table_Builder\Inc\Admin\Managers\Elements_Manager;
use WP_Table_Builder_Pro as WPTBNS;
use function add_filter;

if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Class Pro_Control_Base.
 *
 * Base class for pro related additional controls for elements.
 * @package WP_Table_Builder_Pro\Inc\Admin\Controls
 */
abstract class Pro_Control_Base {

	/**
	 * Priority of control's section over other pro controls
	 * 1 higher 10 lower.
	 * @var int
	 */
	public $priority = 10;

	/**
	 * State of wrapper component.
	 * @var bool
	 */
	public $open_state = false;

	// name constants for filter types
	const FILTER_WHITELIST = 'whitelist';
	const FILTER_BLACKLIST = 'blacklist';

	/**
	 * Constructor for pro control base
	 */
	public function __construct() {
	}

	/**
	 * Get label of the section that controls will be grouped into.
	 *
	 * Use a translated string for HTML display.
	 *
	 * @return string section label
	 */
	public function section_label() {
		return esc_html__( 'pro', 'wp-table-builder-pro' );
	}

	/**
	 * Get whitelisted element names.
	 *
	 * Controls of the derived object will be applied to these elements. An empty array indicates controls are available for all available elements.
	 *
	 * @return array an array containing element names that this control can be appended to
	 */
	public function get_element_whitelist() {
		return [];
	}

	/**
	 * Get blacklisted element names.
	 *
	 * Controls of the derived object will not be applied to this elements. An empty array indicates controls are available for all available elements.
	 *
	 * @return array an array containing blacklisted element names that this control can not be appended to
	 */
	public function get_element_blacklist() {
		return [];
	}

	/**
	 * Enabled environment for control.
	 * @return string enabled environment
	 */
	public function enabled_env() {
		return 'production';
	}

	/**
	 * Assign filter type to filter out elements to append the control.
	 *
	 * Available filter types are defined as constants within Pro_Control_Base class.
	 *
	 * @return string filter type
	 */
	public function filter_type() {
		return self::FILTER_WHITELIST;
	}

	/**
	 * Append controls to element object.
	 *
	 * A check operation will be performed if the supplied element is supported by this control.
	 *
	 * @param $element_object Element_Base element object instance
	 *
	 * @return array an array containing defined pro controls
	 */
	public final function get_pro_controls( $element_object ) {
		// don't load development related controls
		if ( $this->enabled_env() === 'development' ) {
			if ( WPTBNS\WP_TABLE_BUILDER_PRO_ENV === 'production' ) {
				return [];
			}
		}

		if ( $this->pro_control_add_status( $element_object->get_name() ) ) {
			// prefix and process control name to be compatible and unique with the element it is appended to
			add_filter( 'wp-table-builder/element-scripts-launcher/' . $element_object->get_name(), [
				$this,
				'add_script'
			] );

			return array_reduce( array_keys( $this->pro_controls() ), function ( $reduced_array, $control_name ) use ( $element_object ) {
				$prefixed_control_name                   = $element_object->get_name() . ucfirst( $control_name );
				$reduced_array[ $prefixed_control_name ] = $this->pro_controls()[ $control_name ];

				return $reduced_array;
			}, [] );
		}

		return [];
	}

	/**
	 * Register any other controls that wont't be automatically grouped under section collapse.
	 *
	 * @param object $element element object
	 * @param Elements_Manager $element_manager_main element manager instance
	 */
	public function register_other_controls( $element, $element_manager_main ) {
		// implement any other controls you need here
	}

	/**
	 * Decide whether to allow control related operations continue based on current element in process and pro control whitelist/blacklist options.
	 *
	 * @param string $element_name element name
	 *
	 * @return bool status
	 */
	protected final function pro_control_add_status( $element_name ) {
		$logic_blacklist = sizeof( $this->get_element_blacklist() ) === 0 || in_array( $element_name, $this->get_element_blacklist() ) === false;

		$logic_whitelist = sizeof( $this->get_element_whitelist() ) === 0 || in_array( $element_name, $this->get_element_whitelist() );

		return $this->filter_type() === self::FILTER_BLACKLIST ? $logic_blacklist : $logic_whitelist;
	}

	/**
	 * Add class specific controls to element object.
	 *
	 * @return array an array containing controls with keys as control ids and values as control arguments
	 */
	abstract public function pro_controls();

	/**
	 * Add script to element controls.
	 *
	 * @return null|string script location
	 */
	public function add_script( $script_path ) {
		return $script_path;
	}

	/**
	 * List of disabled controls list for normal version of element.
	 *
	 * Disabling normal element controls comes in handy if pro version has advanced version of that very same control.
	 *
	 * @return array disabled element control list
	 */
	public static function disabled_normal_controls_list() {
		return [];
	}

}
