þ.extend('CHAINABLEMETHODS', {
    //Set attribute on this.nodes
    attr: function (attrname, val) {
        if (val == "false") val = false;
        else if (val == "true") val = true;
        return this.each(function () {
            if ((attribute == 'checked' || attribute == "disabled")
                && (val == '' || val == false || typeof val == "undefined")) {
                this.removeAttribute(attribute)
            }
            else {
                if (this.getAttribute(attribute) != val) this.setAttribute(attribute, val);
            }
        }, true);
    }
});
