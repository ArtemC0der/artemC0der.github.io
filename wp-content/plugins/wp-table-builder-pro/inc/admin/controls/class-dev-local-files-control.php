<?php

namespace WP_Table_Builder_Pro\Inc\Admin\Controls;


// if called directly, abort
use WP_Table_Builder\Inc\Admin\Managers\Controls_Manager;

if ( ! defined( 'WPINC' ) ) {
	die();
}

/**
 * Class Dev_Local_Files_Control.
 *
 * Component for handling local plugin assets to be usable across users.
 *
 * @package WP_Table_Builder_Pro\Inc\Admin\Controls
 */
class Dev_Local_Files_Control extends Pro_Control_Base {
	const DEV_LOCAL_DATASET_ID = 'wptbImageLocalFile';
	const DEV_LOCAL_DATASET_ID_HTML = 'data-wptb-image-local-file';

	/**
	 * Get label of the section that controls will be grouped into.
	 *
	 * Use a translated string for HTML display.
	 *
	 * @return string section label
	 */
	public function section_label() {
		return esc_html__( 'Dev Local File', 'wp-table-builder' );
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
	 * Get whitelisted element names.
	 *
	 * Controls of the derived object will be applied to this elements. An empty array indicates controls are available for all available elements.
	 *
	 * @return array an array containing element names that this control can be appended to
	 */
	public function get_element_whitelist() {
		return [ 'image' ];
	}

	/**
	 * Enabled environment for control
	 * @return string enabled environment
	 */
	public function enabled_env() {
		return 'development';
	}


	/**
	 * Add class specific controls to element object.
	 *
	 * @return array an array containing controls with keys as control ids and values as control arguments
	 */
	public function pro_controls() {
		return [
			'devLocalFiles' => [
				'type'         => Controls_Manager::LOCAL_DEV,
				'label'        => esc_html__( 'Local Files', 'wp-table-builder-pro' ),
				'defaultValue' => '',
				'selectors'    => [
					[
						'query' => '{{{data.container}}}',
						'type'  => Controls_Manager::DATASET,
						'key'   => self::DEV_LOCAL_DATASET_ID
					]
				]
			]
		];
	}
}