þ.extend('PROPERTIES', {
    // This is an example when this is used as the second parameter in
    // Object.create(). A object with properties that can be set and get
    //This can not be chained as its use is elem.html = "hello";
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
    length: {
        get: function () { return this.nodes ? this.nodes.length : 0; }
    }
});

