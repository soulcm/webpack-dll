var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var config = require('../config');
var baseWebpackConfig = require('./webpack.config.base.js');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['webpack-hot-middleware/client'].concat(baseWebpackConfig.entry[name])
});

module.exports = merge(baseWebpackConfig, {
    devtool: 'inline-source-map',

    output: {
        path: config.dev.assetsRoot,
        filename: '[name].js',
        publicPath: '/lib/'
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            title: 'webpack-dll',
            template: config.common.templatePath,
            inject: true,
            filename: 'index.html',
            chunks: ['app']
        })
    ]
})

