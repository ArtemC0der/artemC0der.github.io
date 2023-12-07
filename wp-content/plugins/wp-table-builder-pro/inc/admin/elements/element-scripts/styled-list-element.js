let lis = element.getElementsByTagName('li');
if (lis.length > 0) {
    for (let i = 0; i < lis.length; i++) {
        lis[i].classList.add('wptb-in-element');

        lis[i].addEventListener('mouseenter', dynamicTooltipCalculations);

        let tinyMceInitStart = function () {
            let listItemContent = lis[i].getElementsByClassName('wptb-styled-list-item-content');
            if (listItemContent.length > 0) {
                listItemsTinyMceInit(listItemContent[0]);
            }

            lis[i].removeEventListener('mouseover', tinyMceInitStart, false);
        }

        lis[i].addEventListener('mouseover', tinyMceInitStart, false);
    }
}


// function listItemsRecalculateIndex ( ulElem ) {
//     let par = ulElem.querySelectorAll( 'p' );
//     if ( par.length > 0 ) {
//         for ( let i = 0; i < par.length; i++ ) {
//             par[i].dataset.listStyleTypeIndex = Number( i ) + 1 + '.';
//         }
//     }
// }

// let ulElem = element.getElementsByTagName( 'ul' );
// if( ulElem.length > 0 ) {
//     ulElem = ulElem[0];
//     listItemsRecalculateIndex( ulElem );
// }

