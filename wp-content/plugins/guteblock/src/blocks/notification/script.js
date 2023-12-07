import "./style.scss";
import $ from "jquery";

$(document).ready(function() {
	$(".wp-block-guteblock-notification__closeBtn").click(function() {
		$(this)
			.closest(".wp-block-guteblock-notification")
			.slideUp();
	});
});
