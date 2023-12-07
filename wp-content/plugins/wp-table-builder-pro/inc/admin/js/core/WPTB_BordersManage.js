var WPTB_BordersManage = function (options = {}) {
    let table = options.table;
    this.table = options.table;
    WPTB_RecalculateIndexes(table);
    const thisObject = this;
    this.itemsPerHeader = 0;
    this.tableMaxCols = table.maxCols;
    this.cellsStylesScheme = {};

    const tableDirectives = new WPTB_TableDirectives(table);

    /**
     * checks whether the table should be in the sort state
     * and connects the necessary handlers
     *
     * @param {object} responsiveFront
     */
    this.bordersInitialization = function(responsiveFront) {
        let typeFirst;
        let typeSecond;
        let borderRadiusVal;
        if(tableDirectives.getDirective(['innerBorders', 'active']) === 'row') {
            typeFirst = 'row';
            typeSecond = 'column';
        } else if(tableDirectives.getDirective(['innerBorders', 'active']) === 'column') {
            typeFirst = 'column';
            typeSecond = 'row';
        }
        if(tableDirectives.getDirective(['innerBorders', 'borderRadiuses']))
            borderRadiusVal = tableDirectives.getDirective(['innerBorders', 'borderRadiuses', tableDirectives.getDirective(['innerBorders', 'active'])]);
        if(!typeFirst || typeof typeFirst !== 'string' || !typeSecond || typeof typeSecond !== 'string') return;

        let switchMode = WPTB_GetDirectionAfterReconstruction(this.table, typeFirst, typeSecond, 'column', responsiveFront);

        if(typeof switchMode === 'object' && switchMode.hasOwnProperty('switch')) {
            function borderRadiusesSetRun (e) {
                let switchModeObj = switchMode.switch(e);
                if(typeof switchModeObj === 'object') {
                    this.itemsPerHeader = switchModeObj.itemsPerHeader;
                    if(switchModeObj.hasOwnProperty('newTable')) {
                        let tableOld = this.table;
                        this.table = switchModeObj.newTable;
                        this.switchBorderOnlyColumnRow(switchModeObj.type[0]);
                        this.borderRadiusesSet(switchModeObj.type[0], borderRadiusVal);
                        this.spaceBorderSpacingExchange(switchModeObj.type[1]);
                        this.table = tableOld;
                    } else {
                        this.switchBorderOnlyColumnRow(switchModeObj.type[0]);
                        this.borderRadiusesSet(switchModeObj.type[0], borderRadiusVal);
                        this.spaceBorderSpacingExchange(switchModeObj.type[1]);
                    }
                }
            }
            //borderRadiusesSetRun.call(thisObject);
            this.table.addEventListener(
                'table:rebuilt',
                function (e) {
                    borderRadiusesSetRun.call(thisObject, e);
                },
                false
            );
        }
    }

    /**
     * sets border Radiuses for necessary Cells
     *
     * @param {string} type
     * @param {string} value
     */
    this.borderRadiusesSet = function (type, value) {
        if(!parseInt(value, 10)){
            value = null;
        }
        let tds = this.table.querySelectorAll('td');
        tds = [...tds];
        if(type === 'all') {
            tableDirectives.setDirective(['innerBorders', 'borderRadiuses', 'all'], value);
            if(value) {
                value = value + 'px';
            }
            tds.map(td => {
                td.style.borderRadius = value;
            })
        } else if(type === 'row') {
            tableDirectives.setDirective(['innerBorders', 'borderRadiuses', 'row'], value);
            tds.map(td => {
                td.style.borderRadius = null;
            })
            if(value) {
                let tds1 = this.table.querySelectorAll('tr td:first-child');
                tds1 = [...tds1];
                tds1.map(td => {
                    td.style.borderTopLeftRadius = value + 'px';
                    td.style.borderBottomLeftRadius = value + 'px';
                })

                let tds2 = this.table.querySelectorAll('tr td:last-child');
                tds2 = [...tds2];
                tds2.map(td => {
                    td.style.borderTopRightRadius = value + 'px';
                    td.style.borderBottomRightRadius = value + 'px';
                })
            }
        } else if(type === 'column') {
            tableDirectives.setDirective(['innerBorders', 'borderRadiuses', 'column'], value);
            tds.map(td => {
                td.style.borderRadius = null;
            })
            if(value) {
                let rowsLength = this.table.rows.length;
                let dataYIndexStart = 0;
                while (rowsLength > 0) {
                    let tdsTop = this.table.querySelectorAll(`[data-y-index="${dataYIndexStart}"]`);
                    tdsTop = [...tdsTop];
                    tdsTop.map((td) => {
                        td.style.borderTopLeftRadius = value + 'px';
                        td.style.borderTopRightRadius = value + 'px';
                    });

                    let tdsBottom;
                    if(this.itemsPerHeader && dataYIndexStart + this.itemsPerHeader < rowsLength && dataYIndexStart + 1 < rowsLength) {
                        tdsBottom = this.table.querySelectorAll(`[data-y-index="${dataYIndexStart + this.itemsPerHeader}"]`);
                    } else {
                        tdsBottom = this.table.querySelectorAll('tr:last-child td');
                    }

                    tdsBottom = [...tdsBottom];
                    tdsBottom.map((td) => {
                        td.style.borderBottomLeftRadius = value + 'px';
                        td.style.borderBottomRightRadius = value + 'px';
                    });

                    if (this.itemsPerHeader) {
                        rowsLength -= this.itemsPerHeader + 1;
                        dataYIndexStart += this.itemsPerHeader + 1;
                    } else {
                        rowsLength = 0;
                    }
                }
            }
        }
    };

    this.switchBorderOnlyColumnRow = function (type) {
        let borderWidth = tableDirectives.getDirective(['innerBorders', 'borderWidth']);
        this.innerBordersSet(borderWidth);

        if (type === 'row') {
            let tableRows = this.table.rows;
            let columnCount = 0;
            if (tableRows.length > 0) {
                let firstRow = tableRows[0];
                let firstRowTds = firstRow.children;
                firstRowTds = [...firstRowTds];
                let firstRowTdLast = firstRowTds[firstRowTds.length - 1]
                columnCount = parseInt(firstRowTdLast.dataset.xIndex) + firstRowTdLast.colSpan;
            }

            tableRows = [...tableRows];

            tableRows.map(row => {
                let tds = row.children;
                tds = [...tds];
                tds.map(td => {
                    if(td.previousSibling === null) {
                        if (td.colSpan < columnCount) {
                            td.style.borderRightWidth = '0px';
                        }
                    } else if(td.nextSibling === null) {
                        td.style.borderLeftWidth = '0px';
                    } else {
                        td.style.borderRightWidth = '0px';
                        td.style.borderLeftWidth = '0px';
                    }
                });
            });
            tableDirectives.setDirective(['innerBorders', 'active'], 'row');
        } else if (type === 'column') {
            let tableRows = this.table.rows;
            let rowsCount = tableRows.length;
            if (rowsCount <= 1) return;

            let rowsLength = this.table.rows.length;
            let dataYIndexStart = 0;
            while (rowsLength > 0) {
                let tdsTop = this.table.querySelectorAll(`[data-y-index="${dataYIndexStart}"]`);
                tdsTop = [...tdsTop];
                tdsTop.map((td) => {
                    if (td.rowSpan < rowsCount) {
                        td.style.borderBottomWidth = '0px';
                    }
                });

                let tdsBetween = [];
                let tdsBottom;
                if(this.itemsPerHeader && dataYIndexStart + this.itemsPerHeader < rowsLength && dataYIndexStart + 1 < rowsLength) {
                    for(let i = dataYIndexStart + 1; i < dataYIndexStart + this.itemsPerHeader; i++) {
                        let tdsRow = this.table.querySelectorAll(`[data-y-index="${i}"]`);
                        tdsRow = [...tdsRow];
                        tdsBetween = tdsBetween.concat(tdsRow);
                    }

                    tdsBottom = this.table.querySelectorAll(`[data-y-index="${dataYIndexStart + this.itemsPerHeader}"]`);
                } else {
                    for(let i = dataYIndexStart + 1; i < this.table.rows.length - 1; i++) {
                        let tdsRow = this.table.querySelectorAll(`[data-y-index="${i}"]`);
                        tdsRow = [...tdsRow];
                        tdsBetween = tdsBetween.concat(tdsRow);
                    }

                    tdsBottom = this.table.querySelectorAll('tr:last-child td');
                }

                tdsBetween.map(td => {
                    td.style.borderTopWidth = '0px';
                    td.style.borderBottomWidth = '0px';
                })

                tdsBottom = [...tdsBottom];
                tdsBottom.map((td) => {
                    td.style.borderTopWidth = '0px';
                });

                if (this.itemsPerHeader) {
                    rowsLength -= this.itemsPerHeader + 1;
                    dataYIndexStart += this.itemsPerHeader + 1;
                } else {
                    rowsLength = 0;
                }
            }

            tableDirectives.setDirective(['innerBorders', 'active'], 'column');
        } else if (type == 'all') {
            tableDirectives.setDirective(['innerBorders', 'active'], 'all');
        }
    }

    this.innerBordersSet = function (value) {
        let tds = this.table.getElementsByTagName('td');
        tds = [...tds];
        tds.map(td => {
            td.style.borderWidth = value + 'px';
        });

        tableDirectives.setDirective(['innerBorders', 'borderWidth'], value);
        tableDirectives.setDirective(['innerBorders', 'active'], 'all');
    }

    this.spaceBorderSpacingExchange = function (typeNumber) {
        if(this.table.style.borderSpacing) {
            if((typeNumber === 2 && !tableDirectives.getDirective(['innerBorders', 'borderSpacing', 'exchangeNum'])) ||
                (typeof tableDirectives.getDirective(['innerBorders', 'borderSpacing', 'exchangeNum']) === 'number' &&
                    tableDirectives.getDirective(['innerBorders', 'borderSpacing', 'exchangeNum']) !== typeNumber)){
                this.table.style.borderSpacing = this.table.style.borderSpacing.split(' ').reverse().join(' ');
                tableDirectives.setDirective(['innerBorders', 'borderSpacing', 'exchangeNum'], typeNumber);
            }
        }
    }

    this.rowBgColorReplaceToCellBgColor = function (color) {
        let borderRadiusVal = tableDirectives.getDirective(['innerBorders', 'borderRadiuses', tableDirectives.getDirective(['innerBorders', 'active'])]);
        let type;
        if(borderRadiusVal > 0) {
            type = true;
        } else {
            type = false;
        }
        // if(type && this.table.dataset.rowsBgColorSetToCells && !color) {
        //     return;
        // } else if(type) {
        //     this.table.dataset.rowsBgColorSetToCells = '1';
        // } else if(this.table.dataset.rowsBgColorSetToCells){
        //     delete this.table.dataset.rowsBgColorSetToCells;
        // } else {
        //     return;
        // }
        let trs = this.table.querySelectorAll('tr');

        for (let i = 0; i < trs.length; i++) {
            let tr = trs[i];
            if(!tr) continue;
            // @deprecated
            // let tds = tr.querySelectorAll('td');

            let rowBgColor;
            if(!tr.dataset.wptbBgColor) {
                let trStyles = window.getComputedStyle(tr, null);
                rowBgColor = trStyles.getPropertyValue('background-color');
                // @deprecated in favor of background menu
                // tr.dataset.wptbBgColor = rowBgColor;
            } else {
                rowBgColor = tr.dataset.wptbBgColor;
            }
            if(type === true) {
                tr.style.backgroundColor = '#ffffff00';
            } else {
                tr.style.backgroundColor = tr.dataset.wptbBgColor ? tr.dataset.wptbBgColor : null;
            }

            // @deprecated
            // for(let j = 0; j < tds.length; j++) {
            //     let td = tds[j];
            //     if(type === true) {
            //         if(!td.dataset.wptbOwnBgColor) {
            //             td.style.backgroundColor = rowBgColor;
            //             td.dataset.wptbBgColorFromRow = rowBgColor;
            //         }
            //     } else {
            //         if(!td.dataset.wptbOwnBgColor) {
            //             td.style.backgroundColor = null;
            //             delete td.dataset.wptbBgColorFromRow;
            //         }
            //     }
            // }
        }
    }

    this.changeRowBgColor = function (tblRow, selector) {
        const bgColor = selector.dataset.wptbRowBgColor;
        const orgColor = tblRow.getAttribute('org-bg-color');

        if (bgColor) {
            // @deprecated in favor of background menu
            // tblRow.dataset.wptbBgColor = bgColor;

            if (orgColor) tblRow.setAttribute('org-bg-color', bgColor);
            else tblRow.style.backgroundColor = bgColor;
        }
    }
    
    this.changeColumnBgColor = function (selector) {
        const index = parseInt(selector.dataset.xIndex) + 1;
        const bgColor = selector.dataset.wptbColumnBgColor;
        const trs = this.table.querySelectorAll('tr');

        trs.forEach(tr => {
            let td = tr.querySelector(`td:nth-child(${index})`);
            
            if (!td.dataset.wptbOwnBgColor) td.style.backgroundColor = bgColor;
        });
    }
}
