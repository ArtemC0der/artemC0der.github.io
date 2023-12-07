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

class Circle_Rating_Element extends Element_Base {

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
		return 'circle_rating';
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
		return esc_html_e( 'Circle Rating', 'wp-table-builder-pro' );
	}

	/**
	 * Get directory icon.
	 *
	 * Retrieve directory star-rating editor element icon.
	 *
	 * @return string Directory Element icon.
	 * @since 1.0.0
	 * @access public
	 *
	 */
	public function get_directory_icon() {
		return WPTBNS\WP_TABLE_BUILDER_PRO_DIR . 'inc/admin/elements/icons/circle-rating-star.svg';
	}

	/**
	 * Get url icon.
	 *
	 * Return url star-rating icon
	 *
	 * @return string Url Element icon.
	 * @since 1.0.0
	 * @access public
	 *
	 */
	public function get_url_icon() {
		return wp_normalize_path( WPTBNS\WP_TABLE_BUILDER_PRO_URL . 'inc/admin/elements/icons/circle-rating-star.svg' );
	}

	/**
	 * Include file with js script for element star rating
	 *
	 * @since 1.0.0
	 * @access protected
	 */
	public function element_script() {
		return wp_normalize_path( WPTBNS\WP_TABLE_BUILDER_PRO_DIR . 'inc/admin/elements/element-scripts/circle-rating-element.js' );
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
				'label'      => __( 'Circle Rating Options', 'wp_table_builder_pro' ),
				'type'       => Controls_Manager::SECTION_HEADER,
				'buttonBack' => true
			]
		);

		$this->add_control(
			'circleRatingSize',
			[
				'label'        => __( 'Circle Size', 'wp_table_builder_pro' ),
				'type'         => Controls_Manager::RANGE,
				'selectors'    => [
					[
						'query'  => '{{{data.container}}} .wptb-rating-circle-wrapper',
						'type'   => Controls_Manager::STYLE,
						'key'    => 'fontSize',
						'format' => '{$}px',
					]
				],
				'min'          => 10,
				'max'          => 300,
				'defaultValue' => 100,
				'postFix'      => 'px'
			]
		);

		$this->add_control(
			'circleColor',
			[
				'label'        => __( 'Circle Color', 'wp_table_builder_pro' ),
				'type'         => Controls_Manager::COLOR_PALETTE,
				'selectors'    => [
					[
						'query' => '{{{data.container}}} .wptb-rating-circle-bar',
						'type'  => Controls_Manager::STYLE,
						'key'   => 'borderColor',
					],
					[
						'query' => '{{{data.container}}} .wptb-rating-circle-fill',
						'type'  => Controls_Manager::STYLE,
						'key'   => 'borderColor',
					],
					[
						'query' => '{{{data.container}}} .wptb-rating-circle-wrapper span',
						'type'  => Controls_Manager::STYLE,
						'key'   => 'color',
					]
				],
				'defaultValue' => '#307BBB'
			]
		);

		$this->add_control(
			'circlePercentage',
			[
				'label'        => __( 'Circle Percentage', 'wp_table_builder_pro' ),
				'type'         => Controls_Manager::RANGE,
				'selectors'    => [
					[
						'query' => '{{{data.container}}}',
						'type'  => Controls_Manager::DATASET,
						'key'   => 'percentageCount',
					]
				],
				'min'          => 0,
				'max'          => 100,
				'defaultValue' => 15,
                'postFix' => '%'
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
        <div class="wptb-rating-circle-wrapper">
            <span>15%</span>
            <div class="wptb-rating-circle-slice">
                <div class="wptb-rating-circle-bar"></div>
                <div class="wptb-rating-circle-fill"></div>
            </div>
        </div>
		<?php
	}

	public function get_type() {
		return Elements_Manager::PRO;
	}
}
