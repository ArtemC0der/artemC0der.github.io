/**
 * Ribbon type class.
 *
 * Object instance to differentiate ribbon types and use their unique properties at displaying ribbons at tables.
 *
 * All methods will be under 'methods' property of options array and all will be lifted to context and bind to ribbon type instance.
 *
 * Options:
 *  enableCellPadding: Will add a padding at the height of ribbon element to containing cell depending on the current location of the ribbon type.
 *
 *  defaultColorTargets: Will automatically apply background and border color updates to default color targets. Default target is wrapper element of main paragraph html element.
 *
 *  limitWithinCell: Recalculate position values to make sure whatever position value is given, ribbon element will be within the limits of the containing cell element.
 *
 *  controlsList: A list of control names that will be available on ribbon type activation.
 *
 *
 * Lifecycle hooks:
 *  startUp: Will be fired on first time mounted on DOM. Accepts mainElement, mainWrap and textWrap elements as arguments respectively.
 *
 *  applyStyle: Apply various dynamic style options with called style object argument.
 *
 *  posCalculate: Update the position of ribbon type.
 *
 *  destroy: Cleanup hook for ribbon type.
 *
 *
 * @param {Object} optionArgs an object of options
 * @param {Object} queryObj query object for important parts of ribbon element
 * @param {Object} modifications modifications object
 * @constructor
 */
