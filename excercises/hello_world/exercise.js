var createVerifierExercise = require('../../lib/create-exercise.js')

var PORT = 10000 + Math.round(Math.random() * 20000);

module.exports = createVerifierExercise({
    submissionArgs: [PORT],
    solutionArgs: [PORT + 1],
    submissionVerifyArgs: [PORT],
    solutionVerifyArgs: [PORT + 1]
})
