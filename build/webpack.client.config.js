const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

module.exports = merge(base, {
    entry: {
        app: './client/entry-client.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '',
            minChunks: function (module) {
              return (
                /node_modules/.test(module.context) && !/\.css$/.test(module.request)
              );
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),
        new VueSSRClientPlugin()
    ]
});