/*
 þ THORN: micro FrameWork (jQuery style syntax)
 Author: Rick Glimmer
 Date: 2015-02-02 21:15+07:00 until .... see commit
 Version: 0.1

 checked with jslint on 2015-02-05 11:20+700 use:
*/

/*jslint browser: true, nomen: true, plusplus: true, todo: true, vars: true, white: false */

(function () {
    "use strict";
    //Objects to hold all added functionalities
    var _Methods = Object.create(null),
        _Properties = Object.create(null),
        _Constants = Object.create(null);

    //internal function to select all nodes in the DOM that satifies the parameters
    //Return value will have a nodes list with all the raw DOM nodes
    //.length can be used how many nodes are found
    //_Chainable functions use the nodes and allow chaining.
    //_Properties can get or set a value on a the first node or when possible on all nodes.
    var getNodes = function (selector, context) {
        var root = context || document,
            o = Object.create(_Methods, _Properties);
        o.nodes = [];

        if (selector === window) {
            o.nodes.push(window);
        } else if (selector.nodeType) {
            o.nodes.push(selector);
        } else if (selector instanceof Array) {  // An array with nodes
            //Do we need tocheck if every item is a node type 1 or 9?
            Array.prototype.push.apply(o.nodes, selector);
        } else if (typeof selector === 'string' && (root.nodeType === 1 || root.nodeType === 9)) {
            //Change static nodelist into a static array
            //improves iterating performance
            Array.prototype.push.apply(o.nodes, root.querySelectorAll(selector));
        }
        return o;
    };


    //This is the global selector function
    var THORN = function (query, context) {
        return query ? getNodes(query, context) : null;     // Return a list of nodes 
    };

    //This allows to extend THORN with extra functions and attributes
    THORN.extend = function (targetname, obj) {
        var prop, target, sealed;
        switch (targetname) {
            case 'CHAINABLES':
            case 'METHODS':
                target = _Methods;
                break;
            case 'CONSTANTS':
                target = _Constants;
                break;
            case 'PROPERTIES':
                target = _Properties;
                break;
            case 'EXTENSION':
                target = THORN;
                break;
            default:
                if (Object.isExtensible(targetname)) {
                    target = targetname;
                } else {
                    return null;
                }
        }
        for (prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                sealed = target[prop] && target[prop].sealed;
                if (!sealed) {
                    target[prop] = obj[prop];
                }
            }
        }
        return target;
    };

    //THORN collects all onready functions
    var onLoadFunctions = [];

    //First attaches all Plugins to their nodes and then calls the
    //registered onready functions one by one.
    function DOMReady() {
        var i, l, prop;

        //Make all constants immutable
        for (prop in _Constants) {
            if (_Constants.hasOwnProperty(prop) && !Object.isFrozen(_Constants[prop])) {
                Object.freeze(_Constants[prop]);
            }
        }
        _Methods.CONSTANTS = Object.freeze(_Constants);
        Object.freeze(_Methods.CONSTANTS);

        for (i = 0, l = onLoadFunctions.length; i < l; i++) {
            onLoadFunctions[i]();
        }
        onLoadFunctions = null;
        document.removeEventListener('DOMContentLoaded', DOMReady, false);
    }

    THORN.onready = function (fn) {
        //register the onready function
        onLoadFunctions.push(fn);
    };

    document.addEventListener('DOMContentLoaded', DOMReady, false);

    window.THORN = window['þ'] = THORN; // Expose þ to the world
}());
