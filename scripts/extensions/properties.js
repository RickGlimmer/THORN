þ.extend('PEARLS', {
    /*
    Thank you ????
    URL: ???
    
    guid() creates a unique identifier
    */
    guid: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
            .replace(/[xy]/g, function (c) {
                /*jslint bitwise: true*/
                var r = Math.random() * 16 | 0,
                    v = c === 'x' ? r : r & 0x3 | 0x8;
                /*jslint bitwise: false*/
                return v.toString(16);
            });
    },

    /*
    //Thank you Crockford!
    //http://javascript.crockford.com/remedial.html

    supplant() does variable substitution on the string.
    It scans through the string looking for expressions enclosed in { } braces.
    If an expression is found, use it as a key on the object,
    and if the key has a string value or number value,
    it is substituted for the bracket expression and it repeats.
    This is useful for automatically fixing URLs. So

    param = {domain: 'valvion.com', media: 'http://media.valvion.com/'};
    url = "{media}logo.gif".supplant(param);
    produces a url containing "http://media.valvion.com/logo.gif".
    */
    supplant: function (value) {
        return value.replace(
            /\{([^{}]*)\}/g,
            function (a, b) {
                var replacement = value[b];
                return typeof replacement === 'string' ||
                    typeof replacement === 'number' ? replacement : a;
            }
        );
    },
    /*
    The trim() method removes whitespace characters
    from the beginning and end of the string.
    */
    trim: function (value) {
        return value.replace(/^\s*(\S*(?:\s+\S+)*)\s*$/, "$1");
    }

});


