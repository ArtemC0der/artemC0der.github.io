/**
 * Text icon element.
 *
 * @param elementWrapper
 * @constructor
 */
function TextIconElement(elementWrapper) {
    this.element = elementWrapper;

    this.controlValues = {
        textIconIconLocation: 'left',
        textIconSpaceBetween: 15,
    }

    /**
     * Initiate text editor support for text icon element
     * @private
     */
    const tinyMCEStart = () => {
        tinyMCE.init({
            target: this.element,
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
                    const p = e.target.querySelector('#wptbTextIconMainText');
                    let pText = p.innerHTML.replace(/\s+/g, ' ').trim();
                    pText = pText.replace(/&nbsp;/g, '').trim();

                    if (!window.buttonElemPTextKeyDown) {
                        window.buttonElemPTextKeyDown = pText;
                    }
                });

                ed.on('keyup', function (e) {
                    const p = e.target.querySelector('#wptbTextIconMainText');
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
     * Element update lifecycle.
     *
     * @param {Object} inputs control input object
     */
    this.update = (inputs) => {
        Object.keys(inputs).map(k => {
            if (Object.prototype.hasOwnProperty.call(inputs, k)) {
                // if property name is also defined on the options object of the element, update the value on the options too
                if (this.controlValues[k] !== undefined) {
                    this.controlValues[k] = inputs[k].eventValue;
                }

                // start watch operations
                this.callWatchedProperties(k, inputs[k].eventValue);
            }
        });
    }

    /**
     * Call property callbacks that are on the watch list of the element.
     *
     * This callbacks will be bind to current element context and will be called with their value as the first argument.
     *
     * @param {string} propertyName name of the property
     * @param {any} value value of the property
     */
    this.callWatchedProperties = (propertyName, value) => {
        if (this.watch[propertyName]) {
            this.watch[propertyName].call(this, value);
        }
    }

    /**
     * Capitalize the given string.
     *
     * @param {string} val
     * @return {string} capitalized string
     */
    function cap(val) {
        return val[0].toUpperCase() + val.slice(1);
    }

    /**
     * Watch list for element.
     *
     * Control properties added to this object will be called with their attained callback function when a change happens in their values.
     * @type {Object}
     */
    this.watch = {
        textIconIconLocation(n) {
            const sideClear = n === 'left' ? 'right' : 'left';
            const textWrapper = this.element.querySelector('#wptbTextIconMainTextWrapper');
            textWrapper.style[`margin${cap(sideClear)}`] = '0';
            textWrapper.style[`margin${cap(n)}`] = `${this.controlValues.textIconSpaceBetween}px`;
        },
        textIconSpaceBetween(n) {
            const textWrapper = this.element.querySelector('#wptbTextIconMainTextWrapper');
            textWrapper.style[`margin${cap(this.controlValues.textIconIconLocation)}`] = `${n}px`;
        }
    }

    /**
     * Element startUp lifecycle hook.
     *
     * This hook will be called at the start of text icon element.
     */
    this.startUp = () => {
        // start tinyMCE for text part of element
        this.element.addEventListener('mouseover', tinyMCEStart, false);

        // bind element controls' updates to update lifecycle
        WPTB_Helper.controlsInclude(this.element, this.update, true);
    }
}

// instantiate and start up text icon element
const textIconElement = new TextIconElement(element);
textIconElement.startUp();