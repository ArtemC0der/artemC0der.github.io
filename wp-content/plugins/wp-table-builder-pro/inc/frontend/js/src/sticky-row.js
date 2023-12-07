document.addEventListener('DOMContentLoaded', function() {
    
    function topRowSticky() {
        const tables = document.querySelectorAll('.wptb-preview-table');
        
        if (tables.length > 0) {
            tables.forEach(table => {
                let firstRow = table.querySelector('tbody > tr:first-child');

                let isStickyHeader = firstRow.getAttribute('data-wptb-sticky-row');
                if (isStickyHeader == 'true') {
                    tableStickyHeader(table, firstRow);
                }
            });
        }
        
        
        function tableStickyHeader(table, stickyRow) {
            const tablePosition = table.getBoundingClientRect();
            const stickyHeight = stickyRow.getBoundingClientRect().height;
            const scrollPosition = window.pageYOffset;
            const tableTop = tablePosition.top + scrollPosition;
            const tableEnd = (tablePosition.bottom - stickyHeight) + scrollPosition;

            stickyRow.style.maxWidth = tablePosition.width + 'px';

            const columnsInRow = Array.from(stickyRow.querySelectorAll('td'));
            columnsInRow.map(col => {
                let style = window.getComputedStyle(col);
                let width = style.getPropertyValue('width');
                col.style.width = width;
            });

            // Add Scroll Event for Adding or Removing class
            document.addEventListener('scroll', function() {
                let scroll = window.pageYOffset;

                if ( scroll > (tableTop + stickyHeight) && scroll < tableEnd) {
                    stickyRow.classList.add('wptb-sticky-header');
                } 
                
                if ( scroll > tableEnd || scroll < tableTop ){
                    stickyRow.classList.remove('wptb-sticky-header');
                }
            });
        }
    }

    topRowSticky();
});
