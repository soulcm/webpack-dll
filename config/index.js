var path = require('path')
var distPath = path.resolve(__dirname, '..', 'dist');

module.exports = {
    build: {

    },
    dev: {
        assetsRoot: distPath
    },
    common: {
        templatePath: path.resolve(__dirname, '..', 'config', 'template', 'index.html')
    }
}
