<?php

/* Ajax Call in Newsletter */
add_action("wp_ajax_guteblock_newsletter_submit", "guteblock_newsletter_submit");
add_action("wp_ajax_nopriv_guteblock_newsletter_submit", "guteblock_newsletter_submit");

if(!function_exists('guteblock_newsletter_submit')) {

	function guteblock_newsletter_submit() {

		$error_msg = "";

		$data = [
			'email' => $_POST["email"],
			'subscriber_status' => $_POST["double_optin"]
		];
		
		$apiKey = get_option( 'guteblock_mailchimp_api_key'); 
		$listId = get_option( 'guteblock_mailchimp_list_id' );

		if( empty($apiKey) || empty($listId) ){
			$error_msg = "Please configure 
			Mailchimp API Key and List ID in the settings.";
			echo '<div class="gb-alert gb-error">'.$error_msg.'</div>';
		}
		else {

			$memberId = md5(strtolower($data['email']));
			$dataCenter = substr($apiKey,strpos($apiKey,'-')+1);
			$url = 'https://' . $dataCenter . '.api.mailchimp.com/3.0/lists/' . $listId . '/members/' . $memberId;
			if($data['email'] != ""){
				if($data['subscriber_status'] == 0 ) {
					$status = "subscribed";
				}
				else {
					$status = "pending";
				}
			}else{
				$status = "no mail";
			}
			$json = json_encode([
				'email_address' => $data['email'],
				'status'        => $status
			]);
			
			$ch = curl_init($url);
			curl_setopt($ch, CURLOPT_USERPWD, 'user:' . $apiKey);
			curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_TIMEOUT, 10);
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
			$result = curl_exec($ch);
			$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
			curl_close($ch);
			
			if($status == "no mail") {

				$error_msg = "Please Enter Your Email";
				echo '<div class="gb-alert gb-error">'.$error_msg.'</div>';

			} else {

				if($status == "pending") {
					$error_msg = get_option( 'guteblock_mailchimp_success_response_do' );
					echo '<div class="gb-alert gb-error">'.$error_msg.'</div>';
				}
				else{
					$error_msg = get_option( 'guteblock_mailchimp_success_response' );
					echo '<div class="gb-alert gb-success">'.$error_msg.'</div>';
				}
				
			}
		}	
		
		wp_die();

	}

}

