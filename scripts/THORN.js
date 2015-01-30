/*
    þ THORN: micro FrameWork (jQuery style syntax)
*/

(function () {
    var _Chainables = Object.create(null);
    var _Properties = Object.create(null);
    var _Plugins = Object.create(null);

    var THORN = function (query) {
        return query ? getNodes(query) : null;     // Return a list of nodes 
    }

	getNodes = function (selector, context) {
	    var nodeType, results = [], root = context || document;
	    var o = Object.create(_Chainables, _Properties);

	    if (selector === window)
	        o.nodes = [window];
	    else if (selector.nodeType)
	        o.nodes = [selector];
	    else if (
                !(!selector || typeof selector !== "string")  ||
	            !( ((nodeType = root.nodeType) !== 1 && nodeType !== 9) )
            )
            o.nodes = root.querySelectorAll(selector);
        return o;
	}

	onLoadFunctions = [] 	// Holds all functions to be executed on DOM ready

    DOMReady = function () {
        THORN.loadPlugins(document.body);
        var i, l;
        for (i = 0, l = onLoadFunctions.length; i < l; i++) {
            onLoadFunctions[i]();
        }
        onLoadFunctions = null;
        document.removeEventListener('DOMContentLoaded', DOMReady, false);
    };

    THORN.addPlugin = function (plugin) {
        THORN.extend('PLUGINS', plugin);
    }

    THORN.plugins = _Plugins;

    THORN.extend = function (targetname, obj) {						// Merge to objects
        var prop, target;
        switch (targetname) {
            case 'CHAINABLES': target = _Chainables; break;
            case 'PROPERTIES': target = _Properties; break;
            case 'THORN': target = THORN; break;
            case 'PLUGINS': target = _Plugins; break;
            default: target = Object.create(null); break;
        }
        for (prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                target[prop] = obj[prop];
            }
        }
        return target;
    };

    THORN.ready = function (fn) {					// Execute functions on DOM ready
        if (onLoadFunctions.length === 0) {
            document.addEventListener('DOMContentLoaded', DOMReady, false);
        }
        onLoadFunctions.push(fn);
    }


    window.THORN = window.þ = THORN; // Expose þ to the world
})();

