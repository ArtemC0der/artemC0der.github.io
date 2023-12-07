(function prebuiltOwnContext() {
    // clone global prebuilt data
    const managerData = Object.assign({}, wptbPrebuiltData);

    // remove global data
    wptbPrebuiltData = undefined;

    /**
     * Prebuilt table manager.
     *
     * Apart from generate menu, this manager will handle all prebuilt functionality after table is generated.
     *
     * @param {object} data data object
     * @constructor
     */
    function PrebuiltManager(data) {
        this.data = data;

        this.strings = this.data.strings;

        this.markCounter = 0;

        // various constants for prebuilt manager use
        this.constants = {
            prebuiltMarkData: 'wptbPrebuiltMark',
            prebuiltMarkOrder: 'wptbPrebuiltOrder',
        }

        this.tabStatus = true;

        this.tabIterator = null;

        // current environment type
        const currentEnv = process.env.NODE_ENV;

        /**
         * Get current table on DOM.
         *
         * @return {HTMLElement} current table
         */
        this.getTable = () => {
            return document.querySelector(this.data.tableQuery);
        }

        /**
         * Get if current build is for development purposes or not
         *
         * @return {boolean} development build or not
         */
        this.isDevBuild = () => {
            return currentEnv === 'development';
        }

        /**
         * If current table marked as a prebuilt or not.
         *
         * @return {boolean} is prebuilt enabled or not
         */
        this.isPrebuiltEnabled = () => {
            return this.getTable().dataset.wptbPrebuiltTable === '1';
        }

        /**
         * Before save callback for prebuilt tables.
         *
         * @param {Event} e event
         */
        const prebuiltSaveCallback = (e) => {
            e.detail.prebuilt = true;
        }

        /**
         * Bind prebuilt tools to appropriate events.
         */
        this.bindPrebuiltTools = () => {
            // removed for simplicity
            // document.addEventListener('wptb:actionfield:generated', this.addPrebuiltTools);

            // add before save callback for prebuilt enabled tables
            document.addEventListener('wptb:save:before', prebuiltSaveCallback);
        }

        /**
         * Get a unique counter number.
         *
         * @return {number} counter number
         */
        this.getCounter = () => {
            return this.markCounter++;
        }

        /**
         * Toggle hovered element's prebuilt status.
         *
         * @param {Event} e event
         */
        const markElement = (e) => {
            const activeElement = e.target.parentNode.activeElem;

            const markStatus = activeElement.dataset[this.constants.prebuiltMarkData];
            if (markStatus === undefined) {
                activeElement.dataset[this.constants.prebuiltMarkData] = 1;
                activeElement.dataset[this.constants.prebuiltMarkOrder] = this.getCounter();
            } else {
                activeElement.dataset[this.constants.prebuiltMarkData] = (Number.parseInt(markStatus, 10) + 1) % 2;
            }

            togglePrebuiltMarkIndicator(activeElement);
            new WPTB_TableStateSaveManager().tableStateSet();
        }

        /**
         * Add a mark indicator to an element.
         * @param {HTMLElement} el
         */
        const addMarkIndicator = (el) => {
            const markOrder = el.dataset[this.constants.prebuiltMarkOrder];
            const stringifiedMarkIndicator = `<div class="wptb-prebuilt-mark-indicator" data-wptb-prebuilt-indicator-order="${markOrder}"></div>`;

            const range = document.createRange();
            range.setStart(document, 0);
            const markIndicator = range.createContextualFragment(stringifiedMarkIndicator);

            el.appendChild(markIndicator.children[0]);
        }

        /**
         * Remove a mark indicator attached to current element.
         * @param {HTMLElement} el main element
         */
        const removeMarkIndicator = (el) => {
            const markOrder = el.dataset[this.constants.prebuiltMarkOrder];
            const markIndicator = el.querySelector(`.wptb-prebuilt-mark-indicator[data-wptb-prebuilt-indicator-order="${markOrder}"]`);

            if (markIndicator) {
                markIndicator.remove();
            }
        }

        /**
         * Toggle prebuilt mark indicator bind to prebuilt element.
         *
         * @param {HTMLElement} el
         */
        const togglePrebuiltMarkIndicator = (el) => {
            const markStatus = Number.parseInt(el.dataset[this.constants.prebuiltMarkData], 10);

            if (markStatus) {
                addMarkIndicator(el);
            } else {
                removeMarkIndicator(el);
            }
        }

        /**
         * Add necessary tools and logic to builder to work on prebuilt.
         */
        this.addPrebuiltTools = () => {
            const actionsWrapper = document.querySelector('.wptb-actions');

            const stringifiedAction = '<span title="mark element as prebuilt target" class="dashicons dashicons-media-spreadsheet wptb-prebuilt-mark-action"></span>'
            const range = document.createRange();
            range.setStart(actionsWrapper, 0);
            const markAction = range.createContextualFragment(stringifiedAction);

            markAction.children[0].addEventListener('click', markElement);

            actionsWrapper.appendChild(markAction);
        }

        /**
         * Remove all prebuilt mark indicators from table.
         */
        const removeAllMarkIndicators = () => {
            Array.from(document.querySelectorAll('.wptb-prebuilt-mark-indicator')).map(e => {
                e.parentNode.removeChild(e);
            });
        }

        /**
         * Remove prebuilt related tools/events/hooks from table and builder.
         */
        this.removePrebuiltTools = () => {
            // removed for simplicity
            // remove prebuilt mark button from actions
            // document.removeEventListener('wptb:actionfield:generated', this.addPrebuiltTools);

            // remove before save event listener for prebuilt tables
            document.removeEventListener('wptb:save:before', prebuiltSaveCallback);

            // remove for simplicity
            // remove prebuilt mark indicators
            // removeAllMarkIndicators();
        }

        /**
         * Remove prebuilt data sets from table.
         */
        const removePrebuiltDataSets = () => {
            Array.from(document.querySelectorAll('[data-wptb-prebuilt-mark]')).map(m => {
                delete m.dataset[this.constants.prebuiltMarkData];
            });
        }

        /**
         * Watch list.
         *
         * @type {object}
         */
        const watch = {
            enablePrebuilt: function (val) {
                if (val === 'checked') {
                    this.bindPrebuiltTools();
                } else {
                    this.removePrebuiltTools();
                    removePrebuiltDataSets();
                }
            }
        }

        /**
         * Update hook for prebuilt instance.
         *
         * Changes to table settings will be observed and appropriate actions will take.
         * Also if any of the input key is being watched with watch list, it will be called to handle the change at the value.
         * @param {object} input
         */
        this.update = (input) => {
            Object.keys(input).map(k => {
                if (Object.prototype.hasOwnProperty.call(input, k)) {
                    if (watch[k] && typeof watch[k] === 'function') {
                        watch[k].call(this, input[k]);
                    }
                }
            })
        }

        /**
         * Editing an already saved table or not.
         *
         * @return {boolean} editing or not
         */
        const isEditingAlreadySavedTable = () => {
            const currentUrl = new URL(window.location.href);

            return currentUrl.searchParams.get('table') !== null;
        }

        /**
         * Initialization hook of prebuilt instance.
         */
        this.init = () => {
            if (this.isPrebuiltEnabled()) {
                //bind and setup prebuilt mark tools for builder
                this.bindPrebuiltTools();
            } else {
                this.removePrebuiltTools();
                if (!isEditingAlreadySavedTable()) {
                    // removed for simplicity
                    // this.setUpTabTargeting();
                }
            }

            // @deprecated
            // bind table control value changes to update hook
            // WPTB_Helper.controlsInclude(this.getTable(), this.update, true);

            // subscribe to table setting updates
            WPTB_ControlsManager.subscribe('prebuilt', this.update)

            // dev tool implementation
            if (!this.isDevBuild()) {
                // remove dev mode nonce value is current build is not a development one
                this.data.security.devModeNonce = undefined;
            } else {
                this.devTool = new PrebuiltDevTool(this.data.security.devModeNonce, this.data.teamBuildTablePrefix);
                this.devTool.addTools('.wptb-builder-content');
            }
        }

        /**
         * Add tab control element to page.
         */
        const addTabControl = () => {
            const builderWrapper = document.querySelector('.wptb-builder-content');

            const stringifiedTabControl = `<div class="wptb-prebuilt-tab-control"><div class="wptb-prebuilt-tab-control-label">${this.strings.tabControl}</div><div class="wptb-prebuilt-tab-control-buttons-wrapper"><div class="wptb-prebuilt-tab-control-icon wptb-plugin-filter-box-shadow-md-close" data-wptb-prebuilt-tab-control-type="stop">${this.data.icons.stopCircle}</div><div class="wptb-prebuilt-tab-control-icon wptb-plugin-filter-box-shadow-md-close" data-wptb-prebuilt-tab-control-type="restart">${this.data.icons.syncAlt}</div></div></div>`;
            const range = document.createRange();
            range.setStart(document, 0);
            const tabControlElement = range.createContextualFragment(stringifiedTabControl);

            builderWrapper.appendChild(tabControlElement.children[0]);

            const controlStop = document.querySelector('.wptb-prebuilt-tab-control-icon[data-wptb-prebuilt-tab-control-type="stop"]');

            const controlRestart = document.querySelector('.wptb-prebuilt-tab-control-icon[data-wptb-prebuilt-tab-control-type="restart"]');

            controlStop.addEventListener('click', () => {
                removeAllMarkIndicators();
                this.tabStatus = false;
            })

            controlRestart.addEventListener('click', () => {
                if (this.tabIterator) {
                    removeAllMarkIndicators()
                    this.tabIterator.reset();
                    this.tabStatus = true;
                    tabTarget();
                }
            })
        }


        /**
         * Tab focus an element.
         *
         * @param {HTMLElement} e element to focus
         */
        const tabTarget = (e) => {
            if (this.tabIterator) {
                const iteratedObject = this.tabIterator.next();
                removeAllMarkIndicators();
                if (!iteratedObject.done) {
                    if (e) {
                        e.preventDefault();
                    }
                    const targetElement = iteratedObject.value;
                    addMarkIndicator(targetElement);
                    targetElement.click();
                    targetElement.click();
                    targetElement.focus();

                    // highlight and select text content of element
                    const selection = window.getSelection();
                    const range = document.createRange();
                    range.selectNodeContents(targetElement);
                    selection.removeAllRanges();
                    selection.addRange(range);
                } else {
                    this.tabStatus = false;
                }
            }
        }

        /**
         * Setup tab targeting for prebuilt marked elements.
         */
        this.setUpTabTargeting = () => {
            const enabledElements = Array.from(document.querySelectorAll('.wptb-table-setup [data-wptb-prebuilt-mark = "1"]'));

            const enabledElementsObject = (() => {
                return {
                    [Symbol.iterator]: () => {
                        let index = 0;
                        const length = enabledElements.length;

                        const next = () => {
                            let valueObject = {value: undefined, done: true};
                            if (index < length) {
                                valueObject = {value: enabledElements[index], done: false}
                            }

                            index = index + 1 >= length ? length : index + 1;

                            return valueObject;
                        }
                        const reset = () => {
                            index = 0;
                        }
                        return {next, reset};
                    }
                }
            })();

            if (enabledElements.length > 0) {
                addTabControl();
            }

            this.tabIterator = enabledElementsObject[Symbol.iterator]();

            // bind tab targeting to keyboard event
            if (enabledElements.length > 0) {
                document.addEventListener('keyup', (e) => {
                    if (e.key === 'Tab' && this.tabStatus) {
                        tabTarget(e);
                    }
                });
            }

            // workaround for underscore error
            setTimeout(() => {
                tabTarget();
            }, 1000);

        }
    }


    /**
     * Prebuilt development tool.
     *
     * @param {string} nonce security nonce for dev tool operations
     * @param {string} teamBuildPrefix id prefix for team built tables
     * @constructor
     */
    function PrebuiltDevTool(nonce, teamBuildPrefix) {
        /**
         * Is editing a team built prebuild table.
         */
        const isEditingTeamBuiltPrebuild = () => {
            const url = new URL(window.location.href);
            const currentTableID = url.searchParams.get('table');

            if (currentTableID !== null) {
                const regexp = new RegExp(`^${teamBuildPrefix}_(.+)$`, 'g');
                const matches = regexp.exec(currentTableID);

                if (matches) {
                    return true;
                }
            }
            return false;
        }

        const storePrebuiltId = () => {
            const url = new URL(window.location.href);
            if (isEditingTeamBuiltPrebuild()) {
                const id = url.searchParams.get('table');
                url.searchParams.set('prebuilt_id', id);

            }
            url.searchParams.delete('table');
            window.history.pushState(null, null, url.toString());
        }

        /**
         * Add dev tool to DOM
         *
         * @param {string} wrapperQuery query for wrapper element
         */
        this.addTools = (wrapperQuery) => {
            const wrapper = document.querySelector(wrapperQuery);

            if (wrapper) {
                const strElement = '<div class="wptb-prebuilt-dev-tool"><div class="label">Dev Tools</div><div class="prebuilt-button" data-prebuilt-button="saveAsCSV" >Append to file</div></div>'
                const range = document.createRange();
                range.setStart(wrapper, 0);
                const devToolElement = range.createContextualFragment(strElement).childNodes[0];

                wrapper.appendChild(devToolElement);

                const saveAsXMLButton = wrapper.querySelector('[data-prebuilt-button="saveAsCSV"]');

                function saveAsCSV({detail}) {
                    detail.prebuilt = true;
                    detail.saveAsCSV = true;
                    detail.saveAsCSVNonce = nonce;

                    const url = new URL(window.location.href);
                    const prebuilt_id = url.searchParams.get('prebuilt_id');

                    if (prebuilt_id) {
                        detail.prebuilt_id = prebuilt_id;
                        url.searchParams.delete('prebuilt_id');
                        window.history.pushState(null, null, url.toString());
                    }
                }

                saveAsXMLButton.addEventListener('click', (e) => {
                    e.preventDefault();

                    document.addEventListener('wptb:save:before', saveAsCSV);

                    storePrebuiltId();

                    // trigger save event
                    new WPTB_TableStateSaveManager().tableStateSet();
                    document.querySelector('.wptb-save-btn').click();

                    document.removeEventListener('wptb:save:before', saveAsCSV);
                })

            } else {
                throw new Error(`[WPTB-Prebuilt_Dev_Tools]: no valid wrapper element found with the given query of ${wrapperQuery}`);
            }
        }
    }

    const WPTB_Prebuilt = new PrebuiltManager(managerData)

// initialize prebuilt instance when table is generated
    document.addEventListener('wptb:table:generated', () => {
        WPTB_Prebuilt.init()
    })
})();
