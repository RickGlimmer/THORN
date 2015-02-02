þ.extend('CHAINABLEMETHODS', {
    hasClass: function (className, index) {
        //Take the node, split classname, lookup in resulting array
        return this.nodes[index?index:0].className.split(' ').indexOf(className) != -1
        //return new RegExp('(^|\\s)' + className + '(\\s|$)')
        //    .test(this.nodes[index ? index : 0].className);
    }
});
