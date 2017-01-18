var path = require('path')
var distPath = path.resolve(__dirname, '..', 'dist');
var dllPath = path.resolve(__dirname, '..', 'dll');

module.exports = {
    build: {
        dllPath: dllPath,
        assetsRoot: distPath
    },
    dev: {
        dllPath: dllPath,
        assetsRoot: distPath
    },
    common: {
        templatePath: path.resolve(__dirname, '..', 'config', 'template', 'index.html')
    }
}
