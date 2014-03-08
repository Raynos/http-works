#!/usr/bin/env node

var workshopper = require('workshopper');
var path = require('path')

module.exports = createShop

if (require.main === module) {
    createShop()
}

function createShop() {
    return workshopper({
        name: 'http-works',
        title: 'learn how to build http apps',
        subtitle: '\x1b[23mSelect an exercise and hit ' +
            '\x1b[3mEnter\x1b[23m to begin',
        exerciseDir: path.join(__dirname, 'excercises'),
        appDir: __dirname,
        helpFile: path.join(__dirname, 'help.md'),
        menuItems: []
    })
}
