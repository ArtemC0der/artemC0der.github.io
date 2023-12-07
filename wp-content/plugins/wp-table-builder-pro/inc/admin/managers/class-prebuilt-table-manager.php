<?php

namespace WP_Table_Builder_Pro\Inc\Admin\Managers;

use DOMDocument;
use DOMElement;
use WP_Query;
use WP_Table_Builder\Inc\Admin\Admin_Menu;
use WP_Table_Builder as NS;
use WP_Table_Builder\Inc\Admin\Managers\Settings_Manager;
use WP_Table_Builder\Inc\Common\Traits\Ajax_Response;
use WP_Table_Builder\Inc\Core\Init;
use WP_Table_Builder_Pro as WPTBNS;
use WP_Table_Builder\Inc\Admin\Base\Element_Base_Object;
use WP_Table_Builder\Inc\Admin\Controls\Control_Section_Group_Collapse;
use WP_Table_Builder\Inc\Admin\Managers\Controls_Manager;
use function absint;
use function add_action;
use function add_post_meta;
use function apply_filters;
use function check_ajax_referer;
use function current_user_can;
use function delete_post_meta;
use function get_current_screen;
use function get_option;
use function get_post_meta;
use function get_the_title;
use function request_filesystem_credentials;
use function sanitize_text_field;
use function update_option;
use function update_post_meta;
use function wp_delete_post;
use function wp_enqueue_script;
use function wp_localize_script;
use function wp_verify_nonce;

// if called directly, abort process
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Class Prebuilt_Table_Manager.
 *
 * Manager class for prebuilt tables.
 *
 * @package WP_Table_Builder_Pro\Inc\Admin\Managers
 */
class Prebuilt_Table_Manager {
	use Ajax_Response;

	/**
	 * Control id for prebuilt enable/disable operations on frontend.
	 * @var string
	 */
	public $prebuilt_enable_control_id = 'enablePrebuilt';

	/**
	 * Prebuilt fav ajax constant.
	 */
	const PREBUILT_FAV = '_wptb_prebuilt_fav_';

	/**
	 * Prebuilt delete ajax constant.
	 */
	const PREBUILT_DELETE = '_wptb_prebuilt_delete_';

	/**
	 * Prebuilt delete ajax constant.
	 */
	const PREBUILT_DEV_MODE = '_wptb_prebuilt_dev_mode_';

	/**
	 * id prefix for team built tables.
	 */
	const TEAM_PREBUILD_PREFIX = 'wptb_team';

	/**
	 * Option that holds favs of team prepared prebuilts.
	 */
	const TEAM_PREBUILD_FAV_OPTION = 'wptb_team_favs';

	/**
	 * File path for xml prebuilt tables
	 * @var string
	 */
	protected $prebuilt_xml_path;

	/**
	 * File path for csv prebuilt tables.
	 * @var string
	 */
	protected $prebuilt_csv_path;

	/**
	 * CSV headers.
	 * @var array
	 */
	protected $prebuilt_csv_headers;

	/**
	 * Author name for team made prebuilts.
	 */
	const TEAM_AUTHOR_NAME = 'WPTB Team';

