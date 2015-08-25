var protoMap = Array.prototype.map;
var Query = function(node) {
    this.el = node;
    this.events = {};
};
Query.prototype.attr = function(attr, value) {
    /* jshint eqnull: true */
    if (value != null) {
        this.el.setAttribute(attr, value);
    }
    return this.el.getAttribute(attr);
};
Query.prototype.data = function(str, value) {
    this.attr('data-' + str, value);
};
Query.prototype.all = function(selector) {
    return this.el ? Query.all(selector, this.el) : null;
};
Query.prototype.find = function(selector) {
    return this.el ? Query.find(selector, this.el) : null;
};
Object.defineProperty(Query.prototype, 'cls', {
    get: function() {
        return this.el ? this.el.classList : [];
    }
});
Query.prototype.on = function(selector, event, fn) {
    var targets = this.all(selector),
    cb = function(ev) {
        if (targets.some(function(el) {return el.el === ev.target;})) {
            fn.call(this, ev);
        }
    }.bind(this);
    this.el.addEventListener(event, cb, false);

    this.events[event] = cb;
};
Query.prototype.off = function(event) {
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
