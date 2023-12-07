<?php
// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

class EssentialBlocks
{

    protected static $_instance = null;

    private $enabled_blocks = [];

    public static function get_instance()
    {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    private function __construct()
    {
        // Load Admin Files
        $this->load_admin_dependencies();
        // Fetch Enabled Blocks if not than Default Block List.
        $this->enabled_blocks = get_option('essential_all_blocks', EssentialAdmin::get_default_blocks());
        // Load All Block Files
        $this->load_block_dependencies();
        // Load Admin Panel
        new EssentialAdmin('essensial-blocks', ESSENTIAL_BLOCKS_VERSION);
    }

    private function load_admin_dependencies()
    {
        require_once ESSENTIAL_BLOCKS_DIR_PATH . '/includes/essential-admin.php';
    }
    private function load_block_dependencies()
    {
        if ($this->is_block_enabled('accordion')) {
            require_once ESSENTIAL_BLOCKS_DIR_PATH . '/blocks/accordion.php';
        }
        if ($this->is_block_enabled('button')) {
            require_once ESSENTIAL_BLOCKS_DIR_PATH . '/blocks/button.php';
        }
        if ($this->is_block_enabled('call_to_action')) {
            require_once ESSENTIAL_BLOCKS_DIR_PATH . '/blocks/call-to-action.php';
        }
        if ($this->is_block_enabled('countdown')) {
            require_once ESSENTIAL_BLOCKS_DIR_PATH . '/blocks/countdown.php';
        }
        if ($this->is_block_enabled('number_counter')) {
            require_once ESSENTIAL_BLOCKS_DIR_PATH . '/blocks/number-counter.php';
        }
        if ($this->is_block_enabled('dual_button')) {
            require_once ESSENTIAL_BLOCKS_DIR_PATH . '/blocks/dual-button.php';
        }
        if ($this->is_block_enabled('flipbox')) {
            require_once ESSENTIAL_BLOCKS_DIR_PATH . '/blocks/flipbox.php';
        }
        if ($this->is_block_enabled('advanced_heading')) {
            require_once ESSENTIAL_BLOCKS_DIR_PATH . '/blocks/advanced-heading.php';
        }
        if ($this->is_block_enabled('image_comparison')) {
            require_once ESSENTIAL_BLOCKS_DIR_PATH . '/blocks/image-comparison.php';
        }
        if ($this->is_block_enabled('image_gallery')) {
            require_once ESSENTIAL_BLOCKS_DIR_PATH . '/blocks/image-gallery.php';
        }
        if ($this->is_block_enabled('infobox')) {
            require_once ESSENTIAL_BLOCKS_DIR_PATH . '/blocks/infobox.php';
        }
        if ($this->is_block_enabled('instagram_feed')) {
            require_once ESSENTIAL_BLOCKS_DIR_PATH . '/blocks/instagram-feed.php';
            require_once ESSENTIAL_BLOCKS_DIR_PATH . '/includes/instagram-feed.php';
        }
        if ($this->is_block_enabled('interactive_promo')) {
            require_once ESSENTIAL_BLOCKS_DIR_PATH . '/blocks/interactive-promo.php';
        }
        if ($this->is_block_enabled('notice')) {
            require_once ESSENTIAL_BLOCKS_DIR_PATH . '/blocks/notice.php';
        }
        if ($this->is_block_enabled('parallax_slider')) {
            require_once ESSENTIAL_BLOCKS_DIR_PATH . '/blocks/parallax-slider.php';
        }
        if ($this->is_block_enabled('pricing_table')) {
            require_once ESSENTIAL_BLOCKS_DIR_PATH . '/blocks/pricing-table.php';
        }
        if ($this->is_block_enabled('progress_bar')) {
            require_once ESSENTIAL_BLOCKS_DIR_PATH . '/blocks/progress-bar.php';
        }
        if ($this->is_block_enabled('social')) {
            require_once ESSENTIAL_BLOCKS_DIR_PATH . '/blocks/social.php';
        }
        if ($this->is_block_enabled('team_member')) {
            require_once ESSENTIAL_BLOCKS_DIR_PATH . '/blocks/team-member.php';
        }
        if ($this->is_block_enabled('testimonial')) {
            require_once ESSENTIAL_BLOCKS_DIR_PATH . '/blocks/testimonial.php';
        }
        if ($this->is_block_enabled('typing_text')) {
            require_once ESSENTIAL_BLOCKS_DIR_PATH . '/blocks/typing-text.php';
        }
        if ($this->is_block_enabled('wrapper')) {
            require_once ESSENTIAL_BLOCKS_DIR_PATH . '/blocks/wrapper.php';
        }
        if ($this->is_block_enabled('slider')) {
            require_once ESSENTIAL_BLOCKS_DIR_PATH . '/blocks/slider.php';
        }

        if ($this->is_block_enabled('toggle_content')) {
            require_once ESSENTIAL_BLOCKS_DIR_PATH . '/blocks/toggle-content.php';
        }

        require_once ESSENTIAL_BLOCKS_DIR_PATH . '/includes/category.php';
        require_once ESSENTIAL_BLOCKS_DIR_PATH . '/includes/frontend-loader.php';
        require_once ESSENTIAL_BLOCKS_DIR_PATH . '/includes/font-loader.php';
        require_once ESSENTIAL_BLOCKS_DIR_PATH . '/includes/post-meta.php';
        require_once ESSENTIAL_BLOCKS_DIR_PATH . '/includes/essential-admin.php';
    }

    private function is_block_enabled($key = null)
    {
        if (is_null($key)) {
            return true;
        }
        return (!isset($this->enabled_blocks[$key]) ||
            (isset($this->enabled_blocks[$key]) && $this->enabled_blocks[$key]['visibility'] === "true"));
    }
}
