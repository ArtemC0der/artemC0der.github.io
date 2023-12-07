<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://wptablebuilder.com/
 * @since             1.1.5
 * @package           WP_Table_Builder_Pro
 *
 * @wordpress-plugin
 * Plugin Name:       WP Table Builder Pro
 * Plugin URI:        https://wptablebuilder.com/
 * Description:       Drag and Drop Responsive Table Builder Plugin for WordPress.
 * Version:           1.3.16
 * Author:            WP Table Builder
 * Author URI:        https://wptablebuilder.com/
 * License:           GPL-3.0+
 * License URI:       http://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain:       wp-table-builder-pro
 * Domain Path:       /languages
 */
namespace WP_Table_Builder_Pro;

use  WP_Table_Builder_Pro\Inc\Admin\Managers\Admin_Notices_Manager ;
use  WP_Table_Builder_Pro\Inc\Admin\Managers\Freemius_Manager ;
use  WP_Table_Builder_Pro\Inc\Core\Init ;
use function  add_action ;
use function  add_filter ;
use function  get_plugin_data ;
use function  is_plugin_active ;
// If this file is called directly, abort.
if ( !defined( 'WPINC' ) ) {
    die;
}
class wptbNull {
    public function is__premium_only() {
        return true;
    }
    public function can_use_premium_code() {
        return true;
    }
}
if ( !function_exists( 'wptb_pro' ) ) {
    // Create a helper function for easy SDK access.
    function wptb_pro()
    {
        global  $wptb_pro ;
        
        if ( !isset( $wptb_pro ) ) {
            require_once dirname( __FILE__ ) . '/inc/core/freemius/start.php';
            $wptb_pro = new wptbNull();
        }
        
        return $wptb_pro;
    }

}
require_once ABSPATH . 'wp-admin/includes/plugin.php';
$current_version = get_plugin_data( __FILE__ )['Version'];
/**
 * Define Constants
 */
define( __NAMESPACE__ . '\\WPTBNS', __NAMESPACE__ . '\\' );
define( WPTBNS . 'WP_TABLE_BUILDER_PRO', 'wp-table-builder-pro' );
define( WPTBNS . 'WP_TABLE_BUILDER_PRO_VERSION', $current_version );
define( WPTBNS . 'WP_TABLE_BUILDER_PRO_DIR', plugin_dir_path( __FILE__ ) );
define( WPTBNS . 'WP_TABLE_BUILDER_PRO_URL', plugin_dir_url( __FILE__ ) );
define( WPTBNS . 'WP_TABLE_BUILDER_PRO_BASENAME', plugin_basename( __FILE__ ) );
define( WPTBNS . 'WP_TABLE_BUILDER_PRO_TEXT_DOMAIN', 'wp-table-builder-pro' );
define( WPTBNS . 'PLUGIN__FILE__', __FILE__ );
// revert to 'production' for release
define( WPTBNS . 'WP_TABLE_BUILDER_PRO_ENV', 'production' );
require_once WP_TABLE_BUILDER_PRO_DIR . 'inc/libraries/autoloader.php';
/**
 * Plugin Singleton Container
 *
 * Maintains a single copy of the plugin app object
 *
 * @since    1.0.0
 */
class WP_Table_Builder_Pro
{
    /**
     * The instance of the plugin.
     *
     * @since    1.0.0
     * @var      Init $init Instance of the plugin.
     */
    private static  $init ;
    public function __construct()
    {
        require_once WP_TABLE_BUILDER_PRO_DIR . 'inc/libraries/autoloader.php';
        register_activation_hook( __FILE__, array( WPTBNS . 'Inc\\Core\\Activator', 'activate' ) );
        register_deactivation_hook( __FILE__, array( WPTBNS . 'Inc\\Core\\Deactivator', 'deactivate' ) );
        add_action( 'plugins_loaded', array( $this, 'init' ) );
        add_filter( 'wp-table-builder/filter/wptb_gutenberg_preview_css_url', [ $this, 'add_gutenberg_preview_styles' ] );
    }
    
    public static function add_gutenberg_preview_styles( $table_css )
    {
        $table_css['pro'] = add_query_arg( [
            'ver' => WP_TABLE_BUILDER_PRO_VERSION,
        ], WP_TABLE_BUILDER_PRO_URL . 'inc/common/css/wp-table-builder-pro.css' );
        return $table_css;
    }
    
    public static function init()
    {
        require_once ABSPATH . 'wp-admin/includes/plugin.php';
        
        if ( is_plugin_active( 'wp-table-builder/wp-table-builder.php' ) ) {
            $context = __CLASS__;
            // setup the plugin after freemius is successfully initiated
            add_action( 'wptb_pro_loaded', function () use( $context ) {
                
                if ( null === $context::$init ) {
                    $context::$init = new Init();
                    $context::$init->run();
                }
            
            } );
            Freemius_Manager::init();
        } else {
            add_action( 'admin_init', function () {
                deactivate_plugins( plugin_basename( __FILE__ ) );
            } );
            $message = sprintf( esc_html__( '"%1$s" requires "%2$s" to be installed and activated.', 'wp-table-builder-pro' ), '<strong>' . esc_html__( 'WP Table Builder Pro', 'wp-table-builder-pro' ) . '</strong>', '<strong>' . esc_html__( 'WP Table Builder', 'wp-table-builder-pro' ) . '</strong>' );
            Admin_Notices_Manager::show_notice( $message, Admin_Notices_Manager::ERROR );
        }
    
    }

}
/**
 * Begins execution of the plugin
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * Also returns copy of the app object so 3rd party developers
 * can interact with the plugin's hooks contained within.
 **/
function wp_table_builder_pro_init()
{
    return new WP_Table_Builder_Pro();
}

$min_php = '5.6.0';
// Check the minimum required PHP version and run the plugin.
if ( version_compare( PHP_VERSION, $min_php, '>=' ) ) {
    wp_table_builder_pro_init();
}