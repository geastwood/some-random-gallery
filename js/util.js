var util = (function() {
    var extend = function(target, source) {
        for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
                target[prop] = source[prop];
            }
        }
        return target;
    };
    return {
        extend: extend
    };
}());
