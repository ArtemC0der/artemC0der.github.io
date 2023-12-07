<?php

namespace WP_Table_Builder_Pro\Inc\Admin\Elements\Element_Classes;

use WP_Table_Builder\Inc\Admin\Element_Classes\Base\Element_Base as Element_Base;
use WP_Table_Builder\Inc\Admin\Managers\Controls_Manager as Controls_Manager;
use WP_Table_Builder\Inc\Admin\Managers\Elements_Manager;
use WP_Table_Builder_Pro as WPTBNS;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

class Icon_Element extends Element_Base {
	public $default_icon = 'star';

	/**
	 * Get element name.
	 *
	 * Retrieve button editor element name.
	 *
	 * @return string element name.
	 * @since 1.0.0
	 * @access public
	 *
	 */
	public function get_name() {
		return 'icon';
	}

	/**
	 * Get element button.
	 *
	 * Retrieve button editor element.
	 *
	 * @return string Element title.
	 * @since 1.0.0
	 * @access public
	 *
	 */
	public function get_title() {
		return esc_html_e( 'Icon', 'wp-table-builder-pro' );
	}

	/**
	 * Get directory icon.
	 *
	 * Retrieve directory element's editor icon
	 *
	 * @return string Directory Element icon.
	 * @since 1.0.0
	 * @access public
	 *
	 */
	public function get_directory_icon() {
		return WPTBNS\WP_TABLE_BUILDER_PRO_DIR . 'inc/admin/elements/icons/icon.svg';
	}

	/**
	 * Get url icon.
	 *
	 * Return url element icon
	 *
	 * @return string Url Element icon.
	 * @since 1.0.0
	 * @access public
	 *
	 */
	public function get_url_icon() {
		return wp_normalize_path( WPTBNS\WP_TABLE_BUILDER_PRO_URL . 'inc/admin/elements/icons/icon.svg' );
	}

	/**
	 * Include file with js script for element icon
	 *
	 * @since 1.0.0
	 * @access protected
	 */
	public function element_script() {
		//return wp_normalize_path ( WPTBNS\WP_TABLE_BUILDER_PRO_DIR . 'inc/admin/elements/element-scripts/icon-element.js' );
	}

	/**
	 * Register the element controls.
	 *
	 * Adds different fields to allow the user to change and customize the element settings.
	 *
	 * @since 1.0.0
	 *
	 * @access protected
	 */
	protected function _register_controls() {
		$this->add_control(
			'section_header',
			[
				'label'      => __( 'Icon Options', 'wp_table_builder_pro' ),
				'type'       => Controls_Manager::SECTION_HEADER,
				'buttonBack' => true
			]
		);

		$this->add_control(
			'buttonIcon',
			[
				'label'        => __( 'Icon', 'wp_table_builder_pro' ),
				'type'         => Controls_Manager::ICON_SELECT,
				'icons'        => $this->read_icons( 'svg' ),
				'perPage'      => 20,
				'selectors'    => [
					[
						'query' => '{{{data.container}}} .wptb-icon',
						'type'  => Controls_Manager::DATASET,
						'key'   => 'wptbIconSrc'
					]
				],
				'defaultValue' => $this->default_icon
			]
		);

		$this->add_control(
			'iconSize',
			[
				'label'        => __( 'Icon Size', 'wp_table_builder_pro' ),
				'type'         => Controls_Manager::RANGE,
				'selectors'    => [
					[
						'query'  => '{{{data.container}}} .wptb-icon',
						'type'   => Controls_Manager::STYLE,
						'key'    => [ 'width', 'height' ],
						'format' => '{$}px'
					]
				],
				'min'          => 10,
				'max'          => 200,
				'defaultValue' => 25,
				'postFix'      => 'px'
			]
		);

		$this->add_control(
			'iconColor',
			[
				'label'     => __( 'Icon Color', 'wp_table_builder' ),
				'type'      => Controls_Manager::COLOR_PALETTE,
				'selectors' => [
					[
						'query' => '{{{data.container}}} .wptb-icon',
						'type'  => Controls_Manager::STYLE,
						'key'   => 'fill',
					]
				]
			]
		);

		$this->add_control(
			'iconAlignmentCheckbox',
			[
				'label'        => __( 'Icon Alignment', 'wp_table_builder' ),
				'type'         => Controls_Manager::ALIGNMENT2,
				'selectors'    => [
					[
						'query' => '{{{data.container}}} .wptb-icon-wrapper',
						'type'  => Controls_Manager::STYLE,
						'key'   => 'textAlign',
					]
				],
				'defaultValue' => 'center'
			]
		);
	}

	/**
	 * Render text editor element output in the editor.
	 *
	 * Written as a wp js template and used to generate the live preview.
	 *
	 * @since 1.0.0
	 * @access protected
	 */
	protected function _content_template() {
		?>
        <div class="wptb-icon-wrapper" style="text-align: center;">
            <div class="wptb-icon" style="width: 25px; height: 25px;">
				<?php $this->get_icon( $this->default_icon, true ); ?>
            </div>
        </div>
		<?php
	}

	public function get_type() {
		return Elements_Manager::PRO;
	}
}
