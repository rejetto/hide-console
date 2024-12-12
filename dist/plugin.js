exports.name = "Hide console"
exports.description = "As soon as this plugin starts, the console window is hidden. Stop plugin to make it appear again."
exports.version = 1
exports.apiRequired = 1
exports.repo = "rejetto/hide-console"

// thanks to https://github.com/hetrodoo/node-hide-console-window

exports.init = api => {
    if (process.platform !== 'win32')
        throw "this plugin only works on Windows"
    const m = require(__dirname + '/node-hide-console-window')
    m.hideConsole()
    return {
        customRest: {
            hideConsole: m.hideConsole,
            showConsole: m.showConsole,
        },
        unload: m.showConsole,
    }
}