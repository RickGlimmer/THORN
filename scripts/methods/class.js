þ.extend('METHODS', {
    hasClass: function (className, index) {
        //Take the node, split classname, lookup in resulting array
        return this.nodes[index || 0].className.split(' ').indexOf(className) !== -1;
    }
});
þ.plugin.add({
    HELLO: function (þelem) {
        "use strict";
        var info = {
            plugin: 'HELLO',
            author: "Rick Glimmer",
            version: "0.1",
            date: "Friday, February 6, 2015 19:38:17+07:00",

            //Internal data for future plugin management
            data: (function () { þelem.dataset.pluginGuid = þ.guid(); return þelem.dataset; }()),
            þelem: þelem
        };

        return (function (þorn) {
            var data = þorn.dataset;

            þorn
                .bind('click', function (e) { //Click on the element.
                    e.stopPropagation();
                    þorn.style({ backgroundColor: 'yellow' });
                })
                .bind('changebackground', function (e) { // Custom event Fired from code.
                    þorn.style({ backgroundColor: e.detail });
                });
            return info;
        }(þelem));
    }
});