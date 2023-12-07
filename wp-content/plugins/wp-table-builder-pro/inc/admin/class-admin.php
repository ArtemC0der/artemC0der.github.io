<?php

namespace WP_Table_Builder_Pro\Inc\Admin;
use WP_Table_Builder_Pro as WPTBNS;

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @link       https://wptablebuilder.com
 * @since      1.0.0
 *
 * @author    WP Table Builder
 */
class Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * The text domain of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_text_domain    The text domain of this plugin.
	 */
	private $plugin_text_domain;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since       1.0.0
	 * @param       string $plugin_name        The name of this plugin.
	 * @param       string $version            The version of this plugin.
	 * @param       string $plugin_text_domain The text domain of this plugin.
	 */
	public function __construct( $plugin_name, $version, $plugin_text_domain ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;
		$this->plugin_text_domain = $plugin_text_domain;

		//disabled old toggle button
//        add_action( 'wp_table_builder:html_code_after', array( $this, 'html_code_after' ) );

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {
		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */
		
		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {
		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		 
		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/admin.js', array( 'jquery' ), $this->version, true );

	}

    /**
     * Return HTML
     *
     * @since 2.0
     */
	public function html_code_after() {
        ob_start();
        ?>
        <a href="javascript:void(0)" class="wptb-left-panel-extend" data-fn="togglePanel" data-title-collapsed="Expand panel" data-title-expanded="Collapse panel" title="Collapse panel">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="512" height="512" viewBox="0 0 357 357" style="enable-background:new 0 0 357 357;" xml:space="preserve" class=""><g transform="matrix(-1, 1.22465e-16, -1.22465e-16, -1, 357, 357)"><g>
                <g id="play-arrow">
                    <polygon points="38.25,0 38.25,357 318.75,178.5   " data-original="#000000" class="active-path" style="fill:#3B7EC0" data-old_color="##3B7EC"></polygon>
                </g>
            </g></g>
            </svg>
        </a>
        <?php
        echo ob_get_clean();
    }
}
