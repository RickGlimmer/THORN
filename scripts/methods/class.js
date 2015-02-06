þ.extend('METHODS', {
    hasClass: function (className, index) {
        //Take the node, split classname, lookup in resulting array
        return this.nodes[index || 0].className.split(' ').indexOf(className) !== -1;
    }
});
