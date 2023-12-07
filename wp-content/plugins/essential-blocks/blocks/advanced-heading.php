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
function advanced_heading_block_init() {
	// Skip block registration if Gutenberg is not enabled/merged.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}
	$dir = dirname( __FILE__ );

	$index_js = 'advanced-heading/index.js';
	wp_register_script(
		'advanced-heading-block-editor',
		plugins_url( $index_js, __FILE__ ),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
		),
		filemtime( "$dir/$index_js" )
	);

	$editor_css = 'advanced-heading/editor.css';
	wp_register_style(
		'advanced-heading-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'advanced-heading/style.css';
	wp_register_style(
		'advanced-heading-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type( 'essential-blocks/advanced-heading', array(
		'editor_script' => 'advanced-heading-block-editor',
		'editor_style'  => 'advanced-heading-block-editor',
		'style'         => 'advanced-heading-block',
	) );
}
add_action( 'init', 'advanced_heading_block_init' );
