# bamboo-sync-ajax

Ajax sync for [bamboo](https://github.com/defunctzombie/bamboo)

```js
var ajax = require('bamboo-sync-ajax');
var Model = require('bamboo/model');

var Post = Model({
    title: String
}, { sync: ajax })
```

## License

MIT
