var GalleryManager = (function(Q) {

    var Gallery = function(el) {
        this.container = el;
        this.imageEls = this.container.all('.gallery-content > li');
        this.indicatorEl = this.container.find('.indicator');
        this.leftEl = this.container.find('.move-left');
        this.rightEl = this.container.find('.move-right');
        this.update();
        this.attachEvent();
    };

    Gallery.prototype.move = function(direction) {
        var currentIndex = Number(this.container.data('current')) - 1,
            currentItem = this.imageEls[currentIndex],
            nextItem = null;

        if (direction === 'right') {
            nextItem = this.imageEls[currentIndex + 1] || this.imageEls[0];
        } else {
            nextItem = this.imageEls[currentIndex - 1] || this.imageEls[this.imageEls.length - 1];
        }

        this.update(nextItem);
    };

    Gallery.prototype.updateMeta = function() {
        var current = 1, total = this.imageEls.length;
        this.imageEls.some(function(el, i) {
            if (el.cls.contains('active')) {
                current = i + 1;
                return true;
            }
            return false;
        });
        this.container.data('current', current);
        this.container.data('total', total);
        this.container.data('position', current === 1 ? 'left' : current === total ? 'right' : 'middle');
    };

    Gallery.prototype.attachEvent = function() {
        var gallery = this;
        this.leftEl.on('img', 'click', function(ev) {
            gallery.move('left');
        });
        this.rightEl.on('img', 'click', function(ev) {
            gallery.move('right');
        });
    };

    Gallery.prototype.update = function(toActiveEl) {
        Gallery.deactivate(this.imageEls);
        Gallery.activate(toActiveEl || this.imageEls[0]);
        this.updateMeta();
        this.updateIndicator();
    };
    Gallery.prototype.updateIndicator = function() {
        var current, total;
        current = this.container.data('current');
        total = this.container.data('total');

        this.indicatorEl.el.innerHTML = current + '/' + total;
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
