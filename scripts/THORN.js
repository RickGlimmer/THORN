/*
 þ THORN: micro FrameWork (jQuery style syntax)
 Author: Rick Glimmer
 Date: 2015-01-28
 Version: 0.1
*/

(function () {
    //Objects to hold all added functionalities
    var _Chainables = Object.create(null);
    var _Properties = Object.create(null);
    var _Plugins = Object.create(null);

    //This is the global selector function
    var THORN = function (query, context) {
        return query ? getNodes(query, context) : null;     // Return a list of nodes 
    }

    //internal function to select all nodes in the DOM that satifies the parameters
    //Return value will have a nodes list with all the raw DOM nodes
    //.length can be used how many nodes are found
    //_Chainable functions use the nodes and allow chaining.
    //_Properties can get or set a value on a the first node or when possible on all nodes.
    getNodes = function (selector, context) {
        var nodeType, results = [], root = context || document;
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
    THORN.extend = function (targetname, obj) {						// Merge to objects
        var prop, target;
        switch (targetname) {
            case 'METHODS': //Falls through as there is no separate methods object
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

    //THORN allows Plugins to extend its capabilities
    THORN.addPlugin = function (plugin) {
        THORN.extend('PLUGINS', plugin);
    }

    //Plugins can be attached to DOM nodes by adding a data-plugin="PluginName" attribute
    //This function is called after the DOM has been loaded.
    //But before user content is dynamically loaded.
    THORN.loadPlugins = function (elem) {
        if (!elem) return; // fast exit
        þ(elem).find('[data-plugin]').each(function () {
            var pluginName = this.dataset.plugin;
            if (pluginName != null) {
                _Plugins[pluginName](this);
            }
        }, true); // get raw Nodes
    }


    //THORN collects all onready functions
    onLoadFunctions = []

    THORN.onready = function (fn) {
        //First time called setup the event
        if (onLoadFunctions.length === 0) {
            document.addEventListener('DOMContentLoaded', DOMReady, false);
        }
        //register the onready function
        onLoadFunctions.push(fn);
    }

    //First attaches all Plugins toits nodes and then calls the
    //registered onready functions one by one.
    DOMReady = function () {
        THORN.loadPlugins(document.body);
        var i, l;
        for (i = 0, l = onLoadFunctions.length; i < l; i++) {
            onLoadFunctions[i]();
        }
        onLoadFunctions = null;
        document.removeEventListener('DOMContentLoaded', DOMReady, false);
    };

    //Create a unique identifier
    //I am not sure where this code comes from!
    //If someone knows we can add the credentials.
    THORN.guid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
            .replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                        v = c == 'x' ? r : r & 0x3 | 0x8;
                return v.toString(16);
            });
    };

    window.THORN = window.þ = THORN; // Expose þ to the world
})();

