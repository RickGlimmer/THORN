þ.extend('CHAINABLES', {
    remove: function () {
        this.each(function () {
            if (this.parentNode)
                this.parentNode.removeChild(this);
        });
    },
/*
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
*/
    html: function (value) {
        if (value === undefined) return this.innerHTML;
        this.innerHTML = value;
        if (value.indexOf("[data-plugin]") > 0) {
            þ.loadPlugins(this);
        }
        return this;
    }
/*    ,
    load: function (url, onSuccess, onFailure) {
        if (this[0]) {
            if (this[0].innerHTML === undefined)
                return this;
            else {
                THORN.xhr(
                    url,
                    { async: true, method: 'GET', context: this[0] },
                    function (req, context) {
                        context.innerHTML = req.responseText;
                        $.loadPlugins(context);
                        if (typeof onSuccess == 'function')
                            onSuccess(context, req);
                    },
                    function (req, context) {
                        if (typeof onFailure == 'function')
                            onFailure(context, req);
                    }
                );
            }
        }
        return this;
    }
*/
});
