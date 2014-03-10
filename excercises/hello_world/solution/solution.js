var http = require('http')

var server = http.createServer(function (req, res) {
    res.statusCode = 200
    res.end('hello world')
})

server.listen(Number(process.argv[2]))
