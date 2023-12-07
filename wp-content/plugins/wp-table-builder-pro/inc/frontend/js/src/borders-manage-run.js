
document.addEventListener('responsive:front', function (e){
    function sortingTable(e) {
        const tables = document.querySelectorAll('.wptb-preview-table');
        const responsiveFront = e.detail.responsiveFront;
        for (let i = 0; i < tables.length; i++) {
            const bordersManage = new WPTB_BordersManage({ table: tables[i] });
            bordersManage.bordersInitialization(responsiveFront);
        }
    }
    sortingTable(e);
}, false)

