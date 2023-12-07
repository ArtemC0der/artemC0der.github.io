<?php
// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

class EssentialAdmin {
    private $plugin_name;
    private $plugin_version;
    private $default_blocks;

    public function __construct($name, $version) {
        $this->plugin_name = $name;
        $this->plugin_version = $version;
        $this->default_blocks =  self::get_default_blocks();
        $this->migration_options_db();
        add_action('admin_menu', array($this, 'add_menu_page'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_styles'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('wp_ajax_save_eb_admin_options', [$this, 'eb_save_blocks']);
        register_activation_hook(ESSENTIAL_BLOCKS_FILE, array($this, 'activate'));
    }

    public function migration_options_db(){
        $opt_db_migration = get_option( 'eb_opt_migration', false );
        if( version_compare( $this->plugin_version, '1.3.1', '==' ) && $opt_db_migration === false ) {
            update_option( 'eb_opt_migration', true );
            $all_blocks = get_option( 'essential_all_blocks', [] );
            $blocks = [];
            if( ! empty( $all_blocks ) ) {
                foreach( $all_blocks as $block ) {
                    $blocks[ $block['value'] ] = $block;
                }
            }
            update_option( 'essential_all_blocks', $blocks );
        }
    }

    public function add_menu_page() {
        add_menu_page(
            __('Essential Blocks', 'eb'), __('Essential Blocks', 'eb'),
            'delete_user', 'essential-blocks', array($this, 'menu_page_display'), ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/images/eb-icon-21x21.svg', 100
        );
    }

    public function menu_page_display() {
        include ESSENTIAL_BLOCKS_DIR_PATH . 'includes/menu-page-display.php';
    }

    public function enqueue_styles() {
        wp_enqueue_style(
            $this->plugin_name,
            ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/css/admin.css',
            array(), $this->plugin_version, 'all'
        );
        wp_enqueue_style(
            $this->plugin_name .'-admin',
            ESSENTIAL_BLOCKS_ADMIN_URL . 'admin/style.css',
            array(), $this->plugin_version, 'all'
        );
        if ($this->is_edit_page()) {//Only for Add/Edit Pages
            wp_enqueue_style(
                $this->plugin_name .'-editor-css',
                ESSENTIAL_BLOCKS_ADMIN_URL . 'admin/editor-css/style.css',
                array(), $this->plugin_version, 'all'
            );
        }
    }

    public function enqueue_scripts($hook) {
        if ($hook === 'toplevel_page_essential-blocks') {
            wp_enqueue_script(
                $this->plugin_name . '-admin',
                ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/js/essential-blocks.js',
                array('jquery', $this->plugin_name . '-swal'), $this->plugin_version, true
            );

            wp_enqueue_script(
                $this->plugin_name . '-swal',
                ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/js/sweetalert.min.js',
                array('jquery'),
                $this->plugin_version, true
            );

            wp_enqueue_script(
                $this->plugin_name . '-admin-blocks',
                ESSENTIAL_BLOCKS_ADMIN_URL . 'admin/index.js',
                array('wp-i18n', 'wp-element', 'wp-hooks', 'wp-util', 'wp-components'),
                $this->plugin_version, true
            );

            wp_localize_script($this->plugin_name . '-admin-blocks', 'EssentialBlocksAdmin', array(
                'all_blocks' => $this->get_blocks(),
                'ajax_url' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('eb-save-admin-options'),
            ));

        }

        wp_localize_script('essential-blocks-js', 'EssentialBlocks', array(
            'nonce' => $this->disabling_nonce(),
            'ajax_url' => admin_url('admin-ajax.php'),
            'export_nonce'  => wp_create_nonce('eb-template-export-nonce-action'),
            'enabled_blocks' => $this->enabled_blocks(),
            'current_page_id' => get_the_ID()
        ));
    }

    public function filter_blocks( $block ){
        return $block['visibility'];
    }

    public function enabled_blocks() {
        $blocks = $this->get_blocks();
        $enabled_blocks = array_keys( array_filter( $blocks, array( $this, 'filter_blocks' ) ) );
        return $enabled_blocks;
    }

    public static function get_default_blocks(){
        $default_blocks = [
            'accordion' => [
                'label' => __( 'Accordion', 'eb' ),
                'value' => 'accordion',
                'visibility' => 'true',
            ],
            'button' => [
                'label' => __( 'Button', 'eb' ),
                'value' => 'button',
                'visibility' => 'true',
            ],
            'call_to_action' => [
                'label' => __( 'Call To Action', 'eb' ),
                'value' => 'call_to_action',
                'visibility' => 'true',
            ],
            'countdown' => [
                'label' => __( 'Countdown', 'eb' ),
                'value' => 'countdown',
                'visibility' => 'true',
            ],
            'dual_button' => [
                'label' => __( 'Dual Button', 'eb' ),
                'value' => 'dual_button',
                'visibility' => 'true',
            ],
            'flipbox' => [
                'label' => __( 'Flipbox', 'eb' ),
                'value' => 'flipbox',
                'visibility' => 'true',
            ],
            'advanced_heading' => [
                'label' => __( 'Advanced Heading', 'eb' ),
                'value' => 'advanced_heading',
                'visibility' => 'true',
            ],
            'image_comparison' => [
                'label' => __( 'Image Comparison', 'eb' ),
                'value' => 'image_comparison',
                'visibility' => 'true',
            ],
            'image_gallery' => [
                'label' => __( 'Image Gallery', 'eb' ),
                'value' => 'image_gallery',
                'visibility' => 'true',
            ],
            'infobox' => [
                'label' => __( 'Infobox', 'eb' ),
                'value' => 'infobox',
                'visibility' => 'true',
            ],
            'instagram_feed' => [
                'label' => __( 'Instagram Feed', 'eb' ),
                'value' => 'instagram_feed',
                'visibility' => 'true',
            ],
            'interactive_promo' => [
                'label' => __( 'Interactive Promo', 'eb' ),
                'value' => 'interactive_promo',
                'visibility' => 'true',
            ],
            'notice' => [
                'label' => __( 'Notice', 'eb' ),
                'value' => 'notice',
                'visibility' => 'true',
            ],
            'parallax_slider' => [
                'label' => __( 'Parallax Slider', 'eb' ),
                'value' => 'parallax_slider',
                'visibility' => 'true',
            ],
            'pricing_table' => [
                'label' => __( 'Pricing Table', 'eb' ),
                'value' => 'pricing_table',
                'visibility' => 'true',
            ],
            'progress_bar' => [
                'label' => __( 'Progress Bar', 'eb' ),
                'value' => 'progress_bar',
                'visibility' => 'true',
            ],
            'slider' => [
                'label' => __( 'Slider', 'eb' ),
                'value' => 'slider',
                'visibility' => 'true',
            ],
            'social' => [
                'label' => __( 'Social', 'eb' ),
                'value' => 'social',
                'visibility' => 'true',
            ],
            'team_member' => [
                'label' => __( 'Team Member', 'eb' ),
                'value' => 'team_member',
                'visibility' => 'true',
            ],
            'testimonial' => [
                'label' => __( 'Testimonial', 'eb' ),
                'value' => 'testimonial',
                'visibility' => 'true',
            ],
            'toggle_content' => [
                'label' => __( 'Toggle Content', 'eb' ),
                'value' => 'toggle_content',
                'visibility' => 'true',
            ],
            'typing_text' => [
                'label' => __( 'Typing Text', 'eb' ),
                'value' => 'typing_text',
                'visibility' => 'true',
            ],
            'wrapper' => [
                'label' => __( 'Wrapper', 'eb' ),
                'value' => 'wrapper',
                'visibility' => 'true',
            ],
            'number_counter' => [
                'label' => __( 'Number Counter', 'eb' ),
                'value' => 'number_counter',
                'visibility' => 'true',
            ],
        ];

        $pro_blocks = apply_filters( 'essential_pro_blocks', []);
        $merged_blocks = array_merge( $default_blocks, $pro_blocks );
        return $merged_blocks;
    }

    public function activate() {
        update_option( 'essential_all_blocks', $this->default_blocks );
    }

    public function eb_save_blocks() {
        if (!wp_verify_nonce($_POST['_wpnonce'], 'eb-save-admin-options')) {
            die('Security check');
        } else {
            update_option('essential_all_blocks', $_POST['all_blocks']);
        }
        die();
    }

    public function get_blocks() {
        $all_blocks = get_option('essential_all_blocks');
        if( empty( $all_blocks ) ) {
            return $this->default_blocks;
        }

        if( count( $this->default_blocks ) > count( $all_blocks ) ) {
            return array_merge( $this->default_blocks, $all_blocks );
        }

        return $all_blocks;
    }

    public function disabling_nonce() {
        return wp_create_nonce('essential_disabling_nonce');
    }

    /**
     * is_edit_page 
     * function to check if the current page is a post edit page
     * 
     * @author Ohad Raz <admin@bainternet.info>
     * 
     * @param  string  $new_edit what page to check for accepts new - new post page ,edit - edit post page, null for either
     * @return boolean
     */
    public function is_edit_page($new_edit = null) {
        global $pagenow;
        //make sure we are on the backend
        if (!is_admin()) return false;

        
        if($new_edit == "edit")
            return in_array( $pagenow, array( 'post.php',  ) );
        elseif($new_edit == "new") //check for new post page
            return in_array( $pagenow, array( 'post-new.php' ) );
        else //check for either new or edit
            return in_array( $pagenow, array( 'post.php', 'post-new.php' ) );
    }
}
