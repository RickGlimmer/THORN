þ.extend('PROPERTIES', {
    //These can not be chained as all these properties return a value
    id: { get: function () { return this.nodes[0].id } },
    dataset: { get: function () { return this.nodes[0].dataset; } },

    //Access to the raw nodes
    length: { get: function () { return this.nodes ? this.nodes.length : 0; } },
    firstNode: { get: function () { return this.nodes.length ? this.nodes[0] : null } },
    allNodes: { get: function () { return this.nodes; } },

    //Width,height and position of the first node
    clientWidth: { get: function () { return this.nodes[0].clientWidth; } },
    offsetWidth: { get: function () { return this.nodes[0].offsetWidth; } },
    scrollWidth: { get: function () { return this.nodes[0].scrollWidth; } },
    clientHeight: { get: function () { return this.nodes[0].clientHeight; } },
    offsetHeight: { get: function () { return this.nodes[0].offsetHeight; } },
    scrollHeight: { get: function () { return this.nodes[0].scrollHeight; } },

    //Position relative to its container
    offsetTop: { get: function () { return this.nodes[0].offsetTop; } },
    offsetLeft: { get: function () { return this.nodes[0].offsetLeft; } },

    //Position relative to document
    position: {
        get: function () {
            var node = this.nodes[0],
             left = parseInt(node.offsetLeft),
             top = parseInt(node.offsetTop);

            node = node.offsetParent;

            while (node != null) {
                left += parseInt(node.offsetLeft);
                top += parseInt(node.offsetTop);
                node = node.offsetParent;
            }
            return { left: left, top: top };
        }
    },

    //Read or write the innerHTML of an node
    innerHTML: {
        set: function (value) {
            this.each(
                    function () {
                        if (this.innerHTML) // Check if this node supports innerHTML
                            this.innerHTML = value;
                    }, true)
        },
        get: function () {
            return this.nodes[0].innerHTML;
        }
    },

    getAttribute: { get: function (attrname) { return this.nodes[0].getAttribute(attrname) } },

    value: {
        get: function () {
            var node = this.nodes[0];
            if (node.nodeType == 1) { //node is an element
                switch (node.tagName) {
                    case 'INPUT':
                        if (node.type == 'checkbox') return node.checked;
                        break;
                    case 'OPTION':
                        return node.value || node.text;
                    case 'SELECT':
                        var i, max, index = node.selectedIndex, values = [],
                        options = node.options, one = node.type == "select-one";

                        if (index < 0) return null; // Nothing was selected

                        if (one) return options[index].value || options[index].text;

                        // Loop through all options and find the selected ones
                        for (i = 0, max = options.length; i < max; i++) {
                            var option = options[i];
                            if (option.selected) values.push(option.value || option.text);
                        }
                        return values;
                }
            }
            // Everything else
            return (node.value || "").replace(/\r/g, "");
        }
    },

    encodedValue: { get: function () { return window.encodeURIComponent(this.value); } }
});
