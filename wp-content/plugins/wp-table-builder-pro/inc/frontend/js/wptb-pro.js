function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(r="Object"===r&&e.constructor?e.constructor.name:r)||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _iterableToArray(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,i=new Array(t);r<t;r++)i[r]=e[r];return i}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}document.addEventListener("responsive:front",function(e){!function(e){for(var t=document.querySelectorAll(".wptb-preview-table"),r=e.detail.responsiveFront,i=0;i<t.length;i++)new WPTB_BordersManage({table:t[i]}).bordersInitialization(r)}(e)},!1),document.addEventListener("DOMContentLoaded",function(){Array.from(document.querySelectorAll(".wptb-list-container .wptb-tooltip")).map(function(e){var t=Array.from(e.classList),r="top";t.some(function(e){e=new RegExp(/^wptb-tooltip-(.+)$/g).exec(e);return null!==e&&(r=e[1],!0)}),e.addEventListener("mouseenter",function(){!function(e,t){var r=e.querySelector(".tooltip"),i=e.querySelector("p"),o=i.innerHTML;i.innerHTML='<span id="sizeCalculator">'.concat(o,"</span>");var n=i.querySelector("#sizeCalculator").getBoundingClientRect(),a=e.getBoundingClientRect(),l=Math.abs(a.x-n.x),s=Math.abs(a.y-n.y),c={left:0,top:0};"left"===t||"right"===t?(c.top=s-r.offsetHeight/2+n.height/2,e=-(r.offsetWidth+10),a=n.width+10,a="left"===t?e:a,c.left=l+a):(c.left=l+n.width/2-r.offsetWidth/2,l=-(r.offsetHeight+10),n=n.height+10,n="top"===t?l:n,c.top=s+n);i.innerHTML=o,r.setAttribute("style","left: ".concat(c.left,"px; top: ").concat(c.top,"px"))}(e,r)})})}),document.addEventListener("DOMContentLoaded",function(){var e;0<(e=document.querySelectorAll(".wptb-preview-table")).length&&e.forEach(function(e){var t,r,i,o,n=e.querySelector("tbody > tr:first-child");"true"==n.getAttribute("data-wptb-sticky-row")&&(t=n,e=(n=e).getBoundingClientRect(),r=t.getBoundingClientRect().height,n=window.pageYOffset,i=e.top+n,o=e.bottom-r+n,t.style.maxWidth=e.width+"px",Array.from(t.querySelectorAll("td")).map(function(e){var t=window.getComputedStyle(e).getPropertyValue("width");e.style.width=t}),document.addEventListener("scroll",function(){var e=window.pageYOffset;i+r<e&&e<o&&t.classList.add("wptb-sticky-header"),(o<e||e<i)&&t.classList.remove("wptb-sticky-header")}))})}),document.addEventListener("DOMContentLoaded",function(){Array.from(document.querySelectorAll(".wptb-styled_list-container .wptb-tooltip")).map(function(e){var t=Array.from(e.classList),r="top";t.some(function(e){e=new RegExp(/^wptb-tooltip-(.+)$/g).exec(e);return null!==e&&(r=e[1],!0)}),e.addEventListener("mouseenter",function(e){!function(e,t){var r=e.querySelector(".tooltip"),i=e.querySelector("p"),o=i.innerHTML;i.innerHTML='<span id="sizeCalculator">'.concat(o,"</span>");var n=i.querySelector("#sizeCalculator").getBoundingClientRect(),a=e.getBoundingClientRect(),l=Math.abs(a.x-n.x),s=Math.abs(a.y-n.y),c={left:0,top:0};"left"===t||"right"===t?(c.top=s-r.offsetHeight/2+n.height/2-5,e=-(r.offsetWidth+10),a=n.width+10,a="left"===t?e:a,c.left=l+a):(c.left=l+n.width/2-r.offsetWidth/2,l=-(r.offsetHeight+10),n=n.height+10,n="top"===t?l:n,c.top=s+n);i.innerHTML=o,r.setAttribute("style","left: ".concat(c.left,"px; top: ").concat(c.top,"px"))}(e.target,r)})})}),document.addEventListener("DOMContentLoaded",function(){Array.from(document.querySelectorAll(".wptb-styled_list-container li p")).map(function(e){var t=e.getAttribute("style").replace(/margin-left: (\d+)px/,"$& !important");e.setAttribute("style",t)})});var WPTB_BordersManage=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},t=e.table;this.table=e.table,WPTB_RecalculateIndexes(t);var n=this;this.itemsPerHeader=0,this.tableMaxCols=t.maxCols,this.cellsStylesScheme={};var d=new WPTB_TableDirectives(t);this.bordersInitialization=function(e){var t,r,i,o;"row"===d.getDirective(["innerBorders","active"])?(t="row",r="column"):"column"===d.getDirective(["innerBorders","active"])&&(t="column",r="row"),d.getDirective(["innerBorders","borderRadiuses"])&&(i=d.getDirective(["innerBorders","borderRadiuses",d.getDirective(["innerBorders","active"])])),t&&"string"==typeof t&&r&&"string"==typeof r&&("object"===_typeof(o=WPTB_GetDirectionAfterReconstruction(this.table,t,r,"column",e))&&o.hasOwnProperty("switch")&&this.table.addEventListener("table:rebuilt",function(e){!function(e){var t=o.switch(e);"object"===_typeof(t)&&(this.itemsPerHeader=t.itemsPerHeader,t.hasOwnProperty("newTable")?(e=this.table,this.table=t.newTable,this.switchBorderOnlyColumnRow(t.type[0]),this.borderRadiusesSet(t.type[0],i),this.spaceBorderSpacingExchange(t.type[1]),this.table=e):(this.switchBorderOnlyColumnRow(t.type[0]),this.borderRadiusesSet(t.type[0],i),this.spaceBorderSpacingExchange(t.type[1])))}.call(n,e)},!1))},this.borderRadiusesSet=function(e,t){parseInt(t,10)||(t=null);var r=_toConsumableArray(r=this.table.querySelectorAll("td"));if("all"===e)d.setDirective(["innerBorders","borderRadiuses","all"],t),t&&(t+="px"),r.map(function(e){e.style.borderRadius=t});else if("row"===e)d.setDirective(["innerBorders","borderRadiuses","row"],t),r.map(function(e){e.style.borderRadius=null}),t&&(_toConsumableArray(this.table.querySelectorAll("tr td:first-child")).map(function(e){e.style.borderTopLeftRadius=t+"px",e.style.borderBottomLeftRadius=t+"px"}),_toConsumableArray(this.table.querySelectorAll("tr td:last-child")).map(function(e){e.style.borderTopRightRadius=t+"px",e.style.borderBottomRightRadius=t+"px"}));else if("column"===e&&(d.setDirective(["innerBorders","borderRadiuses","column"],t),r.map(function(e){e.style.borderRadius=null}),t))for(var i=this.table.rows.length,o=0;0<i;){_toConsumableArray(this.table.querySelectorAll('[data-y-index="'.concat(o,'"]'))).map(function(e){e.style.borderTopLeftRadius=t+"px",e.style.borderTopRightRadius=t+"px"});_toConsumableArray(this.itemsPerHeader&&o+this.itemsPerHeader<i&&o+1<i?this.table.querySelectorAll('[data-y-index="'.concat(o+this.itemsPerHeader,'"]')):this.table.querySelectorAll("tr:last-child td")).map(function(e){e.style.borderBottomLeftRadius=t+"px",e.style.borderBottomRightRadius=t+"px"}),this.itemsPerHeader?(i-=this.itemsPerHeader+1,o+=this.itemsPerHeader+1):i=0}},this.switchBorderOnlyColumnRow=function(e){var c=this,t=d.getDirective(["innerBorders","borderWidth"]);if(this.innerBordersSet(t),"row"===e){var r=this.table.rows,i=0;0<r.length&&(t=(t=_toConsumableArray(t=r[0].children))[t.length-1],i=parseInt(t.dataset.xIndex)+t.colSpan),(r=_toConsumableArray(r)).map(function(e){_toConsumableArray(e.children).map(function(e){null===e.previousSibling?e.colSpan<i&&(e.style.borderRightWidth="0px"):(null===e.nextSibling||(e.style.borderRightWidth="0px"),e.style.borderLeftWidth="0px")})}),d.setDirective(["innerBorders","active"],"row")}else if("column"===e){r=function(){var t=c.table.rows.length;if(t<=1)return{v:void 0};for(var e=c.table.rows.length,r=0;0<e;){_toConsumableArray(c.table.querySelectorAll('[data-y-index="'.concat(r,'"]'))).map(function(e){e.rowSpan<t&&(e.style.borderBottomWidth="0px")});var i=[],o=void 0;if(c.itemsPerHeader&&r+c.itemsPerHeader<e&&r+1<e){for(var n=r+1;n<r+c.itemsPerHeader;n++)var a=_toConsumableArray(a=c.table.querySelectorAll('[data-y-index="'.concat(n,'"]'))),i=i.concat(a);o=c.table.querySelectorAll('[data-y-index="'.concat(r+c.itemsPerHeader,'"]'))}else{for(var l=r+1;l<c.table.rows.length-1;l++){var s=_toConsumableArray(s=c.table.querySelectorAll('[data-y-index="'.concat(l,'"]')));i=i.concat(s)}o=c.table.querySelectorAll("tr:last-child td")}i.map(function(e){e.style.borderTopWidth="0px",e.style.borderBottomWidth="0px"}),(o=_toConsumableArray(o)).map(function(e){e.style.borderTopWidth="0px"}),c.itemsPerHeader?(e-=c.itemsPerHeader+1,r+=c.itemsPerHeader+1):e=0}d.setDirective(["innerBorders","active"],"column")}();if("object"===_typeof(r))return r.v}else"all"==e&&d.setDirective(["innerBorders","active"],"all")},this.innerBordersSet=function(t){_toConsumableArray(this.table.getElementsByTagName("td")).map(function(e){e.style.borderWidth=t+"px"}),d.setDirective(["innerBorders","borderWidth"],t),d.setDirective(["innerBorders","active"],"all")},this.spaceBorderSpacingExchange=function(e){this.table.style.borderSpacing&&(2===e&&!d.getDirective(["innerBorders","borderSpacing","exchangeNum"])||"number"==typeof d.getDirective(["innerBorders","borderSpacing","exchangeNum"])&&d.getDirective(["innerBorders","borderSpacing","exchangeNum"])!==e)&&(this.table.style.borderSpacing=this.table.style.borderSpacing.split(" ").reverse().join(" "),d.setDirective(["innerBorders","borderSpacing","exchangeNum"],e))},this.rowBgColorReplaceToCellBgColor=function(e){for(var t=0<d.getDirective(["innerBorders","borderRadiuses",d.getDirective(["innerBorders","active"])]),r=this.table.querySelectorAll("tr"),i=0;i<r.length;i++){var o=r[i];o&&(o.dataset.wptbBgColor||window.getComputedStyle(o,null).getPropertyValue("background-color"),o.style.backgroundColor=!0===t?"#ffffff00":o.dataset.wptbBgColor||null)}},this.changeRowBgColor=function(e,t){var r=t.dataset.wptbRowBgColor,t=e.getAttribute("org-bg-color");r&&(t?e.setAttribute("org-bg-color",r):e.style.backgroundColor=r)},this.changeColumnBgColor=function(e){var t=parseInt(e.dataset.xIndex)+1,r=e.dataset.wptbColumnBgColor;this.table.querySelectorAll("tr").forEach(function(e){e=e.querySelector("td:nth-child(".concat(t,")"));e.dataset.wptbOwnBgColor||(e.style.backgroundColor=r)})}},WPTB_TableDirectives=function(e){this.table=e;var t="wptbTableDirectives";this.getDirectives=function(){var e=this.table.dataset[t];return void 0!==e&&JSON.parse(atob(e))},this.saveDirectives=function(){var e;this.tableDirectives&&(e=btoa(JSON.stringify(this.tableDirectives)),this.table.dataset[t]=e)},this.getDirective=function(e){this.tableDirectives=this.getDirectives(),this.tableDirectives||(this.tableDirectives={});for(var t,r=this.tableDirectives,i=0;i<e.length;i++){if(!r.hasOwnProperty(e[i])){t=!1;break}if(i===e.length-1){t=r[e[i]];break}r=r[e[i]]}return t},this.setDirective=function(e,t){this.tableDirectives=this.getDirectives(),this.tableDirectives||(this.tableDirectives={});for(var r=this.tableDirectives,i=0;i<e.length;i++){if(i===e.length-1){r[e[i]]=t,this.saveDirectives();break}r.hasOwnProperty(e[i])||(r[e[i]]={}),r=r[e[i]]}},this.tableDirectives=this.getDirectives()};
//# sourceMappingURL=wptb-pro.js.map
