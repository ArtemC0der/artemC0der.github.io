(() => {
    /**
     * Image pro controls module.
     * @param {HTMLElement} targetElement target image element
     * @param {String} targetElementId id of target element
     * @constructor
     */
    function ImageProControlsModule(targetElement, targetElementId) {
        /**
         * Target image element.
         * @type {HTMLElement}
         */
        this.element = targetElement;

        /**
         * Current mode of advanced image size controls.
         * @type {null}
         */
        this.currentMode = null;

        /**
         * Alignment value for image element.
         * @type {null}
         */
        this.imageAlignment = null;

        /**
         * Parse size string into object
         *
         * @param {string} sizeStr size in string representation
         * @return {null|Object} parsed size object or null for invalid representations
         */
        const parseSizeString = (sizeStr) => {
            const match = sizeStr?.match(/\|\|(?<width>\d+\.?\d*)(?<unit>.+)(?::)(?<height>\d+\.?\d*)/);

            if (match) {
                const {width, height, unit} = match.groups;

                if (width && height && unit) {
                    return {
                        width,
                        height,
                        unit
                    };
                }
            }

            return null;
        }

        /**
         * Watch list for control input changes.
         *
         * Keys for control ids and function to be called as values.
         * Function values will be called with the value of the control.
         *
         * @type {Object}
         */
        const watchList = {
            imageImageSizeControlRelative: (mode) => {
                this.currentMode = mode;
                handleRelativeMode();
            },
            imageImageSizeControl: (sizeStr) => {
                if (this.currentMode === 'self') {
                    const sizeVal = parseSizeString(sizeStr);
                    handleRelativeSelfSizing(sizeVal);
                }
            },
            imageAlignment: (alignment) => {
                this.imageAlignment = alignment;

                handleRelativeMode();
            }
        };

        /**
         * Handle relative mode operations
         */
        const handleRelativeMode = () => {
            const imageAnchor = this.element.querySelector('a');
            if (this.currentMode === 'self') {
                const sizeVal = parseSizeString(WPTB_ControlsManager.getElementControlValue(targetElementId, 'imageImageSizeControl'));
                handleRelativeSelfSizing(sizeVal);
            } else {
                const targetImage = this.element.querySelector('img');

                if (imageAnchor && targetImage) {
                    imageAnchor.classList.remove('wptb-plugin-width-full');
                    targetImage.style.width = '100%';
                    targetImage.style.height = 'unset';

                    imageAnchor.style.display = 'block';
                    imageAnchor.style.justifyContent = 'unset';
                }
            }

            // update style float value for more fluid transition between relative modes
            imageAnchor.style.float = this.imageAlignment === 'center' ? 'none' : this.imageAlignment;
        }

        /**
         * Handle relative self mode operations.
         * @param {Object} sizeObj size object
         */
        const handleRelativeSelfSizing = (sizeObj) => {
            if (sizeObj) {
                const {width, height, unit} = sizeObj;
                if (width && height && unit) {
                    const imageAnchor = this.element.querySelector('a');
                    const targetImage = this.element.querySelector('img');

                    if (imageAnchor && targetImage) {
                        imageAnchor.classList.add('wptb-plugin-width-full');
                        targetImage.style.width = `${width}${unit}`;
                        targetImage.style.height = `${height}${unit}`;

                        imageAnchor.style.display = 'flex';
                        imageAnchor.style.justifyContent = this.imageAlignment;
                    }
                }
            }
        }

        /**
         * Controls change callback function.
         * @param {Object} input input object
         */
        this.controlsChange = (input) => {
            Object.keys(input).map(controlId => {
                if (Object.prototype.hasOwnProperty.call(input, controlId) && Object.prototype.hasOwnProperty.call(watchList, controlId)) {
                    const callback = watchList[controlId];

                    if (typeof callback === 'function') {
                        callback(input[controlId]?.eventValue);
                    }
                }
            })
        }
    }

    const proImageControlModule = new ImageProControlsModule(element, elementId);

    WPTB_Helper.controlsInclude(element, proImageControlModule.controlsChange, true);
})()
