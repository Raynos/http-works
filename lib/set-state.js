var process = require('process')

module.exports = setState

function setState(exercise, state) {
    exercise.addSetup(function (mode, cb) {
        Object.keys(state).forEach(function (key) {
            this[key] = state[key]
        }, this)

        process.nextTick(cb)
    })
    return exercise
}
