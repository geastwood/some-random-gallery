# some-random-gallery

## quick how-to

* open index.html to see gallery demos
* open test.html to see control tests

## JavaScript
### Files
* query.js -> provides dom traverse method, wrap dom element to internal structure
* util.js -> provides various utility methods
* main.js -> provides gallery implementation

### Query.js
dom helper for finding and query dom nodes.

Static methods are:
* all -> `document.querySelectorAll`
* find -> `docuement.querySelector`
* create -> create instance of Query element

Query is a constructor function, object instantiated receives:
* attr (method) -> for get and set attribute
* data (method) -> for manipulating data attribute, delegate to `attr` method
* all (method) -> same as its static method, but within selector context
* find (method) -> same as its static method, but within selector context
* cls (property) -> accessors for classList
