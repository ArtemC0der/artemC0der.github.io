<?php

namespace WP_Table_Builder_Pro\Inc\Admin\Managers;

use DOMDocument;
use DOMXPath;
use WP_Table_Builder\Inc\Admin\Controls\Control_Local_Dev_File;
use WP_Table_Builder\Inc\Admin\Managers\Settings_Manager;
use WP_Table_Builder\Inc\Common\Traits\Ajax_Response;
use WP_Table_Builder\Inc\Common\Traits\Singleton_Trait;
use WP_Table_Builder_Pro\Inc\Admin\Controls\Dev_Local_Files_Control;
use function add_action;
use function add_filter;

/**
 * Class Dev_Local_Files_Manager.
 *
 * Class for handling necessary adjustment to tables where plugin related assets are used.
 * @package WP_Table_Builder_Pro\Inc\Admin\Managers
 */
class Dev_Local_Files_Manager {
	// use singleton trait mainly to use ajax response trait
	use Singleton_Trait;

	// use ajax response trait
	use Ajax_Response;

	/**
	 * Ajax action name.
	 */
	const AJAX_ACTION = 'devLocalFiles';

	/**
	 * Initialize and startup manager.
	 */
	public static function init() {
		add_filter( 'wp-table-builder/filter/team_prebuilt_tables', [ __CLASS__, 'team_prebuilt_tables' ], 10, 1 );
		add_action( 'wp_ajax_' . self::AJAX_ACTION, [ __CLASS__, 'get_local_files_ajax' ] );
	}

	/**
	 * Ajax endpoint for getting local plugin image files.
	 */
	public static function get_local_files_ajax() {
		$instance = static::get_instance();

		if ( current_user_can( Settings_Manager::ALLOWED_ROLE_META_CAP ) && check_ajax_referer( self::AJAX_ACTION, 'nonce', false ) ) {
			$local_images = Control_Local_Dev_File::get_plugin_images();

			$instance->append_response_data( $local_images, 'images' );

		} else {
			$instance->set_error( esc_html__( 'You are not authorized to use this ajax endpoint' ) );
		}

		$instance->send_json();
	}

	/**
	 * Assign correct urls to images in team made prebuilt tables.
	 *
	 * @param array $team_prebuilts team build prebuilt tables
	 *
	 * @return array filtered tables
	 */
	public static function team_prebuilt_tables( $team_prebuilts ) {
		// use each prebuilt as reference to enable changes
		foreach ( $team_prebuilts as &$prebuilt ) {
			$content = $prebuilt['content'];

			// check if current prebuilt has local plugin image file
			if ( strpos( $content, Dev_Local_Files_Control::DEV_LOCAL_DATASET_ID_HTML ) ) {

				// get all plugin local images
				$local_plugin_images = Control_Local_Dev_File::get_plugin_images();

				$dom_handler = new DOMDocument();
				@$dom_handler->loadHTML( $content, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD | LIBXML_NOWARNING | LIBXML_NOERROR );

				$dom_query = new DOMXPath( $dom_handler );

				$data_id = Dev_Local_Files_Control::DEV_LOCAL_DATASET_ID_HTML;

				// get image containers
				$image_containers = $dom_query->query( "//div[@$data_id]" );

				// key for deciding whether to update entire prebuilt or not
				$local_image_found = false;

				for ( $i = 0; $i < $image_containers->length; $i ++ ) {
					$container         = $image_containers->item( $i );
					$local_plugin_file = $container->getAttribute( $data_id );

					// continue if local file is not empty
					if ( ! empty( $local_plugin_file ) ) {
						$image = $container->getElementsByTagName( 'img' )->item( 0 );
						// extra check to make sure there is file with that name in local plugin images
						if ( array_key_exists( $local_plugin_file, $local_plugin_images ) ) {
							$image->setAttribute( 'src', $local_plugin_images[ $local_plugin_file ] );
							$local_image_found = true;
						}
					}
				}

				// update content of prebuilt if necessary
				if ( $local_image_found ) {
					$prebuilt['content'] = $dom_handler->saveHTML();
				}
			}
		}

		return $team_prebuilts;
	}

}
