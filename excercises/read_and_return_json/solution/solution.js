var http = require('http')
var process = require('process')
var jsonBody = require('body/json')
var sendJson = require('send-data/json')

var server = http.createServer(function (req, res) {
    jsonBody(req, res, function (err, json) {
        if (err) {
            res.statusCode = 500
            return res.end('invalid json')
        }

        sendJson(req, res, {
            url: req.url,
            json: json
        })
    })
})

server.listen(Number(process.argv[2]))
