//

let table_id = WPTB_Helper.detectMode();
if (!table_id) {
    table_id = 'startedid-0';
}
function bordersManageRun(table, WPTB_ResponsiveFrontend) {
    let responsiveFront;
    if(typeof WPTB_ResponsiveFrontend === 'function') {
        responsiveFront = new WPTB_ResponsiveFrontend({ query: '.wptb-builder-responsive table' });
    } else {
        responsiveFront = '';
    }
    let bordersManage = new WPTB_BordersManage({table: table});
    bordersManage.bordersInitialization(responsiveFront);

    return bordersManage;
}
table.addEventListener('table:cloned', function (e) {
    let clonedTable = e.detail.clonedTable;
    let WPTB_ResponsiveFrontend = e.detail.WPTB_ResponsiveFrontend;
    bordersManageRun(clonedTable, WPTB_ResponsiveFrontend);
}, false);
const bordersManage = bordersManageRun(table);

// @deprecated in favor of background menu
// let trs = [...table.querySelectorAll('tr')];
// trs.map(tr => {
//     if(tr.style.backgroundColor && !tr.dataset.wptbBgColor) {
//         tr.dataset.wptbBgColor = tr.style.backgroundColor;
//     }
//     let tds = [...tr.querySelectorAll('td')];
//     tds.map(td => {
//         if(td.style.backgroundColor && !td.dataset.wptbBgColorFromRow ) {
//             td.dataset.wptbOwnBgColor = td.style.backgroundColor;
//         }
//     })
// })


const tableDirectives = new WPTB_TableDirectives(table);
if(!tableDirectives.getDirective(['innerBorders']) ||
    !tableDirectives.getDirective(['innerBorders', 'borderWidth']) ||
    !tableDirectives.getDirective(['innerBorders', 'active'])) {
    const getInnerBordersWidth = function (type) {
        let tds = table.querySelectorAll('td');
        tds = [...tds];
        let borderWidthValuesArr = [];
        let borderWidthAttrArr = [];
        if(type === 'row') {
            borderWidthAttrArr = ['border-top-width', 'border-bottom-width'];
        } else if(type === 'column') {
            borderWidthAttrArr = ['border-left-width', 'border-right-width'];
        } else if(type === 'all') {
            borderWidthAttrArr = ['border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width' ];
        }

        tds.map(td => {
            borderWidthAttrArr.map(borderWidthAttr => {
                borderWidthValuesArr.push(parseInt(td.style[borderWidthAttr], 10));
            })
        })

        if(borderWidthValuesArr.length) {
            return WPTB_Helper.getValueMaxCountSameElementsInArray(borderWidthValuesArr);
        } else {
            return false;
        }
    }

    const getInnerBorderRadiuses = function(type) {
        let tds = table.querySelectorAll('td');
        tds = [...tds];
        let borderRadiusesValuesArr = [];
        let borderRadiusesSelectorsAttrArr = [];
        if(type === 'row') {
            borderRadiusesSelectorsAttrArr = [['tr td:first-child', [ 'border-top-left-radius', 'border-bottom-left-radius' ]],
                ['tr td:last-child', [ 'border-top-right-radius', 'border-bottom-right-radius' ]]];
        } else if(type === 'column') {
            borderRadiusesSelectorsAttrArr = [['tr:first-child td', [ 'border-top-left-radius', 'border-top-right-radius' ]],
                ['tr:last-child td', [ 'border-bottom-left-radius', 'border-bottom-right-radius' ]]];
        } else if(type === 'all') {
            borderRadiusesSelectorsAttrArr = [['td', [ 'border-radius']]];
        }

        borderRadiusesSelectorsAttrArr.map(x => {
            tds = table.querySelectorAll(x[0]);
            tds = [...tds];
            tds.map(td => {
                x[1].map(attr =>{
                    if(td.style[attr]) {
                        borderRadiusesValuesArr.push(parseInt(td.style[attr], 10));
                    }
                })
            })
        })

        if(borderRadiusesValuesArr.length) {
            return WPTB_Helper.getValueMaxCountSameElementsInArray(borderRadiusesValuesArr);
        } else {
            return false;
        }
    }


    let type = 'all';
    if(table.dataset.tableBorderOnlyColumn) {
        tableDirectives.setDirective(['innerBorders', 'active'], 'column');
        type = 'column';
    } else if(table.dataset.tableBorderOnlyRow) {
        tableDirectives.setDirective(['innerBorders', 'active'], 'row')
        type = 'row';
    } else {
        tableDirectives.setDirective(['innerBorders', 'active'], 'all')
    }

    if(!tableDirectives.getDirective(['innerBorders', 'borderWidth'])) {
        let borderWidth = getInnerBordersWidth(type);
        tableDirectives.setDirective(['innerBorders', 'borderWidth'], borderWidth);
    }
    if(!tableDirectives.getDirective(['innerBorders', 'borderRadiuses'])) {
        let borderRadiuses = getInnerBorderRadiuses(type);
        tableDirectives.setDirective(['innerBorders', 'borderRadiuses', type], borderRadiuses);
    }
}

