var Gallery = (function() {

    var Gallery = function(el) {
        this.container = el;
        this.imageEls = el.all('.gallery-content > li');
        this.indicatorEl = el.find('.indicator');
        this.leftEl = el.find('.move-left');
        this.rightEl = el.find('.move-right');
        this.update();
        this.attachEvent();
    };

    var proto = Gallery.prototype;

    proto.move = function(direction) {
        var currentIndex = Number(this.container.data('current')) - 1,
            currentItem = this.imageEls[currentIndex],
            nextItem = null,
            imageEls = this.imageEls;

        if (direction === 'right') {
            nextItem = imageEls[currentIndex + 1] || imageEls[0];
        } else {
            nextItem = imageEls[currentIndex - 1] || imageEls[imageEls.length - 1];
        }

        this.update(nextItem);
    };

    proto.updateMeta = function() {
        var current = 1, total = this.imageEls.length, container = this.container;
        this.imageEls.some(function(el, i) {
            if (el.cls.contains('active')) {
                current = i + 1;
                return true;
            }
            return false;
        });
        container.data('current', current);
        container.data('total', total);
        container.data('position', current === 1 ? 'left' : current === total ? 'right' : 'middle');
    };

    proto.attachEvent = function() {
        var gallery = this;
        this.leftEl.on('img', 'click', function(ev) {
            gallery.move('left');
        });
        this.rightEl.on('img', 'click', function(ev) {
            gallery.move('right');
        });
    };

    proto.update = function(toActiveEl) {
        Gallery.deactivate(this.imageEls);
        Gallery.activate(toActiveEl || this.imageEls[0]);
        this.updateMeta();
        this.updateIndicator();
    };
    proto.updateIndicator = function() {
        var container = this.container;

        this.indicatorEl.el.innerHTML = container.data('current') + '/' + container.data('total');
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
    return Gallery;
}());
