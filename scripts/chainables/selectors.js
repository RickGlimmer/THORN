þ.extend('CHAINABLES', {
    each: function (callback, rawNode) {
        var i, l;
        for (i = 0, l = this.nodes.length; i < l; i++) {
            if (callback.call(rawNode ? this.nodes[i] : þ(this.nodes[i]), i) === false)
                break;
        }
        return this;
    }
    ,
    parent: function () {
        var result = [], parent;
        this.each(function () {
            parent = this.parentNode;
            if (!parent._counted) {
                result[result.length] = parent;
                parent._counted = true;
            }
        }, true);
        return THORN(result).each(function () {
            delete this._counted;
        });
    },
    find: function (selector) {
        if (selector.indexOf(">") == 0) {
            //Direct children is not supported by queryselectorall
            var data = this.nodes[0].dataset;
            if (!data && !data.guid)
                data.guid = þ.guid();
            selector = '[data-guid="' + data.guid + '"]' + selector;
        }
        return þ(selector, this.nodes[0]);
    }
/*    ,
    selfOrParent: function (nodeNameOrAttrName, attrValue) {
        var elem = this[0];
        var n = nodeNameOrAttrName.toLowerCase();
        if (arguments.length == 1) {
            while (elem.nodeName != "BODY") {
                if (elem.nodeName.toLowerCase() == n)
                    return $(elem);
                elem = elem.parentNode;
            }
            return null;
        }
        if (arguments.length == 2) {
            while (elem.nodeName != "BODY") {
                if (attrValue == null) {
                    if (elem.getAttribute(nodeNameOrAttrName) != null)
                        return $(elem);
                }
                else {
                    if (elem.getAttribute(nodeNameOrAttrName) == attrValue)
                        return $(elem);
                }
                elem = elem.parentNode;
            }
            return null;
        }
    },
*/
});
