exports.name = "Hide console"
exports.description = "As soon as this plugin starts, the console window is hidden. Stop plugin to make it appear again."
exports.version = 1.2
exports.apiRequired = 1
exports.repo = "rejetto/hide-console"

// thanks to https://github.com/hetrodoo/node-hide-console-window

exports.init = api => {
    if (process.platform !== 'win32')
        throw "this plugin only works on Windows"
    const fs = api.require('fs')
    const lockName = api.storageDir + 'lock'
    try { fs.unlinkSync(lockName) }
    catch(e) {
        if (e.code !== 'ENOENT') {
            api.log("quitting because already running")
            process.exit(0)
        }
    }
    const lockFile = fs.openSync(lockName, 'wx')

    const m = require(__dirname + '/node-hide-console-window')
    m.hideConsole()
    return {
        customRest: {
            hideConsole: m.hideConsole,
            showConsole: m.showConsole,
        },
        unload() {
            m.showConsole()
            fs.closeSync(lockFile)
            fs.unlinkSync(lockName)
        },
    }
}