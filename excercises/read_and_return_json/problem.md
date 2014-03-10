Write a program that creates a HTTP server that echos json data
  and the requested url.

Your HTTP server should respond to

POST /{{someUri}} {{someJson}} => 200 {
    url: {{someUri}},
    json: {{someJson}}
}
