<?php

namespace WP_Table_Builder_Pro\Inc\Admin\Managers;

use function do_action;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * WP Table Builder Pro Elements manager.
 *
 * WP Table Builder elements manager handler class is responsible for registering and
 * initializing all the supported WP Table Builder elements.
 *
 * @since 1.0.0
 */
class Elements_Manager {
	/**
	 * Elements objects.
	 *
	 * Holds the list of all the element objects.
	 *
	 * @since 1.1.2
	 * @access private
	 *
	 * @var WPTB_Element_Base_Object[]
	 */
	private $_element_objects = null;

	/**
	 * Elements file names array.
	 *
	 * Holds the list of all the files names which have element objects.
	 *
	 * @since 1.1.2
	 * @access private
	 *
	 * @var array
	 */
	private $_build_elements_name = [
		'circle_rating',
		'icon',
		'ribbon',
		'styled_list',
		'text_icon',
		'list_pro'
	];

	/**
	 * Elements_Manager constructor.
	 * Initialize plugin's elements
	 */
	public function __construct() {
		add_action( 'wp-table-builder/elements_registered', array( $this, 'element_elements' ), 10, 1 );
	}

	/**
	 * Init Elements.
	 *
	 * Initialize WP Table Builder Elements manager.
	 *
	 * @param $element_manager_main
	 *
	 * @since 1.0.0
	 * @access private
	 */
	public function element_elements( $element_manager_main ) {
		foreach ( $this->_build_elements_name as $element_name ) {
			$object = $this->get_element_object( $element_name );

			$element_manager_main->register_element_object( $object );

			$object->init_controls();
		}

		// do an action marking the point where pro elements are registered
		// because this function is called inside a hook where normal versioned elements are finished registering, it also marks the point of all element registry is finished
		do_action( 'wp-table-builder-pro/elements_registered', $element_manager_main );
	}

	/**
	 * Element Object Create.
	 *
	 * Return Element Object. Include the necessary element files.
	 *
	 * @since 1.0.0
	 * @access private
	 */
	private function get_element_object( $element_name ) {
		$class_name = ucfirst( $element_name ) . '_Element';

		$class_name = '\WP_Table_Builder_Pro\Inc\Admin\Elements\Element_Classes\\' . $class_name;

		return new $class_name();
	}
}
