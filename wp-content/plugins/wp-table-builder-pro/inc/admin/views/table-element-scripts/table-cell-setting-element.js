function controlsChange(inputs, element) {
    if (inputs && typeof inputs === 'object') {
        let table = WPTB_Helper.findAncestor(element, 'wptb-preview-table'),
            bordersManage = new WPTB_BordersManage({table: table}),
            highlighted = table.querySelector('.wptb-highlighted');
        if (highlighted) {
            let infArr = highlighted.className.match(/wptb-element-((.+-)\d+)/i);

            let controlUnicClassCommonPart = '';
            if (infArr && Array.isArray(infArr)) {
                controlUnicClassCommonPart = infArr[1]
            }

            if (inputs.hasOwnProperty('cellWidth')) {
                table.addColumnWidth(inputs.cellWidth);

                if (controlUnicClassCommonPart) {
                    let cellWidthFixedControl = document.querySelector(`.wptb-el-${controlUnicClassCommonPart}-cellWidthFixed`);

                    if (cellWidthFixedControl && !cellWidthFixedControl.checked) cellWidthFixedControl.checked = true;
                }
            } else if (inputs.hasOwnProperty('cellWidthFixed')) {
                if (inputs.cellWidthFixed == 'checked') {
                    let width = WPTB_Helper.getColumnWidth(table, highlighted);
                    table.addColumnWidth(width);
                } else {
                    table.addColumnWidth(false, true);
                }
            } else if (inputs.hasOwnProperty('cellHeight')) {
                table.addRowHeight(inputs.cellHeight);

                if (controlUnicClassCommonPart) {
                    let cellWidthFixedControl = document.querySelector(`.wptb-el-${controlUnicClassCommonPart}-cellHeightFixed`);

                    if (cellWidthFixedControl && !cellWidthFixedControl.checked) cellWidthFixedControl.checked = true;
                }
            } else if (inputs.hasOwnProperty('cellHeightFixed')) {
                if (inputs.cellHeightFixed == 'checked') {
                    let height = WPTB_Helper.getRowHeight(table, highlighted);
                    table.addRowHeight(height);
                } else {
                    table.addRowHeight(false, true);
                }
            } else if (inputs.hasOwnProperty('cellBackgroundColor')) {
                bordersManage.rowBgColorReplaceToCellBgColor();
            } else if (inputs.hasOwnProperty('rowBackgroundColor')) {
                bordersManage.changeRowBgColor(element.parentNode, element);
            } else if (inputs.hasOwnProperty('columnBackgroundColor')) {
                bordersManage.changeColumnBgColor(element);
            } else if (inputs.hasOwnProperty('emptyCell')) {
                const tr = highlighted.parentNode;
                if (inputs.emptyCell == 'checked') {
                    const parentRow = highlighted.parentNode;
                    const rowBg = parentRow.style?.backgroundColor;

                    const highlightedColor =  highlighted.style?.backgroundColor;
                    // color value that will be used on revert operation
                    let beforeEmptyColor = (highlightedColor && highlightedColor!== '') ? highlightedColor : (rowBg || '');
                    highlighted.dataset.wptbBeforeEmptyColor = beforeEmptyColor;

                    highlighted.classList.add('wptb-empty');

                    if (rowBg && rowBg !== '') {
                        parentRow.style.backgroundColor = 'transparent';

                        const siblings = Array.from(parentRow.childNodes).filter(child => {
                            return child !== highlighted;
                        })

                        siblings.map(sibling => {
                            const ownBgColor = sibling.dataset.wptbOwnBgColor;

                            if (!ownBgColor) {
                                sibling.dataset.wptbOwnBgColor = rowBg;
                                sibling.style.backgroundColor = rowBg;
                            }
                        })
                    }

                    // give an info message about color transfer
                    WPTB_NotificationManager.sendNotification({
                        message: 'Color of current row is transferred to sibling cells.',
                        type: 'info'
                    })

                    // @deprecated
                    // const styles = window.getComputedStyle(tr, [])
                    // const bgColor = styles.getPropertyValue('background-color');
                    // const orgColor = tr.getAttribute('org-bg-color');
                    // if (!orgColor) {
                    //     tr.setAttribute('org-bg-color', bgColor)
                    // }
                    // tr.style.background = 'transparent';
                    // tr.classList.add('has-empty')
                } else {
                    highlighted.classList.remove('wptb-empty');
                    tr.classList.remove('has-empty');

                    // revert original color of previously empty cell
                    const beforeColor = highlighted.dataset.wptbBeforeEmptyColor
                    highlighted.style.backgroundColor = beforeColor;
                    highlighted.dataset.wptbOwnBgColor = beforeColor;

                    // @deprecated
                    // const orgColor = tr.getAttribute('org-bg-color');
                    //
                    // if (orgColor) {
                    //     tr.style.backgroundColor = orgColor;
                    // }
                }
            }
        }
    }
}

WPTB_Helper.controlsInclude(element, controlsChange);
