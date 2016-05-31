var superagent = require('superagent');

module.exports = function superagent_adapter(opts, cb) {

    var url = opts.url;
    var method = opts.method;

    var query = opts.query;
    var body = opts.body;

    // METHOD determines the function
    // GET, PUT, POST, DELETE
    var req = superagent(method, url);

    req.set('Accept', 'application/json');

    if (opts.headers) {
        req.set(opts.headers);
    }

    if (query) {
        req.query(query);
    }

    // TODO patch?
    if (body && (method === 'POST' || method === 'PUT')) {
        req.type('application/json');
        req.send(body.toJSON ? body.toJSON() : body);
    }

    // For requests where the payload is a FormData object, the Content-Type
    // should be 'multipart/form-data'. This cannot be set explicitly however,
    // because the boundary would also need to be specified, which is not
    // determined until req.end. Superagent will automatically fill the content
    // type as 'multipart/form-data' with a proper boundary on end if it is
    // undefined. This must be done between 'send' and 'end' because 'send'
    // will default the content type 'application/json' if it is undefined at
    // that point.
    if (body instanceof FormData) {
        req.type(undefined);
    }

    req.end(function(err, res) {
        if (err) {
            return cb(err);
        }

        var body = res.body || null;

        if (res.status !== 200) {
            var err = new Error();
            err.status = res.status;
            err.message = (body ? body.message : '');
            return cb(err, body, res);
        }

        cb(null, body, res);
    });
};
