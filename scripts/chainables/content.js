þ.extend('CHAINABLES', {
    //Set attribute on this.nodes
    attr: function (attrname, newvalue) {
        if (newvalue === 'false') {
            newvalue = false;
        } else if (newvalue === 'true') {
            newvalue = true;
        }

        return this.each(function () {
            if ((attrname === 'checked' || attrname === 'disabled')
                    && (newvalue === '' || newvalue === false || newvalue === undefined)) {
                this.removeAttribute(attrname);
            } else if (this.getAttribute(attrname) !== newvalue) {
                this.setAttribute(attrname, newvalue);
            }
        }, true);
    },

    remove: function () {
        this.each(function () {
            if (this.parentNode) { this.parentNode.removeChild(this); }
        }, true);
    },

    html: function (value) {
        if (value === undefined) { return this.innerHTML; }

        this.each(function () {
            this.innerHTML = value;//innerHTML on the þ object NOT on the DOM node
        });
        return this;
    }
    /*
    TODO.Add a xhr (XMLHTTPRequest) extension to dynamically load content    

    load: function (url, onSuccess, onFailure) {
        var context = this;
        if (context.innerHTML !== undefined) {
            THORN.xhr(
                url,
                { async: true, method: 'GET', context: context },
                function (req, context) {
                    context.innerHTML = req.responseText;
                    if (typeof onSuccess == 'function')
                        onSuccess(context, req);
                },
                function (req, context) {
                    if (typeof onFailure == 'function')
                        onFailure(context, req);
                }
            );
        }
        return this;
    }
*/
});
