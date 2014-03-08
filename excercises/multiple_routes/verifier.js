var request = require('request')
var format = require('util').format
var assert = require('assert')
var process = require('process')
var console = require('console')
var parallel = require('continuable-para')

var port = Number(process.argv[2])
var uri = format('http://localhost:%s', port)
var SONG = 'never-gonna-give-you-up'
var ALBUM = 'whenever-you-need-someone'
var PLAYLIST = '80s-music'

function printResponse(msg, resp) {
    console.log()
    console.log('statusCode: ', resp.statusCode)
    console.log('body: ', resp.body)
    console.log('-------------------')
}

parallel({
    song: makeRequest.bind(null, {
        uri: format('%s/song/%s', uri, SONG)
    }, function (resp) {
        printResponse(format('/song/%s', SONG), resp)

        assert.equal(resp.statusCode, 200,
            'statusCode is not 200')
        assert.equal(resp.body, format('song: %s', SONG),
            format('response body is not "song: %s"', SONG))
    }),
    album: makeRequest.bind(null, {
        uri: format('%s/album/%s', uri, ALBUM)
    }, function (resp) {
        printResponse(format('/album/%s', ALBUM), resp)

        assert.equal(resp.statusCode, 200,
            'statusCode is not 200')
        assert.equal(resp.body, format('album: %s', ALBUM),
            format('response body is not "album: %s"', ALBUM))
    }),
    playlist: makeRequest.bind(null, {
        uri: format('%s/playlist/%s', uri, PLAYLIST)
    }, function (resp) {
        printResponse(format('/playlist/%s', PLAYLIST), resp)

        assert.equal(resp.statusCode, 200,
            'statusCode is not 200')
        assert.equal(resp.body, format('playlist: %s', PLAYLIST),
            format('response body is not "playlist: %s"', PLAYLIST))
    }),
    notFound: makeRequest.bind(null, {
        uri: format('%s/not-found', uri)
    }, function (resp) {
        printResponse('/not-found', resp)

        assert.equal(resp.statusCode, 404,
            'statusCode is not 404')
        assert.equal(resp.body, 'Not Found')
    })
}, function (err) {
    assert.ifError(err, 'A http error occurred')

    process.exit(0)
})

function makeRequest(opts, listener, cb) {
    request(opts, function (err, resp) {
        if (err) {
            return cb(err)
        }

        listener(resp)
        cb(null)
    })
}
