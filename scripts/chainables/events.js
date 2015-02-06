þ.extend('CHAINABLES', {
    bind: function (type, fn, capture) {
        var i, types = type.toLowerCase().split(" ");

        return this.each(function () {
            for (i = 0; i < types.length; i++) {
                this.addEventListener(types[i], fn, capture ? true : false);
            }
        }, true);
    },

    unbind: function (type, fn, capture) {
        var i, types = type.toLowerCase().split(" ");

        return this.each(function () {
            for (i = 0; i < types.length; i++) {
                this.removeEventListener(types[i], fn, capture ? true : false);
            }
        }, true);
    },

    fire: function (type, detail, canbubblearg, cancelablearg) {
        type = type.toLowerCase();
        return this.each(function () {
            var event;
            var elem = typeof this === 'document' ? document.documentElement : this;
            var canBubble = canbubblearg === undefined ? true : canbubblearg;
            var cancelable = cancelablearg === undefined ? true : cancelablearg;

            /*global Event */
            if (typeof Event === "function") {
                event = new Event(type, {
                    'bubbles': canBubble,
                    'cancelable': cancelable
                });
                event.detail = detail;
                elem.dispatchEvent(event);
            } else {
                event = document.createEvent('HTMLEvents');
                event.initEvent(type, canBubble, cancelable);
                event.detail = detail;
                event.eventName = type;
                elem.dispatchEvent(event);
            }

        }, true);
    }

});
