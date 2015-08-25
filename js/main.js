var GalleryManager = (function(Q, G) {

    return {
        init: function() {
            Q.all('.gallery-container').forEach(function(el) {
                return new G(el);
            });
        }
    };
}(Query, Gallery));
