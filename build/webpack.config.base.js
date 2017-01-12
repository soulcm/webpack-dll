var webpack = require('webpack');
var path = require('path');
var config = require('../config');

var env = process.env.NODE_ENV;


module.exports = {
    entry: {
        app: path.join(__dirname, '../src/index.js')
    },

    module: {
        rules: [{
            test: /\.jsx?$/,
            use: ['babel-loader'],
            exclude: /node_modules/
        }]
    },

    resolve: {
        extensions: ['.js', '.jsx', '.css', '.less']
    },

    plugins: [

    ]
}