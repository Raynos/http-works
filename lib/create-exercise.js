var Exercise = require('workshopper-exercise')
var fileCheck = require('workshopper-exercise/filecheck')
var execute = require('workshopper-exercise/execute')
var compareStdout = require('workshopper-exercise/comparestdout')

var setState = require('./set-state.js')
var runVerifier = require('./run-verifier.js')

module.exports = createVerifierExercise

function createVerifierExercise(opts) {
    var exercise = Exercise()
    exercise = fileCheck(exercise)
    exercise = execute(exercise)
    exercise = setState(exercise, opts)
    exercise = runVerifier(exercise)
    exercise = compareStdout(exercise)
    return exercise
}
