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




/*    ,
        isCheckbox: function () {
                    return THORN.nodeName(this[0], "input") && this[0].type == "checkbox";
                },
        */