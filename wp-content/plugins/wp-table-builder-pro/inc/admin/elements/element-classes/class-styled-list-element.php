<?php

namespace WP_Table_Builder_Pro\Inc\Admin\Elements\Element_Classes;

use WP_Table_Builder\Inc\Admin\Controls\Control_Section_Group_Collapse;
use WP_Table_Builder\Inc\Admin\Controls\Control_Section_Group_Tabbed;
use WP_Table_Builder\Inc\Admin\Element_Classes\Base\Element_Base as Element_Base;
use WP_Table_Builder\Inc\Admin\Managers\Controls_Manager as Controls_Manager;
use WP_Table_Builder\Inc\Admin\Managers\Elements_Manager;
use WP_Table_Builder_Pro as WPTBNS;
use WP_Table_Builder as NS;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

class Styled_List_Element extends Element_Base {
	/**
	 * Element control default values.
	 * @var int[]
	 */
	public $element_defaults;

	/**
	 * Styled_List_Element constructor.
	 */
	public function __construct() {
		$this->element_defaults = [
			'styledListIconSize' => 20
		];
	}


	/**
	 * Get element name.
	 *
	 * Retrieve list editor element name.
	 *
	 * @return string element name.
	 * @since 1.0.0
	 * @access public
	 *
	 */
	public function get_name() {
		return 'styled_list';
	}

	/**
	 * Get element title.
	 *
	 * Retrieve button editor element.
	 *
	 * @return string Element title.
	 * @since 1.0.0
	 * @access public
	 *
	 */
	public function get_title() {
		return esc_html_e( 'Styled List', 'wp-table-builder-pro' );
	}

	/**
	 * Get directory icon.
	 *
	 * Retrieve directory styled list-item editor element icon.
	 *
	 * @return string Directory Element icon.
	 * @since 1.0.0
	 * @access public
	 *
	 */
	public function get_directory_icon() {
		return WPTBNS\WP_TABLE_BUILDER_PRO_DIR . 'inc/admin/elements/icons/styled_list.svg';
	}

	/**
	 * Get url icon.
	 *
	 * Return url styled list-item icon
	 *
	 * @return string Url Element icon.
	 * @since 1.0.0
	 * @access public
	 *
	 */
	public function get_url_icon() {
		return wp_normalize_path( WPTBNS\WP_TABLE_BUILDER_PRO_URL . 'inc/admin/elements/icons/styled_list.svg' );
	}

