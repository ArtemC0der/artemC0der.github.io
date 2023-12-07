function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(r="Object"===r&&e.constructor?e.constructor.name:r)||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _iterableToArray(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,o=new Array(t);r<t;r++)o[r]=e[r];return o}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var WPTB_BordersManage=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},t=e.table;this.table=e.table,WPTB_RecalculateIndexes(t);var n=this;this.itemsPerHeader=0,this.tableMaxCols=t.maxCols,this.cellsStylesScheme={};var c=new WPTB_TableDirectives(t);this.bordersInitialization=function(e){var t,r,o,l;"row"===c.getDirective(["innerBorders","active"])?(t="row",r="column"):"column"===c.getDirective(["innerBorders","active"])&&(t="column",r="row"),c.getDirective(["innerBorders","borderRadiuses"])&&(o=c.getDirective(["innerBorders","borderRadiuses",c.getDirective(["innerBorders","active"])])),t&&"string"==typeof t&&r&&"string"==typeof r&&("object"===_typeof(l=WPTB_GetDirectionAfterReconstruction(this.table,t,r,"column",e))&&l.hasOwnProperty("switch")&&this.table.addEventListener("table:rebuilt",function(e){!function(e){var t=l.switch(e);"object"===_typeof(t)&&(this.itemsPerHeader=t.itemsPerHeader,t.hasOwnProperty("newTable")?(e=this.table,this.table=t.newTable,this.switchBorderOnlyColumnRow(t.type[0]),this.borderRadiusesSet(t.type[0],o),this.spaceBorderSpacingExchange(t.type[1]),this.table=e):(this.switchBorderOnlyColumnRow(t.type[0]),this.borderRadiusesSet(t.type[0],o),this.spaceBorderSpacingExchange(t.type[1])))}.call(n,e)},!1))},this.borderRadiusesSet=function(e,t){parseInt(t,10)||(t=null);var r,o=this.table.querySelectorAll("td"),o=_toConsumableArray(o);if("all"===e)c.setDirective(["innerBorders","borderRadiuses","all"],t),t&&(t+="px"),o.map(function(e){e.style.borderRadius=t});else if("row"===e)c.setDirective(["innerBorders","borderRadiuses","row"],t),o.map(function(e){e.style.borderRadius=null}),t&&(r=this.table.querySelectorAll("tr td:first-child"),(r=_toConsumableArray(r)).map(function(e){e.style.borderTopLeftRadius=t+"px",e.style.borderBottomLeftRadius=t+"px"}),r=this.table.querySelectorAll("tr td:last-child"),(r=_toConsumableArray(r)).map(function(e){e.style.borderTopRightRadius=t+"px",e.style.borderBottomRightRadius=t+"px"}));else if("column"===e&&(c.setDirective(["innerBorders","borderRadiuses","column"],t),o.map(function(e){e.style.borderRadius=null}),t))for(var l=this.table.rows.length,n=0;0<l;){var i=this.table.querySelectorAll('[data-y-index="'.concat(n,'"]'));(i=_toConsumableArray(i)).map(function(e){e.style.borderTopLeftRadius=t+"px",e.style.borderTopRightRadius=t+"px"});i=void 0,i=this.itemsPerHeader&&n+this.itemsPerHeader<l&&n+1<l?this.table.querySelectorAll('[data-y-index="'.concat(n+this.itemsPerHeader,'"]')):this.table.querySelectorAll("tr:last-child td");(i=_toConsumableArray(i)).map(function(e){e.style.borderBottomLeftRadius=t+"px",e.style.borderBottomRightRadius=t+"px"}),this.itemsPerHeader?(l-=this.itemsPerHeader+1,n+=this.itemsPerHeader+1):l=0}},this.switchBorderOnlyColumnRow=function(e){var d=this,t=c.getDirective(["innerBorders","borderWidth"]);if(this.innerBordersSet(t),"row"===e){var r=this.table.rows,o=0;0<r.length&&(t=r[0].children,t=(t=_toConsumableArray(t))[t.length-1],o=parseInt(t.dataset.xIndex)+t.colSpan),(r=_toConsumableArray(r)).map(function(e){e=e.children;(e=_toConsumableArray(e)).map(function(e){null===e.previousSibling?e.colSpan<o&&(e.style.borderRightWidth="0px"):(null===e.nextSibling||(e.style.borderRightWidth="0px"),e.style.borderLeftWidth="0px")})}),c.setDirective(["innerBorders","active"],"row")}else if("column"===e){r=function(){var t=d.table.rows.length;if(t<=1)return{v:void 0};for(var e=d.table.rows.length,r=0;0<e;){var o=d.table.querySelectorAll('[data-y-index="'.concat(r,'"]'));(o=_toConsumableArray(o)).map(function(e){e.rowSpan<t&&(e.style.borderBottomWidth="0px")});var l=[],o=void 0;if(d.itemsPerHeader&&r+d.itemsPerHeader<e&&r+1<e){for(var n=r+1;n<r+d.itemsPerHeader;n++)var i=d.table.querySelectorAll('[data-y-index="'.concat(n,'"]')),i=_toConsumableArray(i),l=l.concat(i);o=d.table.querySelectorAll('[data-y-index="'.concat(r+d.itemsPerHeader,'"]'))}else{for(var a=r+1;a<d.table.rows.length-1;a++){var s=d.table.querySelectorAll('[data-y-index="'.concat(a,'"]')),s=_toConsumableArray(s);l=l.concat(s)}o=d.table.querySelectorAll("tr:last-child td")}l.map(function(e){e.style.borderTopWidth="0px",e.style.borderBottomWidth="0px"}),(o=_toConsumableArray(o)).map(function(e){e.style.borderTopWidth="0px"}),d.itemsPerHeader?(e-=d.itemsPerHeader+1,r+=d.itemsPerHeader+1):e=0}c.setDirective(["innerBorders","active"],"column")}();if("object"===_typeof(r))return r.v}else"all"==e&&c.setDirective(["innerBorders","active"],"all")},this.innerBordersSet=function(t){var e=this.table.getElementsByTagName("td");(e=_toConsumableArray(e)).map(function(e){e.style.borderWidth=t+"px"}),c.setDirective(["innerBorders","borderWidth"],t),c.setDirective(["innerBorders","active"],"all")},this.spaceBorderSpacingExchange=function(e){this.table.style.borderSpacing&&(2===e&&!c.getDirective(["innerBorders","borderSpacing","exchangeNum"])||"number"==typeof c.getDirective(["innerBorders","borderSpacing","exchangeNum"])&&c.getDirective(["innerBorders","borderSpacing","exchangeNum"])!==e)&&(this.table.style.borderSpacing=this.table.style.borderSpacing.split(" ").reverse().join(" "),c.setDirective(["innerBorders","borderSpacing","exchangeNum"],e))},this.rowBgColorReplaceToCellBgColor=function(e){for(var t=0<c.getDirective(["innerBorders","borderRadiuses",c.getDirective(["innerBorders","active"])]),r=this.table.querySelectorAll("tr"),o=0;o<r.length;o++){var l=r[o];l&&(l.dataset.wptbBgColor||window.getComputedStyle(l,null).getPropertyValue("background-color"),l.style.backgroundColor=!0===t?"#ffffff00":l.dataset.wptbBgColor||null)}},this.changeRowBgColor=function(e,t){var r=t.dataset.wptbRowBgColor,t=e.getAttribute("org-bg-color");r&&(t?e.setAttribute("org-bg-color",r):e.style.backgroundColor=r)},this.changeColumnBgColor=function(e){var t=parseInt(e.dataset.xIndex)+1,r=e.dataset.wptbColumnBgColor;this.table.querySelectorAll("tr").forEach(function(e){e=e.querySelector("td:nth-child(".concat(t,")"));e.dataset.wptbOwnBgColor||(e.style.backgroundColor=r)})}};function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(r="Object"===r&&e.constructor?e.constructor.name:r)||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _iterableToArray(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,o=new Array(t);r<t;r++)o[r]=e[r];return o}var WPTB_ColumnMove=function(){var x=this;this.rowMovingField,this.withdrawTable,this.tablePreview,this.tBody,this.body,this.setTimeoutWhenStopMove,this.wptbHeaderCoordinates,this.wptbContainer,this.setTimeoutScrollTop,this.autoScroll=!1,this.eventMove,this.columnMovingFieldPutActive=function(){var e,t=document.getElementsByClassName("wptb-column-moving-field"),r=document.getElementsByTagName("body")[0];x.body=r,0<t.length?x.columnMovingField=t[0]:((t=document.createElement("div")).classList.add("wptb-column-moving-field"),(e=document.createElement("div")).classList.add("column-visual-button-box"),e.innerHTML='<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" \n                    x="0px" y="0px" width="30" height="30" viewBox="0 0 511.626 511.627" \n                    style="enable-background:new 0 0 511.626 511.627;" xml:space="preserve">\n                    <path d="M506.203,242.966l-73.087-73.089c-3.621-3.617-7.902-5.424-12.847-5.424c-4.949,0-9.233,1.807-12.854,5.424\n                       c-3.613,3.616-5.42,7.898-5.42,12.847v36.547H109.636v-36.547c0-4.949-1.809-9.231-5.426-12.847   \n                    c-3.619-3.617-7.902-5.424-12.85-5.424c-4.947,0-9.23,1.807-12.847,5.424L5.424,242.966C1.809,246.58,0,250.865,0,255.813   \n                    c0,4.947,1.809,9.232,5.424,12.845l73.089,73.091c3.617,3.613,7.897,5.424,12.847,5.424c4.952,0,9.234-1.811,12.85-5.424   \n                    c3.617-3.614,5.426-7.898,5.426-12.847v-36.549h292.359v36.549c0,4.948,1.807,9.232,5.42,12.847   \n                    c3.621,3.613,7.905,5.424,12.854,5.424c4.944,0,9.226-1.811,12.847-5.424l73.087-73.091c3.617-3.613,5.424-7.898,5.424-12.845   \n                    C511.626,250.865,509.82,246.58,506.203,242.966z" style="fill:#FFFFFF"></path></svg>',(o=e.cloneNode(!0)).classList.add("column-visual-button-box-top"),t.appendChild(e),t.appendChild(o),r.appendChild(t),x.columnMovingField=t),t.deleteEventHandlers=function(){document.getElementsByClassName("wptb-container")[0].removeEventListener("scroll",x.columnMovingFieldParametrsTwo,!1),window.removeEventListener("resize",x.columnMovingFieldParametrsTwo,!1)},x.wptbContainer||(x.wptbContainer=document.getElementsByClassName("wptb-container")[0]);var o=x.wptbContainer,t=document.getElementsByClassName("wptb-highlighted");0<t.length&&(t=t[0],x.columnMovingFieldParametrsOne(),x.columnMovingFieldParametrsTwo()),o.addEventListener("scroll",x.columnMovingFieldParametrsTwo,!1),window.addEventListener("resize",x.columnMovingFieldParametrsTwo,!1),r.addEventListener("click",x.checkHighlighted,!1);function i(e){x.withdrawColumnTableContainer||(x.withdrawTableContainer=document.querySelector(".wptb-withdraw-column-table-container")),x.withdrawTableContainer.style.display="block",x.columnMovingField||(x.columnMovingField=document.querySelector(".wptb-column-moving-field"));var t=x.columnMovingField,r=t.downXcoordinates-e.clientX,o=parseFloat(t.positionLeft)-parseFloat(r),l=o+parseFloat(t.width);x.tablePreview||(x.tablePreview=document.querySelector(".wptb-preview-table"));var n=x.tablePreview,e=parseFloat(n.getBoundingClientRect().left),r=parseFloat(n.getBoundingClientRect().right);t.style.left=o+"px",20<=e-parseFloat(t.style.left)?t.style.left=e-20+"px":20<=parseFloat(t.style.left)+parseFloat(t.width)-r&&(t.style.left=r-parseFloat(t.width)+20+"px");var i=n.querySelector("tbody"),a=[];if(0<i.getElementsByClassName("wptb-column-moving").length){if(t.columnsLeftRightCoordinatesArr.left&&parseInt(t.columnsLeftRightCoordinatesArr.left[1],10)>=o){for(var s=0;s<i.children.length;s++){a[s]=[];for(var d=i.children[s].getElementsByClassName("wptb-column-moving"),c=0;c<d.length;c++)a[s].push(d[c])}x.cutTableVertically(t.columnsLeftRightCoordinatesArr.left[0]);for(var u=0;u<a.length;u++)for(var p=0;p<a[u].length;p++)i.children[u].removeChild(a[u][p]);for(var h=0;h<a.length;h++)for(var b=0;b<a[h].length;b++){for(var m=void 0,g=t.columnsLeftRightCoordinatesArr.left[0];g<n.maxCols&&!(m=i.children[h].querySelector('[data-x-index="'+g+'"]'));g++);i.children[h].insertBefore(a[h][b],m)}n.recalculateIndexes(),x.glueTableVertically(),t.columnsLeftRightCoordinatesArr=A()}else if(t.columnsLeftRightCoordinatesArr.right&&parseInt(t.columnsLeftRightCoordinatesArr.right[1],10)<=l){for(var v=0;v<i.children.length;v++){a[v]=[];for(var w=i.children[v].getElementsByClassName("wptb-column-moving"),y=0;y<w.length;y++)a[v].push(w[y])}x.cutTableVertically(t.columnsLeftRightCoordinatesArr.right[0]+1);for(var f=0;f<a.length;f++)for(j=0;j<a[f].length;j++)i.children[f].removeChild(a[f][j]);for(var C=0;C<a.length;C++)for(var S=0;S<a[C].length;S++){for(var T=void 0,B=t.columnsLeftRightCoordinatesArr.right[0]+1;B<n.maxCols&&!(T=i.children[C].querySelector('[data-x-index="'+B+'"]'));B++);i.children[C].insertBefore(a[C][S],T)}n.recalculateIndexes(),x.glueTableVertically(),t.columnsLeftRightCoordinatesArr=A()}WPTB_Helper.wptbDocumentEventGenerate("wp-table-builder/table-changed/after",n)}}function A(e){var a=document.querySelector(".wptb-preview-table"),t=a.querySelector(".wptb-highlighted"),r=t.colSpan,o=[];function s(e,t){if(0<=e+t&&e+t<=a.maxCols){for(var r,o,l,n=a.querySelectorAll('[data-x-index="'+(e+t)+'"]'),i=0;i<n.length;i++){if(1==n[i].colSpan){r=n[i];break}(!r||n[i].colSpan<r.colSpan)&&(r=n)}return r?(t<0?(o=(7*r.getBoundingClientRect().left+3*r.getBoundingClientRect().right)/10,l=e-1):0<t&&(o=(3*r.getBoundingClientRect().left+7*r.getBoundingClientRect().right)/10,l=e+1),[l,o]):s(e+t,t)}return!1}return e=e||parseInt(t.dataset.xIndex,10),o.left=s(e,-1),o.right=s(e+r-1,1),o}x.columnMovingField.onmousedown=function(e){var n=document.getElementsByTagName("body")[0],t=document.querySelector(".wptb-row-moving-field");t&&(t.deleteEventHandlers(),n.removeChild(t)),x.columnMovingField.downXcoordinates=e.clientX,x.withdrawTable||(x.withdrawTable=x.withdrawSelectedColumnsFromTable());var r=document.querySelector(".wptb-preview-table");x.columnMovingField||(x.columnMovingField=document.querySelector(".wptb-column-moving-field"));t=x.columnMovingField;t&&((e=document.createElement("div")).classList.add("wptb-withdraw-column-table-container"),e.appendChild(x.withdrawTable),t.appendChild(e),e.style.position="absolute",e.style.top="30px",e.style.width="100%",r&&(e.style.height=r.getBoundingClientRect().height+"px"),WPTB_Helper.wptbDocumentEventGenerate("wp-table-builder/table-changed/after",r)),t.columnsLeftRightCoordinatesArr=A(),n.onmousemove=function(e){var t=document.querySelector(".wptb-column-moving-field");x.wptbTableSetup||(x.wptbTableSetup=document.getElementsByClassName("wptb-table-setup")[0]);var r=x.wptbTableSetup;x.wptbTableSetupCoordinates||(x.wptbTableSetupCoordinates=r.getBoundingClientRect());var o,l=x.wptbTableSetupCoordinates;clearInterval(t.setIntervalScrollLeft),10<l.left-t.getBoundingClientRect().left&&e.movementX<=0?(o=2,t.startScrollPositionY?t.startScrollPositionX-e.clientX<=0&&(o=0):t.startScrollPositionX=e.clientX,o?(document.querySelector(".wptb-preview-table"),x.eventMove=e,t.setIntervalScrollLeft=setInterval(function(){r.scrollLeft=parseFloat(r.scrollLeft)-5,t.columnsLeftRightCoordinatesArr=A(),i(e)},o),t.autoScroll=!0):clearInterval(t.setIntervalScrollLeft)):10<t.getBoundingClientRect().right-l.right&&0<e.movementX?(l=2,t.startScrollPositionY?e.clientX-t.startScrollPositionX<=0&&(l=0):t.startScrollPositionX=e.clientX,l?(t.setIntervalScrollLeft=setInterval(function(){r.scrollLeft=parseFloat(r.scrollLeft)+5,t.columnsLeftRightCoordinatesArr=A(),i(e)},l),t.autoScroll=!0):clearInterval(t.setIntervalScrollLeft)):clearInterval(t.setIntervalScrollLeft),t&&(n.onmouseup=function(){var e=document.querySelector(".wptb-column-moving-field");e&&(n.removeChild(e),x.withdrewColumnsPut(),x.withdrawTable=null),clearInterval(e.setIntervalScrollLeft),n.onmouseup=null,n.onmousemove=null;e=document.querySelector(".wptb-preview-table");e.undoSelect(),WPTB_Helper.wptbDocumentEventGenerate("wp-table-builder/table-changed/after",e),(new WPTB_TableStateSaveManager).tableStateSet()},i(e))}}},this.columnMovingFieldParametrsOne=function(){var e=document.querySelector(".wptb-column-moving-field"),t=document.querySelector(".wptb-highlighted");e&&!e.autoScroll&&t&&(t=t.getBoundingClientRect(),x.columnMovingField.style.left=parseFloat(t.left)+"px",x.columnMovingField.positionLeft=parseFloat(t.left),x.columnMovingField.width=parseFloat(t.width))},this.columnMovingFieldParametrsTwo=function(){x.columnMovingFieldParametrsOne();var e,t=document.getElementsByClassName("wptb-highlighted");0<t.length&&(e=(t=t[0]).getBoundingClientRect(),t=parseFloat(e.width),x.columnMovingField.style.display="table",x.columnMovingField.style.width=t+"px",0<(e=document.getElementsByClassName("wptb-table-setup")).length&&(t=(e=e[0]).getBoundingClientRect(),x.columnMovingField.style.top=parseFloat(t.top)-30+"px",x.columnMovingField.querySelector(".column-visual-button-box-top").style.top=parseFloat(t.height)+30+"px",0<(t=x.columnMovingField.getElementsByClassName("wptb-table-setup")).length&&((t=t[0]).style.maxHeight=e.getBoundingClientRect().height+"px")))},this.movingfieldTransition=function(){var t=document.querySelector(".wptb-highlighted"),r=0,o=setInterval(function(){var e=t.getBoundingClientRect();x.columnMovingField.style.left=parseFloat(e.left)+"px",x.columnMovingField.positionLeft=parseFloat(e.left),200<r&&clearInterval(o),r+=3},3)},this.checkHighlighted=function(){var e=document.getElementsByClassName("wptb-highlighted"),t=document.getElementsByTagName("body")[0];1==e.length||(e=document.querySelector(".wptb-row-moving-field"))&&e.parentNode.removeChild(e),t.removeEventListener("click",x.checkHighlighted,!1)},this.rowMovingFieldHide=function(){var e=document.getElementsByClassName("wptb-row-moving-field");0<e.length&&((e=e[0]).style.display="none")},this.withdrawSelectedColumnsFromTable=function(){this.tablePreview||(this.tablePreview=document.querySelector(".wptb-preview-table"));var e=this.tablePreview,t=document.querySelector(".wptb-highlighted");if(e&&t){var r=t.colSpan,o=parseInt(t.dataset.xIndex,10),l=document.createElement("table"),n=document.createElement("tbody");l.appendChild(n),l.classList.add("wptb-preview-table");for(var i=_toConsumableArray(e.getElementsByClassName("wptb-width-which-need-add")),a=0;a<i.length;a++)i[a].classList.remove("wptb-width-which-need-add"),i[a].removeAttribute("data-width-which-need-add");for(var s=e.attributes,d=0;d<s.length;d++)l.setAttribute(s[d].nodeName,s[d].nodeValue);l.style.minWidth="",l.style.width="100%",r=r||1,this.cutTableVertically(o),this.cutTableVertically(o+r);for(var c=[],u=0;u<e.rows.length;u++){var p=e.rows[u].children,h=e.rows[u].getBoundingClientRect().height,b=l.insertRow(-1);b.classList.add("wptb-row"),b.style.height=h+"px",c[u]=[];for(var m=0;m<p.length;m++)if(!(p[m].dataset.xIndex<o)){if(p[m].dataset.xIndex>=o+r)break;p[m].dataset.wptbTdStyleBeforeMove=p[m].getAttribute("style"),p[m].classList.add("wptb-width-which-need-add"),c[u].push(p[m]);var g=p[m].cloneNode(!0);b.appendChild(g),p[m].style.backgroundColor="#d8d8d8",p[m].classList.add("wptb-column-moving"),0!=parseInt(p[m].dataset.yIndex)&&p[m].classList.add("wptb-td-border-top-moving"),parseInt(p[m].dataset.yIndex)+p[m].rowSpan!=e.rows.length&&p[m].classList.add("wptb-td-border-bottom-moving"),parseInt(p[m].dataset.xIndex)!=o&&p[m].classList.add("wptb-td-border-left-moving"),parseInt(p[m].dataset.xIndex)+p[m].colSpan!=o+r&&p[m].classList.add("wptb-td-border-right-moving")}}for(var v=window.getComputedStyle(t,null),w=v.getPropertyValue("padding-left"),y=v.getPropertyValue("padding-right"),f=0;f<c.length;f++)for(var C=0;C<c[f].length;C++)c[f][C].dataset.widthWhichNeedAdd=parseInt(c[f][C].getBoundingClientRect().width)-parseInt(parseInt(w))-parseInt(parseInt(y))-parseInt(t.style.borderWidth)/2+30/c[f].length;for(var S,T=e.querySelectorAll("[data-width-which-need-add]"),B=0;B<T.length;B++)T[B].style.width=T[B].dataset.widthWhichNeedAdd+"px";return"separate"===l.style.borderCollapse&&(n="2px",!(v=l.style.borderSpacing)||(S=v.split(" "))&&Array.isArray(S)&&(n=S[0].trim()),0<(S=l.getElementsByTagName("tbody")).length&&((S=S[0]).style.position="absolute",S.style.left="-"+n,S.style.right="-"+n,S.style.top="0px",S.style.bottom="0px")),l}return!1},this.cutTableVertically=function(e){this.tablePreview||(this.tablePreview=document.querySelector(".wptb-preview-table"));var t=this.tablePreview;e=parseInt(e,10),WPTB_CutGlueTable.cutTableVertically(e,t)},this.glueTableVertically=function(){this.tablePreview||(this.tablePreview=document.querySelector(".wptb-preview-table"));var e=this.tablePreview;WPTB_CutGlueTable.glueTableVertically(e)},this.withdrewColumnsPut=function(e){this.tablePreview||(this.tablePreview=document.querySelector(".wptb-preview-table"));var t=this.tablePreview;if(t){for(var r=_toConsumableArray(t.getElementsByClassName("wptb-column-moving")),o=0;o<r.length;o++)r[o].classList.remove("wptb-column-moving"),r[o].style.backgroundColor="",r[o].hasAttribute("data-wptb-td-style-before-move")?(r[o].setAttribute("style",r[o].dataset.wptbTdStyleBeforeMove),r[o].removeAttribute("data-wptb-td-style-before-move")):r[o].style.width="",r[o].removeAttribute("data-width-which-need-add"),r[o].classList.remove("wptb-width-which-need-add"),r[o].classList.remove("wptb-td-border-top-moving"),r[o].classList.remove("wptb-td-border-bottom-moving"),r[o].classList.remove("wptb-td-border-left-moving"),r[o].classList.remove("wptb-td-border-right-moving");if(this.glueTableVertically(),!e){for(var l=_toConsumableArray(t.getElementsByClassName("wptb-highlighted")),n=0;n<l.length;n++)l[n].classList.remove("wptb-highlighted");for(var i=_toConsumableArray(t.getElementsByTagName("td")),a=0;a<i.length;a++)i[a].hasAttribute("data-same-cell-before-division")&&i[a].removeAttribute("data-same-cell-before-division")}}},window.wptbColumnMove=this};function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(r="Object"===r&&e.constructor?e.constructor.name:r)||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _iterableToArray(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,o=new Array(t);r<t;r++)o[r]=e[r];return o}var WPTB_RowMove=function(){var g=this;this.rowMovingField,this.withdrawTable,this.tablePreview,this.tBody,this.body,this.setTimeoutWhenStopMove,this.wptbHeaderCoordinates,this.wptbContainer,this.setTimeoutScrollTop,this.autoScroll=!1,this.eventMove,this.rowMovingFieldPutActive=function(){var e,t=document.getElementsByClassName("wptb-row-moving-field"),r=document.getElementsByTagName("body")[0];g.body=r,0<t.length?g.rowMovingField=t[0]:((t=document.createElement("div")).classList.add("wptb-row-moving-field"),(e=document.createElement("div")).classList.add("row-visual-button-box"),e.innerHTML='<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" \n                    x="0px" y="0px" width="30" height="30" viewBox="0 0 511.626 511.627" \n                    style="enable-background:new 0 0 511.626 511.627;" xml:space="preserve">\n                    <path d="M328.906,401.994h-36.553V109.636h36.553c4.948,0,9.236-1.809,12.847-5.426c3.613-3.615,5.421-7.898,5.421-12.845 \n                        c0-4.949-1.801-9.231-5.428-12.851l-73.087-73.09C265.044,1.809,260.76,0,255.813,0c-4.948,0-9.229,1.809-12.847,5.424 \n                        l-73.088,73.09c-3.618,3.619-5.424,7.902-5.424,12.851c0,4.946,1.807,9.229,5.424,12.845c3.619,3.617,7.901,5.426,12.85,5.426 \n                        h36.545v292.358h-36.542c-4.952,0-9.235,1.808-12.85,5.421c-3.617,3.621-5.424,7.905-5.424,12.854 \n                        c0,4.945,1.807,9.227,5.424,12.847l73.089,73.088c3.617,3.617,7.898,5.424,12.847,5.424c4.95,0,9.234-1.807,12.849-5.424 \n                        l73.087-73.088c3.613-3.62,5.421-7.901,5.421-12.847c0-4.948-1.808-9.232-5.421-12.854 \n                        C338.142,403.802,333.857,401.994,328.906,401.994z" style="fill:#FFFFFF"></path>\n                </svg>',(o=e.cloneNode(!0)).classList.add("row-visual-button-box-left"),t.appendChild(e),t.appendChild(o),r.appendChild(t),g.rowMovingField=t),t.deleteEventHandlers=function(){document.getElementsByClassName("wptb-container")[0].removeEventListener("scroll",g.rowMovingFieldParametrsOne,!1),window.removeEventListener("resize",g.rowMovingFieldParametrsTwo,!1)},g.wptbContainer||(g.wptbContainer=document.getElementsByClassName("wptb-container")[0]);var o=g.wptbContainer,t=document.getElementsByClassName("wptb-highlighted");0<t.length&&(t=t[0],g.rowMovingFieldParametrsOne(),g.rowMovingFieldParametrsTwo()),o.addEventListener("scroll",g.rowMovingFieldParametrsOne,!1),window.addEventListener("resize",g.rowMovingFieldParametrsTwo,!1),r.addEventListener("click",g.checkHighlighted,!1);function i(e){g.withdrawTableContainer||(g.withdrawTableContainer=document.querySelector(".wptb-withdraw-row-table-container")),g.withdrawTableContainer.style.display="block",g.rowMovingField||(g.rowMovingField=document.querySelector(".wptb-row-moving-field"));var t=g.rowMovingField,r=t.downYcoordinates-e.clientY,o=parseFloat(t.positionTop)-parseFloat(r),l=o+parseFloat(t.height);g.tablePreview||(g.tablePreview=document.querySelector(".wptb-preview-table"));var n=g.tablePreview,e=parseFloat(n.getBoundingClientRect().top),r=parseFloat(n.getBoundingClientRect().bottom);t.style.top=o+"px",20<=e-parseFloat(t.style.top)?t.style.top=e-20+"px":20<=parseFloat(t.style.top)+parseFloat(t.height)-r&&(t.style.top=r-parseFloat(t.height)+20+"px");var i=n.querySelector("tbody"),a=i.getElementsByClassName("wptb-row-moving"),s=[];if(0<a.length){if(t.rowsTopBottomCoordinatesArr.top&&parseInt(t.rowsTopBottomCoordinatesArr.top[1],10)>=o){for(var d=0;d<a.length;d++)s.push(a[d]);for(var c=0;c<s.length;c++)i.removeChild(s[c]);console.log(t.rowsTopBottomCoordinatesArr.top[1]),g.cutTableHorizontally(t.rowsTopBottomCoordinatesArr.top[0]);for(var u=0;u<s.length;u++)i.insertBefore(s[u],n.rows[t.rowsTopBottomCoordinatesArr.top[0]+u]);n.recalculateIndexes(),n.rows[t.rowsTopBottomCoordinatesArr.top[0]+1]&&n.rows[t.rowsTopBottomCoordinatesArr.top[0]+2]&&g.glueTableHorizontally(n.rows[t.rowsTopBottomCoordinatesArr.top[0]+1],n.rows[t.rowsTopBottomCoordinatesArr.top[0]+2]),t.rowsTopBottomCoordinatesArr=m()}else if(t.rowsTopBottomCoordinatesArr.bottom&&parseInt(t.rowsTopBottomCoordinatesArr.bottom[1],10)<=l){for(var p=0;p<a.length;p++)s.push(a[p]);for(var h=0;h<s.length;h++)i.removeChild(s[h]);g.cutTableHorizontally(t.rowsTopBottomCoordinatesArr.bottom[0]-s.length);for(var b=0;b<s.length;b++)i.insertBefore(s[b],n.rows[t.rowsTopBottomCoordinatesArr.bottom[0]-s.length+b]);n.recalculateIndexes(),n.rows[t.rowsTopBottomCoordinatesArr.bottom[0]-3]&&n.rows[t.rowsTopBottomCoordinatesArr.bottom[0]-2]&&g.glueTableHorizontally(n.rows[t.rowsTopBottomCoordinatesArr.bottom[0]-3],n.rows[t.rowsTopBottomCoordinatesArr.bottom[0]-2]),t.rowsTopBottomCoordinatesArr=m()}WPTB_Helper.wptbDocumentEventGenerate("wp-table-builder/table-changed/after",n)}}function m(e){var t=document.querySelector(".wptb-preview-table"),r=t.querySelector(".wptb-highlighted"),o=r.rowSpan,l=[];return e=e||parseInt(r.dataset.yIndex,10),t.rows[e-1]&&(r=(7*t.rows[e-1].getBoundingClientRect().top+3*t.rows[e-1].getBoundingClientRect().bottom)/10,l.top=[e-1,r]),t.rows[e+o]&&(t=(3*t.rows[e+o].getBoundingClientRect().top+7*t.rows[e+o].getBoundingClientRect().bottom)/10,l.bottom=[e+o+1,t]),l}g.rowMovingField.onmousedown=function(e){var n=document.getElementsByTagName("body")[0],t=document.querySelector(".wptb-column-moving-field");t&&(t.deleteEventHandlers(),n.removeChild(t)),g.rowMovingField.downYcoordinates=e.clientY,g.withdrawTable||(g.withdrawTable=g.withdrawSelectedRowsFromTable());var r=document.querySelector(".wptb-preview-table");g.rowMovingField||(g.rowMovingField=document.querySelector(".wptb-row-moving-field"));t=g.rowMovingField;t&&((e=document.createElement("div")).classList.add("wptb-withdraw-row-table-container"),e.appendChild(g.withdrawTable),t.appendChild(e),e.style.position="absolute",e.style.right="30px",e.style.height="100%",r&&(e.style.width=r.getBoundingClientRect().width+"px",e.style.maxWidth=r.parentNode.getBoundingClientRect().width+"px",e.style.overflow="hidden",(e=e.querySelector(".wptb-preview-table"))&&(e.style.marginLeft=-r.parentNode.scrollLeft+"px"))),t.rowsTopBottomCoordinatesArr=m(),n.onmousemove=function(e){var t=document.querySelector(".wptb-row-moving-field");g.wptbHeaderCoordinates||(g.wptbHeaderCoordinates=n.querySelector(".wptb-header").getBoundingClientRect());var r=g.wptbHeaderCoordinates;g.wptbContainer||(g.wptbContainer=document.getElementsByClassName("wptb-container")[0]);var o,l=g.wptbContainer;clearInterval(t.setIntervalScrollTop),10<r.bottom-t.getBoundingClientRect().top&&e.movementY<=0?(o=2,t.startScrollPositionY?t.startScrollPositionY-e.clientY<=0&&(o=0):t.startScrollPositionY=e.clientY,o?(g.eventMove=e,t.setIntervalScrollTop=setInterval(function(){l.scrollTop=parseFloat(l.scrollTop)-5,t.rowsTopBottomCoordinatesArr=m(),i(e)},o),t.autoScroll=!0):clearInterval(t.setIntervalScrollTop)):10<t.getBoundingClientRect().bottom-n.getBoundingClientRect().bottom&&0<e.movementY?(o=2,t.startScrollPositionY?e.clientY-t.startScrollPositionY<=0&&(o=0):t.startScrollPositionY=e.clientY,o?(t.setIntervalScrollTop=setInterval(function(){l.scrollTop=parseFloat(l.scrollTop)+5,t.rowsTopBottomCoordinatesArr=m(),i(e)},o),t.autoScroll=!0):clearInterval(t.setIntervalScrollTop)):clearInterval(t.setIntervalScrollTop),t&&(n.onmouseup=function(){var e=document.querySelector(".wptb-row-moving-field");e&&(n.removeChild(e),g.withdrewRowsPut(),g.withdrawTable=null),clearInterval(e.setIntervalScrollTop),n.onmouseup=null,n.onmousemove=null;e=document.querySelector(".wptb-preview-table");e.undoSelect(),WPTB_Helper.wptbDocumentEventGenerate("wp-table-builder/table-changed/after",e),(new WPTB_TableStateSaveManager).tableStateSet()},i(e))}}},this.rowMovingFieldParametrsOne=function(){var e=document.querySelector(".wptb-row-moving-field"),t=document.querySelector(".wptb-highlighted");e&&!e.autoScroll&&t&&(t=t.getBoundingClientRect(),g.rowMovingField.style.top=parseFloat(t.top)+"px",g.rowMovingField.positionTop=parseFloat(t.top),g.rowMovingField.height=parseFloat(t.height))},this.rowMovingFieldParametrsTwo=function(){var e,t=document.getElementsByClassName("wptb-highlighted");0<t.length&&(e=(t=t[0]).getBoundingClientRect(),t=parseFloat(e.height),g.rowMovingField.style.display="table",g.rowMovingField.style.height=t+"px",0<(e=document.getElementsByClassName("wptb-table-setup")).length&&(t=(e=e[0]).getBoundingClientRect(),g.rowMovingField.style.left=parseFloat(t.right)+"px",g.rowMovingField.querySelector(".row-visual-button-box-left").style.left="-"+(parseFloat(t.width)+30)+"px",0<(t=g.rowMovingField.getElementsByClassName("wptb-table-setup")).length&&((t=t[0]).style.maxWidth=e.getBoundingClientRect().width+"px")))},this.movingfieldTransition=function(){var t=document.querySelector(".wptb-table-setup"),r=0,o=setInterval(function(){var e=t.getBoundingClientRect();g.rowMovingField.style.left=parseFloat(e.right)+"px",200<r&&clearInterval(o),r+=3},3)},this.checkHighlighted=function(){var e=document.getElementsByClassName("wptb-highlighted"),t=document.getElementsByTagName("body")[0];1!=e.length&&(rowMovingField=document.querySelector(".wptb-row-moving-field"),rowMovingField&&rowMovingField.parentNode.removeChild(rowMovingField)),t.removeEventListener("click",g.checkHighlighted,!1)},this.rowMovingFieldHide=function(){var e=document.getElementsByClassName("wptb-row-moving-field");0<e.length&&((e=e[0]).style.display="none")},this.withdrawSelectedRowsFromTable=function(){this.tablePreview||(this.tablePreview=document.querySelector(".wptb-preview-table"));var e=this.tablePreview,t=document.querySelector(".wptb-highlighted"),r=t.rowSpan,o=parseInt(t.dataset.yIndex,10),l=document.createElement("table"),n=document.createElement("tbody");if(l.appendChild(n),l.classList.add("wptb-preview-table"),e)for(var i=e.attributes,a=0;a<i.length;a++)l.setAttribute(i[a].nodeName,i[a].nodeValue);r=r||1,this.cutTableHorizontally(o),this.cutTableHorizontally(o+r);for(var s=[],d=o;d<o+r;d++){s.push(e.rows[d]);var c=e.rows[d],u=c.cloneNode(!0);c.children,u.children;n.appendChild(u),e.rows[d].style.height=d==c||d==c+r-1?parseInt(e.rows[d].getBoundingClientRect().height)+parseInt(t.style.borderWidth)/2+15+"px":parseInt(e.rows[d].getBoundingClientRect().height)+parseInt(t.style.borderWidth)/2+"px";for(var p=e.rows[d].children,h=0;h<p.length;h++)0!=parseInt(p[h].dataset.yIndex)&&p[h].classList.add("wptb-td-border-top-moving"),parseInt(p[h].dataset.yIndex)+p[h].rowSpan!=c+r&&p[h].classList.add("wptb-td-border-bottom-moving"),0!=parseInt(p[h].dataset.xIndex)&&p[h].classList.add("wptb-td-border-left-moving"),parseInt(p[h].dataset.xIndex)+p[h].colSpan!=p.length&&p[h].classList.add("wptb-td-border-right-moving");e.rows[d].classList.add("wptb-row-moving")}var b=l.insertRow(-1);b.classList.add("wptb-row"),b.style.display="none";for(var m,g,v=0;v<e.maxCols;v++){var w=new WPTB_Cell(e.mark);w.getDOMElement().dataset.wptbCssTdAutoWidth="true",l.rows[l.rows.length-1].appendChild(w.getDOMElement())}return"separate"===l.style.borderCollapse&&(m="2px",!(b=l.style.borderSpacing)||(g=b.split(" "))&&Array.isArray(g)&&(m=g[0].trim(),m=(1 in g&&g[1]?g[1]:g[0]).trim()),0<(g=l.getElementsByTagName("tbody")).length&&((g=g[0]).style.position="relative",g.style.top="-"+m,g.style.bottom="-"+m,g.style.left="0px",g.style.right="0px")),l},this.cutTableHorizontally=function(e){this.tablePreview||(this.tablePreview=document.querySelector(".wptb-preview-table"));var t=this.tablePreview;e=parseInt(e,10),WPTB_CutGlueTable.cutTableHorizontally(e,t)},this.glueTableHorizontally=function(){this.tablePreview||(this.tablePreview=document.querySelector(".wptb-preview-table"));var e=this.tablePreview;WPTB_CutGlueTable.glueTableHorizontally(e)},this.withdrewRowsPut=function(e){this.tablePreview||(this.tablePreview=document.querySelector(".wptb-preview-table"));var t=this.tablePreview;if(t){for(var r=t.rows,o=0;o<r.length;o++)if(r[o].classList.contains("wptb-row-moving")){for(var l=r[o].children,n=0;n<l.length;n++)l[n].classList.remove("wptb-td-border-top-moving"),l[n].classList.remove("wptb-td-border-bottom-moving"),l[n].classList.remove("wptb-td-border-left-moving"),l[n].classList.remove("wptb-td-border-right-moving");r[o].style.height="",r[o].classList.remove("wptb-row-moving")}if(this.glueTableHorizontally(),!e){for(var i=_toConsumableArray(t.getElementsByClassName("wptb-highlighted")),a=0;a<i.length;a++)i[a].classList.remove("wptb-highlighted");for(var s=_toConsumableArray(t.getElementsByTagName("td")),d=0;d<s.length;d++)s[d].hasAttribute("data-same-cell-before-division")&&s[d].removeAttribute("data-same-cell-before-division")}}},window.wptbRowMove=this},WPTB_TableDirectives=function(e){this.table=e;var t="wptbTableDirectives";this.getDirectives=function(){var e=this.table.dataset[t];return void 0!==e&&JSON.parse(atob(e))},this.saveDirectives=function(){var e;this.tableDirectives&&(e=btoa(JSON.stringify(this.tableDirectives)),this.table.dataset[t]=e)},this.getDirective=function(e){this.tableDirectives=this.getDirectives(),this.tableDirectives||(this.tableDirectives={});for(var t,r=this.tableDirectives,o=0;o<e.length;o++){if(!r.hasOwnProperty(e[o])){t=!1;break}if(o===e.length-1){t=r[e[o]];break}r=r[e[o]]}return t},this.setDirective=function(e,t){this.tableDirectives=this.getDirectives(),this.tableDirectives||(this.tableDirectives={});for(var r=this.tableDirectives,o=0;o<e.length;o++){if(o===e.length-1){r[e[o]]=t,this.saveDirectives();break}r.hasOwnProperty(e[o])||(r[e[o]]={}),r=r[e[o]]}},this.tableDirectives=this.getDirectives()};
//# sourceMappingURL=admin.js.map