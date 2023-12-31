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
function button_block_init() {
	// Skip block registration if Gutenberg is not enabled/merged.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}
	$dir = dirname( __FILE__ );

	$index_js = 'button/index.js';
	wp_register_script(
		'button-block-editor',
		plugins_url( $index_js, __FILE__ ),
		array(
			'wp-blocks',
      'wp-editor',
			'wp-i18n',
			'wp-element',
		),
		filemtime( "$dir/$index_js" )
	);

	$editor_css = 'button/editor.css';
	wp_register_style(
		'button-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'button/style.css';
	wp_register_style(
		'button-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type( 'essential-blocks/button', array(
		'editor_script' => 'button-block-editor',
		'editor_style'  => 'button-block-editor',
		'style'         => 'button-block',
	) );
}
add_action( 'init', 'button_block_init' );
