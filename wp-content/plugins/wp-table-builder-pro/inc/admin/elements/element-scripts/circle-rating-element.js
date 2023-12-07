const infArr = element.className.match(/wptb-element-((.+-)\d+)/i);
const elementControlUnicClassRatingSize = `wptb-el-${infArr[1]}-circleRatingSize`;
function controlsChange( inputs, element ) {
    if( inputs && typeof inputs === 'object' ) {
        if(inputs.hasOwnProperty('circleRatingSize')) {
            if(inputs.circleRatingSize.eventValue > element.offsetWidth) {
                let ratingCircleWrapper = element.querySelector('.wptb-rating-circle-wrapper');
                ratingCircleWrapper.style.fontSize = element.offsetWidth + 'px';
                let elementsControlRatingSize = document.querySelectorAll('.' + elementControlUnicClassRatingSize);
                elementsControlRatingSize = [...elementsControlRatingSize];
                elementsControlRatingSize.map(input => {
                    input.value = element.offsetWidth;
                });
            }
        } if( inputs.hasOwnProperty( 'circlePercentage' ) ){
            let ratingCircleSlice = element.querySelector( '.wptb-rating-circle-slice' );
            let ratingCircleBar = element.querySelector( '.wptb-rating-circle-bar' );
            let ratingCircleFill = element.querySelector( '.wptb-rating-circle-fill' );
            let numberRatingElem = element.querySelector( '.wptb-rating-circle-wrapper span' );
            if( ratingCircleSlice && ratingCircleBar && ratingCircleFill && numberRatingElem ) {
                if( inputs.circlePercentage.eventValue > 50 ) {
                    ratingCircleSlice.style.clip = 'rect(auto, auto, auto, auto)';
                    ratingCircleBar.style.transform = 'rotate(180deg)';
                } else {
                    ratingCircleSlice.style.clip = 'rect(0em, 1em, 1em, 0.5em)';
                    ratingCircleBar.style.transform = 'rotate(0deg)';
                }

                numberRatingElem.innerHTML = inputs.circlePercentage.eventValue + '%';

                let degrees = inputs.circlePercentage.eventValue * 3.6;
                ratingCircleFill.style.transform = 'rotate(' + degrees + 'deg)';
            }
        }
    } 
}

WPTB_Helper.controlsInclude( element, controlsChange, true );
