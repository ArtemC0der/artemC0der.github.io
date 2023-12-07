jQuery(document).ready(function($) {
  $(".wp-block-eb-instagram-feed").each(function(i) {
    let selectedStyle = $(this).data("style"),
      hoverColor = $(this).data("hover-color"),
      hoverOpacity = 1 - $(this).data("hover-opacity"),
      isCard =
        selectedStyle === "plain" || selectedStyle === "rounded" ? true : false;

    $(this)
      .find("a")
      .each(function() {
        $(this).hover(
          function() {
            // No hover effect if it's card
            if (isCard) {
              return;
            }

            $(this)
              .find("img")
              .css({
                opacity: hoverOpacity,
                transform: selectedStyle === "zoom" ? "scale(1.3)" : "none"
              });
            $(this)
              .find(".eb-instagram-like-comment-wrapper")
              .removeClass("hide-like-comment");
            $(this)
              .stop(true, true)
              .css({
                "background-color": hoverColor
              });
          },
          function() {
            // No hover effect if it's card
            if (isCard) {
              return;
            }

            $(this)
              .find("img")
              .css({ opacity: 1, transform: "none" });
            $(this)
              .find(".eb-instagram-like-comment-wrapper")
              .addClass("hide-like-comment");
            $(this).css({
              "background-color": "transparent"
            });
          }
        );
      });
  });
});
