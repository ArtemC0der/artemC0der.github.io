<?php

namespace WP_Table_Builder_Pro\Inc\Admin\Elements\Element_Classes;

// if called directly, abort
use WP_Table_Builder\Inc\Admin\Controls\Control_Section_Group_Tabbed;
use WP_Table_Builder\Inc\Admin\Element_Classes\Base\Element_Base;
use WP_Table_Builder\Inc\Admin\Managers\Controls_Manager;
use WP_Table_Builder\Inc\Admin\Managers\Elements_Manager;
use WP_Table_Builder_Pro as WPTBNS;
use WP_Table_Builder as NS;
use function esc_html_e;

if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Text Icon element.
 *
 * @package WP_Table_Builder_Pro\Inc\Admin\Elements\Element_Classes
 */
class Text_Icon_Element extends Element_Base {

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
		return 'text_icon_element';
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
		esc_html_e( 'Text Icon', 'wp-table-builder-pro' );
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
		return WPTBNS\WP_TABLE_BUILDER_PRO_DIR . 'inc/admin/elements/icons/text-icon.svg';
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
		return WPTBNS\WP_TABLE_BUILDER_PRO_URL . 'inc/admin/elements/icons/text-icon.svg';
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
	 * Include file with js script for element
	 *
	 * @since 1.1.2
	 * @access protected
	 */
	public function element_script() {
		return wp_normalize_path( WPTBNS\WP_TABLE_BUILDER_PRO_DIR . 'inc/admin/elements/element-scripts/text-icon-element.js' );
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
		// general controls
		$general_controls = [
			'textIconSpaceBetween' => [
				'label'        => esc_html__( 'Space Between', 'wp-table-builder-pro' ),
				'type'         => Controls_Manager::RANGE,
				'selectors'    => [
					[
						'query' => '{{{data.container}}}',
						'type'  => Controls_Manager::DATASET,
						'key'   => 'wptbTextIconSpaceBetween',
					],
				],
				'min'          => 0,
				'max'          => 200,
				'step'         => 1,
				'defaultValue' => 0,
				'postFix'      => 'px'
			],
			'textIconAlignment'    => [
				'label'        => esc_html__( 'Element alignment', 'wp-table-builder-pro' ),
				'type'         => Controls_Manager::ALIGNMENT2,
				'selectors'    => [
					[
						'query' => '{{{data.container}}}',
						'type'  => Controls_Manager::DATASET,
						'key'   => 'wptbTextIconAlignment',
					]
				],
				'defaultValue' => 'left'
			]
		];

		// text related controls
		$text_controls = [
			'textIconFontSize'  => [
				'type'         => Controls_Manager::RANGE,
				'label'        => esc_html__( 'Font Size', 'wp-table-builder-pro' ),
				'selectors'    => [
					[
						'query'  => '{{{data.container}}}',
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
			'textIconFontColor' => [
				'label'     => esc_html__( 'Text Color', 'wp-table-builder-pro' ),
				'type'      => Controls_Manager::COLOR_PALETTE,
				'selectors' => [
					[
						'query' => '{{{data.container}}} #wptbTextIconMainTextWrapper',
						'type'  => Controls_Manager::STYLE,
						'key'   => 'color',
					]
				]
			],
		];

		// icon related controls
		$icon_controls = [
			'textIconIcon'         => [
				'label'        => esc_html__( 'Select Icon', 'wp-table-builder-pro' ),
				'type'         => Controls_Manager::ICON_SELECT,
				'icons'        => $this->read_icons( 'svg' ),
				'perPage'      => 20,
				'selectors'    => [
					[
						'query' => '{{{data.container}}} #wptbTextIconIconWrapper',
						'type'  => Controls_Manager::DATASET,
						'key'   => 'wptbTextIconIconSrc'
					]
				],
				'defaultValue' => 'star'
			],
			'textIconIconLocation' => [
				'label'        => esc_html__( 'Icon Location', 'wp-table-builder-pro' ),
				'type'         => Controls_Manager::NAMED_TOGGLE,
				'items'        => [
					'left'  => esc_html__( 'left', 'wp-table-builder-pro' ),
					'right' => esc_html__( 'right', 'wp-table-builder-pro' ),
				],
				'selectors'    => [
					[
						'query' => '{{{data.container}}}',
						'type'  => Controls_Manager::DATASET,
						'key'   => 'wptbTextIconIconLocation',
					]
				],
				'defaultValue' => 'left'
			],
			'textIconIconColor'    => [
				'label'     => esc_html__( 'Icon Color', 'wp-table-builder-pro' ),
				'type'      => Controls_Manager::COLOR_PALETTE,
				'selectors' => [
					[
						'query' => '{{{data.container}}} #wptbTextIconIconWrapper',
						'type'  => Controls_Manager::STYLE,
						'key'   => 'color'
					]
				]
			],
			'textIconIconSize'     => [
				'label'        => esc_html__( 'Icon Size', 'wp-table-builder-pro' ),
				'type'         => Controls_Manager::RANGE,
				'selectors'    => [
					[
						'query'  => '{{{data.container}}} #wptbTextIconIconWrapper',
						'type'   => Controls_Manager::STYLE,
						'key'    => 'width',
						'format' => '{$}px'
					],
					[
						'query'  => '{{{data.container}}} #wptbTextIconIconWrapper',
						'type'   => Controls_Manager::STYLE,
						'key'    => 'height',
						'format' => '{$}px'
					]
				],
				'min'          => 15,
				'max'          => 200,
				'step'         => 1,
				'defaultValue' => 15,
				'postFix'      => 'px'
			]
		];

		// all controls related to  text icon element
		$text_icon_controls = [
			esc_html__( 'general', 'wp-table-builder-pro' ) => $general_controls,
			esc_html__( 'text', 'wp-table-builder-pro' )    => $text_controls,
			esc_html__( 'icon', 'wp-table-builder-pro' )    => $icon_controls,
		];

		// add tabbed section group
		Control_Section_Group_Tabbed::add_section( 'textIconOptions', __( 'text icon options', 'wp-table-builder-pro' ), $text_icon_controls, [
			$this,
			'add_control'
		] );
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
        <div class="wptb-element-text-icon-wrapper">
            <div id="wptbTextIconIconWrapper" class="wptb-text-icon-icon-wrapper">
				<?php $this->get_icon( 'star', true ); ?>
            </div>
            <div id="wptbTextIconMainTextWrapper">
                <p id="wptbTextIconMainText">
					<?php esc_html_e( 'Enter text...' ); ?>
                </p>
            </div>
        </div>
		<?php
	}
}
