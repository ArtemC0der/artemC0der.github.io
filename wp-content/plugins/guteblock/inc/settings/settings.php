<?php
/**
 * About Guteblock page
 *
 * @package Guteblock
 */

/**
 * Load About Guteblock styles in the admin
 *
 * @since 1.0.0
 * @param string $hook The current admin page.
 */
function guteblock_start_load_admin_scripts( $hook ) {
	
	if ( ! ( $hook === 'toplevel_page_guteblock' || $hook === 'guteblock_page_guteblock-plugin-settings') ) {
		return;
	}

	// About Guteblock javascript.
	wp_enqueue_script( 'guteblock-settings-script', plugins_url( 'settings/settings.js', dirname( __FILE__ ) ), array( 'jquery' ), '1.0.0', true );

	// About Guteblock styles.
	wp_register_style( 'guteblock-settings-style', plugins_url( 'settings/settings.css', dirname( __FILE__ ) ), false, '1.0.0' );
	wp_enqueue_style( 'guteblock-settings-style' );

}
add_action( 'admin_enqueue_scripts', 'guteblock_start_load_admin_scripts' );

function guteblock_getting_started_menu() {

	add_menu_page(
		__( 'Guteblock', 'guteblock' ),
		__( 'Guteblock', 'guteblock' ),
		'manage_options',
		'guteblock',
		'guteblock_getting_started_page',
		//'dashicons-layout'
		'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIzLjEuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA2NCA2NCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNjQgNjQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojQTBBNUFBO30KPC9zdHlsZT4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTUyLjcsMjIuNEw0MS42LDExLjRjLTUuOC01LjgtMTUuMi01LjgtMjEsMGwtOS4yLDkuMmMtNS44LDUuOC01LjgsMTUuMiwwLDIxbDExLjEsMTEuMWM1LjgsNS44LDE1LjIsNS44LDIxLDAKCWw5LjItOS4yQzU4LjUsMzcuNyw1OC41LDI4LjIsNTIuNywyMi40eiBNNDguNywzOS41bC04LjksOC45Yy0xLjgsMS45LTQuMSwyLjktNi43LDIuOWMtMC4xLDAtMC4xLDAtMC4yLDBjLTIuNSwwLTQuOS0xLTYuNy0yLjgKCUwxNS40LDM3LjdjLTMuNi0zLjYtMy43LTkuNC0wLjItMTMuMWMwLDAsMC4xLTAuMSwwLjEtMC4xbDktOWMzLjUtMy43LDkuNS0zLjksMTMuMy0wLjRjMCwwLDAsMCwwLjEsMC4xbDAuNywwLjYKCWMxLjcsMS42LDEuNyw0LjIsMC4xLDUuOGMtMS42LDEuNy00LjIsMS43LTUuOCwwLjFsLTAuNy0wLjZjLTAuNS0wLjQtMS4yLTAuNC0xLjYsMGMtMC4xLDAuMS0wLjEsMC4xLTAuMSwwLjFsLTksOQoJYy0wLjQsMC41LTAuNCwxLjIsMC4xLDEuNmwxMC45LDEwLjljMC4zLDAuMywwLjYsMC40LDAuOSwwLjRzMC42LTAuMSwwLjgtMC40YzAuMS0wLjEsMC4xLTAuMSwwLjEtMC4xbDktOWMwLjMtMC4zLDAuMy0wLjYsMC4zLTAuOAoJcy0wLjEtMC41LTAuMy0wLjhjLTAuMy0wLjMtMC42LTAuMy0wLjgtMC4zYy0wLjIsMC0wLjUsMC4xLTAuOCwwLjNsLTMuNywzLjdjLTEuNiwxLjYtNC4yLDEuNi01LjgsMGMtMS42LTEuNi0xLjYtNC4yLDAtNS44CglsMy43LTMuN2MxLjgtMS44LDQuMS0yLjgsNi42LTIuOHM0LjksMSw2LjYsMi43YzEuOCwxLjgsMi44LDQuMSwyLjgsNi42UzUwLjQsMzcuOCw0OC43LDM5LjV6Ii8+Cjwvc3ZnPgo='
	);

	add_submenu_page(
		'guteblock',
		esc_html__( 'About Guteblock', 'guteblock' ),
		esc_html__( 'About Guteblock', 'guteblock' ),
		'manage_options',
		'guteblock',
		'guteblock_getting_started_page'
	);

	add_submenu_page(
		'guteblock',
		esc_html__( 'Guteblock Settings', 'guteblock' ),
		esc_html__( 'Settings', 'guteblock' ),
		'manage_options',
		'guteblock-plugin-settings',
		'guteblock_settings_page'
	);

}
add_action( 'admin_menu', 'guteblock_getting_started_menu' );