	/**
	 * Prebuilt_Table_Manager constructor.
	 */
	public function __construct() {
		$this->prebuilt_xml_path = WPTBNS\WP_TABLE_BUILDER_PRO_DIR . 'assets/prebuilts/prebuilts.xml';
		$this->prebuilt_csv_path = WPTBNS\WP_TABLE_BUILDER_PRO_DIR . 'assets/prebuilts/prebuilts.csv';

		$this->prebuilt_csv_headers = [ 'id', 'name', 'author', 'content' ];

		add_action( 'admin_enqueue_scripts', [ $this, 'admin_scripts' ], 1, 1 );
		add_action( 'wp-table-builder/table_settings_registered', [ $this, 'prebuilt_controls' ], 10, 1 );
		add_action( 'wp_ajax_' . self::PREBUILT_FAV, [ $this, 'prebuilt_fav' ] );
		add_action( 'wp_ajax_' . self::PREBUILT_DELETE, [ $this, 'prebuilt_delete' ] );

		add_filter( 'wp-table-builder/get_tables_args', [ $this, 'table_listing' ] );
		add_filter( 'wp-table-builder/record_count', [ $this, 'table_listing' ] );

		add_action( 'wp-table-builder/new_table_saved', [ $this, 'table_saved' ], 10, 2 );
		add_action( 'wp-table-builder/table_edited', [ $this, 'table_edited' ], 10, 2 );

		// removed since tab targeting is removed from prebuilts
//		add_filter( 'wp-table-builder/table_content', [ $this, 'table_content' ], 10, 2 );

		add_filter( 'wp-table-builder/title_listing', [ $this, 'title_listing' ], 10, 2 );

		//@deprecated
		// in favor of showing shortcode for user created prebuilt tables
//		add_filter( 'wp-table-builder/shortcode_listing', [ $this, 'shortcode_listing' ], 10, 2 );

		add_filter( 'wp-table-builder/new_table_id', [ $this, 'filter_table_id' ], 10, 2 );

		$this->prebuilt_screen_options = new Prebuilt_Screen_Options( $this->screen_options() );
	}


	/**
	 * Generate unique id for team prebuilt tables.
	 *
	 * @param int $length length of id
	 *
	 * @return string generated id
	 */
	protected function generate_team_prebuilt_id( $length ) {
		$chars_array = array_merge( range( 0, 9 ), range( 'a', 'z' ) );

		$id = '';

		for ( $i = 0; $i < $length; $i ++ ) {
			$id .= $chars_array[ array_rand( $chars_array ) ];
		}

		return self::TEAM_PREBUILD_PREFIX . '_' . $id;
	}

	/**
	 * Filter out new table's id.
	 *
	 * @param string $id raw table id
	 * @param object $params parameter object
	 *
	 * @return string table id
	 */
	public function filter_table_id( $id, $params ) {
		if ( $this->basic_csv_security_check( $params ) ) {
			$params->raw_id = $id;
			if ( property_exists( $params, 'prebuilt_id' ) ) {
				return $params->prebuilt_id;
			} else {
				return $this->generate_team_prebuilt_id( 5 );
			}
		}

		return $id;
	}

	/**
	 * Get screen options.
	 *
	 * @return array screen options array
	 */
	protected function screen_options() {
		return [
			'table_types' => [
				'label'    => esc_html__( 'Table types', 'wp-table-builder-pro' ),
				'settings' => [
					'normal'    => [
						'title' => esc_html__( 'Normal', 'wp-table-builder-pro' ),
						'value' => 'on'
					],
					'prebuilts' => [
						'title' => esc_html__( 'Prebuilts', 'wp-table-builder-pro' ),
						'value' => 'on'
					]
				]
			]
		];
	}

	/**
	 * Find out if table with the given id is a prebuilt table or not.
	 *
	 * @param int $id
	 *
	 * @return bool if table is prebuilt or not
	 */
	protected function is_table_prebuilt( $id ) {
		$prebuilt_status = get_post_meta( $id, '_wptb_prebuilt_', true );

		return filter_var( $prebuilt_status, FILTER_VALIDATE_BOOLEAN ) === true;
	}

	/**
	 * Shortcode listing filter to filter shortcodes at wptb-overview table listing.
	 *
	 * @param string $shortcode shortcode presentation of the table
	 * @param int $table_id table id
	 *
	 * @return string table shortcode
	 */
	public function shortcode_listing( $shortcode, $table_id ) {
		if ( $this->is_table_prebuilt( $table_id ) ) {
			return 'Prebuilt';
		}

		return $shortcode;
	}

