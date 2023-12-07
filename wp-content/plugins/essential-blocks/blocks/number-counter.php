<?php

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */


function counter_block_init()
{
	// Skip block registration if Gutenberg is not enabled/merged.
	if (!function_exists('register_block_type')) {
		return;
	}
	$dir = dirname(__FILE__);

	$index_js = 'number-counter/index.js';
	wp_register_script(
		'number-counter-block-editor',
		plugins_url($index_js, __FILE__),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
		),
		filemtime("$dir/$index_js")
	);

	$frontend_js = 'number-counter/frontend/index.js';
	wp_register_script(
		'essential-blocks-number-counter-frontend',
		plugins_url($frontend_js, __FILE__),
		array("jquery"),
		filemtime("$dir/$frontend_js"),
		true
	);


	register_block_type('essential-blocks/number-counter', array(
		'editor_script' => 'number-counter-block-editor',
		'render_callback' => function ($attribs, $content) {
			if (!is_admin()) {
				wp_enqueue_script('essential-blocks-number-counter-frontend');
			}
			return $content;
		}
	));
}
add_action('init', 'counter_block_init');
