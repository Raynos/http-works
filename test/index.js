var test = require("tape")

var httpWorks = require("../index")

test("httpWorks is a function", function (assert) {
    assert.equal(typeof httpWorks, "function")
    assert.end()
})