	/**
	 * Title listing hook callback for wptb-overview table listing
	 *
	 * @param string $title post title
	 * @param int $table_id post id
	 *
	 * @return string table title
	 */
	public function title_listing( $title, $table_id ) {

		if ( $this->is_table_prebuilt( $table_id ) ) {
			if ( filter_var( preg_match( '/^Table \(ID #\b.+\)$/', $title ), FILTER_VALIDATE_BOOLEAN ) === true ) {
				$title = preg_replace( '/^(Table)(.+)$/', 'Prebuilt$2', $title );
			}

			$prefix = '<span class="dashicons dashicons-media-spreadsheet"></span>';

			return $prefix . ' ' . $title;
		}

		return $title;
	}

	/**
	 * Filter and manipulate table content before save/edit of table.
	 * This hook will be mainly used for deleting any left over prebuilt mark indicator elements for generated tables.
	 *
	 * @param string $content table content
	 * @param object $params parameter object
	 *
	 * @return string table content
	 */
	public function table_content( $content, $params ) {
		// only filter out non prebuilt tables
		if ( ! property_exists( $params, 'prebuilt' ) || filter_var( $params->prebuilt, FILTER_VALIDATE_BOOLEAN ) === false ) {
			$dom_loader = new DOMDocument();
			@$dom_loader->loadHTML( $content, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD | LIBXML_NOWARNING | LIBXML_NOERROR );
			$div_elements    = $dom_loader->getElementsByTagName( 'div' );
			$indicator_nodes = [];
			for ( $i = 0; $i < $div_elements->length; $i ++ ) {
				$current_element = $div_elements->item( $i );

				// find div elements with the prebuilt indicator class name
				if ( strpos( $current_element->getAttribute( 'class' ), 'wptb-prebuilt-mark-indicator' ) !== false ) {
					$indicator_nodes[] = $current_element;
				}
			}

			foreach ( $indicator_nodes as $indicator ) {
				$indicator->parentNode->removeChild( $indicator );
			}

			return $dom_loader->saveHTML();
		}

		// return unfiltered content
		return $content;
	}

	/**
	 * Table edited action hook callback.
	 *
	 * @param int $id post id
	 * @param object $params parameter object
	 */
	public function table_edited( $id, $params ) {
		// if table is marked as prebuilt, updated its meta or delete its meta accordingly
		if ( property_exists( $params, 'prebuilt' ) ) {
			update_post_meta( absint( $id ), '_wptb_prebuilt_', true );
		} else {
			delete_post_meta( absint( $id ), '_wptb_prebuilt_' );
		}
	}

	/**
	 * New table saved action hook callback.
	 *
	 * @param int $id table id
	 * @param object $params parameter object
	 */
	public function table_saved( $id, $params ) {
		if ( $this->basic_csv_security_check( $params ) ) {
			// delete the table first to avoid duplications
			$this->csv_prebuilt_delete( $id );
			$this->save_table_as_csv( $id, $params );
		} else {
			// if table is marked as prebuilt, updated its meta or delete its meta accordingly
			if ( property_exists( $params, 'prebuilt' ) ) {
				add_post_meta( $id, '_wptb_prebuilt_', $params->prebuilt );
			} else {
				delete_post_meta( $id, '_wptb_prebuilt_' );
			}
		}
	}

