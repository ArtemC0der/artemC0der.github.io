<?php

namespace WP_Table_Builder_Pro\Inc\Admin\Managers;

use WP_Table_Builder\Inc\Admin\Managers\Screen_Options_Manager;
use function add_action;
use function add_filter;
use function checked;
use function esc_attr;
use function esc_textarea;


// if called directly, abort
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Class Prebuilt_Screen_Options
 *
 * Class for adding screen options related to prebuilt tables.
 *
 * @package WP_Table_Builder_Pro\Inc\Admin\Managers
 */
class Prebuilt_Screen_Options {
	/**
	 * General name for options.
	 * Necessary prebuilt related ids can be prefixed with it.
	 * @var string
	 */
	public $options_name;

	/**
	 * Options array.
	 * @var array
	 */
	public $options;

	/**
	 * Settings for the screen options.
	 * @var array
	 */
	public $settings;

	/**
	 * Screen options label.
	 * @var string
	 */
	public $label;

	/**
	 * Prebuilt_Screen_Options constructor.
	 *
	 * @param array $options options array
	 */
	public function __construct( $options ) {
		$this->options      = $options;
		$this->options_name = array_keys( $this->options )[0];
		$this->settings     = $this->options[ $this->options_name ]['settings'];
		$this->label        = $this->options[ $this->options_name ]['label'];

		add_filter( 'wp-table-builder/filter/screen_options', [ $this, 'screen_options' ] );
		add_action( 'wp-table-builder/action/render_screen_settings', [ $this, 'prebuilt_screen_fieldset' ], 10, 1 );
	}

	/**
	 * Add prebuilt screen options to sent ones.
	 *
	 * @param array $options screen options
	 *
	 * @return array screen options array
	 */
	public function screen_options( $options ) {
		return array_merge( $options, $this->options );
	}

	/**
	 * Prebuilt screen options form fieldset
	 *
	 * @param Screen_Options_Manager $screen_options_manager screen options manager instance
	 */
	public function prebuilt_screen_fieldset( $screen_options_manager ) {
		?>
        <fieldset class="metabox-prefs">
            <legend><?php echo $this->label; ?></legend>
			<?php $this->prepare_options( $screen_options_manager ); ?>
        </fieldset>
		<?php
	}

	/**
	 * Prepare options for display.
	 *
	 * @param Screen_Options_Manager $screen_options_manager screen options manager instance
	 */
	protected function prepare_options( $screen_options_manager ) {
		foreach ( $this->settings as $option => $values ) {
			$this->render_option( $option, $values['title'], $screen_options_manager );
		}
	}

	/**
	 * Display a single option.
	 *
	 * @param string $option options name
	 * @param string $title option title
	 * @param Screen_Options_Manager $screen_options_manager screen options manager instance
	 */
	protected function render_option( $option, $title, $screen_options_manager ) {
		$id = $this->options_name . '_' . $option;

		$checked = $screen_options_manager->get_saved_screen_option( $option, 'table_types' );

		$checked = $checked !== null && $checked === 'on';


		$sprint_base = '<label for="%s"><input type="checkbox" id="%s" name="%s[%s][%s]" ' . checked( $checked, true, false ) . '>%s</label>';

		printf( $sprint_base, esc_attr( $id ), esc_attr( $id ), esc_attr( $screen_options_manager->options_id ), esc_textarea( 'table_types' ), esc_textarea( $option ), $title );
	}
}
