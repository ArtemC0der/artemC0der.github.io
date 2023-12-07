import "./style.scss";
import $ from "jquery";

$(document).ready(function() {
	$(".wp-block-guteblock-inline-notice__closeBtn").click(function() {
		$(this)
			.closest(".wp-block-guteblock-inline-notice")
			.slideUp();
	});
});
