/**
 * Query tests
 */
describe('Query => dom traverse', function() {
    it('find by Id', function() {
        expect(Query.find('#fixture').el).not.toBeNull();
        // can not find, return wrapper with el === null
        expect(Query.find('#fixturefe1').el).toBeNull();
    });

    it('query by class, should return array', function() {
        expect(Query.all('.first').length).toBe(1);
        expect(Query.all('.middle').length).toBe(2);
        expect(Query.all('.last').length).toBe(1);
        expect(Query.all('.not-exsit').length).toBe(0);
    });

    it('find with within context of a parent element', function() {
        var ul = Query.find('#first-level'),
            firstLi = ul.find('.first');
        expect(firstLi.el.textContent).toBe('1');
    });

    it('attribute action should work (get/set)', function() {
        var ul = Query.find('#first-level'),
            middlesLi = ul.all('.middle'),
            attrs;

        attrs = middlesLi.map(function(el) {
            return el.attr('class');
        });

        expect(attrs).toEqual(['middle another-cls', 'middle']);

        middlesLi.map(function(el, i) {
            el.data('test', i);
        });
        expect(middlesLi[0].attr('data-test')).toBe('0');
        expect(middlesLi[1].attr('data-test')).toBe('1');
    });
    it('data attribute get/set', function() {
        var lastEl = Query.find('.last');
        lastEl.data('name', 'last');
        expect(lastEl.data('name')).toBe('last');
    });
});