function RibbonType(optionArgs, queryObj, modifications) {
    // default options for ribbon type object
    const defaultRibbonOptionArgs = {
        id: 'defaultRibbon',
        enableCellPadding: false,
        defaultColorTargets: false,
        limitWithinCell: false,
        controlsList: [],
        methods: {},
    }

    // query object
    this.queryObj = queryObj;

    /**
     * Modifications object for special attributes like classes and styles
     *
     * A reference link between the real context original object is created and here to reflect the differences on this object through out everywhere that has a valid and intact reference.
     *
     * @type {Object}
     */
    this.specialModifications = modifications;

    // merge user supplied options with default ones
    const options = Object.assign(defaultRibbonOptionArgs, optionArgs);

    /**
     * Get an option value from option object.
     *
     * @param {string} optionKey option key
     * @return {*}
     */
    this.get = (optionKey) => {
        return options[optionKey];
    }

    // easy access for id of ribbon type instance
    this.id = this.get('id');

    // easy access for controls list of ribbon type instance
    this.controlsList = this.get('controlsList');

    // protected lifecycle hook names, methods with the same name of these hooks will not be raised to context level.
    const protectedLifecycleHooks = ['startUp', 'applyStyle', 'destroy', 'posCalculate'];

    // bind all functions under methods to current context and uplift them to context level
    Object.keys(this.get('methods')).map(m => {
        if (Object.prototype.hasOwnProperty.call(this.get('methods'), m)) {
            if (!protectedLifecycleHooks.includes(m)) {
                this[m] = this.get('methods')[m].bind(this);
            }
        }
    })

    /**
     * Call user defined function located in methods of ribbon type options.
     *
     * @param {string} methodName method name
     * @param {any} args arguments to use in user function
     */
    const callUserMethod = (methodName, ...args) => {
        const userMethod = this.get('methods')[methodName];
        if (userMethod && typeof userMethod === 'function') {
            userMethod.apply(this, args);
        }
    }

    /**
     * Startup lifecycle hook.
     *
     * This hook will be called first time ribbon type is inserted to DOM.
     *
     */
    this.startUp = () => {
        callUserMethod('startUp');
    }

    /**
     * Applystyle lifecycle hook.
     *
     * This hook will be called mainly for applying style related options.
     *
     * Default color target for applying background and border color is main text wrapper.
     *
     * @param {Object} styleObj style object that contains various default/control defined style values
     * @param {Object} rawValues raw unedited values sent by element controls
     */
    this.applyStyle = (styleObj, rawValues) => {
        // apply auto padding
        if (this.get('enableCellPadding')) {
            this.applyAutoPadding();
        }

        // apply colors to default targets
        if (this.get('defaultColorTargets')) {
            this.setElStyle('textWrap', 'textWrap', '', 'backgroundColor', styleObj.backgroundColor);
            this.setElStyle('textWrap', 'textWrap', '', 'borderColor', styleObj.borderColor);
        }

        callUserMethod('applyStyle', styleObj, rawValues);
    }

    /**
     * Limit ribbon type element within limits of containing cell.
     * @param {Object} posObj position object
     */
    this.limitPosWithinBounds = (posObj) => {
        const cell = posObj.element.parentNode;
        const cellWidth = Number.parseFloat(cell.offsetWidth);
        const cellHeight = Number.parseFloat(cell.offsetHeight);

        const maxXOffset = ((cellWidth - posObj.ribbonWidth) / cellWidth) * 100;
        const maxYOffset = ((cellHeight - posObj.ribbonHeight) / cellHeight) * 100;

        const currentXOffsetParsed = Number.parseFloat(posObj.left);
        const currentYOffsetParsed = Number.parseFloat(posObj.top);

        posObj.left = `${Math.min(currentXOffsetParsed, maxXOffset)}%`;
        posObj.top = `${Math.min(currentYOffsetParsed, maxYOffset)}%`;
    }


    /**
     * posCalculate lifecycle hook.
     *
     * This hook will be used to update the position of ribbon type.
     *
     * @param {Object} posObj an object of various position related values
     * @param {Object} rawValues unedited raw control values
     */
    this.posCalculate = (posObj, rawValues) => {
        if (this.get('limitWithinCell')) {
            this.limitPosWithinBounds(posObj);
        }
        callUserMethod('posCalculate', posObj, rawValues);
    }

    /**
     * Destroy lifecycle hook.
     *
     * Clean up hook for resetting/removing any ribbon type specific options/modifications.
     */
    this.destroy = (el) => {
        this.resetAllAttributes();

        callUserMethod('destroy', el);
    }

    /**
     * Apply a padding value to main cell depending on the height and location of the ribbon element.
     */
    this.applyAutoPadding = () => {
        const elementHeight = this.getElementFromQueryObject({relative: 'element', query: ''}).offsetHeight;

        this.setElStyle('mainCell', 'cell', '', 'paddingTop', `${elementHeight}px`);
    }

    /**
     * Get element from query object supplied.
     *
     * Supplied query object fields:
     *  - relative: Name of the relative element available to ribbon type. for available relative types, checkout queryObject supplied by the RibbonElement class.
     *  - query: Query parameter that will be executed relative to relative field value. an empty string query value will give the relative element itself.
     *
     * @param {Object} qObj query object
     * @throws Error will be given for invalid relative element ids
     * @return {null|HTMLElement} found element from query
     */
    this.getElementFromQueryObject = (qObj) => {
        const relativeEl = this.queryObj[qObj.relative];
        const query = qObj.query;

        if (!relativeEl) {
            throw new Error(`[WPTB]: no relative element found with the given query id of [${qObj.relative}] `);
        }

        // return relative query element if query is an empty string
        if (query === undefined || query === "") {
            return relativeEl;
        } else {
            return relativeEl.querySelector(query);
        }
    }

    /**
     * Add a class to an element through modification system.
     *
     * @param {string} elId unique id for modification system
     * @param {string} relativeEl relative element id from query object
     * @param {string} query query value for the target element, empty string for relativeEl
     * @param {string|array} className single or an array of class names to apply to element
     */
    this.setElClass = (elId, relativeEl, query, className) => {
        let currentClassTarget = this.specialModifications.class[elId];

        if (!currentClassTarget) {
            this.specialModifications.class[elId] = {};
            currentClassTarget = this.specialModifications.class[elId];
            currentClassTarget.element = {relative: relativeEl, query},
                currentClassTarget.class = [];
        }

        if (!className.push) {
            className = [className];
        }

        className.map(c => {
            if (currentClassTarget.class.indexOf(c) < 0) {
                currentClassTarget.class.push(c);
            }

            this.getElementFromQueryObject(currentClassTarget.element).classList.add(c);
        })
    }

    /**
     * Add style attributes to element through modification system.
     *
     * Any style added through this system has a functionality to reset them to their before values.
     *
     * @param {string} elId unique element id for modification system
     * @param {string} relativeEl relative element id from query object
     * @param {string} query query string to target element
     * @param {string} styleAttr name of style attribute in camelCase format
     * @param {string|number} styleVal value of style attribute
     */
    this.setElStyle = (elId, relativeEl, query, styleAttr, styleVal) => {
        let currentStyleTarget = this.specialModifications.style[elId];

        if (!currentStyleTarget) {
            this.specialModifications.style[elId] = {};
            currentStyleTarget = this.specialModifications.style[elId];
            currentStyleTarget.element = {relative: relativeEl, query};
            currentStyleTarget.style = {};
        }

        let currentStyleAttr = currentStyleTarget.style[styleAttr];

        if (!currentStyleAttr) {
            currentStyleTarget.style[styleAttr] = {}
            currentStyleAttr = currentStyleTarget.style[styleAttr];
        }

        if (currentStyleAttr.default === undefined || currentStyleAttr.default === null) {
            currentStyleAttr.default = this.getElementFromQueryObject(currentStyleTarget.element).style[styleAttr];
        }

        currentStyleAttr.value = styleVal;
        this.getElementFromQueryObject(currentStyleTarget.element).style[styleAttr] = styleVal;
    }

    /**
     * Reset all attributes modified through modification system to their default values.
     */
    this.resetAllAttributes = () => {
        // reset special attributes
        this.resetAllSpecialAttributes();
    }

    /**
     * Reset all special attribute to default empty value.
     *
     * Special attributes are classes and styles.
     */
    this.resetAllSpecialAttributes = () => {
        // reset modified classes
        let modifiedClasses = this.specialModifications.class;
        Object.keys(modifiedClasses).map(k => {
            if (Object.prototype.hasOwnProperty.call(modifiedClasses, k)) {
                // const el = modifiedClasses[k].element
                const el = this.getElementFromQueryObject(modifiedClasses[k].element);
                modifiedClasses[k].class.map(c => {
                    el.classList.remove(c);
                })
            }
        })
        this.specialModifications.class = {};

        //reset modified styles
        let modifiedStyles = this.specialModifications.style;
        Object.keys(modifiedStyles).map(k => {
            if (Object.prototype.hasOwnProperty.call(modifiedStyles, k)) {
                const currentElementStyles = modifiedStyles[k];
                const el = this.getElementFromQueryObject(currentElementStyles.element);
                const stylesObj = currentElementStyles.style;

                Object.keys(stylesObj).map(s => {
                    if (Object.prototype.hasOwnProperty.call(stylesObj, s)) {
                        el.style[s] = stylesObj[s].default;
                    }
                })

            }
        })
        this.specialModifications.style = {};
    }
}

