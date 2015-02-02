/*
 þ THORN: micro FrameWork (jQuery style syntax)
 Author: Rick Glimmer
 Date: 2015-02-02 21:15+07:00
 Version: 0.1
*/
"use strict";
(function () {
    //Objects to hold all added functionalities
    var _Chainables = Object.create(null);
    var _Properties = Object.create(null);

    //This is the global selector function
    var THORN = function (query, context) {
        return query ? getNodes(query, context) : null;     // Return a list of nodes 
    };
    
    //internal function to select all nodes in the DOM that satifies the parameters
    //Return value will have a nodes list with all the raw DOM nodes
    //.length can be used how many nodes are found
    //_Chainable functions use the nodes and allow chaining.
    //_Properties can get or set a value on a the first node or when possible on all nodes.
    var getNodes = function (selector, context) {
        var i, l, nodeType;
        var root = context || document;
        var o = Object.create(_Chainables, _Properties);

        if (selector === window)
            o.nodes = [window];
        else if (selector.nodeType)
            o.nodes = [selector];
        else if (selector instanceof Array) {  // An array with nodes
            o.nodes = [];
            for (i = 0, l = selector.length; i < l; i++) {
                o.nodes[i] = selector[i];
            }
        }
        else if (
                !(!selector || typeof selector !== "string") ||
	            !(((nodeType = root.nodeType) !== 1 && nodeType !== 9))
            )
            o.nodes = root.querySelectorAll(selector);
        return o;
    }

    //This allows to extend THORN with extra functions and attributes
    THORN.extend = function (targetname, obj) {
        var prop, target, sealed;
        switch (targetname) {
            case 'CHAINABLEMETHODS': //Falls through as there is no separate methods object
            case 'CHAINABLES': target = _Chainables; break;
            case 'CONSTANTS':
            case 'PROPERTIES': target = _Properties; break;
            case 'THORN': target = THORN; break;
            case 'PLUGINS': target = _Plugins; break;
            default: target = typeof targetname === 'string' ? Object.create(null) : targetname; break;
        }
        for (prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                sealed = target[prop] && target[prop].sealed;
                if (!sealed)
                    target[prop] = obj[prop];
            }
        }
        return target;
    };

    //THORN collects all onready functions
    var onLoadFunctions = [];

    //First attaches all Plugins to their nodes and then calls the
    //registered onready functions one by one.
    function DOMReady() {
        var i, l;

        for (i = 0, l = onLoadFunctions.length; i < l; i++) {
            onLoadFunctions[i]();
        }
        onLoadFunctions = null;
        document.removeEventListener('DOMContentLoaded', DOMReady, false);
    };

    THORN.onready = function (fn) {
        //register the onready function
        onLoadFunctions.push(fn);
    };

    document.addEventListener('DOMContentLoaded', DOMReady, false);


    window.THORN = window.þ = THORN; // Expose þ to the world
})();

