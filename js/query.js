var Query = (function() {
    var Query = function(node) {
        this.el = node;
        this.events = {};
    };
    var proto = Query.proto;
    var protoMap = Array.prototype.map;

    proto.attr = function(attr, value) {
        var el = this.el;
        /* jshint eqnull: true */
        if (value != null) {
            el.setAttribute(attr, value);
        }
        return el.getAttribute(attr);
    };
    proto.data = function(str, value) {
        return this.attr('data-' + str, value);
    };
    proto.all = function(selector) {
        return this.el ? Query.all(selector, this.el) : null;
    };
    proto.find = function(selector) {
        return this.el ? Query.find(selector, this.el) : null;
    };
    Object.defineProperty(proto, 'cls', {
        get: function() {
            return this.el ? this.el.classList : [];
        }
    });
    proto.on = function(selector, event, fn) {
        var targets = this.all(selector),
        cb = function(ev) {
            if (targets.some(function(el) {return el.el === ev.target;})) {
                fn.call(this, ev);
            }
        }.bind(this);
        this.el.addEventListener(event, cb, false);

        this.events[event] = cb;
    };
    proto.off = function(event) {
        if (this.events[event]) {
            this.el.removeEventListener(event, this.events[event]);
            this.events[event] = null;
        }
    };

    Query.all = function(selector, context) {
        return protoMap.call((context || document).querySelectorAll(selector), Query.create);
    };
    Query.find = function(selector, context) {
        var rst = protoMap.call([(context || document).querySelector(selector)], Query.create);
        return rst[0] || null;
    };
    Query.create = function(node) {
        return new Query(node);
    };

    return Query;
}());
