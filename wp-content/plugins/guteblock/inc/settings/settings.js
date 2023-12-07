jQuery(document).ready(function($) {
	$("ul.gb-menu li").click(function() {
		if ($(this).hasClass("current")) return false;

		$(".gb-menu li").removeClass("current");
		$(this).addClass("current");

		var target = $(this).data("target");
		$(".content-panel").slideUp();
		$("#panel")
			.find(target)
			.slideDown();
	});

	$(".form-outer > h3").click(function() {
		$(this)
			.siblings(".gb-settings-container")
			.slideToggle();
	});

	$(".guteblock-alert")
		.delay(5000)
		.slideUp();
});
