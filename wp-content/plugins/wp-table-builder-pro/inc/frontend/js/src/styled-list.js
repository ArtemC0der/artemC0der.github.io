/**
 * Styled list element related frontend js scripts.
 */
document.addEventListener('DOMContentLoaded', () => {
    /**
     * Fix for vertical spacing between icon and text components of styled list element being overridden by both plugin and theme styles.
     */
    function marginFix() {
        const listP = Array.from(document.querySelectorAll('.wptb-styled_list-container li p'));

        listP.map(p => {
            const styleAttr = p.getAttribute('style');
            const newStyle = styleAttr.replace(/margin-left: (\d+)px/, '$& !important');
            p.setAttribute('style', newStyle);
        })
    }

    marginFix();
})
