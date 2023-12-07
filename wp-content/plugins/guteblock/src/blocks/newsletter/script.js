import "./style.scss";

import $ from "jquery";

$(document).ready(function() {
	$(".newsletterSubmit").submit(function() {
		$.ajax({
			type: "post",
			url: guteblock.ajaxurl,
			data: {
				action: "guteblock_newsletter_submit",
				email: $(".wp-block-guteblock-newsletter__input").val(),
				double_optin: $(
					".wp-block-guteblock-newsletter input[name='double_optin']"
				).val()
			},
			success: function(response) {
				$(".wp-block-guteblock-newsletter__popup-window").addClass(
					"wp-block-guteblock-newsletter__popup-windowAfter"
				);
				$(".wp-block-guteblock-newsletter__popup-window").empty(
					response
				);
				$(".wp-block-guteblock-newsletter__popup-window").append(
					response
				);
				setTimeout(function() {
					$(
						".wp-block-guteblock-newsletter__popup-window"
					).removeClass(
						"wp-block-guteblock-newsletter__popup-windowAfter"
					);
					document.getElementById("newsletterMyForm").reset();
				}, 2000);
			}
		});
		return false;
	});
});
