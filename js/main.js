var GalleryManager = (function(Q) {

    var Gallery = function(el) {
        this.container = el;
        this.imageEls = this.container.all('.gallery-content > li');
        this.indicatorEl = this.container.find('.indicator');
        this.setup();
    };

    Gallery.prototype.move = function(direction) {
        console.log(direction);
    };

    Gallery.prototype.setup = function(count) {
        Gallery.deactivate(this.imageEls);
        Gallery.activate(this.imageEls[0]);
        this.updateIndecator(1);
    };
    Gallery.prototype.updateIndecator = function(count) {
        this.indicatorEl.el.innerHTML = (count || 1)  + '/' + this.imageEls.length;
    };
    Gallery.deactivate = function(els) {
        els.forEach(function(el) {
            el.cls.remove('active');
            el.cls.add('deactive');
        });
    };
    Gallery.activate = function(el) {
        el.cls.add('active');
        el.cls.remove('deactive');
    };

    return {
        init: function() {
            var galleries = Q.all('.gallery-container');
            galleries.forEach(function(el) {
                return new Gallery(el);
            });
        }
    };
}(Query));
