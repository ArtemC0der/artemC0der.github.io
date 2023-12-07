<?php

namespace WP_Table_Builder_Pro\Inc\Core;

use WP_Table_Builder_Pro\Inc\Admin\Managers\Dev_Local_Files_Manager;
use WP_Table_Builder_Pro\Inc\Admin\Managers\Elements_Manager as Elements_Manager;
use WP_Table_Builder_Pro as WPTBNS;
use WP_Table_Builder_Pro\Inc\Admin as Admin;
use WP_Table_Builder_Pro\Inc\Admin\Managers\Lazy_Load_Pro;
use WP_Table_Builder_Pro\Inc\Admin\Managers\Prebuilt_Table_Manager;
use WP_Table_Builder_Pro\Inc\Admin\Managers\Pro_Controls_Manager;
use WP_Table_Builder_Pro\Inc\Admin\Managers\Version_Control_Manager;
use WP_Table_Builder_Pro\Inc\Frontend as Frontend;
use WP_Table_Builder_Pro\Inc\Common as Common;

/**
 * The core plugin class.
 * Defines internationalization, admin-specific hooks, and public-facing site hooks.
 *
 * @link       https://wptablebuilder.com
 * @since      1.0.0
 *
 * @author     WP Table Builder
 */
class Init {

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @var      Loader $loader Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string $plugin_base_name The string used to uniquely identify this plugin.
	 */
	protected $plugin_basename;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string $version The current version of the plugin.
	 */
	protected $version;

	/**
	 * The text domain of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string $version The current version of the plugin.
	 */
	protected $plugin_text_domain;

	/**
	 * Initialize and define the core functionality of the plugin.
	 */
	public function __construct() {

		$this->plugin_name        = WPTBNS\WP_TABLE_BUILDER_PRO;
		$this->version            = WPTBNS\WP_TABLE_BUILDER_PRO_VERSION;
		$this->plugin_basename    = WPTBNS\WP_TABLE_BUILDER_PRO_BASENAME;
		$this->plugin_text_domain = WPTBNS\WP_TABLE_BUILDER_PRO_TEXT_DOMAIN;

		$this->load_dependencies();
		$this->set_locale();
		$this->define_admin_hooks();
		$this->define_public_hooks();

		if ( isset( $_GET['page'] ) && sanitize_text_field( $_GET['page'] ) == 'wptb-builder' ) {
			new Pro_Controls_Manager();
			new Elements_Manager();
		}
	}

	/**
	 * Loads the following required dependencies for this plugin.
	 *
	 * - Loader - Orchestrates the hooks of the plugin.
	 * - Internationalization_I18n - Defines internationalization functionality.
	 * - Admin - Defines all hooks for the admin area.
	 * - Frontend - Defines all hooks for the public side of the site.
	 *
	 * @access    private
	 */
	private function load_dependencies() {
		$this->loader = new Loader();

		// initialize version control manager
		Version_Control_Manager::init();

		// initialize prebuilt table manager
		new Prebuilt_Table_Manager();

		// initialize dev local files manager
		Dev_Local_Files_Manager::init();

		// initialize lazy load manager for pro version
		Lazy_Load_Pro::init();
	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Internationalization_I18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @access    private
	 */
	private function set_locale() {

		$plugin_i18n = new Internationalization_I18n( $this->plugin_text_domain );

		$this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );

	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @access    private
	 */
	private function define_admin_hooks() {

		$plugin_admin = new Admin\Admin( $this->get_plugin_name(), $this->get_version(), $this->get_plugin_text_domain() );

		new Admin\Views\Table_Setting_Element();
		new Admin\Views\Table_Cell_Setting_Element();

		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts' );

		$plugin_admin = new Common\Common( $this->get_plugin_name(), $this->get_version(), $this->get_plugin_text_domain() );

		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
	}

	/**
	 * Register all the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @access    private
	 */
	private function define_public_hooks() {
		// initialize style pass pro
		Admin\Style_Pass_Pro::init();

		$plugin_public = new Frontend\Frontend( $this->get_plugin_name(), $this->get_version(), $this->get_plugin_text_domain() );

		$this->loader->add_action( 'wptb_frontend_enqueue_style', $plugin_public, 'enqueue_styles' );
		$this->loader->add_action( 'wptb_frontend_enqueue_script', $plugin_public, 'enqueue_scripts' );

		$plugin_public = new Common\Common( $this->get_plugin_name(), $this->get_version(), $this->get_plugin_text_domain() );

		$this->loader->add_action( 'wptb_frontend_enqueue_style', $plugin_public, 'enqueue_styles' );

	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 */
	public function run() {
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 */
	public function get_plugin_name() {
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @return    Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader() {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @return    string    The version number of the plugin.
	 * @since     1.0.0
	 */
	public function get_version() {
		return $this->version;
	}

	/**
	 * Retrieve the text domain of the plugin.
	 *
	 * @return    string    The text domain of the plugin.
	 * @since     1.0.0
	 */
	public function get_plugin_text_domain() {
		return $this->plugin_text_domain;
	}
}
