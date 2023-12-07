document.addEventListener('DOMContentLoaded', function () {

    /**
     * Add realtime tooltip position recalculation support for list elements.
     *
     * There are so many factors that will affect the layout of table. Because of this, dynamically calculation the tooltip position will yield better results.
     */
    function listToolTipSupport() {
        const tooltipElements = Array.from(document.querySelectorAll('.wptb-list-container .wptb-tooltip'));

        tooltipElements.map(t => {
            const classList = Array.from(t.classList);

            let alignment = 'top';

            // get alignment of list tooltip element
            classList.some(c => {
                const regex = new RegExp(/^wptb-tooltip-(.+)$/g);
                const match = regex.exec(c);

                if (match !== null) {
                    alignment = match[1];
                    return true;
                }
                return false;
            });

            // bind calculation to mouseenter event
            t.addEventListener('mouseenter', () => {
                calculateTooltipPosition(t,alignment);
            })
        });

        /**
         * Calculate tooltip position of list element.
         *
         * @param {HTMLElement} liElement list element
         * @param {string} alignment alignment type, possible values are top, right, bottom, left
         */
        function calculateTooltipPosition(liElement, alignment) {
            const tooltip = liElement.querySelector('.tooltip');
            const textElement = liElement.querySelector('p');

            // tip padding value
            const tooltipTipPad = 10;

            // save html content of text element for future restore
            const savedInnerHtml = textElement.innerHTML;

            // wrapping text content of p element with a span value to calculate the correct size for its text content
            textElement.innerHTML = `<span id="sizeCalculator">${savedInnerHtml}</span>`;

            const textPosObj = textElement.querySelector('#sizeCalculator').getBoundingClientRect();
            const liPosObject = liElement.getBoundingClientRect();

            // calculate the position of text element relative to list element
            const textElementRelativePosObj = {
                left: Math.abs(liPosObject.x - textPosObj.x),
                top: Math.abs(liPosObject.y - textPosObj.y)
            }

            // position object for final tooltip element position
            const calculatedPos = {
                left: 0,
                top: 0,
            }

            // calculate for position left and right
            if (alignment === 'left' || alignment === 'right') {
                calculatedPos.top = textElementRelativePosObj.top - (tooltip.offsetHeight / 2) + (textPosObj.height / 2);

                // position left multiplier
                const posXAxisLeft = -(tooltip.offsetWidth + tooltipTipPad);

                // position right multiplier
                const posXAxisRight = textPosObj.width + tooltipTipPad;

                const multiplier = alignment === 'left' ? posXAxisLeft : posXAxisRight;
                calculatedPos.left = textElementRelativePosObj.left + multiplier;
            } else {
                calculatedPos.left = textElementRelativePosObj.left + (textPosObj.width / 2) - (tooltip.offsetWidth / 2);

                // position top multiplier
                const posYAxisTop = -(tooltip.offsetHeight + tooltipTipPad);

                // position bottom multiplier
                const posYAxisBottom = textPosObj.height + tooltipTipPad;

                const multiplier = alignment === 'top' ? posYAxisTop : posYAxisBottom;
                calculatedPos.top = textElementRelativePosObj.top + multiplier;
            }

            textElement.innerHTML = savedInnerHtml;

            tooltip.setAttribute('style', `left: ${calculatedPos.left}px; top: ${calculatedPos.top}px`);
        }
    }

    listToolTipSupport();
});