let borderRadiuses = tableDirectives.getDirective(['innerBorders', 'borderRadiuses', tableDirectives.getDirective(['innerBorders', 'active'])]);
if(borderRadiuses) {
    bordersManage.rowBgColorReplaceToCellBgColor(true);
}

table.addEventListener('wp-table-builder/table-changed/after', function () {
    let active = tableDirectives.getDirective(['innerBorders', 'active']);
    let borderWidth = tableDirectives.getDirective(['innerBorders', 'borderWidth']);
    let innerBorderRadiuses = tableDirectives.getDirective(['innerBorders', 'borderRadiuses', active])
    bordersManage.innerBordersSet(borderWidth);
    bordersManage.switchBorderOnlyColumnRow(active);
    bordersManage.borderRadiusesSet(active, innerBorderRadiuses);
    bordersManage.rowBgColorReplaceToCellBgColor();
}, true);

// delete row moving field and column moving field and delete all its handlers
function movingFieldsDelete() {
    let body = document.getElementsByTagName('body')[0];
    let wptbRowMovingField = document.querySelector('.wptb-row-moving-field');
    if (wptbRowMovingField) {
        wptbRowMovingField.deleteEventHandlers();
        body.removeChild(wptbRowMovingField);
    }
    let wptbColumnMovingField = document.querySelector('.wptb-column-moving-field');
    if (wptbColumnMovingField) {
        wptbColumnMovingField.deleteEventHandlers();
        body.removeChild(wptbColumnMovingField);
    }
}

table.addEventListener('wp-table-builder/cell/mark', function (e) {
    if( e.detail.hasOwnProperty('countMarkedCells') ) {
        let countMarkedCells = e.detail.countMarkedCells;
        if(countMarkedCells == 0) {
            movingFieldsDelete();
        } else if(countMarkedCells == 1) {
            let wptbRowMove = new WPTB_RowMove();
            wptbRowMove.rowMovingFieldPutActive();

            let wptbColumnMove = new WPTB_ColumnMove();
            wptbColumnMove.columnMovingFieldPutActive();
        } else if(countMarkedCells == 2) {
            movingFieldsDelete();
        }
    }
});
table.addEventListener('wp-table-builder/table-edit-mode/closed', function (e) {
    movingFieldsDelete();
}, false);
table.addEventListener('wp-table-builder/undo-select/active', function (e) {
    movingFieldsDelete();
});