function listItemsTinyMceInit(listItem) {
    tinyMCE.init({
        target: listItem,
        inline: true,
        plugins: "link, paste",
        dialog_type: "modal",
        theme: 'modern',
        menubar: false,
        fixed_toolbar_container: '#wpcd_fixed_toolbar',
        paste_as_text: true,
        toolbar: 'bold italic strikethrough link unlink | alignleft aligncenter alignright alignjustify',
        setup: function (ed) {
            ed.on('keydown', function (e) {
                let article = WPTB_Helper.getParentOfType('li', e.target);
                if (e.keyCode == 13) {
                    e.preventDefault();

                    if (article) {
                        let duplicate = {};
                        let elementCopy = article.cloneNode(true);
                        duplicate.getDOMElement = function () {
                            return elementCopy;
                        }

                        applyGenericItemSettings(duplicate);
                        e.target.querySelector('p').innerText = 'New List Item';
                        article.parentNode.insertBefore(elementCopy, article);
                        elementCopy.classList.remove('wptb-directlyhovered');
                        article.classList.remove('wptb-directlyhovered');
                        WPTB_Helper.elementClearFromTinyMce(elementCopy);

                        let listItemContent = elementCopy.getElementsByClassName('wptb-styled-list-item-content');
                        if (listItemContent.length > 0) {
                            listItemsTinyMceInit(listItemContent[0]);
                            listItemContent[0].parentNode.addEventListener('mouseenter', dynamicTooltipCalculations)
                        }

                        //listItemsRecalculateIndex( article.parentNode );

                        let wptbTableStateSaveManager = new WPTB_TableStateSaveManager();
                        wptbTableStateSaveManager.tableStateSet();
                    }
                } else {
                    let p = e.target.querySelector('p');
                    let pText = p.innerHTML.replace(/<[^>]+>/g, '');
                    pText = pText.replace(/\s+/g, ' ').trim();
                    pText = pText.replace(/&nbsp;/g, '').trim();

                    if (e.keyCode == '8' || e.keyCode == '46') {
                        if (pText == '') {
                            e.preventDefault();
                            e.target.querySelector('p').innerText = '\n';
                        } else {
                            let selectedText = WPTB_Helper.getSelectionText();
                            selectedText = selectedText.replace(/\s+/g, ' ').trim();
                            selectedText = selectedText.replace(/&nbsp;/g, '').trim();
                            if (selectedText == pText) {
                                e.preventDefault();
                                e.target.querySelector('p').innerText = '\n';
                            }
                        }
                    }

                    if (!window.listItemPTextKeyDown) {
                        window.listItemPTextKeyDown = pText;
                    }
                }
            });
            ed.on('keyup', function (e) {
                if (e.keyCode != 13) {
                    let p = e.target.querySelector('p');
                    let pText = p.innerHTML.replace(/<[^>]+>/g, '');
                    pText = pText.replace(/\s+/g, ' ').trim();
                    pText = pText.replace(/&nbsp;/g, '').trim();
                    if (pText !== window.listItemPTextKeyDown) {
                        e.target.onblur = function () {
                            let wptbTableStateSaveManager = new WPTB_TableStateSaveManager();
                            wptbTableStateSaveManager.tableStateSet();

                            window.listItemPTextKeyDown = '';
                            e.target.onblur = '';
                        }
                    } else {
                        e.target.onblur = '';
                    }
                }
            });

            ed.on('click', (e) => {
                const liElem = WPTB_Helper.getParentOfType('li', e.target);
                const ulElem = WPTB_Helper.getParentOfType('ul', liElem);

                const nodes = Array.prototype.slice.call(ulElem.children);
                const listIndex = nodes.indexOf(liElem) || 0;

                window.setTimeout(() => {
                    const tooltip = liElem.querySelector('.tooltip')
                    const tooltipText = tooltip ? tooltip.innerHTML : ''
                    let infArr = element.className.match(/wptb-element-((.+-)\d+)/i);

                    if (infArr.length) {
                        const settingElement = document.querySelector('textarea.wptb-el-' + infArr[1] + '-tooltip')
                        settingElement.setAttribute('list-index', listIndex)
                        settingElement.value = tooltipText

                        const tooltipSetting = document.querySelector('select.wptb-el-' + infArr[1] + '-tPosition')
                        const classes = liElem.classList

                        if (classes.contains('wptb-tooltip-right')) {
                            tooltipSetting.value = 'right'
                        } else if (classes.contains('wptb-tooltip-left')) {
                            tooltipSetting.value = 'left'
                        } else if (classes.contains('wptb-tooltip-bottom')) {
                            tooltipSetting.value = 'bottom'
                        } else if (classes.contains('wptb-tooltip-top')) {
                            tooltipSetting.value = 'top'
                        } else {
                            liElem.classList.add('wptb-tooltip-top')
                            tooltipSetting.value = 'top'
                        }
                    }
                }, 100)


            })
        },
        init_instance_callback: function (editor) {
            window.currentEditor = editor;
            editor.on('focus', function (e) {
                var totalWidth = document.getElementsByClassName('wptb-builder-panel')[0].offsetWidth;
                if (window.currentEditor &&
                    document.getElementById('wptb_builder').scrollTop >= 55 &&
                    window.currentEditor.bodyElement.style.display != 'none') {
                    document.getElementById('wpcd_fixed_toolbar').style.position = 'fixed';
                    document.getElementById('wpcd_fixed_toolbar').style.right = (totalWidth / 2 - document.getElementById('wpcd_fixed_toolbar').offsetWidth / 2) + 'px';
                    document.getElementById('wpcd_fixed_toolbar').style.top = '100px';
                } else {
                    document.getElementById('wpcd_fixed_toolbar').style.position = 'static';
                    delete document.getElementById('wpcd_fixed_toolbar').style.right;
                    delete document.getElementById('wpcd_fixed_toolbar').style.top;
                }
            });
        }
    });
}

function liCopyHandler(li, element) {
    // let ulElem = element.getElementsByTagName( 'ul' );
    // if( ulElem.length > 0 ) {
    //     ulElem = ulElem[0];
    //     listItemsRecalculateIndex( ulElem );
    // }

    if (li) {
        let listItemContent = li.getElementsByClassName('wptb-styled-list-item-content');
        if (listItemContent.length > 0) {
            listItemsTinyMceInit(listItemContent[0]);
        }
    }
}

WPTB_Helper.innerElementCopyIncludeHandler(element, liCopyHandler);

/**
 * @deprecated
 */