function guteblock_getting_started_page() {		
?>
	<div class="wrap gb-getting-started">
		<div class="intro-wrap">
			<div class="intro">
				<a href="https://guteblock.com/"><img class="guteblock-logo" src="<?php echo esc_url( plugins_url( 'images/logo.png', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Visit Guteblock', 'guteblock' ); ?>" /></a>
				<h3><?php printf( esc_html__( 'Do more with', 'guteblock' ) ); ?> <strong><?php printf( esc_html__( 'Guteblock', 'guteblock' ) ); ?></strong></h3>
			</div>

			<ul class="gb-menu">
				<li class="current" data-target="#getting-started"><a href="#"><?php esc_html_e( 'About Guteblock', 'guteblock' ); ?></a></li>
				<li data-target="#support"><a href="#"><?php esc_html_e( 'Support', 'guteblock' ); ?></a></li>
			</ul>

		</div>

		<div class="panels">
			<div id="panel" class="panel">

				<div id="getting-started" class="content-panel<?php if(!isset($_POST["updated"])) echo ' current'; ?>">
					<div class="gb-block-split clearfix">
						<div class="gb-block-split-left">							
							<div class="gb-titles">
								<h2><?php esc_html_e( 'Enhance your Gutenberg experience with Guteblock!', 'guteblock' ); ?></h2>
								<p><?php esc_html_e( 'Amazing Guteblock collection is all set to enhance your gutenberg experience. Click the link below to explore more about our blocks.', 'guteblock' ); ?></p>
								<a href="https://guteblock.com/" class="sw-btn-submit" target="_blank"><?php esc_html_e( 'Visit Guteblock.com', 'guteblock' ); ?></a>
							</div>
						</div>
						<div class="gb-block-split-right">
							<div class="gb-block-theme">
								<img src="<?php echo esc_url( plugins_url( 'images/img-right.jpg', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Guteblock Theme', 'guteblock' ); ?>" />
							</div>
						</div>
					</div>
					<div class="gb-block-split gb-content-outer clearfix">
						<h3><?php esc_html_e( 'Discover Our Blocks Collection', 'guteblock' ); ?></h3>
						<p><?php esc_html_e( 'Boost up your Gutenberg editor to next level with our powerful Blocks and build websites in no time! A unique and advanced collection of professionally designed 20 blocks that are absolutely free!', 'guteblock' ); ?></p>
						<div class="gb-block-listing">
							<div class="gb-block">
								<div class="gb-block-img gb-post-grid"></div>
								<p><?php esc_html_e( 'Post Grid', 'guteblock' ); ?></p>
								<!-- <span><?php esc_html_e( 'Boost up your Gutenberg editor to next level with our powerful Blocks and build websites in no time!', 'guteblock' ); ?></spam> -->
							</div>
							<div class="gb-block">
								<div class="gb-block-img gb-author-profile"></div>
								<p><?php esc_html_e( 'Author Profile', 'guteblock' ); ?></p>
							</div>
							<div class="gb-block">
								<div class="gb-block-img gb-testimonial"></div>
								<p><?php esc_html_e( 'Testimonial', 'guteblock' ); ?></p>
							</div>

							<div class="gb-block">
								<div class="gb-block-img gb-accordion"></div>
								<p><?php esc_html_e( 'Accordion', 'guteblock' ); ?></p>
							</div>
							<div class="gb-block">
								<div class="gb-block-img gb-team-members"></div>
								<p><?php esc_html_e( 'Team Members', 'guteblock' ); ?></p>
							</div>
							<div class="gb-block">
								<div class="gb-block-img gb-number-box"></div>
								<p><?php esc_html_e( 'Number Box', 'guteblock' ); ?></p>
							</div>
							<div class="gb-block">
								<div class="gb-block-img gb-feature-grid"></div>
								<p><?php esc_html_e( 'Feature Grid', 'guteblock' ); ?></p>
							</div>
							<div class="gb-block">
								<div class="gb-block-img gb-icon-list"></div>
								<p><?php esc_html_e( 'Icon List', 'guteblock' ); ?></p>
							</div>
							<div class="gb-block">
								<div class="gb-block-img gb-container"></div>
								<p><?php esc_html_e( 'Container', 'guteblock' ); ?></p>
							</div>
							<div class="gb-block">
								<div class="gb-block-img gb-separator"></div>
								<p><?php esc_html_e( 'Seperator', 'guteblock' ); ?></p>
							</div>



							<div class="gb-block">
								<div class="gb-block-img gb-count-up"></div>
								<p><?php esc_html_e( 'Count Up', 'guteblock' ); ?></p>
							</div>
							<div class="gb-block">
								<div class="gb-block-img gb-call-to-action"></div>
								<p><?php esc_html_e( 'Call To Action', 'guteblock' ); ?></p>
							</div>
							
							<div class="gb-block">
								<div class="gb-block-img gb-notification"></div>
								<p><?php esc_html_e( 'Notification', 'guteblock' ); ?></p>
							</div>
							<div class="gb-block">
								<div class="gb-block-img gb-card"></div>
								<p><?php esc_html_e( 'Card', 'guteblock' ); ?></p>
							</div>							
							<div class="gb-block">
								<div class="gb-block-img gb-button"></div>
								<p><?php esc_html_e( 'Button', 'guteblock' ); ?></p>
							</div>



							<div class="gb-block">
								<div class="gb-block-img gb-blockquote"></div>
								<p><?php esc_html_e( 'Blockquote', 'guteblock' ); ?></p>
							</div>
							
							
							<div class="gb-block">
								<div class="gb-block-img gb-newsletter"></div>
								<p><?php esc_html_e( 'Newsletter', 'guteblock' ); ?></p>
							</div>



							<div class="gb-block">
								<div class="gb-block-img gb-sharing-icons"></div>
								<p><?php esc_html_e( 'Sharing Icons', 'guteblock' ); ?></p>
							</div>
							
							<div class="gb-block">
								<div class="gb-block-img gb-drop-cap"></div>
								<p><?php esc_html_e( 'Drop Cap', 'guteblock' ); ?></p>
							</div>
							<div class="gb-block">
								<div class="gb-block-img gb-spacer-divider"></div>
								<p><?php esc_html_e( 'Spacer Divider', 'guteblock' ); ?></p>
							</div>
							
							
						</div>
					</div>
					<br /><br /><br /><br />
					<div class="gb-block-split gb-content-outer clearfix">
						<h3><?php esc_html_e( 'Coming Soon', 'guteblock' ); ?></h3>
						<p><?php esc_html_e( 'Rapid developments are on its way. The following blocks will join the collection very soon!', 'guteblock' ); ?></p>
						<div class="gb-block-listing">
							<div class="gb-block">
								<div class="gb-block-img gb-advanced-columns"></div>
								<p><?php esc_html_e( 'Advanced Columns', 'guteblock' ); ?></p>
							</div>
							<div class="gb-block">
								<div class="gb-block-img gb-google-maps"></div>
								<p><?php esc_html_e( 'Google Maps', 'guteblock' ); ?></p>
							</div>
							<div class="gb-block">
								<div class="gb-block-img gb-header"></div>
								<p><?php esc_html_e( 'Header', 'guteblock' ); ?></p>
							</div>
							<div class="gb-block">
								<div class="gb-block-img gb-image-box"></div>
								<p><?php esc_html_e( 'Image Box', 'guteblock' ); ?></p>
							</div>
							<div class="gb-block">
								<div class="gb-block-img gb-inline-notice"></div>
								<p><?php esc_html_e( 'Inline Notice', 'guteblock' ); ?></p>
							</div>
							<div class="gb-block">
								<div class="gb-block-img gb-pricing-table"></div>
								<p><?php esc_html_e( 'Pricing Table', 'guteblock' ); ?></p>
							</div>
							<div class="gb-block">
								<div class="gb-block-img gb-video-box"></div>
								<p><?php esc_html_e( 'Video Box', 'guteblock' ); ?></p>
							</div>
							<div class="gb-block">
								<div class="gb-block-img gb-video-popup"></div>
								<p><?php esc_html_e( 'Video Popup', 'guteblock' ); ?></p>
							</div>
							<div class="gb-block">
								<div class="gb-block-img gb-next-page"></div>
								<p><?php esc_html_e( 'Next Page', 'guteblock' ); ?></p>
							</div>

						</div>
					</div>
				</div>

				<div id="support" class="content-panel">
					<div class="gb-block-split clearfix">
						<div class="gb-block-split-left">							
							<div class="gb-titles">
								<h2><?php esc_html_e( 'Facing issues with Guteblock?', 'guteblock' ); ?></h2>
								<p><?php esc_html_e( 'We are here to help you out with any queries related to Guteblock. Currently, we are actively accepting tickets through WordPress Support forum. Contact us there!', 'guteblock' ); ?></p>
								<a href="https://wordpress.org/support/plugin/guteblock/" class="sw-btn-submit" target="_blank"><?php esc_html_e( 'View Support Forum', 'guteblock' ); ?></a>
							</div>
						</div>
						<div class="gb-block-split-right">
							<div class="gb-block-theme">
								<img src="<?php echo esc_url( plugins_url( 'images/img-support.jpg', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Guteblock Theme', 'guteblock' ); ?>" />
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
	<?php
}

