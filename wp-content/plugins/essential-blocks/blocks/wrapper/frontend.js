jQuery(document).ready(function($) {
	$(".eb-wrapper-outer").each(function() {
		let _this = $(this),
			shadowColor = _this.attr("data-shadow-color"),
			hOffset = _this.attr("data-hoffset"),
			vOffset = _this.attr("data-voffset"),
			blur = _this.attr("data-blur"),
			spread = _this.attr("data-spread"),
			inset = _this.attr("data-inset") == "true" ? "inset" : "",
			hoverShadowColor = _this.attr("data-hover-shadow-color"),
			hoverHOffset = _this.attr("data-hover-hoffset"),
			hoverVOffset = _this.attr("data-hover-voffset"),
			hoverBlur = _this.attr("data-hover-blur"),
			hoverSpread = _this.attr("data-hover-spread"),
			hoverInset = _this.attr("data-hover-inset") == "true" ? "inset" : "";

		$(this).hover(
			function() {
				$(this)
					.stop(true, true)
					.css({
						"box-shadow": `${hoverHOffset}px ${hoverVOffset}px ${hoverBlur}px ${hoverSpread}px ${hoverShadowColor} ${hoverInset}`
					});
			},
			function() {
				$(this).css({
					"box-shadow": `${hOffset}px ${vOffset}px ${blur}px ${spread}px ${shadowColor} ${inset}`
				});
			}
		);
	});
});