function controlsChange(inputs, element) {
    if (inputs && typeof inputs === 'object') {
            let lIndex = 0;
            let infArr = element.className.match(/wptb-element-((.+-)\d+)/i);
            if (infArr.length) {
                const settingElement = document.querySelector('textarea.wptb-el-' + infArr[1] + '-tooltip')
                lIndex = settingElement.getAttribute('list-index')
            }

            const li = element.querySelector(`li:nth-child(${parseInt(lIndex) + 1})`)
            let tooltip = li.querySelector('.tooltip')
            if (!tooltip) {
                tooltip = document.createElement('div')
                tooltip.classList.add('tooltip')
                const tooltipRelativeParent = li.querySelector('.wptb-styled-list-li-inner-wrap');
                tooltipRelativeParent.appendChild(tooltip)
                tooltip = li.querySelector('.tooltip')
            }
            if (inputs['tooltip'] && inputs['tooltip'].length > 0) {
                li.classList.add('wptb-tooltip')
                tooltip.innerHTML = inputs['tooltip']
            }

            let position = 'top';
            if (inputs['tPosition']) {
                li.classList.remove('wptb-tooltip-left');
                li.classList.remove('wptb-tooltip-top');
                li.classList.remove('wptb-tooltip-bottom');
                li.classList.remove('wptb-tooltip-right');
                li.classList.add('wptb-tooltip-' + inputs['tPosition'])
                position = inputs['tPosition']
            } else {
                if (li.classList.contains('wptb-tooltip-left')) {
                    position = 'left'
                } else if (li.classList.contains('wptb-tooltip-right')) {
                    position = 'right'
                } else if (li.classList.contains('wptb-tooltip-bottom')) {
                    position = 'bottom'
                }
            }

            // positioning
            window.setTimeout(() => {
                tooltipPosition(li, position)
            }, 50);
        }
}

/**
 * Calculate tooltip add dynamic events.
 *
 * Should be bind to list element.
 *
 * @param {Event} e event object
 */
function dynamicTooltipCalculations(e) {
    const liEl = e.target;
    if (liEl.classList.contains('wptb-tooltip')) {
        const classList = Array.from(liEl.classList);

        let alignment = null;

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

        if (alignment !== null) {
            tooltipPosition(liEl, alignment);
        }
    }
}

function tooltipPosition(li, position) {
    const tooltip = li.querySelector('.tooltip');
    const textElement = li.querySelector('p');

    // tip padding value
    const tooltipTipPad = 10;

    // save html content of text element for future restore
    const savedInnerHtml = textElement.innerHTML;

    // wrapping text content of p element with a span value to calculate the correct size for its text content
    textElement.innerHTML = `<span id="sizeCalculator">${savedInnerHtml}</span>`;

    const textPosObj = textElement.querySelector('#sizeCalculator').getBoundingClientRect();
    const liPosObject = li.getBoundingClientRect();

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
    if (position === 'left' || position === 'right') {
        calculatedPos.top = textElementRelativePosObj.top - (tooltip.offsetHeight / 2) + (textPosObj.height / 2) - (tooltipTipPad/2);

        // position left multiplier
        const posXAxisLeft = -(tooltip.offsetWidth + tooltipTipPad);

        // position right multiplier
        const posXAxisRight = textPosObj.width + tooltipTipPad;

        const multiplier = position === 'left' ? posXAxisLeft : posXAxisRight;
        calculatedPos.left = textElementRelativePosObj.left + multiplier;
    } else {
        calculatedPos.left = textElementRelativePosObj.left + (textPosObj.width / 2) - (tooltip.offsetWidth / 2);

        // position top multiplier
        const posYAxisTop = -(tooltip.offsetHeight + tooltipTipPad);

        // position bottom multiplier
        const posYAxisBottom = textPosObj.height + tooltipTipPad;

        const multiplier = position === 'top' ? posYAxisTop : posYAxisBottom;
        calculatedPos.top = textElementRelativePosObj.top + multiplier;
    }

    textElement.innerHTML = savedInnerHtml;

    tooltip.setAttribute('style', `left: ${calculatedPos.left}px; top: ${calculatedPos.top}px`);
}

WPTB_Helper.controlsInclude(element, controlsChange);
