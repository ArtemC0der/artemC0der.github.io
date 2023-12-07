import "./style.scss";
import $ from "jquery";

$(document).ready(function() {

	$(".wp-block-guteblock-accordion__title-outer").click(function(){
		$(this).find(".accordion-arrow").click();
	});


	$(".accordion-arrow").click(function(e) {
		e.stopPropagation();
		$(this)
			.parent()
			.parent()
			.parent()
			.find(".wp-block-guteblock-accordion__content-outer")
			.toggleClass("gb-accordion-open");
	});
	$(".accordion-arrow").click(function() {
		$(this).toggleClass("icontoggle");
	});
	$(".accordion-arrow1").click(function() {
			$(this)
			.parent()
			.parent()
			.find(".wp-block-guteblock-accordion__content-outer")
			.toggleClass("gb-accordion-open");
	});
	$(".accordion-arrow1").click(function() {
		$(this).toggleClass("icontoggle1");
	});
});
