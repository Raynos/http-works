var request = require('request')
var format = require('util').format
var assert = require('assert')
var process = require('process')
var console = require('console')
var parallel = require('continuable-para')

var firstUri = process.argv[3]
var secondUri = process.argv[4]
var uri = format('http://localhost:%d', Number(process.argv[2]))

var firstPayload = {
    type: 'firstRequest',
    payload: firstUri
}
var secondPayload = {
    type: 'secondRequest',
    payload: secondUri
}

function printResponse(msg, resp) {
    console.log()
    console.log('statusCode: ', resp.statusCode)
    console.log('body: ', resp.body)
    console.log('-------------------')
}

parallel({
    one: makeRequest.bind(null, {
        uri: format('%s/%s', uri, firstUri),
        method: 'POST',
        json: firstPayload
    }, function (resp) {
        printResponse(format('/%s', firstUri), resp)

        assert.equal(resp.statusCode, 200,
            'statusCode is not 200')
        assert.deepEqual(resp.body, {
            url: format('/%s', firstUri),
            json: firstPayload
        }, 'body is incorrect')
    }),
    two: makeRequest.bind(null, {
        uri: format('%s/%s', uri, secondUri),
        method: 'POST',
        json: secondPayload
    }, function (resp) {
        printResponse(format('/%s', secondUri), resp)

        assert.equal(resp.statusCode, 200,
            'statusCode is not 200')
        assert.deepEqual(resp.body, {
            url: format('/%s', secondUri),
            json: secondPayload
        }, 'body is incorrect')
    }),
    error: makeRequest.bind(null, {
        uri: format('%s/error', uri),
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: 'undefined'
    }, function (resp) {
        printResponse('/error', resp)

        assert.equal(resp.statusCode, 500,
            'statusCode is not 500')
        assert.equal(resp.body, 'invalid json')
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
