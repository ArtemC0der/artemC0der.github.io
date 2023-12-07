jQuery(document).ready(function($) {
	$(".eb-button-wrapper").each(function() {
		let _this = $(this),
			buttonColor = _this.attr("data-button-color"),
			textColor = _this.attr("data-text-color"),
			hoverColor = _this.attr("data-hover-color"),
			hoverTextColor = _this.attr("data-hover-text-color");

		$(this)
			.find(".eb-button")
			.hover(
				function() {
					$(this)
						.stop(true, true)
						.css({
							"background-color": hoverColor,
							color: hoverTextColor
						});
				},
				function() {
					$(this).css({
						"background-color": buttonColor,
						color: textColor
					});
				}
			);
	});
});
