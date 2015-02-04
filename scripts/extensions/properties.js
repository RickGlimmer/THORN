þ.extend('EXTENSION', {
    //Create a unique identifier
    //I am not sure where this code comes from!
    //If someone knows we can add the credentials.
    guid: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
            .replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : r & 0x3 | 0x8;
                return v.toString(16);
            });
    },

    //Thank you Crockford!
    supplant: function (value) {
        return value.replace(
            /\{([^{}]*)\}/g,
            function (a, b) {
                var r = o[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            });
    },

    trim: function (value) {
        return value.replace(/^\s*(\S*(?:\s+\S+)*)\s*$/, "$1");
    }

});


