<?php

function essential_blocks_cgb_block_assets()
{
    /* Enqueue styles */
    wp_enqueue_style(
        'essential-blocks-hover-css',
        plugins_url('assets/css/hover-min.css', dirname(__FILE__)),
        array('wp-editor')
    );

    wp_enqueue_style(
        'fontpicker-default-theme',
        plugins_url('assets/css/fonticonpicker.base-theme.react.css', dirname(__FILE__)),
        array()
    );

    wp_enqueue_style(
        'fontpicker-material-theme',
        plugins_url('assets/css/fonticonpicker.material-theme.react.css', dirname(__FILE__)),
        array()
    );

    wp_enqueue_style(
        'fontawesome-frontend-css',
        plugins_url('assets/css/font-awesome5.css', dirname(__FILE__)),
        array()
    );

    wp_enqueue_style(
        'hover-effects-style',
        plugins_url('assets/css/hover-effects.css', dirname(__FILE__)),
        array()
    );

    wp_enqueue_style(
        'twenty-twenty-style',
        plugins_url('assets/css/twentytwenty.css', dirname(__FILE__)),
        array()
    );

    wp_enqueue_style(
        'fslightbox-style',
        plugins_url('assets/css/fslightbox.min.css', dirname(__FILE__)),
        array()
    );

    wp_enqueue_style(
        'slick-style',
        plugins_url('assets/css/slick.css', dirname(__FILE__)),
        array()
    );

    // wp_enqueue_style(
    //     'react-datetime-style',
    //     plugins_url('assets/css/react-datetime.css', dirname(__FILE__)),
    //     array()
    // );


    // Enqueue scripts
    wp_enqueue_script(
        'essential-blocks-twenty-move',
        plugins_url("assets/js/jquery.event.move.js", dirname(__FILE__)),
        array("wp-editor", "jquery"),
        true
    );

    wp_enqueue_script(
        'essential-blocks-image-loaded',
        plugins_url("assets/js/images-loaded.min.js", dirname(__FILE__)),
        array("wp-editor", "jquery"),
        true
    );

    wp_enqueue_script(
        'essential-blocks-twenty-twenty',
        plugins_url("assets/js/jquery.twentytwenty.js", dirname(__FILE__)),
        array("wp-editor", "jquery"),
        true,
        true
    );

    wp_enqueue_script(
        'fslightbox-js',
        plugins_url("assets/js/fslightbox.min.js", dirname(__FILE__)),
        array("wp-editor"),
        true,
        true
    );

    wp_enqueue_script(
        'essential-blocks-masonry',
        plugins_url("assets/js/masonry.min.js", dirname(__FILE__)),
        array("wp-editor"),
        true
    );

    wp_enqueue_script(
        'essential-blocks-typedjs',
        plugins_url("assets/js/typed.min.js", dirname(__FILE__)),
        array("jquery", "wp-editor"),
        true
    );

    wp_enqueue_script(
        'essential-blocks-slickjs',
        plugins_url("assets/js/slick.min.js", dirname(__FILE__)),
        array("jquery", "wp-editor"),
        true
    );

    wp_enqueue_script(
        'essential-blocks-category-icon',
        plugins_url("lib/update-category-icon/index.js", dirname(__FILE__)),
        array(),
        true
    );
}

add_action('enqueue_block_assets', 'essential_blocks_cgb_block_assets');
