var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
var path = require('path');
var config = require('../config');
var baseWebpackConfig = require('./webpack.config.base.js');
var assetsConfig = require('../dll/assets.json');

module.exports = merge(baseWebpackConfig, {
    devtool: 'source-map',

    output: {
        path: config.build.assetsRoot,
        filename: '[name].[chunkhash:8].js',
        publicPath: '/'
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: { comments: false },
            sourceMap: true
        }),
        new HtmlWebpackPlugin({
            title: 'webpack-dll',
            template: config.common.templatePath,
            inject: true,
            filename: 'index.html',
            chunks: ['app']
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../dll/manifest.json'),
        }),
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, '../dll', assetsConfig.lib.js),
            includeSourcemap: true
        })
    ]
})