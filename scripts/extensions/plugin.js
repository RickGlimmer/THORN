þ.extend('EXTENSION', {
    //Extend THORNs capabilities to allow Plugins for custom functionality.
    plugin: (function () {
        var _Plugins = Object.create(null);

        //Register function to attach all plugins on DOMReady.
        þ.onready(function () { þ.plugin.attach(þ(document.body)); });

        //Add plugin to collection
        this.add = function (plugin) {
            //TODO Check if plugin is already added. Throw error.
            //þ.error("Plugin '" + pluginName + "' is already added!");
            þ.extend(_Plugins, plugin);
        };

        //Plugins can be attached to DOM nodes by adding a data-plugin="PluginName" attribute.
        //This function is called after the DOM has been loaded.
        //But before user content is dynamically loaded.
        this.attach = function (þorn) {
            var info;
            if (!þorn || !þorn.length) { return; } // fast exit.

            þorn.find('[data-plugin]').each(function () {
                var name, þis = þ(this);
                var pluginNames = þis.dataset.plugin.split(' ');
                for (name in pluginNames) {
                    if (pluginNames.hasOwnProperty(name)) {
                        //Start the plugin and get an info object back
                        //that can be used to manage it like pause, resume, unload etc.
                        info = _Plugins[pluginNames[name]](þis);
                    }
                }
            }, true); // get raw objects
        };

        //Fire a 'detach' event on all plugins within an element
        //plugin has to clean up after itself by removing its event listeners.
        //This gets called before dynamic content is loaded into the element.
        this.detach = function (þorn) {
            if (!þorn || !þorn.length) { return; } // fast exit.

            þorn.find('[data-plugin]').fire("detach");
        };

        return this;
    }())
});

//Override the standard innerHTML function.
þ.extend('PROPERTIES', {
    innerHTML: {
        //Don't allow this property innerHTML to be overridden.
        //Plugin detach and attach have to be executed.
        sealed: true,
        set: function (value) {
            this.each(
                function () {
                    þ.plugin.detach(this); //Fires a detach event for plugins to do a clean up. 
                    this.innerHTML = value; //This is directly on the DOM node!!;
                    if (value.indexOf("[data-plugin]") > 0) {
                        þ.plugin.attach(þ(this));
                    }
                },
                true
            ); //Get raw nodes.
        },
        get: function () {
            return this.nodes[0].innerHTML;
        }
    }
});