if(!function_exists('guteblock_render_newsletter_block')) {

	function guteblock_render_newsletter_block($attributes) {

		if(!isset($attributes['styleIs'])) {
			$attributes['styleIs'] = 1;
		}
	
		if ( $attributes['styleIs'] == 3 ) {
			$btnBottomLeftThreeOne = $attributes['borderBottomLeftRadiusTwo'];
		}
		else{
			$btnBottomLeftThreeOne = $attributes['borderBottomLeftRadius'];
		}
		if ( $attributes['styleIs'] ==1 ) {
			$bg = $attributes['bgColor'];
		}
		else{
			$bg = $attributes['bgColorTwo'];
		}
		if ( $attributes['styleIs'] == 2 ) {
			$TopLeft = 100;
		}
		else{
			$TopLeft = $attributes['borderLeftRadius'];
		}
		if ( $attributes['styleIs'] != 1 ) {
			$btnTopLeft = 0;
		}
		else{
			$btnTopLeft = $attributes['borderTopLeftRadius'];
		}
		if ( $attributes['styleIs'] == 2 ) {
			$btnBottomLeft = 30;
		}
		else{
			$btnBottomLeft = $btnBottomLeftThreeOne;
		}
		if ( $attributes['styleIs'] == 3 ) {
			$placehoderThreeOne = "Subscribe Now";
		}
		else{
			$placehoderThreeOne = "Enter Your Email Id";
		}
		if ( $attributes['styleIs'] == 2 ) {
			$placeholder = "Your mail Id goes here...";
		}
		else{
			$placeholder = $placehoderThreeOne;
		}
		if ( $attributes['styleIs'] == 1 ) {
			$basicBorderRightRadius = $attributes['borderRightRadius'];
		}
		else{
			$basicBorderRightRadius = 0;
		}
		if(isset($attributes['className'])) {
			$additional_classes = $attributes['className'];
		} else {
			$additional_classes = "";
		}
		
		$balancedPaddingRight = $attributes['horizontalOuterPadding'] + 4.5 * $attributes['fontSize'] + 2 * $attributes['buttonHorizontalPadding'];
		$newsletter = '<div class="wp-block-guteblock-newsletter__popup-window align'.$attributes['align'].'"></div>';
		$newsletter .= '<div class="wp-block-guteblock-newsletter '.$additional_classes.' align'.$attributes['align'].' is-style-'.$attributes['styleIs'].' align-'.$attributes['alignment'].'" 
		style="background-color:'.$bg.';
		padding-left:'.$attributes['horizontalOuterPadding'].'px;
		padding-right:'.$attributes['horizontalOuterPadding'].'px;
		padding-top:'.$attributes['verticalOuterPadding'].'px;
		padding-bottom:'.$attributes['verticalOuterPadding'].'px;
		text-align:'.$attributes['alignment'].'">';
		$newsletter .= '<div class="wp-block-guteblock-newsletter__container">';
			$newsletter .= '<form action="" method="post" class="newsletterSubmit" id="newsletterMyForm">';
				$newsletter .= 	'<input type="email" placeholder="'.$placeholder.'" class="wp-block-guteblock-newsletter__input" style="
				padding-left: '.$attributes['horizontalPadding'].'px;
				padding-right:'.$balancedPaddingRight.'px;
				padding-top:'.$attributes['verticalInnerPadding'].'px;
				padding-bottom:'.$attributes['verticalInnerPadding'].'px;
				text-transform:'.$attributes['inputTextTransform'].';
				font-weight:'.$attributes['inputTextFontWeight'].';
				border-top-left-radius:'.$TopLeft.'px;
				border-bottom-left-radius:'.$TopLeft.'px;
				border-top-right-radius:'.$basicBorderRightRadius.'px;
				border-bottom-right-radius:'.$basicBorderRightRadius.'px;
				color:'.$attributes['inputTextColor'].';
				font-size:'.$attributes['fontSize'].'px;
				background-color:'.$attributes['inputBackgroundColor'].';
				border: none;
				">';
				$newsletter .= '<input type="hidden" value="'.$attributes['doubleOptIn'].'" class="wp-block-guteblock-newsletter__hiddeninput" name="double_optin" >';
				$newsletter .= '<style>.wp-block-guteblock-newsletter-inner:hover { color: '.$attributes['hoverButtonTextColor'].' !important; background-color:'.$attributes['hoverButtonBackgroundColor'].'!important; transition:.5s ease all} </style>';
				$newsletter .= '<button type="submit"  target="_blank"  rel="noopener noreferrer" class="wp-block-guteblock-newsletter-inner";
				style="padding-left:'.$attributes['buttonHorizontalPadding'].'px;
				padding-right:'.$attributes['buttonHorizontalPadding'].'px;
				text-decoration: none;
				padding-top:'.$attributes['verticalInnerPadding'].'px;
				padding-bottom:'.$attributes['verticalInnerPadding'].'px;
				border-top-left-radius:'.$btnTopLeft.'px;
				border-bottom-left-radius:'.$btnBottomLeft.'px;
				border-top-right-radius:'.$basicBorderRightRadius.'px;
				border-bottom-right-radius:'.$basicBorderRightRadius.'px;
				background-color:'.$attributes['buttonBackgroundColor'].';
				text-transform:'.$attributes['buttonTextTransform'].';
				font-weight:'.$attributes['buttonTextFontWeight'].';
				letter-spacing:'.$attributes['buttonLetterSpacing'].'px;
				border: none;
				color: '.$attributes['buttonTextColor'].';
				font-size: '.$attributes['fontSize'].'px;
				transition:.5s ease all;">';
				if ( $attributes['styleIs'] != 3 ) {
						$newsletter .= '<span>'.$attributes['buttonTitle'].'</span>';
				}
				else if( $attributes['styleIs'] == 3 ) {
					$newsletter .= '<span class="dashicons dashicons-'.$attributes['icon'].'" style="font-size: '.$attributes['fontSize'].'px; width:'.$attributes['fontSize'].'px;height:'.$attributes['fontSize'].'px;"></span>';
				}
				$newsletter .= '</button>';
				$newsletter .= '</form>';
			$newsletter .= '</div>';
		$newsletter .= '</div>';
		return $newsletter;
	}

}


