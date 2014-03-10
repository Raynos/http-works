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

---