	/**
	 * Include file with js script for element styled list
	 *
	 * @since 1.0.0
	 * @access protected
	 */
	public function element_script() {
		return wp_normalize_path( WPTBNS\WP_TABLE_BUILDER_PRO_DIR . 'inc/admin/elements/element-scripts/styled-list-element.js' );
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
		$icon_controls = [
			'styledListIcon' =>
				[
					'label'     => __( 'Icon', 'wp-table-builder-pro' ),
					'type'      => Controls_Manager::ICON_SELECT,
					'icons'     => $this->read_icons( 'svg' ),
					'perPage'   => 20,
					'selectors' => [
						[
							'query' => '{{{data.container}}} .wptb-styled-list-icon',
							'type'  => Controls_Manager::DATASET,
							'key'   => 'wptbStyledListIconSrc'
						]
					]
				],

			'styledListIconSize' =>
				[
					'label'        => __( 'Icon Size', 'wp-table-builder-pro' ),
					'type'         => Controls_Manager::RANGE,
					'selectors'    => [
						[
							'query'  => '{{{data.container}}} .wptb-styled-list-icon',
							'type'   => Controls_Manager::STYLE,
							'key'    => [ 'width', 'height' ],
							'format' => '{$}px'
						],
						[
							'query'  => '{{{data.container}}} .wptb-styled-list-icon',
							'type'   => Controls_Manager::STYLE,
							'key'    => 'flex',
							'format' => '0 0 {$}px'
						],
					],
					'min'          => 10,
					'max'          => 100,
					'step'         => 1,
					'defaultValue' => $this->element_defaults['styledListIconSize'],
					'postFix'      => 'px'
				],
			'iconColor'          =>
				[
					'label'     => __( 'Icon Color', 'wp-table-builder-pro' ),
					'type'      => Controls_Manager::COLOR_PALETTE,
					'selectors' => [
						[
							'query' => '{{{data.container}}} .wptb-styled-list-icon',
							'type'  => Controls_Manager::STYLE,
							'key'   => 'fill',
						],
					]
				]

		];

		$font_controls = [
			'styledListFontSize'  =>
				[
					'label'        => __( 'Font Size', 'wp-table-builder-pro' ),
					'type'         => Controls_Manager::RANGE,
					'selectors'    => [
						[
							'query'  => '{{{data.container}}} ul li p',
							'type'   => Controls_Manager::STYLE,
							'key'    => 'fontSize',
							'format' => '{$}px'
						],
						[
							'query'  => '{{{data.container}}} ul li p',
							'type'   => Controls_Manager::STYLE,
							'key'    => 'lineHeight',
							'format' => '{$}px'
						],
					],
					'min'          => 10,
					'max'          => 100,
					'defaultValue' => 20,
					'step'         => 1,
					'postFix'      => 'px'
				],
			'styledListFontColor' =>
				[
					'label'     => __( 'Font Color', 'wp-table-builder-pro' ),
					'type'      => Controls_Manager::COLOR_PALETTE,
					'selectors' => [
						[
							'query' => '{{{data.container}}} ul li p',
							'type'  => Controls_Manager::STYLE,
							'key'   => 'color',
						],
					]
				]
		];

		$layout_controls = [
			'styledListSpaceIconText'     =>
				[
					'label'        => __( 'Space Between Icon and Text', 'wp-table-builder-pro' ),
					'type'         => Controls_Manager::RANGE,
					'selectors'    => [
						[
							'query'  => '{{{data.container}}} .wptb-styled-list-item-content p',
							'type'   => Controls_Manager::STYLE,
							'key'    => 'marginLeft',
							'format' => '{$}px',

						],
					],
					'min'          => 0,
					'max'          => 100,
					'defaultValue' => 5,
					'postFix'      => 'px'
				],
			'styledListSpaceBetweenItems' =>
				[
					'label'        => __( 'Space Between Items (Vertically)', 'wp-table-builder-pro' ),
					'type'         => Controls_Manager::RANGE,
					'selectors'    => [
						[
							'query'  => '{{{data.container}}} ul li',
							'type'   => Controls_Manager::STYLE,
							'key'    => 'marginBottom',
							'format' => '{$}px',
						],
					],
					'min'          => 0,
					'max'          => 100,
					'defaultValue' => 5,
					'postFix'      => 'px'
				],
			'listAlignment'               =>
				[
					'label'        => __( 'List Alignment', 'wp-table-builder-pro' ),
					'type'         => Controls_Manager::ALIGNMENT2,
					'selectors'    => [
						[
							'query' => '{{{data.container}}} ul li .wptb-styled-list-li-inner-wrap',
							'type'  => Controls_Manager::DATASET,
							'key'   => 'wptbStyledListAlignment',
						]
					],
					'defaultValue' => 'left'
				]
		];

		$styled_list_controls = [
			esc_html__( 'icon', 'wp-table-builder_pro' )   => $icon_controls,
			esc_html__( 'font', 'wp-table-builder_pro' )   => $font_controls,
			esc_html__( 'layout', 'wp-table-builder_pro' ) => $layout_controls,
		];

		Control_Section_Group_Tabbed::add_section( 'styledListElementOptions', __( 'Styled List Options', 'wp-table-builder_pro' ), $styled_list_controls, [
			$this,
			'add_control'
		] );


        $tooltip_controls = [
	        'tooltip'   =>
		        [
			        'label'       => __( 'Tooltip', 'wp_table_builder' ),
			        'type'        => Controls_Manager::TEXTAREA,
			        'placeholder' => __( 'Insert Tooltip text Here', 'wp-table-builder-pro' ),
			        'rows'        => 5
		        ],
	        'tPosition' =>
		        [
			        'label'           => __( 'Tooltip Position', 'wp-table-builder-pro' ),
			        'type'            => Controls_Manager::SELECT,
			        'options'         => [
				        [ 'Top', 'top', 'wptb-tooltip-top' ],
				        [ 'Right', 'right', 'wptb-tooltip-right' ],
				        [ 'Bottom', 'bottom', 'wptb-tooltip-bottom' ],
				        [ 'Left', 'left', 'wptb-tooltip-left' ]
			        ],
			        'selectedDefault' => 0
		        ]
        ];

		Control_Section_Group_Collapse::add_section( 'wptb_styled_list_element_pro_tooltip', esc_html__( 'tooltip', 'wp-table-builder-pro' ), $tooltip_controls, [
			$this,
			'add_control'
		] );
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
        <ul>
			<?php
			for ( $i = 1; $i <= 3; $i ++ ) {
				?>
                <li class="wptb-in-element">
                    <div class="wptb-styled-list-li-inner-wrap">
                        <div class="wptb-styled-list-icon" data-wptb-styled-list-icon-src="check"
                             style="width: <?php echo $this->element_defaults['styledListIconSize']; ?>px; height: 20px; flex: 0 0 20px; fill: rgb(0, 153, 71);">
							<?php $this->get_icon( 'check', true ); ?>
                        </div>
                        <div class="wptb-styled-list-item-content"
                             style="position: relative;" spellcheck="false" contenteditable="true">
                            <p data-styled_list-marker=''>
								<?php esc_html_e( 'List Item ' . $i, 'wp-table-builder-pro' ); ?>
                            </p>
                        </div>
                        <div class="tooltip"></div>
                    </div>
                    <div class="wptb-clear-both"></div>
                </li>
				<?php
			}
			?>
        </ul>
		<?php
	}

	public function get_type() {
		return Elements_Manager::PRO;
	}
}
