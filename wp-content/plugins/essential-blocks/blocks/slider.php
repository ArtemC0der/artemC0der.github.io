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
function slider_block_init() {
	// Skip block registration if Gutenberg is not enabled/merged.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}
	$dir = dirname( __FILE__ );

	$index_js = 'slider/index.js';
	wp_register_script(
		'slider-block-editor',
		plugins_url( $index_js, __FILE__ ),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
		),
		filemtime( "$dir/$index_js" )
	);

	$editor_css = 'slider/editor.css';
	wp_register_style(
		'slider-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'slider/style.css';
	wp_register_style(
		'slider-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

  $frontend_js = 'slider/frontend.js';
  wp_enqueue_script(
    'essential-blocks-slider-frontend',
    plugins_url( $frontend_js, __FILE__),
    array( "jquery","wp-editor"),
    true
  );

	register_block_type( 'essential-blocks/slider', array(
		'editor_script' => 'slider-block-editor',
		'editor_style'  => 'slider-block-editor',
		'style'         => 'slider-block',
	) );
}
add_action( 'init', 'slider_block_init' );
