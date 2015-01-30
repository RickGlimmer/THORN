þ.extend('CHAINABLES', {
    bind: function (type, fn, capture) {
        var modtype = type;
        var types = modtype.split(" ");
        return this.each(function () {
            for (i = 0; i < types.length; i++)
                this.addEventListener(types[i], fn, capture ? true : false);
        }, true);
    }
    ,
    unbind: function (type, fn, capture) {
        var modtype = type;
        var types = modtype.split(" ");
        return this.each(function () {
            for (i = 0; i < types.length; i++)
                this.removeEventListener(types[i], fn, capture ? true : false);
        }, true);
    }
    ,
    fire: function (type, detail) {
        return this.each(function () {
            var me = this;
            if (me == document && !me.dispatchEvent)
                me = document.documentElement;


            if (typeof window.Event == "function") {
                var event = new Event(type, {
                    'bubbles': true,
                    'cancelable': true
                });
                event.detail = detail;
                me.dispatchEvent(event);
            } else {
                var event = document.createEvent('HTMLEvents');
                event.initEvent(type, true, true);
                event.detail = detail;
                event.eventName = type;
                me.dispatchEvent(event);
            }

        }, true);
    }
    /*        ,
            message: function (type, data) {
                return this.each(function () {
                    var subscribers = $(this).attr("data-subscribers");
                    if (subscribers != null) {
                        þ(subscribers).fire(type, data);
                    }
                });
            },
    */
});
