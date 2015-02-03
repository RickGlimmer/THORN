þ.extend('CHAINABLES', {
    //To set a style:
    //þ('body').style("color","black") or
    //þ('body').style({color: black }) 
    style: function (attrib, value) {
        if (typeof attrib !== 'object') {
            attrib[attrib] = value;
        }
        return this.each(function () {
            var i;
            for (i in attrib) {
                if (attrib.hasOwnProperty(i)) this.style[i] = attrib[i];
            }
        }, true);
    },

    hide: function () {
        return this.style({ display: "none" });
    },

    show: function (display) {
        if (display)
            return this.style({ display: display });
        return this.each(function () {
            var nodeName = this.nodeName.toUpperCase();
            if (nodeName == "TD")
                this.style.display = "table-cell";
            else if (nodeName == "TR")
                this.style.display = "table-row";
            else if (nodeName == "TABLE")
                this.style.display = "table";
            else {
                this.style.display = "block";
            }
        }, true);
    },

    width: function (value) {
        var v = parseInt(value, 10);
        return this.each(function () {
            this.style.width = (v) ? v + 'px' : '';
        });
    },

    height: function (value) {
        var v = parseInt(value, 10);
        return this.each(function () {
            this.style.height = (v) ? v + 'px' : '';
        });
    }
});