function guteblock_settings_page() {	
	if(isset($_POST["updated"])) {

		handle_form_data();

	}
?>
	<div class="wrap gb-getting-started">
		<div class="intro-wrap">
			<div class="intro">
				<a href="https://guteblock.com/"><img class="guteblock-logo" src="<?php echo esc_url( plugins_url( 'images/logo.png', __FILE__ ) ); ?>" alt="<?php esc_html_e( 'Visit Guteblock', 'guteblock' ); ?>" /></a>
				<h3><?php printf( esc_html__( 'Configure ', 'guteblock' ) ); ?> <strong><?php printf( esc_html__( 'Guteblock', 'guteblock' ) ); ?></strong></h3>
			</div>

			<ul class="gb-menu">
				<li class="current" data-target="#gb-mailchimp-settings"><a href="#"><?php esc_html_e( 'Mailchimp Settings', 'guteblock' ); ?></a></li>
				<!-- <li data-target="#gb-recaptcha-settings"><a href="#"><?php esc_html_e( 'reCAPTCHA Settings', 'guteblock' ); ?></a></li> -->
			</ul>

		</div>

		<div class="panels">
			<div id="panel" class="panel">

				<?php if(isset($_POST["updated"])) { ?>
					<div class="guteblock-alert gb-success">
						<?php esc_html_e( 'Settings updated!', 'guteblock' ); ?>
					</div>
				<?php } ?>

				<form id="guteblock-settings" action="" method="POST">
					<?php wp_nonce_field('gb_settings', 'gb_settings_nonce'); ?>
					<input type="hidden" name="updated" value="true" />
					

					<div id="gb-mailchimp-settings" class="content-panel current">

						<div class="tab-content">
							<table class="form-table">
								<tbody>
									<tr>
										<th>
											<label><?php esc_html_e( 'Mailchimp API Key', 'guteblock' ); ?></label>
										</th>
										<td>
											<input type="text" name="mailchimp-api" placeholder="" value="<?php echo get_option('guteblock_mailchimp_api_key'); ?>" size="40" />
											<p class="guteblock-settings-description"><a href="https://mailchimp.com/help/about-api-keys/#Find_or_generate_your_API_key" target="_blank" rel="noreferrer noopener"><?php esc_html_e( 'Need help finding API Keys?', 'guteblock' ); ?></a></p>
										</td>
									</tr>
									<tr>
										<th>
											<label><?php esc_html_e( 'List ID', 'guteblock' ); ?></label>
										</th>
										<td>
											<input type="text" name="mailchimp-list-id" placeholder="" value="<?php echo get_option('guteblock_mailchimp_list_id'); ?>" size="40" /><p class="guteblock-settings-description"><a href="https://mailchimp.com/help/find-audience-id/" target="_blank" rel="noreferrer noopener"><?php esc_html_e( 'How to find this?', 'guteblock' ); ?></a></p>
										</td>
									</tr>
									<tr>
										<th>
											<label><?php esc_html_e( 'Success Response', 'guteblock' ); ?></label>
										</th>
										<td>
											<textarea name="mailchimp-success-response"><?php echo get_option('guteblock_mailchimp_success_response'); ?></textarea>
										</td>
									</tr>
									<tr>
										<th>
											<label><?php esc_html_e( 'Success Response (Double Optin Enabled)', 'guteblock' ); ?></label>
										</th>
										<td>
											<textarea name="mailchimp-success-response-do" size="40"><?php echo get_option('guteblock_mailchimp_success_response_do'); ?></textarea>
											<p class="guteblock-settings-description gb-desc-small"><?php esc_html_e( 'You can enable / disable double optin feature for each newsletter block separately.', 'guteblock' ); ?></p>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<p class="submit">
							<input type="submit" class="sw-btn-submit" value="Save Settings" />	
						</p>
					
					</div>

					<!-- <div id="gb-recaptcha-settings" class="content-panel">
					
						<div class="tab-content">
							<table class="form-table">
								<tbody>
									<tr>
										<th>
											<label><label><?php esc_html_e( 'Site Key', 'guteblock' ); ?></label></label>
										</th>
										<td>
											<input type="text" name="recaptcha-site-key" placeholder="" value="<?php echo get_option('guteblock_recaptcha_site_key'); ?>" />
											<p class="guteblock-settings-description"><a href="https://developers.google.com/recaptcha/intro" target="_blank" rel="noreferrer noopener"><?php esc_html_e( 'How to find this?', 'guteblock' ); ?></a></p>
										</td>
									</tr>
									<tr>
										<th>
											<label><?php esc_html_e( 'Secret Key', 'guteblock' ); ?></label>
										</th>
										<td>
											<input type="text" name="recaptcha-secret-key" placeholder="" value="<?php echo get_option('guteblock_recaptcha_secret_key'); ?>" />
											<p class="guteblock-settings-description"><a href="https://developers.google.com/recaptcha/intro" target="_blank" rel="noreferrer noopener"><?php esc_html_e( 'How to find this?', 'guteblock' ); ?></a></p>
										</td>
									</tr>
									

								</tbody>
							</table>
						</div>
						<p class="submit">
							<input type="submit" class="sw-btn-submit" value="Save Settings" />	
						</p>
					</div> -->

				</form>				
			</div>
		</div>
	</div>
	<?php
}


