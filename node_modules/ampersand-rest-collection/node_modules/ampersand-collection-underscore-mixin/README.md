# ampersand-collection-underscore-mixin

A mixin for extending ampersand-collection with underscore methods.

If you're using an [ampersand-rest-collection](http://ampersandjs.com/docs/#ampersand-rest-collection) this is already mixed in for you.

Out of the box, ampersand-collections proxy the [ES5 iteration methods already](http://ampersandjs.com/docs/#ampersand-collection-proxied-es5-array-methods-9) so you don't _have_ to use this mixin, but if you want all the underscore methods, or better browser support, you can use this.

## install

```
npm install ampersand-collection-underscore-mixin
```

## example

```javascript
var Collection = require('ampersand-collection');
var underscoreMixin = require('ampersand-collection-underscore-mixin');


module.exports = Collection.extend(underscoreMixin, {
    sampleMethod: function () {
        // now we've got underscore methods 
        // we can call that are applied to models
        // in the collection.
        this.filter( ... );
        this.some( ... );
        this.each( ... )
    }
});
```

## credits

All credit for underscore and this approach in backbone goes to Jeremy Ashkenas and the rest of the Backbone and Underscore authors.

If you like this follow [@HenrikJoreteg](http://twitter.com/henrikjoreteg) on twitter.

## license

MIT

