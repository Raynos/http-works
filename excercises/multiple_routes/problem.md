Write a program that creates a HTTP server that responds to
  multiple different routes.

Your HTTP server should respond to the following queries

 - GET /song/<song> => 200 'song: <song>'
 - GET /album/<album> => 200 'album: <album>'
 - GET /playlist/<playlist> => 200 'playlist: <playlist>'
 - GET /<anything-else> => 404 'Not Found'

The port comes from the CLI args `process.argv[2]`.

---

## Hints

Just like the hello world exercise you should start a http 
  server.

To handle the 404 case you will need to check whether the 
  `req.url` matches something your server can handle and if
  it does not you should do the 404 case.

```js
http.createServer(function (req, res) {
    if (isValidRoute(req.url)) {
        handleRoute(req, res)
    } else {
        send404(req, res)
    }
})
```

For the routing itself it's recommended that you either use an
  existing router or just use regular expressions

For more documentation check out:

[`req.url`](http://nodejs.org/api/http.html#http_message_url)
[Various different routes](https://github.com/Raynos/http-framework/wiki/Modules#wiki-routers)

---
