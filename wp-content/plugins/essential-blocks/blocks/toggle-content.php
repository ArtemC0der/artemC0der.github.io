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
function toggle_content_block_init() {
	// Skip block registration if Gutenberg is not enabled/merged.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}
	$dir = dirname( __FILE__ );

	$index_js = 'toggle-content/index.js';
	wp_register_script(
		'toggle-content-block-editor',
		plugins_url( $index_js, __FILE__ ),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
		),
		filemtime( "$dir/$index_js" )
	);

	$editor_css = 'toggle-content/editor.css';
	wp_register_style(
		'toggle-content-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'toggle-content/style.css';
	wp_register_style(
		'toggle-content-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);


  $frontend_js = 'toggle-content/frontend.js';
  wp_enqueue_script(
    'essential-blocks-toggle-content-frontend',
    plugins_url($frontend_js, __FILE__),
    array( "jquery","wp-editor"),
    true
  );

	register_block_type( 'essential-blocks/toggle-content', array(
		'editor_script' => 'toggle-content-block-editor',
		'editor_style'  => 'toggle-content-block-editor',
		'style'         => 'toggle-content-block',
	) );
}
add_action( 'init', 'toggle_content_block_init' );
