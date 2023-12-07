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
function call_to_action_block_init() {
	// Skip block registration if Gutenberg is not enabled/merged.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}
	$dir = dirname( __FILE__ );

	$index_js = 'call-to-action/index.js';
	wp_register_script(
		'call-to-action-block-editor',
		plugins_url( $index_js, __FILE__ ),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
		),
		filemtime( "$dir/$index_js" )
	);

	$editor_css = 'call-to-action/editor.css';
	wp_register_style(
		'call-to-action-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'call-to-action/style.css';
	wp_register_style(
		'call-to-action-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

    wp_enqueue_script(
        'essential-blocks-button-frontend',
        plugins_url("blocks/button/frontend.js", dirname(__FILE__)),
        array( "jquery","wp-editor"),
        true
    );

  $frontend_js = 'call-to-action/frontend.js';
  wp_enqueue_script(
    'essential-blocks-cta-frontend',
    plugins_url($frontend_js, __FILE__),
    array( "jquery","wp-editor"),
    true
  );

	register_block_type( 'essential-blocks/call-to-action', array(
		'editor_script' => 'call-to-action-block-editor',
		'editor_style'  => 'call-to-action-block-editor',
		'style'         => 'call-to-action-block',
	) );
}
add_action( 'init', 'call_to_action_block_init' );
