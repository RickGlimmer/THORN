þ.extend('CHAINABLES', {
    style: function (attrib, value) {
        if (typeof attrib === 'string' && value === undefined) {
            return window.getComputedStyle ? window.getComputedStyle(this[0], null).getPropertyValue(attrib) : this[0].currentStyle.getAttribute(attrib);
        }
        if (typeof attrib !== 'object') {
            attrib[attrib] = value;
        }
        return this.each(function () {
            var i;
            for (i in attrib) {
                if (attrib.hasOwnProperty(i)) {
                    this.style[i] = attrib[i];
                }
            }
        }, true);
    }
    ,
    hide: function () {
        return this.style({ display: "none" });
    },
    show: function (display) {
        if (display)
            return this.style({ display: display });
        return this.each(function () {
            var nodeName = this.nodeName.toUpperCase();
            if (nodeName == "TD")
                this.style.display = "table-cell";
            else if (nodeName == "TR")
                this.style.display = "table-row";
            else if (nodeName == "TABLE")
                this.style.display = "table";
            else {
                this.style.display = "block";
            }
        }, true);
    }

/*    ,
        isCheckbox: function () {
                    return THORN.nodeName(this[0], "input") && this[0].type == "checkbox";
                },
                hasRole: function (role) {
                    var roles = this.attr("data-role");
                    if (roles == null)
                        return false;
                    roles = " " + roles + " ";
                    return roles.indexOf(" " + role + " ") >= 0;
                },
                id: function () {
                    return this[0].id;
                },
                getData: function (dataName, val) {
                    return this[0].dataset;
                },
                attr: function (attribute, val) {
                    if (arguments.length == 2) {
                        if (val == "false") val = false;
                        if (val == "true") val = true;
                        return this.each(function () {
                            if ((attribute == 'checked' || attribute == "disabled") && (val == '' || val == false || typeof val == "undefined")) {
                                this.removeAttribute(attribute)
                            }
                            else {
                                if (this.getAttribute(attribute) != val) {
                                    this.setAttribute(attribute, val);
                                }
                            }
                        });
                    } else {
                        var attrs = [];
                        this.each(function () {
                            var val = this.getAttribute(attribute);
                            if (val != null)
                                attrs.push(val);
                        });
                        return attrs.length == 0 ? null : attrs.length == 1 ? attrs[0] : attrs;
                    }
                },
                hasClass: function (className) {            // Returns the first element className
                    return THORN.hasClass(this[0], className);
                },
                addClass: function () {						// Add one or more classes to all elements
                    var className = arguments, i, l, f = function () {
                        if (!THORN.hasClass(this, className[i])) {
                            this.className = this.className ? this.className + ' ' + className[i] : className[i];
                        }
                    };
                    for (i = 0, l = className.length; i < l; i++) {
                        this.each(f);
                    }
                    return this;
                },
                removeClass: function () {		// Remove one or more classes from all elements
                    var className = arguments, i, l, f = function () {
                        this.className = this.className.replace(new RegExp('(^|\\s+)' + className[i] + '(\\s+|$)'), ' ');
                    };
                    for (i = 0, l = className.length; i < l; i++) {
                        this.each(f);
                    }
                    return this;
                },
                encodedValue: function () {
                    return window.encodeURIComponent(this.val());
                },
                trim: function () {
                    return THORN.trim(this.val());
                },
                val: function (value) {
                    var el = this[0];
                    if (value === undefined) {
                        if (el) {
        
                            if (THORN.nodeName(el, 'input') && el.type == "checkbox")
                                return el.checked;
        
                            if (THORN.nodeName(el, 'option'))
                                return (el.attributes.value || {}).specified ? el.value : el.text;
        
                            // Handle select boxes special
                            if (THORN.nodeName(el, "select")) {
                                var index = el.selectedIndex,
                                values = [],
                                options = el.options,
                                one = el.type == "select-one";
        
                                // Nothing was selected
                                if (index < 0)
                                    return null;
        
                                // Loop through all the selected options
                                for (var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++) {
                                    var option = options[i];
                                    if (option.selected) {
                                        // Get the specifc value for the option
                                        value = option.value || option.text; // (el.attributes.value || {}).specified ? el.value : el.text;
        
                                        // We don't need an array for one selects
                                        if (one)
                                            return value;
        
                                        // Multi-Selects return an array
                                        values.push(value);
                                    }
                                }
                                return values;
                            }
                            // Everything else, we just grab the value
                            return (el.value || "").replace(/\r/g, "");
                        }
                        return undefined;
                    }
                    return this.each(function () {
                        if (THORN.nodeName(this, 'input') && this.type == "checkbox")
                            this.checked = value;
                        else
                            this.value = value;
                    });
                }
    ,
    width: function (value) {
                    if (value === undefined) {
                        return this[0].clientWidth;
                    }
                    return this.each(function () {
                        var v = parseInt(value, 10);
                        this.style.width = (v) ? v + 'px' : '';
                    });
                },
                height: function (value) {
                    if (value === undefined) {
                        return this[0].clientHeight;
                    }
                    return this.each(function () {
                        var v = parseInt(value, 10);
                        this.style.height = (v) ? v + 'px' : '';
                    });
                },
                pos: function () {
                    var elm = this[0];
                    var x, y = 0;
                    x = elm.offsetLeft;
                    y = elm.offsetTop;
                    elm = elm.offsetParent;
                    while (elm != null) {
                        x = parseInt(x) + parseInt(elm.offsetLeft);
                        y = parseInt(y) + parseInt(elm.offsetTop);
                        elm = elm.offsetParent;
                    }
                    return { top: y, left: x };
                }
        */
});
