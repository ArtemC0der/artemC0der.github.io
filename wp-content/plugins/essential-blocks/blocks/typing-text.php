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
function typing_text_block_init() {
	// Skip block registration if Gutenberg is not enabled/merged.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}
	$dir = dirname( __FILE__ );

	$index_js = 'typing-text/index.js';
	wp_register_script(
		'typing-text-block-editor',
		plugins_url( $index_js, __FILE__ ),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
		),
		filemtime( "$dir/$index_js" )
	);

	$editor_css = 'typing-text/editor.css';
	wp_register_style(
		'typing-text-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'typing-text/style.css';
	wp_register_style(
		'typing-text-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

  $frontend_js = 'typing-text/frontend.js';
  wp_enqueue_script(
    'essential-blocks-typing-text-frontend',
    plugins_url($frontend_js, __FILE__),
    array( "jquery","wp-editor"),
    true
  );

	register_block_type( 'essential-blocks/typing-text', array(
		'editor_script' => 'typing-text-block-editor',
		'editor_style'  => 'typing-text-block-editor',
		'style'         => 'typing-text-block',
	) );
}
add_action( 'init', 'typing_text_block_init' );
