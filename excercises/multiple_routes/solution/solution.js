var Router = require('routes')
var http = require('http')
var process = require('process')
var format = require('util').format

var router = Router()

router.addRoute('/song/:song', function (req, res, opts) {
    res.end(format('song: %s', opts.song))
})
router.addRoute('/album/:album', function (req, res, opts) {
    res.end(format('album: %s', opts.album))
})
router.addRoute('/playlist/:playlist', function (req, res, opts) {
    res.end(format('playlist: %s', opts.playlist))
})

var server = http.createServer(function (req, res) {
    var match = router.match(req.url)
    if (match) {
        match.fn(req, res, match.params)
    } else {
        res.statusCode = 404
        res.end('Not Found')
    }
})

server.listen(Number(process.argv[2]))