/**
 * A factory implementation for ribbon types
 *
 * @param {Object} queryObj query object
 * @param {Object} ribbonModifications ribbon modifications object
 * @constructor
 */
function RibbonFactory(queryObj, ribbonModifications) {
    this.queryObj = queryObj;
    this.ribbonModifications = ribbonModifications;

    const ribbonTypes = {
        rectangleRibbon: {
            id: 'rectangleRibbon',
            defaultColorTargets: true,
            limitWithinCell: true,
            controlsList: ['ribbonXOffset', 'ribbonYOffset', 'ribbonBorderColor'],
            methods: {
                applyStyle: function () {
                    this.setElClass('textWrap', 'textWrap', '', 'wptb-ribbon-type-rectangle-text-wrap');
                    this.setElClass('textWrap', 'textWrap', '', 'wptb-plugin-box-shadow-md');
                }
            }
        },
        bookmarkRibbon: {
            id: 'bookmarkRibbon',
            limitWithinCell: true,
            controlsList: ['ribbonXOffset', 'ribbonYOffset', 'ribbonWidth'],
            methods: {
                startUp: function () {
                    const w = this.getElementFromQueryObject({relative: 'mainWrap', query: ''});

                    // create an HTMLElement for ribbon end svg
                    const ribbonEndElementTemplate = '<div id="wptbBookmarkRibbonElementEnd"><svg preserveAspectRatio="none" viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="wptb-ribbon-bookmark-main-path" d="M0 40V0H64V38.5714L32.5 19.6429L0 40Z" fill="currentColor"/></svg></div>';
                    const range = document.createRange();
                    range.setStart(w, 0);
                    const ribbonEndElement = range.createContextualFragment(ribbonEndElementTemplate);

                    w.appendChild(ribbonEndElement);
                },
                applyStyle: function (styleObj, vals) {
                    this.setElClass('mainWrap', 'mainWrap', '', ['wptb-ribbon-bookmark-main-wrap', 'wptb-plugin-filter-box-shadow-md']);
                    this.setElStyle('textWrap', 'textWrap', '', 'backgroundColor', styleObj.backgroundColor);
                    this.setElStyle('svgWrapper', 'element', '#wptbBookmarkRibbonElementEnd', 'color', styleObj.backgroundColor);

                    // add ribbon width values
                    this.setElStyle('mainWrap', 'mainWrap', '', 'width', `${vals.ribbonWidth}px`);
                    this.setElStyle('svgWrapper', 'element', '#wptbBookmarkRibbonElementEnd', 'width', `${vals.ribbonWidth}px`);
                },
                destroy: (el) => {
                    // remove ribbon end element
                    el.querySelector('#wptbBookmarkRibbonElementEnd').remove();
                }
            }
        },
        cornerRibbon: {
            id: 'cornerRibbon',
            defaultColorTargets: true,
            limitWithinCell: true,
            controlsList: ['ribbonSide'],
            methods: {
                startUp: function () {
                    this.setElClass('mainWrap', 'mainWrap', "", 'wptb-ribbon-corner-main-wrap');
                    this.setElClass('textWrap', 'textWrap', "", 'wptb-plugin-filter-box-shadow-md-close');
                },
                posCalculate: function (posObj, vals) {
                    const correctionVal = 5;

                    const posLeft = vals.ribbonSide === 'left';
                    let left = `${-correctionVal}px`;

                    // const cell = posObj.element.parentNode;
                    // const maximumLeft = ((cell.clientWidth - posObj.ribbonWidth) / cell.clientWidth) * 100;
                    // const calculatedLeft = posLeft ? 0 : maximumLeft;
                    //
                    // posObj.left = `calc(${calculatedLeft}% + ${(posLeft ? -1 : 1) * correctionVal}px)`
                    // posObj.top = `-${correctionVal}px`

                    if (!posLeft) {
                        left = `calc(100% - ${posObj.ribbonWidth - correctionVal}px`;
                    }

                    posObj.left = left;
                    posObj.top = `-${correctionVal}px`;
                },
                applyStyle: function (styleObj, vals) {

                    const t = this.getElementFromQueryObject({relative: 'textWrap', query: ''});

                    const textWrapHeight = t.offsetHeight;
                    const direction = vals.ribbonSide === 'left' ? -1 : 1;
                    this.setElStyle('textWrap', 'textWrap', '', 'transform', `rotateZ(${45 * direction}deg) translateY(-${textWrapHeight / 2}px)`);

                    this.setElStyle('pEl', 'textWrap', '.wptb-element-ribbon-text', 'textAlign', 'center');
                    this.setElStyle('pEl', 'textWrap', '.wptb-element-ribbon-text', 'width', '200px');
                },
            }
        },
        iconRibbon: {
            id: 'iconRibbon',
            controlsList: ['ribbonYOffset', 'ribbonIcon', 'ribbonSide', 'ribbonIconAnimate', 'ribbonIconAnimationType'],
            triangleWidth: 20,
            methods: {
                startUp: function () {
                    this.setElClass('textWrap', 'textWrap', '', 'wptb-ribbon-icon01-text-wrap');
                    this.setElClass('textWrap', 'textWrap', '', 'wptb-plugin-filter-box-shadow-md');
                    this.setElClass('mainWrap', 'mainWrap', '', 'wptb-ribbon-icon01-main-wrap');
                    this.setElClass('iconDump', 'mainWrap', '#wptbRibbonIconDump', 'wptb-plugin-filter-box-shadow-md');

                    const textWrap = this.getElementFromQueryObject({relative: 'textWrap', query: ''});

                    // add triangle shape to end of p element
                    const endTriangleString = '<div class="wptb-ribbon-icon01-triangle-end"></div>';
                    const range = document.createRange();
                    range.setStart(textWrap, 1);
                    const endTriangle = range.createContextualFragment(endTriangleString);
                    textWrap.appendChild(endTriangle);

                    this.setElClass('iconDump', 'mainWrap', '#wptbRibbonIconDump', 'wptb-ribbon-icon01-icon-wrapper');
                    this.setElStyle('iconDump', 'mainWrap', '#wptbRibbonIconDump', 'display', 'block');

                },
                posCalculate: function (posObj, vals) {
                    const posLeftSide = vals.ribbonSide === 'left';

                    // padding that will put the element out of the bounds of the cell for its visual style
                    const pad = 20;
                    let leftPad = `${-pad}px`;

                    // recalculate position depending on ribbonSide control
                    if (!posLeftSide) {
                        const cell = this.getElementFromQueryObject({relative: 'cell'});
                        const cellWidth = cell.offsetWidth;
                        const elementWidth = posObj.element.offsetWidth;

                        // leftPad = `calc(${100 - ((elementWidth / cellWidth) * 100)}% + ${pad}px`;
                        leftPad = `calc(100% - ${elementWidth - pad}px)`;
                    }

                    posObj.left = leftPad;
                },
                applyStyle: function (styleObj, vals) {
                    const endTriangle = this.getElementFromQueryObject({
                        relative: 'textWrap',
                        query: '.wptb-ribbon-icon01-triangle-end'
                    });

                    const textEl = this.getElementFromQueryObject({relative: 'textWrap', query: ''});

                    // reset endTriangle dimensions to get non-scaled value of p elements height
                    // since we will be removing endTriangle element on 'destroy' hook on ribbon type change, we don't need to make modifications to its style through ribbon type instance's modification system
                    const textHeight = textEl.offsetHeight;

                    endTriangle.style.borderRight = `${this.get('triangleWidth')}px solid transparent`;
                    endTriangle.style.borderBottom = `${textHeight}px solid ${styleObj.backgroundColor}`;

                    // redirect colors
                    this.setElStyle('iconWrapper', 'mainWrap', '#wptbRibbonIconDump', 'backgroundColor', styleObj.backgroundColor);
                    this.setElStyle('iconWrapper', 'mainWrap', '#wptbRibbonIconDump', 'color', styleObj.color);
                    this.setElStyle('ribbonText', 'textWrap', '.wptb-element-ribbon-text', 'backgroundColor', styleObj.backgroundColor);

                    // flip the main wrapper for side change
                    if (vals.ribbonSide === 'right') {
                        this.setElClass('mainWrap', 'mainWrap', '', 'flip');
                    } else {
                        this.getElementFromQueryObject({relative: 'mainWrap'}).classList.remove('flip');
                    }
                },
                destroy: function (el) {
                    el.querySelector('.wptb-ribbon-icon01-triangle-end').remove();
                }
            }
        },
        sideRibbon: {
            id: 'sideRibbon',
            defaultColorTargets: true,
            triangleWidth: 20,
            triangleHeight: 20,
            overlayLightnessPercent: 40,
            controlsList: ['ribbonYOffset', 'ribbonSide', 'ribbonBorderColor'],
            methods: {
                startUp: function () {
                    this.setElClass('textWrap', 'textWrap', '', 'wptb-ribbon-sideFancy-text-wrap');
                    this.setElClass('textWrap', 'textWrap', '', 'wptb-plugin-filter-box-shadow-md');
                    this.setElClass('mainWrap', 'mainWrap', '', 'wptb-ribbon-sideFancy-main-wrap');
                    this.setElClass('element', 'element', '', 'wptb-ribbon-side-fix');

                    const mainWrap = this.getElementFromQueryObject({relative: 'mainWrap'});
                    // add bottom triangle part of ribbon type to main wrapper
                    const endTriangleString = '<div class="wptb-ribbon-side-fancy-triangle-wrapper"><div class="wptb-ribbon-side-fancy-triangle-end"></div><div class="wptb-ribbon-side-fancy-triangle-overlay"></div></div>'
                    const range = document.createRange();
                    range.setStart(mainWrap, 0);
                    const endTriangle = range.createContextualFragment(endTriangleString);

                    mainWrap.appendChild(endTriangle);
                },
                posCalculate: function (posObj, vals) {
                    const posLeftSide = vals.ribbonSide === 'left';
                    const pad = this.get('triangleWidth');
                    let left = `calc(0% + ${-pad}px)`;

                    // mirror the ribbon element vertically
                    if (!posLeftSide) {
                        const cell = this.getElementFromQueryObject({relative: 'cell'});
                        const cellWidth = cell.offsetWidth;
                        const elementWidth = posObj.element.offsetWidth;

                        // left = `calc(${100 - ((elementWidth / cellWidth) * 100)}% + ${pad}px)`;
                        left = `calc(100% - ${elementWidth - pad}px)`;
                    }

                    posObj.left = left;
                },
                applyStyle: function (styleObj, vals) {
                    const endTriangle = this.getElementFromQueryObject({
                        relative: 'mainWrap',
                        query: '.wptb-ribbon-side-fancy-triangle-end'
                    });

                    const endTriangleOverlay = this.getElementFromQueryObject({
                        relative: 'mainWrap',
                        query: '.wptb-ribbon-side-fancy-triangle-overlay'
                    });

                    // calculate and apply triangle border values to keep the shape intact and in position
                    const triangleWidth = this.get('triangleWidth');
                    const triangleHeight = this.get('triangleHeight');
                    const overlayLightness = this.get('overlayLightnessPercent') / 100;
                    endTriangle.style.borderRight = `${triangleWidth}px solid transparent`;
                    endTriangle.style.borderBottom = `${triangleHeight}px solid ${styleObj.backgroundColor}`;
                    endTriangleOverlay.style.borderRight = `${triangleWidth}px solid transparent`;
                    endTriangleOverlay.style.borderBottom = `${triangleHeight}px solid rgba(0,0,0, ${overlayLightness} )`;

                    // handle side selection
                    const leftSide = vals.ribbonSide === 'left';
                    if (!leftSide) {
                        this.setElClass('mainWrap', 'mainWrap', '', 'flip');
                    } else {
                        this.getElementFromQueryObject({relative: 'mainWrap'}).classList.remove('flip');
                    }
                },
                destroy: function (el) {
                    el.querySelector('.wptb-ribbon-side-fancy-triangle-wrapper').remove();
                }
            },
        }
    };

    /**
     * Create a new ribbon type with the given type id.
     *
     * @param ribbonTypeId
     * @throws Error will be thrown for invalid ribbon type ids
     * @return {RibbonType} new ribbon type instance
     */
    this.getRibbon = (ribbonTypeId) => {
        if (ribbonTypes[ribbonTypeId]) {
            return new RibbonType(ribbonTypes[ribbonTypeId], this.queryObj, this.ribbonModifications);
        } else {
            throw new Error(`[WPTB]: no ribbon types found with the given id of [${ribbonTypeId}]`);
        }
    }
}

