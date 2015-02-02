þ.extend('THORN', {

    //extend THORNs capabilities to allow Plugins for custom functionality
    plugin: (function () {
        var _Plugins = Object.create(null);

        //Register function to attach all plugins on DOMReady
        þ.onready(function () { þ.plugin.attach(document.body); });

        //Add plugin to collection
        this.add = function (plugin) {
            //TODO Check if plugin is already added. Throw error
            //þ.error("Plugin '" + pluginName + "' is already added!");
            þ.extend(_Plugins, plugin);
        };

        //Plugins can be attached to DOM nodes by adding a data-plugin="PluginName" attribute
        //This function is called after the DOM has been loaded.
        //But before user content is dynamically loaded.
        this.attach = function (elem) {
            if (!elem) return; // fast exit
            þ(elem).find('[data-plugin]').each(function () {
                var pluginName = this.dataset.plugin;
                if (pluginName != null) {
                    _Plugins[pluginName](this);
                }
            }, true); // get raw Nodes
        };

        //Fire a 'detach' event on all plugins within an element
        //plugin has to cleanup after itself by removing its eventlisteners
        //This gets called before dynamic content is loaded into the element
        this.detach = function (elem) {
            if (!elem) return; // fast exit
            þ(elem).find('[data-plugin]').fire("detach");
        };

        return this;
    })()
});

//Override the standard innerhtml function
þ.extend('PROPERTIES', {
    innerHTML: {
        //Don't allow this property innerHTML to be overriden.
        //plugin detach and attach have to be executed.
        sealed: true,
        set: function (value) {
            this.each(
                    function () {
                        þ.plugin.detach(this); //Fires a detach event for plugins to do a cleanup 
                        this.innerHTML = value; //This is directly on the DOM node;
                        if (value.indexOf("[data-plugin]") > 0) {
                            þ.plugin.attach(this);
                        }
                    }, true)
        },
        get: function () {
            return this.nodes[0].innerHTML;
        }
    }
});
