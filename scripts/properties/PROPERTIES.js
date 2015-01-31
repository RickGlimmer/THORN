þ.extend('PROPERTIES', {
    //This can not be chained as its use is þelem.html = "hello" or var t = þelem.html;
    innerHTML: {
        configurable: false,
        set: function (value) {
            this.each(
                    function () {
                        this.innerHTML = value;
                    }, true)
        },
        get: function () {
            return this.nodes[0].innerHTML;
        }
    },

    clientWidth: { get: function () { return this.nodes[0].clientWidth; } },
    offsetWidth: { get: function () { return this.nodes[0].offsetWidth; } },
    scrollWidth: { get: function () { return this.nodes[0].scrollWidth; } },
    clientHeight: { get: function () { return this.nodes[0].clientHeight; } },
    offsetHeight: { get: function () { return this.nodes[0].offsetHeight; } },
    scrollHeight: { get: function () { return this.nodes[0].scrollHeight; } },

    //Position relative to its container
    offsetTop: { get: function () { return this.nodes[0].offsetTop; } },
    offsetLeft: { get: function () { return this.nodes[0].offsetLeft; } },
    offset: {
        get: function () {
            return { left: this.nodes[0].offsetLeft, top: this.nodes[0].offsetTop }
        }
    },

    //Position relative to document
    position: {
        get: function () {
            var node = this.nodes[0],
             x = parseInt(node.offsetLeft),
             y = parseInt(node.offsetTop);

            node = node.offsetParent;
            while (node != null) {
                x += parseInt(node.offsetLeft);
                y += parseInt(node.offsetTop);
                node = node.offsetParent;
            }
            return { left: x, top: y };
        }
    },

    id: { get: function () { return this.nodes[0].id } },
    dataset: { get: function () { return this.nodes[0].dataset; } },


    value: {
        get: function () {
            var node = this.nodes[0];
            if (node.nodeType == 1) {//node is an element
                switch (node.tagName) {
                    case 'INPUT':
                        if (node.type == 'checkbox') return node.checked;
                        break;
                    case 'OPTION':
                        return node.value || node.text;
                        break;
                        // Handle select boxes special
                    case 'SELECT':
                        var index = node.selectedIndex,
                        values = [],
                        options = node.options,
                        one = node.type == "select-one";

                        // Nothing was selected
                        if (index < 0) return null;

                        // Loop through all the selected options
                        for (var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++) {
                            var option = options[i];
                            if (option.selected) {
                                // Get the specifc value for the option
                                value = option.value || option.text;

                                // We don't need an array for one selects
                                if (one)
                                    return value;

                                // Multi-Selects return an array
                                values.push(value);
                            }
                        }
                        return values;
                }
            }
            // Everything else, we just grab the value
            return (node.value || "").replace(/\r/g, "");
        }
    },

    encodedValue: function () {
        return window.encodeURIComponent(this.value);
    },

    //Number of nodes
    length: {
        get: function () { return this.nodes ? this.nodes.length : 0; }
    }
});
