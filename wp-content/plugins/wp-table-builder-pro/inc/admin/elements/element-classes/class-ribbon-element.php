<?php

namespace WP_Table_Builder_Pro\Inc\Admin\Elements\Element_Classes;

use WP_Table_Builder\Inc\Admin\Controls\Control_Section_Group_Collapse;
use WP_Table_Builder\Inc\Admin\Controls\Control_Section_Group_Tabbed;
use WP_Table_Builder\Inc\Admin\Element_Classes\Base\Element_Base as Element_Base_Object;
use WP_Table_Builder\Inc\Admin\Managers\Controls_Manager;
use WP_Table_Builder\Inc\Admin\Managers\Elements_Manager;
use WP_Table_Builder_Pro as WPTBNS;
use WP_Table_Builder as NS;
use function esc_html__;
use function esc_html_e;
use function wp_normalize_path;

// if called directly, abort
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Ribbon element
 *
 * @package WP_Table_Builder_Pro\Inc\Admin\Elements\Element_Classes
 */
class Ribbon_Element extends Element_Base_Object {
	/**
	 * Default ribbon element data.
	 * This object will be used to create a singleton for ribbon element data so that same options/customizations can be used for individual ribbon element for both backend/frontend operations.
	 * @var array
	 */
	private $ribbon_element_data;

	/**
	 * Ribbon_Element constructor.
	 */
	public function __construct() {
		// setup element data
		$this->ribbon_element_data = [
			'defaultRibbon' => 'bookmarkRibbon',
			'ribbonTypes'   => [
				'rectangleRibbon' => [
					'name' => esc_html__( 'rectangle', 'wp-table-builder-pro' )
				],
				'bookmarkRibbon'  => [
					'name' => esc_html__( 'bookmark', 'wp-table-builder-pro' )
				],
				'cornerRibbon'    => [
					'name' => esc_html__( 'corner', 'wp-table-builder-pro' )
				],
				'iconRibbon'      => [
					'name' => esc_html__( 'Icon', 'wp-table-builder-pro' )
				],
				'sideRibbon'      => [
					'name' => esc_html__( 'Side', 'wp-table-builder-pro' )
				]
			],
			'defaults'      => [
				'ribbonXOffset' => 0,
				'ribbonYOffset' => 0,
				'ribbonSide'    => 'left',
				'ribbonWidth'   => 70
			]
		];
	}

	/**
	 * Get element name.
	 *
	 * Retrieve the element name.
	 *
	 * @return string The name.
	 * @since 1.1.2
	 * @access public
	 *
	 */
	public function get_name() {
		return 'ribbon_element';
	}

	/**
	 * Get element title.
	 *
	 * Retrieve the element title.
	 *
	 * @return string element title.
	 * @since 1.1.2
	 * @access public
	 *
	 */
	public function get_title() {
		esc_html_e( 'Ribbon', 'wp-table-builder-pro' );
	}

	/**
	 * Include file with js script for element
	 *
	 * @since 1.1.2
	 * @access protected
	 */
	public function element_script() {
		return wp_normalize_path( WPTBNS\WP_TABLE_BUILDER_PRO_DIR . 'inc/admin/elements/element-scripts/ribbon-element.js' );
	}


	/**
	 * Get directory icon.
	 *
	 * Retrieve directory item icon.
	 *
	 * @return string Directory Item icon.
	 * @since 1.1.2
	 * @access public
	 *
	 */
	public function get_directory_icon() {
		return WPTBNS\WP_TABLE_BUILDER_PRO_DIR . 'inc/admin/elements/icons/ribbon-element-icon.svg';
	}

	/**
	 * Get url icon.
	 *
	 * Return url icon.
	 *
	 * @return string Url Item icon.
	 * @since 1.1.2
	 * @access public
	 *
	 */
	public function get_url_icon() {
		return wp_normalize_path( WPTBNS\WP_TABLE_BUILDER_PRO_URL . 'inc/admin/elements/icons/ribbon-element-icon.svg' );
	}

	/**
	 * Get type of element.
	 *
	 * This type changes according to which version (basic,pro) of the plugin this element belongs to. While basic elements are available in both versions, pro elements are only limited to pro version of the plugin.
	 * By default, if not overridden, element will be classified as basic.
	 *
	 * @return string type of element
	 */
	public function get_type() {
		return Elements_Manager::PRO;
	}