/**
 * Ribbon element.
 *
 * Update mechanism of ribbon element is based on watching changes for controls bind to it. With customizing reactive values and reactive control keys properties, can fire up an update on specified control value changes to continue its lifecycles.
 *
 * Lifecycles:
 *  startUp: Should be fired whenever we in need to initialize the ribbon element to setup its internal hooks and event listeners. Lately was hooked to constructor, but to give more customization, is now an individual function to kick start ribbon element.
 *
 *  update: Updates properties/callbacks of ribbon element on control value changes. Will also call any functions that is bind to a reactive value on its watch property.
 *
 *  destroy: Ribbon element cleanup hook.
 *
 * @param {HTMLElement} elementWrapper wrapper element for Ribbon
 * @param {string} currentRibbonId id for default ribbon type
 * @param {Object} [defaults={}] object of default values
 * @constructor
 */
function RibbonElement(elementWrapper, currentRibbonId, defaults = {}) {
    this.element = elementWrapper;
    this.textWrap = this.element.querySelector('#wptbRibbonTextWrap');
    this.mainWrap = this.element.querySelector('#wptbRibbonMainWrap');
    this.cell = this.element.parentNode;

    // An object of query items with keys as query id and values as elements.
    // These values and keys will be used by modification system to query elements relative to key elements of ribbon object, and will make persistent modifications usable.
    const queryObject = {
        cell: this.cell,
        element: this.element,
        mainWrap: this.mainWrap,
        textWrap: this.textWrap,
    }

    const ribbonModificationsDataKey = 'wptbRibbonModifications';

    // create a reference link between ribbon modification object to easily persist state of this object between save/edit phases
    const encodedModifications = this.element.dataset[ribbonModificationsDataKey];
    if (encodedModifications === undefined) {
        this.ribbonModifications = {class: {}, style: {}};
    } else {
        this.ribbonModifications = JSON.parse(atob(encodedModifications));
    }

    // RibbonFactory initialization
    this.ribbonFactory = new RibbonFactory(queryObject, this.ribbonModifications);

    // id of current ribbon element assigned automatically by the plugin system
    // will mainly be used to find various controls attached to ribbon element at left panel
    this.elementInternalId = null;

    // current active ribbon type object
    this.currentRibbon = null;

    /**
     * Default reactive values for ribbon element.
     */
    const reactiveValuesDefault = {
        ribbonXOffset: 0,
        ribbonYOffset: 0,
        ribbonBackgroundColor: '#fff',
        ribbonBorderColor: '#000',
        ribbonElementType: currentRibbonId,
        ribbonSide: 'left',
    }

    /**
     * Reactive values for ribbon element.
     */
    this.reactiveValues = Object.assign(reactiveValuesDefault, defaults);

    // apart from reactiveValues, the control keys in this array will also trigger recalculations for element's position
    this.reactiveControlKeys = ['ribbonTextSize', 'ribbonElementType'];

    /**
     * Search for a parent element recursively from inner to outer levels of DOM.
     *
     * @param {string} parentType type of parent element that will be searched for. can be either lower or uppercase
     * @param {HTMLElement} el current element
     */
    function getParent(parentType, el) {
        const currentParent = el.parentNode
        const currentParentNodeName = currentParent.nodeName;

        // throw an error when reached to the base of the document
        if (currentParentNodeName === 'HTML') {
            throw new Error(`reached top of document, specified parent type of [${parentType}] not found. `);
        }

        // if not found, continue searching for upper parent elements
        if (parentType.toUpperCase() !== currentParentNodeName) {
            return getParent(parentType, currentParent);
        } else {
            return currentParent;
        }
    }

    /**
     * Add % to end of a value.
     *
     * @private
     * @param {any} val value`
     * @return {string} string with a percent suffix
     */
    function toPercent(val) {
        return `${val}%`;
    }

    /**
     * Calculate and apply various ribbon type specific styles of ribbon element.
     */
    this.applyRibbonStyles = () => {
        this.calculatePosition();
        this.applyStyle();
    }

    /**
     * Apply style specific options to ribbon type
     */
    this.applyStyle = () => {
        const styleObject = {
            backgroundColor: this.reactiveValues.ribbonBackgroundColor,
            borderColor: this.reactiveValues.ribbonBorderColor
        };
        this.currentRibbon.applyStyle(styleObject, this.reactiveValues);
    }

    /**
     * Calculate ribbon position.
     *
     * This function will be using captured instance values of this object. It is crucial to be sure that values are updated before calling this function to calculate position.
     *
     * Before applying the values, related callback function of current ribbon type will be called to modify the position of ribbon element.
     *
     * Available properties of position object
     *  - top
     *  - left
     *  - ribbonWidth
     *  - ribbonHeight
     *  - element
     */
    this.calculatePosition = () => {
        const ribbonHeight = this.element.clientHeight;
        const ribbonWidth = this.element.clientWidth;

        const posObject = {
            top: toPercent(this.reactiveValues.ribbonYOffset),
            left: toPercent(this.reactiveValues.ribbonXOffset),
            ribbonWidth,
            ribbonHeight,
            element: this.element
        };

        // call position calculate callback of current ribbon
        this.currentRibbon.posCalculate(posObject, this.reactiveValues);

        this.element.style.top = posObject.top;
        this.element.style.left = posObject.left;
    }

    /*
     * Lifecycle hook for updating various properties of ribbon element.
     *
     * @param {Object} inputs control value object
     */
    this.update = (inputs) => {
        let key = '';
        let value = '';

        Object.keys(inputs).map(k => {
            if (Object.prototype.hasOwnProperty.call(inputs, k)) {
                key = k;
                value = (inputs[k].eventValue !== undefined && inputs[k].eventValue !== null) ? inputs[k].eventValue : inputs[k].targetValue;
            }
        });

        if (Object.keys(this.reactiveValues).includes(key)) {
            if (this.reactiveValues[key] !== value && this.watch[key] && typeof this.watch[key] === 'function') {
                this.watch[key].call(this, value);
            }

            this.reactiveValues[key] = value;

            this.applyRibbonStyles();
        } else if (this.reactiveControlKeys.includes(key)) {
            this.applyRibbonStyles();
        }

        this.filterControls(this.currentRibbon.controlsList, ['ribbonElementType', 'ribbonTextSize', 'ribbonTextColor', 'ribbonBackgroundColor']);

        //save modifications
        this.saveModifications();
    }

    /**
     * Save modifications object to dataset of ribbon element in base64 format.
     */
    this.saveModifications = () => {
        const encodedModifications = btoa(JSON.stringify(this.ribbonModifications));
        this.element.dataset[ribbonModificationsDataKey] = encodedModifications;
    }

    /**
     * An object of functions that will be called when an assigned reactive value is changed.
     */
    this.watch = {
        ribbonElementType: (val) => {
            this.currentRibbon.destroy(this.element);
            this.currentRibbon = getRibbonObject(val);
            this.currentRibbon.startUp();
        }
    }

    /**
     * Initiate text editor support for ribbon element.
     * @private
     */
    const tinyMCEStart = () => {
        const vm = this;

        tinyMCE.init({
            target: this.element.querySelector('.wptb-element-ribbon-text'),
            inline: true,
            plugins: 'link',
            dialog_type: 'modal',
            theme: 'modern',
            menubar: false,
            force_br_newlines: false,
            force_p_newlines: false,
            forced_root_block: '',
            fixed_toolbar_container: '#wpcd_fixed_toolbar',
            toolbar: 'bold italic strikethrough',
            extended_valid_elements: 'svg[*]',
            verify_html: false,
            body_class: 'test_class',
            setup(ed) {
                ed.on('keydown', function (e) {
                    const p = e.target;
                    let pText = p.innerHTML.replace(/\s+/g, ' ').trim();
                    pText = pText.replace(/&nbsp;/g, '').trim();

                    if (!window.buttonElemPTextKeyDown) {
                        window.buttonElemPTextKeyDown = pText;
                    }
                });

                ed.on('keyup', function (e) {
                    const p = e.target;
                    let pText = p.innerHTML.replace(/\s+/g, ' ').trim();
                    pText = pText.replace(/&nbsp;/g, '').trim();
                    if (pText !== window.buttonElemPTextKeyDown) {
                        e.target.onblur = function () {
                            const wptbTableStateSaveManager = new WPTB_TableStateSaveManager();
                            wptbTableStateSaveManager.tableStateSet();

                            window.buttonElemPTextKeyDown = '';
                            e.target.onblur = '';
                        };
                    } else {
                        e.target.onblur = '';
                    }

                    vm.applyRibbonStyles();
                });
            },
            init_instance_callback(editor) {
                window.currentEditor = editor;
                editor.on('focus', function (e) {
                    const totalWidth = document.getElementsByClassName('wptb-builder-panel')[0].offsetWidth;
                    if (
                        window.currentEditor &&
                        document.getElementById('wptb_builder').scrollTop >= 55 &&
                        window.currentEditor.bodyElement.style.display != 'none'
                    ) {
                        document.getElementById('wpcd_fixed_toolbar').style.position = 'fixed';
                        document.getElementById('wpcd_fixed_toolbar').style.right = `${
                            totalWidth / 2 - document.getElementById('wpcd_fixed_toolbar').offsetWidth / 2
                        }px`;
                        document.getElementById('wpcd_fixed_toolbar').style.top = '100px';
                    } else {
                        document.getElementById('wpcd_fixed_toolbar').style.position = 'static';
                        delete document.getElementById('wpcd_fixed_toolbar').style.right;
                        delete document.getElementById('wpcd_fixed_toolbar').style.top;
                    }
                });
            },
        })
        this.element.removeEventListener('mouseover', tinyMCEStart, false);
    }

    /**
     * Get ribbon object from given ribbon id.
     *
     * @private
     * @param {string} ribbonId ribbon id
     * @return {RibbonType} created ribbon object
     */
    const getRibbonObject = (ribbonId) => {
        return this.ribbonFactory.getRibbon(ribbonId);
    }

    /**
     * Get internal id assigned to element from its class list.
     */
    const getInternalId = () => {
        Array.from(this.element.classList).map(c => {
            if (c.match(/wptb-element-ribbon_element-[0-9]+/)) {
                this.elementInternalId = c;
            }
        })
    }

    /**
     * Force update a control binded to ribbon element with a new value
     *
     * @param {string} controlName name of control
     * @param {string|number} val new value
     */
    this.forceUpdateControlValue = (controlName, val) => {
        // currently, id of control binded to element is different in format than the internal id assigned by the plugin system, this step reformats current ribbon element's id into control id
        const controlId = `#${this.elementInternalId}-${controlName}`;
        const reFormed = controlId.replace('element', 'el');

        const controlMainWrapper = document.querySelector(reFormed);
        const mainControl = controlMainWrapper.querySelector(`[data-element="${this.elementInternalId}"]`);

        mainControl.value = val;
    }

    /**
     * Get all controls bind to element.
     * @private
     * @return {Array<Element>} control elements
     */
    const getAllControls = () => {
        const controlIdStart = `${this.elementInternalId}-`;
        const reFormed = controlIdStart.replace('element', 'el');

        return Array.from(document.querySelectorAll(`[id^="${reFormed}"]`));
    }

    /**
     * Filter controls bind to ribbon element and change their visibility on left panel.
     *
     * @param {Array} allowedList an array of allowed control names
     * @param {Array} alwaysAllowed an array of always allowed control names
     */
    this.filterControls = (allowedList, alwaysAllowed) => {
        const controls = getAllControls();
        const mergedList = allowedList.concat(alwaysAllowed);

        controls.map(c => {
            const regEx = new RegExp(/^(?:.*)-(.+)/);
            const controlName = regEx.exec(c.id)[1];

            const elementAllowed = mergedList.includes(controlName);

            c.style.display = elementAllowed ? 'block' : 'none';
        })
    }

    /**
     * Mounted lifecycle function.
     *
     * This function will be called when the element is added to the dom for the first time.
     * @private
     */
    const mounted = () => {
        const tdParent = getParent('td', this.element);
        tdParent.style.position = 'relative';

        // update cell element of query object since at different situations, ribbon element may not be mounted on DOM, thus will result in an undefined cell parent. this update will make sure our cell element will be updated on queryObject for any other class to use it
        queryObject.cell = tdParent;

        // assign default ribbon type to dataset of ribbon element
        this.element.dataset['wptbRibbonType'] = currentRibbonId;

        this.currentRibbon.startUp();

        this.applyRibbonStyles();

        // save modifications
        this.saveModifications();
    }

    /**
     * Startup lifecycle function.
     *
     * This function will be called at startup of ribbon element.
     */
    this.startUp = () => {
        getInternalId();

        // get ribbon object from the current ribbon element
        this.currentRibbon = getRibbonObject(currentRibbonId);

        // hooking to custom event which will mark the moment element added to dom
        this.element.addEventListener('element:mounted:dom', () => {
            mounted();
        });

        // add event listener for control value changes
        WPTB_Helper.controlsInclude(this.element, this.update, true);

        // add tinyMCE initialization to mouseover event of ribbon element
        this.element.addEventListener('mouseover', tinyMCEStart, false);
    }

    /**
     * Destroy lifecycle hook.
     */
    this.destroy = () => {
        this.currentRibbon.destroy(this.element);
    }
}