	/**
	 * Basic security check for prebuilt csv tables.
	 *
	 * @param object $params parameter object
	 *
	 * @return bool security passed or not
	 */
	protected function basic_csv_security_check( $params ) {
		if ( property_exists( $params, 'saveAsCSV' ) && property_exists( $params, 'saveAsCSVNonce' ) ) {
			if ( wp_verify_nonce( $params->saveAsCSVNonce, self::PREBUILT_DEV_MODE ) ) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Append table to csv file.
	 *
	 * @param string $id table id
	 * @param object $params parameter object
	 */
	protected function save_table_as_csv( $id, $params ) {
		$all_prebuilts = $this->read_prebuilts( $this->prebuilt_csv_path );

		$title             = $params->title;
		$highest_increment = array_reduce( array_values( $all_prebuilts ), function ( $carry, $item ) use ( $title ) {
			$match_groups = [];
			$regexp       = "/^(?<prebuilt_title>$title)(?:\\s)?(?<prebuilt_inc_number>\\d+)?$/";
			$match        = preg_match( $regexp, $item['title'], $match_groups );

			if ( filter_var( $match, FILTER_VALIDATE_BOOLEAN ) ) {

				if ( isset( $match_groups['prebuilt_inc_number'] ) ) {
					$inc_number = $match_groups['prebuilt_inc_number'];

					if ( $inc_number + 1 > $carry ) {
						$carry = $inc_number + 1;
					}
				} else if ( isset( $match_groups['prebuilt_title'] ) ) {
					$carry = 1;
				}
			}

			return $carry;
		}, 0 );

		$title_postfix = $highest_increment > 0 ? ' ' . $highest_increment : "";

		$prebuilt_array = [
			$id,
			$params->title . $title_postfix,
			self::TEAM_AUTHOR_NAME,
			get_post_meta( absint( $params->raw_id ), '_wptb_content_', true )
		];

		$this->save_as_csv( $prebuilt_array, $this->prebuilt_csv_path );

		wp_delete_post( absint( $params->raw_id ) );
	}

	/**
	 * Save table as csv to file.
	 *
	 * @param array $csv_array csv array
	 * @param string $target_path file path to target csv file
	 * @param string $mode file mode
	 * @param bool $multiline will write to more than one line or not
	 */
	protected function save_as_csv( $csv_array, $target_path, $mode = 'a', $multiline = false ) {
		$handler = fopen( $target_path, $mode );

		if ( $multiline ) {
			foreach ( $csv_array as $line ) {
				fputcsv( $handler, $line );
			}
		} else {
			fputcsv( $handler, $csv_array );
		}

		fclose( $handler );
	}

	/**
	 * Save table as xml
	 *
	 * @param int $id table id
	 * @param object $params parameter object
	 */
	protected function save_table_as_xml( $id, $params ) {
		if ( property_exists( $params, 'saveAsXML' ) && property_exists( $params, 'saveAsXMLNonce' ) ) {
			if ( wp_verify_nonce( $params->saveAsXMLNonce, self::PREBUILT_DEV_MODE ) ) {
				$this->save_as_xml( sanitize_text_field( $params->title ), get_post_meta( absint( $id ), '_wptb_content_', true ) );
			}
		} else {
			// if table is marked as prebuilt, updated its meta or delete its meta accordingly
			if ( property_exists( $params, 'prebuilt' ) ) {
				add_post_meta( $id, '_wptb_prebuilt_', $params->prebuilt );
			} else {
				delete_post_meta( $id, '_wptb_prebuilt_' );
			}
		}

	}

	/**
	 * Save prebuilt table to xml file.
	 *
	 * @param string $title table title
	 * @param string $content table content
	 */
	protected function save_as_xml( $title, $content ) {
		$creds = request_filesystem_credentials( site_url() . '/wp-admin/', '', true, false );

		if ( ! WP_Filesystem( $creds ) ) {
			return;
		}

		global $wp_filesystem;
		// if file doesn't exist, create a new one
		if ( ! $wp_filesystem->exists( $this->prebuilt_xml_path ) ) {

			$xml_base = <<< EOT
<?xml version="1.0" encoding="utf-8" ?>
<prebuilts important="copy the table html as it is to here in one line from database and don't reformat it like you do to a html element. Because reformats may add breaks and empty spaces which will broke tinyMCE initialization for the elements">
</prebuilts>
EOT;

			$xml_handler = new DOMDocument();
			$xml_handler->loadXML( $xml_base );

			$xml_handler->save( $this->prebuilt_xml_path );
		}

		$xml_handler = new DOMDocument();
		$xml_handler->load( $this->prebuilt_xml_path, LIBXML_NSCLEAN );

		$prebuilts        = $xml_handler->getElementsByTagName( 'prebuilts' )[0];
		$prebuilt_element = $this->create_xml_prebuilt( $title, self::TEAM_AUTHOR_NAME, $content, $xml_handler, $prebuilts );
		$prebuilts->appendChild( $prebuilt_element );

		$xml_handler->save( $this->prebuilt_xml_path );
	}

	/**
	 * Create prebuilt element for xml file.
	 *
	 * @param string $name table name
	 * @param string $author author name
	 * @param string $content table content
	 * @param DOMDocument $handler dom document handler
	 *
	 * @return DOMElement prebuilt element
	 */
	protected function create_xml_prebuilt( $name, $author, $content, $handler, $parent ) {
		$prebuilt = $handler->createElement( 'prebuilt' );
		$prebuilt->setAttribute( 'name', $name );
		$prebuilt->setAttribute( 'author', $author );
		$parent->appendChild( $prebuilt );

		$content_element = $handler->createElement( 'content' );
		$prebuilt->appendChild( $content_element );

		$content_fragment = $handler->createDocumentFragment();
		$content_fragment->appendXML( $content );

		$content_element->appendChild( $content_fragment );

		return $prebuilt;
	}

	/**
	 * Ajax endpoint for fav/unfav toggle operations for prebuilt tables.
	 */
	public function prebuilt_fav() {
		if ( current_user_can( Settings_Manager::ALLOWED_ROLE_META_CAP ) && check_ajax_referer( self::PREBUILT_FAV, 'nonce', false ) && isset( $_POST['id'] ) ) {
			$post_id = $_POST['id'];

			$current_fav = null;
			// fav operations for team prepared tables since they are saved as an xml file
			if ( substr( $post_id, 0, strlen( self::TEAM_PREBUILD_PREFIX ) ) === self::TEAM_PREBUILD_PREFIX ) {
				$team_favs = (array) get_option( self::TEAM_PREBUILD_FAV_OPTION, [] );

				if ( in_array( $post_id, $team_favs ) ) {
					$current_fav = true;
					$fav_index   = array_search( $post_id, $team_favs );

					unset( $team_favs[ $fav_index ] );
				} else {
					$current_fav = false;
					$team_favs[] = $post_id;
				}
				update_option( self::TEAM_PREBUILD_FAV_OPTION, $team_favs );

			} else {
				// fav operations for user created prebuilt tables
				$post_id     = absint( $_POST['id'] );
				$current_fav = filter_var( get_post_meta( $post_id, self::PREBUILT_FAV, true ), FILTER_VALIDATE_BOOLEAN );
				update_post_meta( $post_id, self::PREBUILT_FAV, ! $current_fav );
			}


			$this->set_message( ! $current_fav );
		} else {
			$this->set_error( esc_html__( 'there is a problem with the request, try again later', 'wp-table-builder-pro' ) );
		}

		$this->send_json();
	}

	/**
	 * Filter out prebuilt tables from table listing.
	 *
	 * @param array $params query parameters
	 *
	 * @return array filtered parameter array
	 */
	public function table_listing( $params ) {
		global $tables_overview;
		$current_screen = get_current_screen();

		if ( $current_screen->base === $tables_overview ) {
			$screen_options_manager = Init::instance()->screen_options_manager;

			$prebuilt_checked = $screen_options_manager->get_saved_screen_option( 'prebuilts', 'table_types' );
			$normal_checked   = $screen_options_manager->get_saved_screen_option( 'normal', 'table_types' );

			$prebuilt_checked = $prebuilt_checked !== null && $prebuilt_checked === 'on';
			$normal_checked   = $normal_checked !== null && $normal_checked === 'on';

			if ( ! isset( $params['meta_query'] ) ) {
				$params['meta_query'] = [];
			}

			$listing_arg            = [
				'key'     => '_wptb_prebuilt_',
				'compare' => $prebuilt_checked ? 'EXISTS' : 'NOT EXISTS'
			];
			$params['meta_query'][] = $listing_arg;

			if ( $normal_checked && $prebuilt_checked ) {
				$params['meta_query'] = [];
			} else if ( ! $normal_checked && ! $prebuilt_checked ) {
				$params['meta_query'][] = [ 'key' => 'a_key_that_will_never_exists', 'compare' => 'EXISTS' ];
			}
		}

		return $params;
	}

	/**
	 * WordPress admin enqueue script hook callback.
	 *
	 * @param string $hook menu hook
	 */
	public function admin_scripts( $hook ) {
		global $builder_tool_page;

		if ( $hook === $builder_tool_page ) {
			if ( ! isset( $_GET['table'] ) ) {
				$base_path       = 'inc/admin/js/WPTB_Generate.js';
				$script_dir_path = NS\WP_TABLE_BUILDER_DIR . $base_path;
				$script_dir_url  = NS\WP_TABLE_BUILDER_URL . $base_path;

				// enqueue pro version of the file with same handler name but with a higher priority to disable loading of normal version

				wp_enqueue_script( Admin_Menu::$generate_menu_script_hook, $script_dir_url, [], WPTBNS\WP_TABLE_BUILDER_PRO_VERSION, true );

				// query arguments
				$prebuilt_listing_args = [
					'post_type'      => 'wptb-tables',
					'posts_per_page' => '-1',
					'meta_query'     => [
						[
							'key'     => '_wptb_prebuilt_',
							'value'   => '1',
							'compare' => '='
						]
					],
					'fields'         => 'ids'
				];

				$prebuilt_table_ids = ( new WP_Query( $prebuilt_listing_args ) )->posts;
				$prebuilt_tables    = $this->prepare_prebuilt_object( $prebuilt_table_ids );

				$team_prebuilt_tables = $this->read_prebuilts( $this->prebuilt_csv_path );

				// team prebuilt tables filter
				$team_prebuilt_tables = apply_filters( 'wp-table-builder/filter/team_prebuilt_tables', $team_prebuilt_tables );

				$prebuilt_tables = $prebuilt_tables + $team_prebuilt_tables;

				$pro_data = [
					'version'              => 'pro',
					'prebuiltTables'       => $prebuilt_tables,
					'teamTables'           => $team_prebuilt_tables,
					'teamBuildTablePrefix' => self::TEAM_PREBUILD_PREFIX,
					'security'             => [
						'ajaxUrl'      => admin_url( 'admin-ajax.php' ),
						'favNonce'     => wp_create_nonce( self::PREBUILT_FAV ),
						'favAction'    => self::PREBUILT_FAV,
						'deleteNonce'  => wp_create_nonce( self::PREBUILT_DELETE ),
						'deleteAction' => self::PREBUILT_DELETE,
						'devModeNonce' => wp_create_nonce( self::PREBUILT_DEV_MODE )
					],
					'icons'                => [
						'favIcon'    => Init::instance()->get_icon_manager()->get_icon( 'star' ),
						'deleteIcon' => Init::instance()->get_icon_manager()->get_icon( 'trash-alt' ),
						'checkIcon'  => Init::instance()->get_icon_manager()->get_icon( 'check-circle' ),
						'crossIcon'  => Init::instance()->get_icon_manager()->get_icon( 'times-circle' ),
					]
				];
				wp_localize_script( Admin_Menu::$generate_menu_script_hook, 'wptbGenerateMenuProData', $pro_data );
			}

			// enqueue frontend prebuilt js
			$prebuilt_base_path = 'inc/admin/js/WPTB_Prebuilt.js';
			$prebuilt_dir_path  = WPTBNS\WP_TABLE_BUILDER_PRO_DIR . $prebuilt_base_path;
			$prebuilt_dir_url   = WPTBNS\WP_TABLE_BUILDER_PRO_URL . $prebuilt_base_path;
			$script_id          = 'wptb_pro_prebuilt_js';

			wp_enqueue_script( $script_id, $prebuilt_dir_url, [], filemtime( $prebuilt_dir_path ), true );

			// prebuilt menu data
			$prebuilt_data = [
				'tableQuery'           => '.wptb-preview-table',
				'enableControlId'      => $this->prebuilt_enable_control_id,
				'teamBuildTablePrefix' => self::TEAM_PREBUILD_PREFIX,
				'strings'              => [
					'tabControl' => esc_html__( 'tab control', 'wp-table-builder-pro' )
				],
				'icons'                => [
					'stopCircle' => Init::instance()->get_icon_manager()->get_icon( 'stop-circle', false ),
					'syncAlt'    => Init::instance()->get_icon_manager()->get_icon( 'sync-alt', false )
				],
				'security'             => [
					'devModeNonce' => wp_create_nonce( self::PREBUILT_DEV_MODE )
				]
			];

			wp_localize_script( $script_id, 'wptbPrebuiltData', $prebuilt_data );
		}
	}

	/**
	 * Prepare a prebuilt table array.
	 *
	 * @param array $ids an array of prebuilt table ids
	 *
	 * @return array an array of prebuilt tables
	 */
	protected function prepare_prebuilt_object( $ids ) {
		return array_reduce( $ids, function ( $carry, $id ) {
			$carry[ $id ] = [];

			$post_title = get_the_title( $id );

			if ( empty( $post_title ) ) {
				$post_title = sprintf( 'Prebuilt (ID #%d)', $id );
			}

			$carry[ $id ]['title']   = $post_title;
			$carry[ $id ]['content'] = get_post_meta( $id, '_wptb_content_', true );
			$carry[ $id ]['fav']     = filter_var( get_post_meta( $id, self::PREBUILT_FAV, true ), FILTER_VALIDATE_BOOLEAN );

			return $carry;
		}, [] );
	}

	/**
	 * Table setting element controls registered action hook callback.
	 *
	 * @param Element_Base_Object $context
	 */
	public function prebuilt_controls( $context ) {
		$prebuilt_controls = [
			$this->prebuilt_enable_control_id => [
				'label'     => esc_html__( 'Make current table prebuilt', 'wp-table-builder-pro' ),
				'type'      => Controls_Manager::TOGGLE,
				'selectors' => [
					'{{{data.container}}}' => [ 'data-wptb-prebuilt-table', '1', null ]
				]
			]
		];

		Control_Section_Group_Collapse::add_section( 'table_settings_prebuilt', esc_html__( 'prebuilt', 'wp-table-builder-pro' ), $prebuilt_controls, [
			$context,
			'add_control'
		], false, 'table' );
	}

	/**
	 * Read prebuilt tables csv file.
	 *
	 * @param string $target_path target path to prebuilt files
	 *
	 * @return array an array of pre saved prebuilt tables
	 */
	public function read_prebuilts( $target_path ) {
		return $this->read_csv( $target_path );
	}

	/**
	 * Read csv file.
	 *
	 * @param string $target_path target path to prebuilt files
	 *
	 * @return array an array of pre saved prebuilt tables
	 */
	protected function read_csv( $target_path ) {
		$ini_val = ini_get( 'auto_detect_line_endings' );

		if ( ! $ini_val ) {
			ini_set( 'auto_detect_line_endings', true );
		}

		$handler = fopen( $target_path, 'r' );

		// get header of csv file
		$headers = fgetcsv( $handler, 8000 );

		$csv = [];

		while ( ( $data = fgetcsv( $handler ) ) !== false ) {
			$new_row = [];
			foreach ( $headers as $i => $col_name ) {
				$new_row[ $col_name ] = $data[ $i ];
			}
			$csv[] = $new_row;
		}

		fclose( $handler );

		if ( ! $ini_val ) {
			ini_set( 'auto_detect_line_endings', false );
		}

		$return_array = [];
		foreach ( $csv as $prebuilt ) {
			$name                = $prebuilt['name'];
			$content             = $prebuilt['content'];
			$id                  = $prebuilt['id'];
			$fav                 = in_array( $id, (array) get_option( self::TEAM_PREBUILD_FAV_OPTION, [] ) );
			$return_array[ $id ] = [ 'title' => $name, 'content' => $content, 'fav' => $fav ];
		}

		return $return_array;
	}

	/**
	 * Read prebuilt tables xml file.
	 *
	 * @param string $target_path target path to prebuilt files
	 *
	 * @return array an array of pre saved prebuilt tables
	 */
	protected function read_xml( $target_path ) {
		$xml          = simplexml_load_file( $target_path );
		$return_array = [];

		foreach ( $xml->prebuilt as $prebuilt ) {
			$name    = (string) $prebuilt['name'];
			$content = $prebuilt->content->table->asXML();
			$id      = self::TEAM_PREBUILD_PREFIX . '_' . str_replace( ' ', '_', $name );

			$fav = in_array( $id, (array) get_option( self::TEAM_PREBUILD_FAV_OPTION, [] ) );

			$return_array[ $id ] = [ 'title' => $name, 'content' => $content, 'fav' => $fav ];
		}

		return $return_array;
	}

	/**
	 * Ajax endpoint for deleting prebuilt tables.
	 */
	public function prebuilt_delete() {
		if ( current_user_can( Settings_Manager::ALLOWED_ROLE_META_CAP ) && check_ajax_referer( self::PREBUILT_DELETE, 'nonce', false ) && isset( $_POST['id'] ) ) {
			$result      = false;
			$post_id     = absint( $_POST['id'] );
			$raw_post_id = $_POST['id'];

			// if necessary post parameters and nonce supplied, delete prebuilt from csv file
			if ( isset( $_POST['deleteCSV'] ) && isset( $_POST['devModeNonce'] ) ) {
				if ( check_ajax_referer( self::PREBUILT_DEV_MODE, 'devModeNonce', false ) ) {
					$result = $this->csv_prebuilt_delete( $raw_post_id );

				} else {
					$this->set_error( 'an error occurred while deleting your prebuilt table, try again later.' );
				}
				//else go for normal prebuilt table in database
			} else if ( get_post_meta( $post_id, '_wptb_prebuilt_', true ) === '1' ) {
				// delete post meta if the table is prebuilt to make it still available
				$result = delete_post_meta( $post_id, '_wptb_prebuilt_' );

				if ( $result ) {
					$this->change_prebuilt_status( $post_id, '0' );
				}
			}

			$this->set_message( $result === false ? false : ( $result === null ? false : true ) );

		} else {
			$this->set_error( 'an error occurred while deleting your prebuilt table, try again later.' );
			$this->set_message( false );
		}

		$this->send_json( true );
	}

	/**
	 * Change prebuilt status of a table content.
	 *
	 * @param int $id post id
	 * @param string $status status of prebuilt state, 0 for off, 1 for on
	 */
	protected function change_prebuilt_status( $id, $status ) {
		$content = get_post_meta( absint( $id ), '_wptb_content_', true );

		if ( $content ) {
			$dom_handler = new DOMDocument();
			@$dom_handler->loadHTML( $content, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD | LIBXML_NOWARNING | LIBXML_NOERROR );

			$table = $dom_handler->getElementsByTagName( 'table' )->item( 0 );
			$table->setAttribute( 'data-wptb-prebuilt-table', $status );

			$new_content = $dom_handler->saveHTML();

			update_post_meta( absint( $id ), '_wptb_content_', $new_content );
		}
	}

	/**
	 * Remove a prebuilt table from csv file.
	 *
	 * @param string $id csv id to delete
	 *
	 * @return bool delete operation result
	 */
	protected function csv_prebuilt_delete( $id ) {
		$csv_prebuilds = $this->read_csv( $this->prebuilt_csv_path );
		$ids           = array_keys( $csv_prebuilds );
		$id_found      = in_array( $id, $ids );

		if ( $id_found ) {
			unset( $csv_prebuilds[ $id ] );

			$save_array = array_reduce( array_keys( $csv_prebuilds ), function ( $carry, $id ) use ( $csv_prebuilds ) {
				$values  = $csv_prebuilds[ $id ];
				$new_row = [ $id, $values['title'], self::TEAM_AUTHOR_NAME, $values['content'] ];
				$carry[] = $new_row;

				return $carry;
			}, [] );

			array_unshift( $save_array, $this->prebuilt_csv_headers );

			$this->save_as_csv( $save_array, $this->prebuilt_csv_path, 'w', true );

			return true;
		} else {
			return false;
		}
	}
}
