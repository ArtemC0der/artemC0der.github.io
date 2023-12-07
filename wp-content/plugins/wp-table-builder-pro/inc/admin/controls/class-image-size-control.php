<?php

namespace WP_Table_Builder_Pro\Inc\Admin\Controls;

use WP_Table_Builder\Inc\Admin\Controls\Control_Section_Group_Tabbed;
use WP_Table_Builder\Inc\Admin\Managers\Controls_Manager;
use WP_Table_Builder_Pro as WPTBNS;
use function esc_html__;
use function trailingslashit;
use function wp_normalize_path;

/**
 * Class Image_Size_Control
 *
 * Pro size controls for image element.
 * @package WP_Table_Builder_Pro\Inc\Admin\Controls
 */
class Image_Size_Control extends Pro_Control_Base {
	/**
	 * Priority of control group over other pro controls.
	 * @var int
	 */
	public $priority = - 1;

	/**
	 * State of wrapper component.
	 * @var bool
	 */
	public $open_state = true;

	/**
	 * Add script to element controls.
	 *
	 * @return null|string script location
	 */
	public function add_script( $script_path ) {
		return wp_normalize_path( trailingslashit( WPTBNS\WP_TABLE_BUILDER_PRO_DIR ) . 'inc/admin/js/pro-control-scripts/WPTB_ImageProControls.js' );
	}

	/**
	 * Get label of the section that controls will be grouped into.
	 *
	 * Use a translated string for HTML display.
	 *
	 * @return string section label
	 */
	public function section_label() {
		return esc_html__( 'advanced image size controls', 'wp-table-builder-pro' );
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
	 * Register any other controls that don't automatically will be grouped under section collapse.
	 *
	 * @param object $element element object
	 * @param Elements_Manager $element_manager_main element manager instance
	 */
	public function register_other_controls( $element, $element_manager_main ) {
		Control_Section_Group_Tabbed::inject_to_section( 'image', [
			'imageImageSizeControlRelative' => [
				'type'         => Controls_Manager::SELECT2,
				'defaultValue' => 'container',
				'options'      => [
					'container' => esc_html__( 'Container', 'wp-table-builder' ),
					'self'      => esc_html__( 'self', 'wp-table-builder' ),
				],
				'label'        => esc_html__( 'Relative to', 'wp-table-builder' ),
				'selectors'    => [
					[
						'query' => '{{{data.container}}}',
						'type'  => Controls_Manager::DATASET,
						'key'   => 'wptbImageSizeRelative'
					]
				]
			],
			'imageImageSizePercentage'      => [
				'type'                    => Controls_Manager::RANGE,
				'label'                   => esc_html__( 'Size', 'wp-table-builder' ),
				'min'                     => 1,
				'max'                     => 100,
				'postFix'                 => '%',
				'defaultValue'            => 50,
				'selectors'               => [
					[
						'query'  => '{{{data.container}}} a',
						'type'   => Controls_Manager::STYLE,
						'key'    => 'width',
						'format' => '{$}%'
					]
				],
				'dependsOnElementControl' => [
					'imageImageSizeControlRelative' => 'container'
				]
			],
			'imageImageSizeControl'         => [
				'type'                    => Controls_Manager::SIZE2,
				'label'                   => esc_html__( 'Size', 'wp-table-builder' ),
				'selectors'               => [
					[
						'query' => '{{{data.container}}} img',
						'type'  => Controls_Manager::DATASET,
						'key'   => 'wptbSize'
					]
				],
				'dependsOnElementControl' => [
					'imageImageSizeControlRelative' => 'self'
				]
			]
		], 'imageElementOptions', 'size', [ $element, 'add_control' ], $element, $element_manager_main, 0 );
	}


	/**
	 * Add class specific controls to element object.
	 *
	 * @return array an array containing controls with keys as control ids and values as control arguments
	 */
	public function pro_controls() {
		return [];
	}

	/**
	 * List of disabled controls list for normal version of element.
	 *
	 * Disabling normal element controls comes in handy if pro version has advanced version of that very same control.
	 *
	 * @return array disabled element control list
	 */
	public static function disabled_normal_controls_list() {
		return [ 'imageSize' ];
	}

}

