þ.extend('CHAINABLES', {

    addClass: function (values) {
        var i, þnodes = this;

        if (typeof values === "string") values = [values];

        return this.each(function (nodeIndex) {
            //each node
            for (i = 0; i < values.length; i++) {
                //each value
                if (!þnodes.hasClass(values[i], nodeIndex)) {
                    if (this.className)
                        this.className = this.className + ' ' + values[i];
                    else
                        this.className = values[i];
                }
            }
        }, true);
    },

    removeClass: function (values) {
        var i;

        if (typeof values === "string") values = [values];

        return this.each(function (nodeIndex) {
            for (i = 0; i < values.length; i++) {
                //
                var classNames = this.className.split(' ');
                var position = classNames.indexOf(values[i]);
                if (position >= 0) {
                    classNames.splice(position, 1); //Deleted it from array
                    this.className = classNames.join(' ');//Join remaining
                }
            }
        }, true);

    },

});