	/**
	 * Register controls.
	 *
	 * Used to add new controls group to stack
	 *
	 * @since 1.1.2
	 * @access protected
	 */
	protected function _register_controls() {
		// create options array compatible with select2 control type
		$ribbon_type_options = array_reduce( array_keys( $this->ribbon_element_data['ribbonTypes'] ), function ( $carry, $key ) {
			$carry[ $key ] = ucfirst( $this->ribbon_element_data['ribbonTypes'][ $key ]['name'] );

			return $carry;
		}, [] );

		// general group controls
		$general_options = [
			'ribbonElementType'       => [
				'type'         => Controls_Manager::SELECT2,
				'label'        => esc_html__( 'Ribbon Type', 'wp-table-builder-pro' ),
				'options'      => $ribbon_type_options,
				'selectors'    => [
					[
						'query' => '{{{data.container}}}',
						'type'  => Controls_Manager::DATASET,
						'key'   => 'wptbRibbonType',
					]

				],
				// get default value from ribbon element data object
				'defaultValue' => $this->ribbon_element_data['defaultRibbon']
			],
			/**
			 * Change with named toggle control
			 * @deprecated
			 */
//			'ribbonSide'              => [
//				'type'         => Controls_Manager::SELECT2,
//				'label'        => esc_html__( 'Side', 'wp-table-builder-pro' ),
//				'options'      => [
//					'left'  => esc_html__( 'Left', 'wp-table-builder-pro' ),
//					'right' => esc_html__( 'Right', 'wp-table-builder-pro' ),
//				],
//				'selectors'    => [
//					[
//						'query' => '{{{data.container}}}',
//						'type'  => Controls_Manager::DATASET,
//						'key'   => 'wptbRibbonSide',
//					]
//				],
//				'defaultValue' => $this->ribbon_element_data['defaults']['ribbonSide']
//			],
			'ribbonIcon'              => [
				'label'        => __( 'Ribbon Icon', 'wp-table-builder-pro' ),
				'type'         => Controls_Manager::ICON_SELECT,
				'icons'        => $this->read_icons( 'svg' ),
				'perPage'      => 20,
				'selectors'    => [
					[
						'query' => '{{{data.container}}} #wptbRibbonIconDump',
						'type'  => Controls_Manager::DATASET,
						'key'   => 'wptbRibbonIconSrc'
					]
				],
				'defaultValue' => 'star'
			],
			'ribbonSide'              => [
				'type'         => Controls_Manager::NAMED_TOGGLE,
				'label'        => esc_html__( 'Side', 'wp-table-builder-pro' ),
				'items'        => [
					'left'  => esc_html__( 'left', 'wp-table-builder-pro' ),
					'right' => esc_html__( 'right', 'wp-table-builder-pro' ),
				],
				'selectors'    => [
					[
						'query' => '{{{data.container}}}',
						'type'  => Controls_Manager::DATASET,
						'key'   => 'wptbRibbonSide',
					]
				],
				'defaultValue' => $this->ribbon_element_data['defaults']['ribbonSide']
			],
			'ribbonIconAnimate'       => [
				'label'     => esc_html__( 'Animate Icon', 'wp-table-builder-pro' ),
				'type'      => Controls_Manager::TOGGLE,
				'selectors' => [
					'{{{data.container}}} #wptbRibbonIconDump' => [
						'data-enable-animation',
						1,
						0
					]
				]
			],
			'ribbonIconAnimationType' => [
				'label'        => esc_html__( 'Icon Animation', 'wp-table-builder-pro' ),
				'type'         => Controls_Manager::SELECT2,
				'options'      => [
					'beat'    => esc_html__( 'Beat', 'wp-table-builder-pro' ),
					'jump'    => esc_html__( 'Jump', 'wp-table-builder-pro' ),
					'rotate'  => esc_html__( 'Rotate', 'wp-table-builder-pro' ),
					'slideIn' => esc_html__( 'Slide In', 'wp-table-builder-pro' ),
					'dropIn'  => esc_html__( 'Drop In', 'wp-table-builder-pro' ),
					'riseUp'  => esc_html__( 'Rise Up', 'wp-table-builder-pro' ),
					'rainbow' => esc_html__( 'Rainbow', 'wp-table-builder-pro' ),
				],
				'selectors'    => [
					[
						'query' => '{{{data.container}}} #wptbRibbonIconDump',
						'type'  => Controls_Manager::DATASET,
						'key'   => 'wptbRibbonIconAnimationType',
					]
				],
				'defaultValue' => 'beat'
			],
			'ribbonWidth'             => [
				'type'         => Controls_Manager::RANGE,
				'label'        => esc_html__( 'Ribbon Width', 'wp-table-builder-pro' ),
				'selectors'    => [
					[
						'query' => '{{{data.container}}}',
						'type'  => Controls_Manager::DATASET,
						'key'   => 'wptbRibbonWidth'
					],
				],
				'min'          => $this->ribbon_element_data['defaults']['ribbonWidth'],
				'max'          => 200,
				'step'         => 1,
				'defaultValue' => $this->ribbon_element_data['defaults']['ribbonWidth'],
				'postFix'      => 'px'
			],
			'ribbonXOffset'           => [
				'type'         => Controls_Manager::RANGE,
				'label'        => esc_html__( 'X Offset', 'wp-table-builder-pro' ),
				'selectors'    => [
					[
						'query' => '{{{data.container}}} ',
						'type'  => Controls_Manager::DATASET,
						'key'   => 'wptbRibbonXOffset'
					]
				],
				'min'          => 0,
				'max'          => 100,
				'step'         => 0.1,
				'defaultValue' => $this->ribbon_element_data['defaults']['ribbonXOffset'],
				'postFix'      => '%'
			],
			'ribbonYOffset'           => [
				'type'         => Controls_Manager::RANGE,
				'label'        => esc_html__( 'Y Offset', 'wp-table-builder-pro' ),
				'selectors'    => [
					[
						'query' => '{{{data.container}}}',
						'type'  => Controls_Manager::DATASET,
						'key'   => 'wptbRibbonYOffset'
					]
				],
				'min'          => 0,
				'max'          => 100,
				'step'         => 0.1,
				'defaultValue' => $this->ribbon_element_data['defaults']['ribbonYOffset'],
				'postFix'      => '%'
			],
		];

		// text group controls
		$text_options = [
			'ribbonTextSize'  => [
				'type'         => Controls_Manager::RANGE,
				'label'        => esc_html__( 'Text Size', 'wp-table-builder-pro' ),
				'selectors'    => [
					[
						'query'  => '{{{data.container}}} .wptb-element-ribbon-text',
						'type'   => Controls_Manager::STYLE,
						'key'    => 'fontSize',
						'format' => '{$}px'
					]
				],
				'min'          => 5,
				'max'          => 100,
				'step'         => 1,
				'defaultValue' => 15,
				'postFix'      => 'px'
			],
			'ribbonTextColor' => [
				'label'     => esc_html__( 'Text Color', 'wp-table-builder-pro' ),
				'type'      => Controls_Manager::COLOR_PALETTE,
				'selectors' => [
					[
						'query' => '{{{data.container}}}',
						'type'  => Controls_Manager::STYLE,
						'key'   => 'color',
					]
				]
			]
		];

		// background group controls
		$background_options = [
			'ribbonBackgroundColor' => [
				'label'        => esc_html__( 'Background Color', 'wp-table-builder-pro' ),
				'type'         => Controls_Manager::COLOR_PALETTE,
				'selectors'    => [
					[
						'query' => '{{{data.container}}} .wptb-element-ribbon-color-dump',
						'type'  => Controls_Manager::STYLE,
						'key'   => 'backgroundColor',
					]
				],
				'defaultValue' => '#FFFFFF'
			],
			'ribbonBorderColor'     => [
				'label'     => esc_html__( 'Border Color', 'wp-table-builder-pro' ),
				'type'      => Controls_Manager::COLOR_PALETTE,
				'selectors' => [
					[
						'query' => '{{{data.container}}} .wptb-element-ribbon-color-dump',
						'type'  => Controls_Manager::STYLE,
						'key'   => 'borderColor',
					]
				]
			]
		];

		// general section
		Control_Section_Group_Collapse::add_section( 'ribbon_element_general', esc_html__( 'general', 'wp-table-builder-pro' ), $general_options, [
			$this,
			'add_control'
		] );

		// text section
		Control_Section_Group_Collapse::add_section( 'ribbon_element_text', esc_html__( 'text', 'wp-table-builder-pro' ), $text_options, [
			$this,
			'add_control'
		], false );

		// background section
		Control_Section_Group_Collapse::add_section( 'ribbon_element_background', esc_html__( 'background', 'wp-table-builder-pro' ), $background_options, [
			$this,
			'add_control'
		], false );
	}

	/**
	 * Include data to be used with element script.
	 *
	 * Included data will be formatted in JSON format and will follow the naming convention of 'wptb${camelCasedElementName}Data' within element script context.
	 */
	public function script_data() {
		return $this->ribbon_element_data;
	}

	/**
	 * Render element output in the editor.
	 *
	 * Used to generate the live preview, using a wp js template
	 *
	 * @since 1.1.2
	 * @access protected
	 */
	protected function _content_template() {
		?>
        <div id="wptbRibbonMainWrap" class="wptb-element-ribbon-wrapper">
            <div id="wptbRibbonTextWrap" class="wptb-element-ribbon-inner">
                <p style="width: auto"
                   class="wptb-element-ribbon-text"><?php esc_html_e( 'Title', 'wp-table-builder-pro' ); ?></p>
            </div>
            <div class="wptb-element-ribbon-color-dump"></div>
            <div id="wptbRibbonIconDump" style="display: none">
				<?php $this->get_icon( 'star', true ); ?>
            </div>
        </div>
		<?php
	}

	/**
	 * Get relative of element
	 * This function will be used to determine the positioning of elements on drop events
	 *
	 * @return string position relative
	 */
	public function position_relative() {
		return Elements_Manager::TD_RELATIVE;
	}
}