/**
 * Front end setup for ribbon element.
 */
function frontEndStartUp() {
    let ribbonElementDataObj = wptbRibbonElementData;

    if (!ribbonElementDataObj) {
        throw new Error('[WPTB]: no data object found for ribbon element.');
    }

    // get the elements ribbon type from either dataset of element itself, or if not defined, from the default ribbon type of ribbon element object
    const elementRibbonType = element.dataset.wptbRibbonType ? element.dataset.wptbRibbonType : ribbonElementDataObj.defaultRibbon;

    // 'colorpicker' control don't fire up its current value on load, so need to gather default colors from color dump element
    const colorDump = element.querySelector('.wptb-element-ribbon-color-dump');
    let ribbonBackgroundColor = colorDump.style.backgroundColor;
    let ribbonBorderColor = colorDump.style.borderColor;

    const colorDefaults = {ribbonBackgroundColor, ribbonBorderColor};

    // remove empty color values from object
    Object.keys(colorDefaults).map(k => {
        if (Object.prototype.hasOwnProperty.call(colorDefaults, k)) {
            if (!colorDefaults[k] || colorDefaults[k] === '') {
                delete colorDefaults[k];
            }
        }
    })

    // default values to be used in ribbon element
    const defaultVals = Object.assign(ribbonElementDataObj.defaults, colorDefaults);

    // setup ribbon element instance
    const ribbonElement = new RibbonElement(element, elementRibbonType, defaultVals);

    // initiate ribbon element.
    ribbonElement.startUp();
}

// initiate ribbon element
frontEndStartUp();