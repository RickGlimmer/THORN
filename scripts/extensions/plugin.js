þ.extend('EXTENSION', {
    //extend THORNs capabilities to allow Plugins for custom functionality
    plugin: (function () {
        var _Plugins = Object.create(null);

        //Register function to attach all plugins on DOMReady
        þ.onready(function () { þ.plugin.attach(þ(document.body)); });

        //Add plugin to collection
        this.add = function (plugin) {
            //TODO Check if plugin is already added. Throw error
            //þ.error("Plugin '" + pluginName + "' is already added!");
            þ.extend(_Plugins, plugin);
        };

        //Plugins can be attached to DOM nodes by adding a data-plugin="PluginName" attribute
        //This function is called after the DOM has been loaded.
        //But before user content is dynamically loaded.
        this.attach = function (þorn) {
            if (!þorn || !þorn.length) { return; } // fast exit

            þorn.find('[data-plugin]').each(function () {
                var name, þis = þ(this);
                var pluginNames = þis.dataset.plugin.split(' ');
                for (name in pluginNames) {
                    if (pluginNames.hasOwnProperty(name)) {
                        _Plugins[pluginNames[name]](þis);
                    }
                }
            }, true); // get raw objects
        };

        //Fire a 'detach' event on all plugins within an element
        //plugin has to cleanup after itself by removing its eventlisteners
        //This gets called before dynamic content is loaded into the element
        this.detach = function (þorn) {
            if (!þorn || !þorn.length) { return; } // fast exit

            þorn.find('[data-plugin]').fire("detach");
        };

        return this;
    }())
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
                    this.innerHTML = value; //This is directly on the DOM node!!;
                    if (value.indexOf("[data-plugin]") > 0) {
                        þ.plugin.attach(þ(this));
                    }
                },
                true
            ); //get raw node
        },
        get: function () {
            return this.nodes[0].innerHTML;
        }
    }
});
