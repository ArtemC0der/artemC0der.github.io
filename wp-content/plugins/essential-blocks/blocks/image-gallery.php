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
function image_gallery_block_init() {
	// Skip block registration if Gutenberg is not enabled/merged.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}
	$dir = dirname( __FILE__ );

	$index_js = 'image-gallery/index.js';
	wp_register_script(
		'image-gallery-block-editor',
		plugins_url( $index_js, __FILE__ ),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
		),
		filemtime( "$dir/$index_js" )
	);

	$editor_css = 'image-gallery/editor.css';
	wp_register_style(
		'image-gallery-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'image-gallery/style.css';
	wp_register_style(
		'image-gallery-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

  $frontend_js = 'image-gallery/frontend.js';
  wp_enqueue_script(
    'essential-blocks-image-gallery-frontend',
    plugins_url($frontend_js, __FILE__),
    array( "jquery","wp-editor" ),
    true
  );


	register_block_type( 'essential-blocks/image-gallery', array(
		'editor_script' => 'image-gallery-block-editor',
		'editor_style'  => 'image-gallery-block-editor',
		'style'         => 'image-gallery-block',
	) );
}
add_action( 'init', 'image_gallery_block_init' );
