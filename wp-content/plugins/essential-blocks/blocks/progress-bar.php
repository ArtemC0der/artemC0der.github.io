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
function progress_bar_block_init() {
	// Skip block registration if Gutenberg is not enabled/merged.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}
	$dir = dirname( __FILE__ );

	$index_js = 'progress-bar/index.js';
	wp_register_script(
		'progress-bar-block-editor',
		plugins_url( $index_js, __FILE__ ),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
		),
		filemtime( "$dir/$index_js" )
	);

	$editor_css = 'progress-bar/editor.css';
	wp_register_style(
		'progress-bar-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'progress-bar/style.css';
	wp_register_style(
		'progress-bar-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	$progress_bar_js = 'progress-bar/assets/js/progress-bars.js';
	wp_register_script( 
		'eb-progress-bar', 
		plugins_url($progress_bar_js, __FILE__ ),
		array(),
		filemtime("$dir/$progress_bar_js"),
		true
	);

	register_block_type( 'essential-blocks/progress-bar', array(
		'editor_script' => 'progress-bar-block-editor',
		'editor_style'  => 'progress-bar-block-editor',
		'style'         => 'progress-bar-block',
		'render_callback' => function( $attribs, $content ) {
			if( !is_admin() ) {
			  wp_enqueue_script( 'eb-progress-bar' );
			}
		  return $content;
	  }
	) );
}
add_action( 'init', 'progress_bar_block_init' );
