import "./style.scss";

import $ from "jquery";

$(document).ready(function() {


var a = 0;

window.addEventListener('scroll', function() {
var myElement = document.getElementsByClassName('wp-block-guteblock-count-up__container');
if (myElement.length > 0) {
  

var bounding = myElement[0].getBoundingClientRect();
  if (bounding.top >= 0 && bounding.left >= 0 && bounding.right <= window.innerWidth && bounding.bottom <= window.innerHeight) {

      var oTop = $('.wp-block-guteblock-count-up__container').offset().top - window.innerHeight;
      if (a == 0 && $(window).scrollTop() > oTop) {

        $('.wp-block-guteblock-count-up__number').each(function() {
          var $this = $(this),
            countTo = $this.attr('data-count');
          $({
            countNum: 0
          }).animate({
              countNum: countTo
            },

            {
              duration: 2000,
              easing: 'swing',
              step: function() {
                $this.text(Math.floor(this.countNum));
              },
              complete: function() {
                $this.text(this.countNum);
              }
    
            });
        });
        a = 1;
      }  
    
  }
  else {
    a = 0;
  }
}
});
});
