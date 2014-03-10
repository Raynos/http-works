var request = require('request')
var format = require('util').format
var assert = require('assert')
var process = require('process')
var console = require('console')

var port = Number(process.argv[2])

request({
    uri: format('http://localhost:%d', port)
}, function (err, resp) {
    if (resp) {
        console.log('statusCode: ', resp.statusCode)
        console.log('body: ', resp.body)
    }

    assert.ifError(err, 'A http error occurred')
    assert.equal(resp.statusCode, 200, 'statusCode is not 200')
    assert.equal(resp.body, 'hello world',
        'The http response is not "hello world"')

    process.exit(0)
})
