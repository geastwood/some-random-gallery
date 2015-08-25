describe('util => extend', function() {
    it('should work', function() {
        var target = {},
            source = {name: 'source', foo: 'bar'};
        expect({name: 'source', foo: 'bar'}).toEqual(util.extend(target, source));
    });
});
