Write a program that creates a HTTP server returning hello world.

The port will be given as a command line argument `process.argv[2]`

Your web server should return `"hello world"`

---

## Hints

You can create a http server by using the `http` module from
  node core.

```
var http = require('http')
```

For more documentation check out

[`http.createServer()`](http://nodejs.org/api/http.html#http_http_createserver_requestlistener)
[`ServerResponse#statusCode`](http://nodejs.org/api/http.html#http_response_statuscode)
[`ServerResponse#end()`](http://nodejs.org/api/http.html#http_response_end_data_encoding)

---