function controlsChangePro( inputs, table ) {
    if( inputs && typeof inputs === 'object' ) {
        let highlighted = table.querySelectorAll( '.wptb-highlighted' );
        if( highlighted && highlighted.length == 1 ) {
            highlighted = highlighted[0];

            if( inputs.hasOwnProperty('duplicateColumn') ) {
                let wptbColumnMove = new WPTB_ColumnMove();

                let col = parseInt( highlighted.dataset.xIndex, 10 );
                let colspan = highlighted.colSpan;
                if(!colspan) colspan = 1;
                wptbColumnMove.cutTableVertically( col );
                wptbColumnMove.cutTableVertically( col + colspan );

                for( let i = 0; i < table.rows.length; i++ ) {
                    let rowChildren = table.rows[i].children;
                    let arrTdsWhichNeedPaste = [];
                    for( let j = 0; j < rowChildren.length; j++ ) {
                        if (rowChildren[j].dataset.xIndex < col) continue;
                        if (rowChildren[j].dataset.xIndex >= col + colspan) break;

                        let newTd = rowChildren[j].cloneNode( true );
                        newTd.innerHTML = '';

                        arrTdsWhichNeedPaste.push( [rowChildren[j], newTd] );
                    }

                    for( let j = rowChildren.length - 1; j >= 0; j-- ) {
                        let dataXIndex = parseInt( rowChildren[j].dataset.xIndex, 10 );
                        if ( ((dataXIndex + rowChildren[j].colSpan) <=
                            col + colspan) || j == 0) {
                            let nextSib = rowChildren[j].nextSibling;
                            for(let k = 0; k < arrTdsWhichNeedPaste.length; k++) {
                                if (nextSib) {
                                    table.rows[i].insertBefore(arrTdsWhichNeedPaste[k][1], nextSib);
                                } else {
                                    table.rows[i].appendChild(arrTdsWhichNeedPaste[k][1]);
                                }

                                WPTB_Cell(table.mark, arrTdsWhichNeedPaste[k][1]);

                                let copiedCellElements = arrTdsWhichNeedPaste[k][0].children;
                                for(let m = 0; m < copiedCellElements.length; m++) {
                                    let infArr = copiedCellElements[m].className.match(/wptb-element-(.+)-(\d+)/i);
                                    if(infArr && Array.isArray(infArr)) {
                                        let data = {};
                                        data.kind = infArr[1];
                                        data.elemProt = copiedCellElements[m];
                                        data.tinyMceClear = true;

                                        let copyElement = new WPTB_ElementObject(data);

                                        arrTdsWhichNeedPaste[k][1].appendChild( copyElement.getDOMElement() );
                                    }
                                }
                            }
                            break;
                        }
                    }
                }

                let maxAmountOfCells = table.getMaxAmountOfCells();
                maxAmountOfCells += colspan;
                table.setMaxAmountOfCells(maxAmountOfCells);
                table.recalculateIndexes();

                wptbColumnMove.glueTableVertically();

                table.addColumnWidth();
                table.addRowHeight();
                table.undoSelect();

                WPTB_Helper.wptbDocumentEventGenerate('wp-table-builder/table-changed/after', table);

                let wptbTableStateSaveManager = new WPTB_TableStateSaveManager();
                wptbTableStateSaveManager.tableStateSet();
            }
            else if( inputs.hasOwnProperty( 'duplicateRow' ) ) {
                let wptbRowMove = new WPTB_RowMove();

                let row = parseInt( highlighted.dataset.yIndex, 10 ),
                    rowspan = highlighted.rowSpan;
                if(!rowspan) rowspan = 1;
                wptbRowMove.cutTableHorizontally( row );
                wptbRowMove.cutTableHorizontally( row + rowspan );

                let additionalIndex = 0;
                let tableRowLength = table.rows.length;
                for(let i = 0; i < tableRowLength; i++) {
                    let rowChildren = table.rows[i].children;
                    let arrTdsWhichNeedPaste = [];
                    if (rowChildren.length > 0 && rowChildren[0].dataset.yIndex < row) continue;
                    if (rowChildren.length > 0 && rowChildren[0].dataset.yIndex >= row + rowspan) break;
                    for(let j = 0; j < rowChildren.length; j++) {
                        let newTd = rowChildren[j].cloneNode( true );
                        newTd.innerHTML = '';

                        arrTdsWhichNeedPaste.push( [rowChildren[j], newTd] );
                    }

                    let newRow = table.insertRow(row + rowspan + additionalIndex);
                    newRow.classList.add('wptb-row');
                    for(let j = 0; j < arrTdsWhichNeedPaste.length; j++) {
                        newRow.appendChild(arrTdsWhichNeedPaste[j][1]);
                        WPTB_Cell(table.mark, arrTdsWhichNeedPaste[j][1]);
                        arrTdsWhichNeedPaste[j][1].dataset.yIndex = row + rowspan + additionalIndex;

                        let copiedCellElements = arrTdsWhichNeedPaste[j][0].children;
                        for(let m = 0; m < copiedCellElements.length; m++) {
                            let infArr = copiedCellElements[m].className.match(/wptb-element-(.+)-(\d+)/i);
                            if(infArr && Array.isArray(infArr)) {
                                let data = {};
                                data.kind = infArr[1];
                                data.elemProt = copiedCellElements[m];
                                data.tinyMceClear = true;

                                let copyElement = new WPTB_ElementObject(data);

                                arrTdsWhichNeedPaste[j][1].appendChild( copyElement.getDOMElement() );
                            }
                        }
                    }

                    additionalIndex++;
                }
                table.recalculateIndexes();
                wptbRowMove.glueTableHorizontally();

                array = table.fillTableArray();
                WPTB_Helper.tableRowsColorsReinstall(table);
                table.addColumnWidth();
                table.addRowHeight();
                table.undoSelect();

                WPTB_Helper.wptbDocumentEventGenerate('wp-table-builder/table-changed/after', table);

                let wptbTableStateSaveManager = new WPTB_TableStateSaveManager();
                wptbTableStateSaveManager.tableStateSet();
            }
            return;
        }

        const appearDependOnControls = [
            'applyInnerBorder',
            'separateColumnsRows',
            'tableDifferentBorderColors'
        ];
        let appearDependOnControlsIndicate = false;
        for(let i = 0; i < appearDependOnControls.length; i++) {
            if(inputs.hasOwnProperty(appearDependOnControls[i])) {
                appearDependOnControlsIndicate = true;
                break;
            }
        }
        if(appearDependOnControlsIndicate) {
            let infArr = table.className.match( /wptb-element-((.+-)\d+)/i );
            let tds = table.querySelectorAll('td');
            tds = [...tds];
            Object.keys(inputs).forEach(function (key) {
                if(inputs[key] === 'unchecked') {
                    let tableBorderColorControlUnicClass = 'wptb-el-' + infArr[1] + '-tableBorderColor';
                    let tableBorderColorControl = document.querySelector(`.${tableBorderColorControlUnicClass}`);
                    let borderColor = tableBorderColorControl.value ? tableBorderColorControl.value : '';

                    let wptbTdsBorderColorsData = {};
                    tds.map(s => {
                        const {xIndex} = s.dataset;
                        const {yIndex} = s.dataset;

                        if (xIndex && yIndex) {
                            let thisBorderColorCssHex = WPTB_Helper.rgbToHex(s.style.borderColor);
                            if( ! WPTB_Helper.isHex( thisBorderColorCssHex ) ) {
                                thisBorderColorCssHex = '';
                            }

                            wptbTdsBorderColorsData[`${xIndex}${yIndex}`] = thisBorderColorCssHex;
                        }
                        s.style.borderColor = borderColor;
                    });

                    window.wptbTdsBorderColorsData = wptbTdsBorderColorsData;
                } else if(inputs[key] === 'checked') {
                    let tdsBorderColorsReinstall = true;
                    for(let i = 0; i < appearDependOnControls.length; i++) {
                        let tableControlUnicClass = 'wptb-el-' + infArr[1] + '-' + appearDependOnControls[i];
                        let tableControls = document.getElementsByClassName(tableControlUnicClass);
                        if(tableControls.length && WPTB_Helper.targetControlValueGet(tableControls) === 'checked') {
                            continue;
                        } else {
                            tdsBorderColorsReinstall = false;
                            break;
                        }
                    }
                    if(tdsBorderColorsReinstall && window.wptbTdsBorderColorsData) {
                        tds.map(s => {
                            const {xIndex} = s.dataset;
                            const {yIndex} = s.dataset;

                            if (xIndex && yIndex && window.wptbTdsBorderColorsData.hasOwnProperty(`${xIndex}${yIndex}`)) {
                                s.style.borderColor = window.wptbTdsBorderColorsData[`${xIndex}${yIndex}`];
                            }
                        });
                    }
                }
            });
        }

        const tableDirectives = new WPTB_TableDirectives(table);

        if(inputs.hasOwnProperty('tableHeaderBackground') ||
            inputs.hasOwnProperty('tableEvenRowBackground') ||
            inputs.hasOwnProperty('tableOddRowBackground')) {
            bordersManage.rowBgColorReplaceToCellBgColor();
            console.log("bgColor")
        }
        else if(inputs.hasOwnProperty('tableInnerBorderSize')) {
            tableDirectives.setDirective(['innerBorders', 'borderWidth'], inputs.tableInnerBorderSize);
            let type = tableDirectives.getDirective(['innerBorders', 'active']);
            bordersManage.switchBorderOnlyColumnRow(type);
            return;
        }
        let borderSpacing = table.style.borderSpacing,
            borderSpacingColumns = 3,
            borderSpacingRows = 3;
        if (inputs.hasOwnProperty('separateColumnsRows')) {
            if(inputs.separateColumnsRows === 'checked') {
                table.style.setProperty('border-collapse', 'separate', 'important');
                if(!borderSpacing) {
                    table.style.borderSpacing = `${borderSpacingColumns}px ${borderSpacingRows}px`;
                }
            } else if( inputs.separateColumnsRows === 'unchecked' ) {
                table.style.setProperty('border-collapse', 'collapse', "important");
            }
        } else if (inputs.hasOwnProperty('spaceBetweenColumns')) {
            if(borderSpacing) {
                let borderSpacingArr = borderSpacing.split(' ');
                if(borderSpacingArr && Array.isArray(borderSpacingArr)) {
                    if(1 in borderSpacingArr && borderSpacingArr[1]) {
                        borderSpacingRows = parseInt(borderSpacingArr[1].trim());
                    } else {
                        borderSpacingRows = parseInt(borderSpacingArr[0].trim());
                    }
                }
            }
            borderSpacingColumns = inputs.spaceBetweenColumns;
            table.style.borderSpacing = `${borderSpacingColumns}px ${borderSpacingRows}px`;
        } else if (inputs.hasOwnProperty('spaceBetweenRows')) {
            if(borderSpacing) {
                let borderSpacingArr = borderSpacing.split(' ');
                if(borderSpacingArr && Array.isArray(borderSpacingArr)) {
                    borderSpacingColumns = parseInt(borderSpacingArr[0].trim());
                }
            }
            borderSpacingRows = inputs.spaceBetweenRows;
            table.style.borderSpacing = `${borderSpacingColumns}px ${borderSpacingRows}px`;
        }
        else if(inputs.hasOwnProperty('tableCellsBorderRadius') ||
            inputs.hasOwnProperty('tableRowsBorderRadius') ||
            inputs.hasOwnProperty('tableColumnsBorderRadius')) {
            Object.keys(inputs).map(k => {
                if (Object.prototype.hasOwnProperty.call(inputs, k)) {
                    let type = k === 'tableRowsBorderRadius' ? 'row' :
                        (k === 'tableColumnsBorderRadius' ? 'column' : 'all')
                    let value = parseInt(inputs[k], 10) ? parseInt(inputs[k], 10) : null;
                    tableDirectives.setDirective(['innerBorders', 'borderRadiuses', type], value);
                }

                bordersManage.rowBgColorReplaceToCellBgColor();
            });
        }
        else if(inputs.hasOwnProperty('columnBorderOnly') || inputs.hasOwnProperty('rowBorderOnly')) {
            let type;
            Object.keys(inputs).map(k => {
                if (Object.prototype.hasOwnProperty.call(inputs, k)) {
                    if(inputs[k] === 'checked') {
                        if(k === 'columnBorderOnly') {
                            type = 'column';
                        } else if(k === 'rowBorderOnly') {
                            type = 'row';
                        }
                    } else if(inputs[k] === 'unchecked') {
                        let checkboxControlName = '';
                        if (k === 'columnBorderOnly') {
                            checkboxControlName = 'rowBorderOnly';
                            type = 'row';
                        } else if (k === 'rowBorderOnly') {
                            checkboxControlName = 'columnBorderOnly';
                            type = 'column';
                        }
                        const control = document.getElementsByClassName(`wptb-el-main-table_setting-${table_id}-${checkboxControlName}`);
                        if(control && WPTB_Helper.targetControlValueGet(control) === 'unchecked' ) {
                            type = 'all';
                        }
                    }
                    let innerBorderRadiuses = tableDirectives.getDirective(['innerBorders', 'borderRadiuses', type]);
                    bordersManage.switchBorderOnlyColumnRow(type);
                    bordersManage.borderRadiusesSet(type, innerBorderRadiuses);
                    let controlSizeName = type === 'row' ? 'tableRowsBorderRadius' :
                        (type === 'column' ? 'tableColumnsBorderRadius' : 'tableCellsBorderRadius')
                    let controlSize = document.querySelectorAll(`.wptb-el-main-table_setting-${table_id}-${controlSizeName}`);
                    for(let i = 0; i < controlSize.length; i++) {
                        controlSize[i].value = innerBorderRadiuses;
                    }

                    bordersManage.rowBgColorReplaceToCellBgColor();
                }
            });
        }
    }
}
WPTB_Helper.controlsInclude( table, controlsChangePro );
