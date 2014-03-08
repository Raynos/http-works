var through2 = require('through2')
var spawn = require('child_process').spawn
var path = require('path')
var textBody = require('raw-body')
var setTimeout = require('timers').setTimeout
var process = require('process')

module.exports = runVerifier

function runVerifier(exercise) {
    exercise.addProcessor(function (mode, cb) {
        this.submissionStdout.pipe(process.stdout)

        this.submissionStdout = through2()

        if (mode === 'verify') {
            this.solutionStdout = through2()
        }

        // delay 500ms for HTTP servers to start
        setTimeout(startVerifier.bind(this, mode, cb), 500)
    })
    return exercise
}

function startVerifier(mode, cb) {
    var exercise = this
    var procs = {}

    function spawnVerifier(type, args, stream) {
        var cmd = 'node'
        var file = path.join(exercise.dir, 'verifier.js')

        var cmdArgs = [file].concat(args)

        var proc = procs[type] = spawn(cmd, cmdArgs)
        proc.stdout.pipe(stream, { end: false })

        textBody(proc.stderr, {
            encoding: 'utf8'
        }, function (err, body) {
            if (err) {
                return exercise.emit('fail', err)
            }

            var success = body.length === 0

            if (body.length !== 0) {
                if (type === 'sub') {
                    exercise.emit('fail', body)
                }
            }

            stream.end()
            if (type === 'sub') {
                cb(null, success)
            }
        })
    }

    spawnVerifier('sub', exercise.submissionVerifyArgs,
        exercise.submissionStdout)

    if (mode === 'verify') {
        spawnVerifier('sol', exercise.solutionVerifyArgs,
            exercise.solutionStdout)
    }
}
