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
function countdown_block_init()
{
	// Skip block registration if Gutenberg is not enabled/merged.
	if (!function_exists('register_block_type')) {
		return;
	}
	$dir = dirname(__FILE__);

	$index_js = 'countdown/index.js';
	wp_register_script(
		'countdown-block-editor',
		plugins_url($index_js, __FILE__),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
		),
		filemtime("$dir/$index_js")
	);


	$frontend_js = 'countdown/frontend/index.js';
	wp_register_script(
		'countdown-block',
		plugins_url($frontend_js, __FILE__),
		array("jquery", "wp-editor"),
		filemtime("$dir/$frontend_js"),
		true
	);

	register_block_type('essential-blocks/countdown', array(
		'editor_script' => 'countdown-block-editor',
		'render_callback' => function ($attribs, $content) {
			if (!is_admin()) {
				wp_enqueue_script('countdown-block');
			}
			return $content;
		}
	));
}
add_action('init', 'countdown_block_init');
