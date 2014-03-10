var uuid = require('uuid')

var createVerifierExercise = require('../../lib/create-exercise.js')

var PORT = 10000 + Math.round(Math.random() * 20000);
var firstUri = uuid()
var secondUri = uuid()

module.exports = createVerifierExercise({
    submissionArgs: [PORT],
    solutionArgs: [PORT + 1],
    submissionVerifyArgs: [PORT, firstUri, secondUri],
    solutionVerifyArgs: [PORT + 1, firstUri, secondUri]
})
