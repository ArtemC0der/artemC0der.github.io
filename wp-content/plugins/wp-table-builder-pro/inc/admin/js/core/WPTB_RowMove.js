var WPTB_RowMove = function () {
    this.rowMovingField;

    this.withdrawTable;

    this.tablePreview;

    this.tBody;

    this.body;

    this.setTimeoutWhenStopMove;

    this.wptbHeaderCoordinates;

    this.wptbContainer;

    this.setTimeoutScrollTop;

    this.autoScroll = false;

    this.eventMove;

    // function creates a field for move a row to top or bottom
    // and after creating puts it on the right place
    this.rowMovingFieldPutActive = () => {
        let rowMovingField = document.getElementsByClassName( 'wptb-row-moving-field' );
        let body = document.getElementsByTagName( 'body' )[0];
        this.body = body;
        if( rowMovingField.length > 0 ) {
            this.rowMovingField = rowMovingField[0];
        } else {
            rowMovingField = document.createElement( 'div' );
            rowMovingField.classList.add( 'wptb-row-moving-field' );
            let visualButtonBox = document.createElement( 'div' );
            visualButtonBox.classList.add( 'row-visual-button-box' );
            visualButtonBox.innerHTML = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" \n\
                    x="0px" y="0px" width="30" height="30" viewBox="0 0 511.626 511.627" \n\
                    style="enable-background:new 0 0 511.626 511.627;" xml:space="preserve">\n\
                    <path d="M328.906,401.994h-36.553V109.636h36.553c4.948,0,9.236-1.809,12.847-5.426c3.613-3.615,5.421-7.898,5.421-12.845 \n\
                        c0-4.949-1.801-9.231-5.428-12.851l-73.087-73.09C265.044,1.809,260.76,0,255.813,0c-4.948,0-9.229,1.809-12.847,5.424 \n\
                        l-73.088,73.09c-3.618,3.619-5.424,7.902-5.424,12.851c0,4.946,1.807,9.229,5.424,12.845c3.619,3.617,7.901,5.426,12.85,5.426 \n\
                        h36.545v292.358h-36.542c-4.952,0-9.235,1.808-12.85,5.421c-3.617,3.621-5.424,7.905-5.424,12.854 \n\
                        c0,4.945,1.807,9.227,5.424,12.847l73.089,73.088c3.617,3.617,7.898,5.424,12.847,5.424c4.95,0,9.234-1.807,12.849-5.424 \n\
                        l73.087-73.088c3.613-3.62,5.421-7.901,5.421-12.847c0-4.948-1.808-9.232-5.421-12.854 \n\
                        C338.142,403.802,333.857,401.994,328.906,401.994z" style="fill:#FFFFFF"></path>\n\
                </svg>';

            let visualButtonBoxLeft = visualButtonBox.cloneNode( true );

            visualButtonBoxLeft.classList.add( 'row-visual-button-box-left' );

            rowMovingField.appendChild( visualButtonBox );
            rowMovingField.appendChild( visualButtonBoxLeft );

            body.appendChild( rowMovingField );

            this.rowMovingField = rowMovingField;
        }
        rowMovingField.deleteEventHandlers = () => {
            let wptbContainer = document.getElementsByClassName( 'wptb-container' )[0];
            wptbContainer.removeEventListener( 'scroll', this.rowMovingFieldParametrsOne, false );
            window.removeEventListener( 'resize', this.rowMovingFieldParametrsTwo, false );
            //document.querySelector( '.wptb-panel-drawer-icon' ).removeEventListener( 'click', this.movingfieldTransition, false );
        }

        if( ! this.wptbContainer ) {
            this.wptbContainer = document.getElementsByClassName( 'wptb-container' )[0];
        }
        let wptbContainer = this.wptbContainer;

        let wptbHighlighted = document.getElementsByClassName( 'wptb-highlighted' );
        if( wptbHighlighted.length > 0 ) {
            wptbHighlighted = wptbHighlighted[0];

            this.rowMovingFieldParametrsOne();
            this.rowMovingFieldParametrsTwo();
        }

        wptbContainer.addEventListener( 'scroll', this.rowMovingFieldParametrsOne, false );
        window.addEventListener( 'resize', this.rowMovingFieldParametrsTwo, false );
        body.addEventListener( 'click', this.checkHighlighted, false );
        //document.querySelector( '.wptb-panel-drawer-icon' ).addEventListener( 'click', this.movingfieldTransition, false );

        let insertRowsMoving = ( eventMove ) => {
            if( ! this.withdrawTableContainer ) {
                this.withdrawTableContainer = document.querySelector( '.wptb-withdraw-row-table-container' );
            }
            let withdrawTableContainer = this.withdrawTableContainer;

            withdrawTableContainer.style.display = 'block';

            if( ! this.rowMovingField ) {
                this.rowMovingField = document.querySelector( '.wptb-row-moving-field' );
            }
            let rowMovingField = this.rowMovingField;

            let downYcoordinates = rowMovingField.downYcoordinates;
            let differenceY = downYcoordinates - eventMove.clientY;

            let rowMovingFieldTopCoordinates = ( parseFloat( rowMovingField.positionTop ) - parseFloat( differenceY ) );

            let rowMovingFieldBottomCoordinates = rowMovingFieldTopCoordinates + parseFloat( rowMovingField.height );

            if( ! this.tablePreview ) {
                this.tablePreview = document.querySelector( '.wptb-preview-table' );
            }
            let tablePreview = this.tablePreview;

            let tableCoordinatesTop = parseFloat( tablePreview.getBoundingClientRect().top );

            let tableCoordinatesBottom = parseFloat( tablePreview.getBoundingClientRect().bottom );

            rowMovingField.style.top = rowMovingFieldTopCoordinates + 'px';

            if( tableCoordinatesTop - parseFloat( rowMovingField.style.top ) >= 20 ) {
                rowMovingField.style.top = ( tableCoordinatesTop - 20 ) + 'px';
            } else if( parseFloat( rowMovingField.style.top ) + parseFloat( rowMovingField.height ) - tableCoordinatesBottom >= 20 )  {
                rowMovingField.style.top = ( tableCoordinatesBottom - parseFloat( rowMovingField.height ) + 20 ) + 'px';
            }

            let tBody = tablePreview.querySelector( 'tbody' );

            let rowsMoving = tBody.getElementsByClassName( 'wptb-row-moving' );
            let rowsMovingDeleted = [];
            if( rowsMoving.length > 0 ) {
                if( rowMovingField.rowsTopBottomCoordinatesArr['top'] &&
                        parseInt( rowMovingField.rowsTopBottomCoordinatesArr['top'][1], 10 ) >= rowMovingFieldTopCoordinates ) {
                    for( let i = 0; i < rowsMoving.length; i++ ) {
                        rowsMovingDeleted.push( rowsMoving[i] );
                    }

                    for( let i = 0; i < rowsMovingDeleted.length; i++ ) {
                        tBody.removeChild( rowsMovingDeleted[i] );
                    }

                    console.log( rowMovingField.rowsTopBottomCoordinatesArr['top'][1] )

                    this.cutTableHorizontally( rowMovingField.rowsTopBottomCoordinatesArr['top'][0] );

                    for( let i = 0; i < rowsMovingDeleted.length; i++ ) {
                        tBody.insertBefore( rowsMovingDeleted[i], tablePreview.rows[rowMovingField.rowsTopBottomCoordinatesArr['top'][0] + i] );
                    }

                    tablePreview.recalculateIndexes();

                    if( tablePreview.rows[rowMovingField.rowsTopBottomCoordinatesArr['top'][0] + 1] && tablePreview.rows[rowMovingField.rowsTopBottomCoordinatesArr['top'][0] + 2] ) {
                        this.glueTableHorizontally( tablePreview.rows[rowMovingField.rowsTopBottomCoordinatesArr['top'][0] + 1],
                            tablePreview.rows[rowMovingField.rowsTopBottomCoordinatesArr['top'][0] + 2] );
                    }

                    rowMovingField.rowsTopBottomCoordinatesArr = setRowsTopBottomCoordinates();
                } else if( rowMovingField.rowsTopBottomCoordinatesArr['bottom'] &&
                        parseInt( rowMovingField.rowsTopBottomCoordinatesArr['bottom'][1], 10 ) <= rowMovingFieldBottomCoordinates ) {
                    for( let i = 0; i < rowsMoving.length; i++ ) {
                        rowsMovingDeleted.push( rowsMoving[i] );
                    }

                    for( let i = 0; i < rowsMovingDeleted.length; i++ ) {
                        tBody.removeChild( rowsMovingDeleted[i] );
                    }

                    this.cutTableHorizontally( rowMovingField.rowsTopBottomCoordinatesArr['bottom'][0] - rowsMovingDeleted.length );

                    for( let i = 0; i < rowsMovingDeleted.length; i++ ) {
                        tBody.insertBefore( rowsMovingDeleted[i], tablePreview.rows[rowMovingField.rowsTopBottomCoordinatesArr['bottom'][0] - rowsMovingDeleted.length + i] );
                    }

                    tablePreview.recalculateIndexes();

                    if( tablePreview.rows[rowMovingField.rowsTopBottomCoordinatesArr['bottom'][0] - 3] && tablePreview.rows[rowMovingField.rowsTopBottomCoordinatesArr['bottom'][0] - 2] ) {
                        this.glueTableHorizontally( tablePreview.rows[rowMovingField.rowsTopBottomCoordinatesArr['bottom'][0] - 3],
                            tablePreview.rows[rowMovingField.rowsTopBottomCoordinatesArr['bottom'][0] - 2] );
                    }

                    rowMovingField.rowsTopBottomCoordinatesArr = setRowsTopBottomCoordinates();
                }

                WPTB_Helper.wptbDocumentEventGenerate('wp-table-builder/table-changed/after', tablePreview);
            }
        }
        // sets handler for the event when the moving field was moved
        this.rowMovingField.onmousedown = ( eventDown ) => {
            // delete column moving field and delete all its handlers
            let body = document.getElementsByTagName( 'body' )[0];
            let wptbColumnMovingField = document.querySelector( '.wptb-column-moving-field' );
            if( wptbColumnMovingField ) {
                wptbColumnMovingField.deleteEventHandlers();
                body.removeChild( wptbColumnMovingField );
            }

            this.rowMovingField.downYcoordinates = eventDown.clientY;

            if( ! this.withdrawTable ) {
                this.withdrawTable = this.withdrawSelectedRowsFromTable();
            }

            let tablePreview = document.querySelector( '.wptb-preview-table' );

            if( ! this.rowMovingField ) {
                this.rowMovingField = document.querySelector( '.wptb-row-moving-field' );
            }
            let rowMovingField = this.rowMovingField;
            if( rowMovingField ) {
                let withdrawTableContainer = document.createElement( 'div' );
                withdrawTableContainer.classList.add( 'wptb-withdraw-row-table-container' );

                withdrawTableContainer.appendChild( this.withdrawTable );

                rowMovingField.appendChild( withdrawTableContainer );

                withdrawTableContainer.style.position = 'absolute';
                withdrawTableContainer.style.right = '30px';
                withdrawTableContainer.style.height = '100%';

                if( tablePreview ) {
                    withdrawTableContainer.style.width = tablePreview.getBoundingClientRect().width + 'px';
                    withdrawTableContainer.style.maxWidth = tablePreview.parentNode.getBoundingClientRect().width + 'px';
                    withdrawTableContainer.style.overflow = 'hidden';
                    let withdrawTable = withdrawTableContainer.querySelector( '.wptb-preview-table' );
                    if( withdrawTable ) {
                        withdrawTable.style.marginLeft = - tablePreview.parentNode.scrollLeft + 'px';
                    }
                }
            }

            rowMovingField.rowsTopBottomCoordinatesArr = setRowsTopBottomCoordinates();

            body.onmousemove = ( eventMove ) => {
                let rowMovingField = document.querySelector( '.wptb-row-moving-field' );

                if( ! this.wptbHeaderCoordinates ) {
                    this.wptbHeaderCoordinates = body.querySelector( '.wptb-header' ).getBoundingClientRect();
                }
                let wptbHeaderCoordinates = this.wptbHeaderCoordinates;

                if( ! this.wptbContainer ) {
                    this.wptbContainer = document.getElementsByClassName( 'wptb-container' )[0];
                }
                let wptbContainer = this.wptbContainer;

                clearInterval( rowMovingField.setIntervalScrollTop );
                let difference = wptbHeaderCoordinates.bottom - rowMovingField.getBoundingClientRect().top;
                if( difference > 10 && eventMove.movementY <= 0 ) {
                    let setIntervalPeriod = 2;
                    if( ! rowMovingField.startScrollPositionY ) {
                        rowMovingField.startScrollPositionY = eventMove.clientY;
                    } else {
                        let cursorDifference = rowMovingField.startScrollPositionY - eventMove.clientY;

                        if( cursorDifference <= 0 ) {
                            setIntervalPeriod = 0;
                        }
                    }
                    if( setIntervalPeriod ) {
                        this.eventMove = eventMove;
                        rowMovingField.setIntervalScrollTop = setInterval( function() {
                            wptbContainer.scrollTop = parseFloat( wptbContainer.scrollTop ) - 5;

                            rowMovingField.rowsTopBottomCoordinatesArr = setRowsTopBottomCoordinates();
                            insertRowsMoving( eventMove );
                        }, setIntervalPeriod );

                        rowMovingField.autoScroll = true;
                    } else {
                        clearInterval( rowMovingField.setIntervalScrollTop );
                    }
                } else if( rowMovingField.getBoundingClientRect().bottom - body.getBoundingClientRect().bottom > 10 && eventMove.movementY > 0 ) {
                    let setIntervalPeriod = 2;
                    if( ! rowMovingField.startScrollPositionY ) {
                        rowMovingField.startScrollPositionY = eventMove.clientY;
                    } else {
                        let cursorDifference = eventMove.clientY - rowMovingField.startScrollPositionY;

                        if( cursorDifference <= 0 ) {
                            setIntervalPeriod = 0;
                        }
                    }
                    if( setIntervalPeriod ) {
                        rowMovingField.setIntervalScrollTop = setInterval( function() {
                            wptbContainer.scrollTop = parseFloat( wptbContainer.scrollTop ) + 5;

                            rowMovingField.rowsTopBottomCoordinatesArr = setRowsTopBottomCoordinates();
                            insertRowsMoving( eventMove );
                        }, setIntervalPeriod );

                        rowMovingField.autoScroll = true;
                    } else {
                        clearInterval( rowMovingField.setIntervalScrollTop );
                    }

                } else {
                    clearInterval( rowMovingField.setIntervalScrollTop );
                }

                if( rowMovingField ) {
                    body.onmouseup = () => {
                        let rowMovingField = document.querySelector( '.wptb-row-moving-field' );
                        if( rowMovingField ) {
                            body.removeChild( rowMovingField );

                            this.withdrewRowsPut();

                            this.withdrawTable = null;
                        }

                        clearInterval( rowMovingField.setIntervalScrollTop );

                        body.onmouseup = null;
                        body.onmousemove = null;

                        let tablePreview = document.querySelector( '.wptb-preview-table' );
                        tablePreview.undoSelect();

                        WPTB_Helper.wptbDocumentEventGenerate('wp-table-builder/table-changed/after', tablePreview);

                        let wptbTableStateSaveManager = new WPTB_TableStateSaveManager();
                        wptbTableStateSaveManager.tableStateSet();
                    }

                    insertRowsMoving( eventMove );
                }
            }
        }

        function setRowsTopBottomCoordinates( row ) {
            let table = document.querySelector( '.wptb-preview-table' );
            let cell = table.querySelector('.wptb-highlighted'),
                rowspan = cell.rowSpan;

            let rowsTopBottomCoordinatesArr = [];
            if( ! row ) {
                row = parseInt( cell.dataset.yIndex, 10 );
            }

            if( table.rows[row - 1] ) {
                let topCoordinates = ( 7 * table.rows[row - 1].getBoundingClientRect().top +
                        3 * table.rows[row - 1].getBoundingClientRect().bottom ) / 10;
                rowsTopBottomCoordinatesArr['top'] = [row - 1, topCoordinates];
            }

            if( table.rows[row + rowspan] ) {
                let bottomCoordinates = ( 3 * table.rows[row + rowspan].getBoundingClientRect().top + 7 * table.rows[row + rowspan].getBoundingClientRect().bottom ) / 10;
                rowsTopBottomCoordinatesArr['bottom'] = [row + rowspan + 1, bottomCoordinates];
            }

            return rowsTopBottomCoordinatesArr;
        }

        // returns difference of positions of moving field before and after moving when this field was moved
        function cursorPositionDifference( eventMove, body, rowMovingField ) {

        }
    }

    // function set coordinates top and write property positionTop for moving field
    this.rowMovingFieldParametrsOne = () => {
        let rowMovingField = document.querySelector( '.wptb-row-moving-field' );
        let wptbHighlighted = document.querySelector( '.wptb-highlighted' );
        if( rowMovingField && ! rowMovingField.autoScroll && wptbHighlighted ) {
            let coordinatesHighlighted = wptbHighlighted.getBoundingClientRect();
            this.rowMovingField.style.top = parseFloat( coordinatesHighlighted.top ) + 'px';
            this.rowMovingField.positionTop = parseFloat( coordinatesHighlighted.top );
            this.rowMovingField.height = parseFloat( coordinatesHighlighted.height );
        }
    }

    // function set position left and height for moving field
    this.rowMovingFieldParametrsTwo = () => {
        //this.rowMovingFieldParametrsOne();
        let wptbHighlighted = document.getElementsByClassName( 'wptb-highlighted' );
        if( wptbHighlighted.length > 0 ) {
            wptbHighlighted = wptbHighlighted[0];

            let coordinatesHighlighted = wptbHighlighted.getBoundingClientRect(),
            coordinatesHighlightedHeight = parseFloat( coordinatesHighlighted.height );

            this.rowMovingField.style.display = 'table';
            this.rowMovingField.style.height = coordinatesHighlightedHeight + 'px';

            let wptbTableSetup = document.getElementsByClassName( 'wptb-table-setup' );
            if( wptbTableSetup.length > 0 ) {
                wptbTableSetup = wptbTableSetup[0];

                let coordinatesPreviewTable = wptbTableSetup.getBoundingClientRect()
                this.rowMovingField.style.left = parseFloat( coordinatesPreviewTable.right ) + 'px';
                this.rowMovingField.querySelector( '.row-visual-button-box-left' ).style.left = '-' + ( parseFloat( coordinatesPreviewTable.width ) + 30 ) + 'px';

                let tableWithdrewRows = this.rowMovingField.getElementsByClassName( 'wptb-table-setup' );
                if( tableWithdrewRows.length > 0 ) {
                    tableWithdrewRows = tableWithdrewRows[0];

                    tableWithdrewRows.style.maxWidth = wptbTableSetup.getBoundingClientRect().width + 'px';
                }
            }
        }
    }

    this.movingfieldTransition = () => {
        let wptbTableSetup = document.querySelector('.wptb-table-setup');
        let time = 0;
        let intervalId = setInterval(() => {
            let coordinatesPreviewTable = wptbTableSetup.getBoundingClientRect();
            this.rowMovingField.style.left = parseFloat( coordinatesPreviewTable.right ) + 'px';
            if(time > 200) clearInterval(intervalId);
            time +=3;
        }, 3);
    }

//    this.rowMovingFieldParametrsTwoTransition = () => {
//        this.leftPanel = document.querySelector( '.wptb-left-panel' );
//        this.startLeft = this.leftPanel.getBoundingClientRect().left;
//        this.endLeft;
//
//        if( this.startLeft == 0 ) {
//            this.endLeft == 310;
//        } else {
//            this.endLeft == 0;
//        }
//
//        let checkLeftPanelSizeDifference = () => {
//            let left = this.leftPanel.getBoundingClientRect().left;
//            if( left == this.endLeft ) {
//                this.rowMovingFieldParametrsTwo();
//                clearInterval( leftMovementButtonChangePosition );
//            }
//            this.rowMovingFieldParametrsTwo();
//        }
//
//        let leftMovementButtonChangePosition = setInterval( checkLeftPanelSizeDifference, 1 );
//    }

    this.checkHighlighted = () => {
        let highlighted = document.getElementsByClassName( 'wptb-highlighted' );
        let body = document.getElementsByTagName( 'body' )[0];
        if( highlighted.length != 1 ) {
            rowMovingField = document.querySelector( '.wptb-row-moving-field' );
            if( rowMovingField ) {
                let parent = rowMovingField.parentNode;
                parent.removeChild( rowMovingField );
            }
        }
        body.removeEventListener( 'click', this.checkHighlighted, false );
    }

    // function hide the moving field
    this.rowMovingFieldHide = () => {
        let rowMovingField = document.getElementsByClassName( 'wptb-row-moving-field' );
        if( rowMovingField.length > 0 ) {
            rowMovingField = rowMovingField[0];
            rowMovingField.style.display = 'none';
        }
    }

    this.withdrawSelectedRowsFromTable = function() {
        if( ! this.tablePreview ) {
            this.tablePreview = document.querySelector( '.wptb-preview-table' );
        }
        let table = this.tablePreview,
            cell = document.querySelector('.wptb-highlighted'),
            rowspan = cell.rowSpan,
            row = parseInt( cell.dataset.yIndex, 10 ),
            tableWithdrewRows = document.createElement( 'table' ),
            tableWithdrewRowsTbody = document.createElement( 'tbody' );
            tableWithdrewRows.appendChild( tableWithdrewRowsTbody );
            tableWithdrewRows.classList.add( 'wptb-preview-table' );

            if( table ) {
                let tableAttributes = table.attributes;

                for( let i = 0; i < tableAttributes.length; i++ ) {
                    tableWithdrewRows.setAttribute( tableAttributes[i].nodeName, tableAttributes[i].nodeValue );
                }
            }

        if ( ! rowspan ) rowspan = 1;

        this.cutTableHorizontally( row );

        this.cutTableHorizontally( row + rowspan );

        let tableRowsWithDrewArr = [];
        for( let i = row; i < row + rowspan; i++ ) {
            tableRowsWithDrewArr.push( table.rows[i] );
            let row = table.rows[i],
                withdrewRow = row.cloneNode(true),
                tdsRow = row.children,
                tdsWithDrew = withdrewRow.children;
            // for(let j = 0; j < tdsRow.length; j++) {
            //     if(typeof tdsRow[j] === 'object' && tdsRow[j].hasOwnProperty('getCellDimensions')) {
            //         if(!tdsWithDrew[j].style.width) {
            //             tdsWithDrew[j].style.width = tdsRow[j].getCellDimensions().width + 'px';
            //         }
            //         if(!tdsWithDrew[j].style.height) {
            //             tdsWithDrew[j].style.height = tdsRow[j].getCellDimensions().height + 'px';
            //         }
            //     }
            // }

            tableWithdrewRowsTbody.appendChild( withdrewRow );

            if( i == row || i == row + rowspan - 1 ) {
                table.rows[i].style.height = parseInt( table.rows[i].getBoundingClientRect().height ) + parseInt( cell.style.borderWidth )/2 + 15 + 'px';
            } else {
                table.rows[i].style.height = parseInt( table.rows[i].getBoundingClientRect().height ) + parseInt( cell.style.borderWidth )/2 + 'px';
            }

            let rowsIChildren = table.rows[i].children;
            for( let j = 0; j < rowsIChildren.length; j++ ) {
                if( parseInt( rowsIChildren[j].dataset.yIndex ) != 0 ) {
                    rowsIChildren[j].classList.add( 'wptb-td-border-top-moving' );
                }
                if( parseInt( rowsIChildren[j].dataset.yIndex ) + rowsIChildren[j].rowSpan != row + rowspan ) {
                    rowsIChildren[j].classList.add( 'wptb-td-border-bottom-moving' );
                }
                if( parseInt( rowsIChildren[j].dataset.xIndex ) != 0 ) {
                    rowsIChildren[j].classList.add( 'wptb-td-border-left-moving' );
                }
                if( parseInt( rowsIChildren[j].dataset.xIndex ) + rowsIChildren[j].colSpan != rowsIChildren.length ) {
                    rowsIChildren[j].classList.add( 'wptb-td-border-right-moving' );
                }
            }

            table.rows[i].classList.add( 'wptb-row-moving' );
        }

        let rowNew = tableWithdrewRows.insertRow(-1);
        rowNew.classList.add( 'wptb-row' );
        rowNew.style.display = 'none';
        for( let i = 0; i < table.maxCols; i++ ) {
            let td = new WPTB_Cell( table.mark );
            td.getDOMElement().dataset.wptbCssTdAutoWidth = 'true';
            tableWithdrewRows.rows[tableWithdrewRows.rows.length - 1].appendChild( td.getDOMElement() );
        }

        if(tableWithdrewRows.style.borderCollapse === 'separate') {
            let tableBS = tableWithdrewRows.style.borderSpacing,
                bSRows = '2px';
            if(tableBS){
                let tableBsArr = tableBS.split(' ');
                if(tableBsArr && Array.isArray(tableBsArr)) {
                    bSRows = tableBsArr[0].trim();
                    if(1 in tableBsArr && tableBsArr[1]) {
                        bSRows = tableBsArr[1].trim();
                    } else {
                        bSRows = tableBsArr[0].trim();
                    }
                }
            }
            let tBody = tableWithdrewRows.getElementsByTagName('tbody');
            if(tBody.length > 0) {
                tBody = tBody[0];

                tBody.style.position = 'relative';
                tBody.style.top = '-' + bSRows;
                tBody.style.bottom = '-' + bSRows;
                tBody.style.left = '0px';
                tBody.style.right = '0px'
            }
        }

        return tableWithdrewRows;
    }

    this.cutTableHorizontally = function( rowBefore ) {
        if( ! this.tablePreview ) {
            this.tablePreview = document.querySelector( '.wptb-preview-table' );
        }
        let table = this.tablePreview;
        rowBefore = parseInt( rowBefore, 10 );

        WPTB_CutGlueTable.cutTableHorizontally(rowBefore, table)
    }

    this.glueTableHorizontally = function() {
        if( ! this.tablePreview ) {
            this.tablePreview = document.querySelector( '.wptb-preview-table' );
        }
        let table = this.tablePreview;

        WPTB_CutGlueTable.glueTableHorizontally(table)
    }

    this.withdrewRowsPut = function( temporaryShow ) {
        if( ! this.tablePreview ) {
            this.tablePreview = document.querySelector( '.wptb-preview-table' );
        }
        let table = this.tablePreview;
        if( table ) {
            let rows = table.rows;
            for( let i = 0; i < rows.length; i++ ) {
                if( rows[i].classList.contains( 'wptb-row-moving' ) ) {
                    let children = rows[i].children;

                    for( let j = 0; j < children.length; j++ ) {
                        children[j].classList.remove( 'wptb-td-border-top-moving' );
                        children[j].classList.remove( 'wptb-td-border-bottom-moving' );
                        children[j].classList.remove( 'wptb-td-border-left-moving' );
                        children[j].classList.remove( 'wptb-td-border-right-moving' );
                    }

                    rows[i].style.height = '';
                    rows[i].classList.remove( 'wptb-row-moving' );
                }
            }

            this.glueTableHorizontally();

            if( ! temporaryShow ) {
                let highlighted = [...table.getElementsByClassName( 'wptb-highlighted' )];
                for ( let i = 0; i < highlighted.length; i++ ) {
                    highlighted[i].classList.remove( 'wptb-highlighted' );
                }

                let tds = [...table.getElementsByTagName( 'td' )];
                for( let i = 0; i < tds.length; i++ ) {
                    if( tds[i].hasAttribute( 'data-same-cell-before-division' ) ) {
                        tds[i].removeAttribute( 'data-same-cell-before-division' );
                    }
                }
            }
        }
    }

    window.wptbRowMove = this;
}
