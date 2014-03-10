Write a program that creates a HTTP server that echos json data
  and the requested url.

Your HTTP server should respond to

POST /{{someUri}} {{someJson}} => 200 {
    url: {{someUri}},
    json: {{someJson}}
}

Your HTTP server should also return `500 'invalid json'` for
  any invalid JSON.

POST /{{someUri}} {{invalidJson}} => 500 'invalid json'

---

## Hints

Your web server needs to 

 - parse the body
 - handle parsing errors
 - serialize `{ url: req.url, json: json }` to the response

For more documentation check out:

[`req.on('data')`][http://nodejs.org/api/stream.html#stream_event_data]
[`req.on('end')`][http://nodejs.org/api/stream.html#stream_event_end]
[`res.setHeader`][http://nodejs.org/api/http.html#http_response_setheader_name_value]
[JSON.parse & JSON.stringify][https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse]
[`body/json`][http://github.com/Raynos/body#jsonbodyreq-res-opts-cberror-any]
[`send-data/json`][http://github.com/Raynos/send-data]

---
