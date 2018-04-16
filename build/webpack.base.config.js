/* global __dirname */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const plugins = [
    new ExtractTextPlugin({ filename: 'css/style.[chunkhash:6].css' })
];

if(isProduction){
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false, drop_console: true }
    }));
}

module.exports = {
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: '/',
        chunkFilename: '[name].[chunkhash:6].js',
        filename: '[name].[chunkhash:6].js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                compilerOptions: {
                    preserveWhitespace: false
                },
                cssModules: {
                    localIdentName: '[local]-[hash:base64:5]',
                    camelCase: true
                },
                extractCSS: true
            }
        },{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    plugins,
    resolve: {
        alias: {
            '@edition': process.env.EDITION ? path.join(__dirname, '../client/' + process.env.EDITION) : path.join(__dirname, '../client/base') 
        }
    }
};