<?php
/**
 * Functions to register client-side assets (scripts and stylesheets) for the
 * Gutenberg block.
 *
 * @package essential-blocks
 */

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function instagram_feed_block_init() {
	// Skip block registration if Gutenberg is not enabled/merged.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}
	$dir = dirname( __FILE__ );

	$index_js = 'instagram-feed/index.js';
	wp_register_script(
		'instagram-feed-block-editor',
		plugins_url( $index_js, __FILE__ ),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
		),
		filemtime( "$dir/$index_js" )
	);

	$editor_css = 'instagram-feed/editor.css';
	wp_register_style(
		'instagram-feed-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'instagram-feed/style.css';
	wp_register_style(
		'instagram-feed-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

  $frontend_js = 'instagram-feed/frontend.js';
  wp_enqueue_script(
    'essential-blocks-instagram-feed-frontend',
    plugins_url($frontend_js, __FILE__),
    array( "jquery","wp-editor"),
    true
  );

	register_block_type(
        'essential-blocks/instagram-feed', 
        array(
			'editor_script' => 'instagram-feed-block-editor',
			'editor_style'  => 'instagram-feed-block-editor',
			'style'         => 'instagram-feed-block',
            'render_callback' => 'essential_blocks_instagram_render_callback',
            'attributes' => array(
              'token' => array(
                'type' => 'string',
                'default' => '',
              ),
              'columns' => array(
                'type' => 'number',
                'default' => "4",
              ),
              'numberOfImages' => array(
                'type' => 'number',
                'default' => 4,
              ),
              'gridGap' => array(
                'type' => 'number',
                'default' => 0,
              ),
              'thumbs' => array(
                'type' => 'array',
                'default' => [],
              ),
              'backgroundColor' => array(
                'type' => 'string',
                'default' => 'transparent',
              ),
              'borderRadius' => array(
                'type' => 'number',
                'default' => 0,
              ),
              'hasEqualImages' => array(
                'type' => 'boolean',
                'default' => false,
              ),
              'showCaptions' => array(
                'type' => 'boolean',
                'default' => false,
              ),
            ),
        )
    );
}
add_action( 'init', 'instagram_feed_block_init' );

