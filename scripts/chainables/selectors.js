﻿þ.extend('CHAINABLES', {
    //Iterate over the nodes array
    each: function (callback, rawNode) {
        var i, l;
        for (i = 0, l = this.nodes.length; i < l; i++) {
            if (callback.call(rawNode ? this.nodes[i] : þ(this.nodes[i]), i) === false) {
                break;
            }
        }
        return this;
    },

    //Select the parent of the first node
    //TODO Add a filter
    parent: function () {
        return this.length ? þ(this.nodes[0].parentNode) : þ();
    },

    //Select the parents from all the nodes
    //TODO Add a filter
    parents: function () {
        var result = [], parent;
        this.each(function () {
            parent = this.parentNode;
            if (!parent.__tagged) {
                result[result.length] = parent;
                //Tag the parent to prevent doubles.
                parent.__tagged = true;
            }
        }, true);
        return þ(result).each(function () {
            //Cleanup the nodes
            delete this.__tagged;
        }, true);
    },

    //Select nodes within the context of the first node
    //TODO Add support to find the nodes within all the this.nodes
    find: function (selector) {
        if (selector.indexOf(">") === 0) {
            //Direct children is not supported by queryselectorall
            var data = this.nodes[0].dataset;
            if (!data && !data.guid) { data.guid = þ.guid(); }
            selector = '[data-guid="' + data.guid + '"]' + selector;
        }
        return þ(selector, this.nodes[0]);
    }
});