function handle_form_data() {

	if(!isset( $_POST['gb_settings_nonce'] ) || ! wp_verify_nonce( $_POST['gb_settings_nonce'], 'gb_settings' )) {

		print 'Sorry, your nonce did not verify.';
		exit;

	}
	
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	$settings = $_POST;

	// Saving API Key
	gb_update_settings( 'guteblock_mailchimp_api_key', $settings['mailchimp-api']);
	
	// Saving List ID
	gb_update_settings( 'guteblock_mailchimp_list_id', $settings['mailchimp-list-id']);
	
	// Saving Success Response
	gb_update_settings( 'guteblock_mailchimp_success_response', $settings['mailchimp-success-response']);

	// Saving Success Response (Double Optin Enabled)
	gb_update_settings( 'guteblock_mailchimp_success_response_do', $settings['mailchimp-success-response-do']);

	return;

}

function gb_update_settings($param, $value) {
	if ( ! empty( $value ) ) {
		update_option( $param, sanitize_text_field( wp_unslash( $value ) ), false );
	} else {
		delete_option( $param );
	}
}

add_action('admin_head', 'gb_admin_style');

function gb_admin_style() {
  echo '<style>
  	#adminmenu .toplevel_page_guteblock div.wp-menu-image.svg {
		background-size: 24px auto;
	}
  </style>';
}