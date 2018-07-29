const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rules = require('./webpack/rules');
// const aliases = require('./webpack/aliases');
const getAbsPath = function(_path) {
    return path.resolve(__dirname, './', _path);
}

module.exports = {
    devtool: 'eval',
    //entry: ['./src/index.js'],
    //All ./ paths are resolved relative to this
    context: getAbsPath('src'),

    entry: {
        app: ['babel-polyfill', './index.js'],
    },

    output: {
        path: getAbsPath('public/dist/'),
        filename: '[name].js',
        // path: path.resolve(__dirname, './public/dist')
    },

    resolve: {
        modules: [
            './',
            'node_modules',
        ],
        alias: {
            app: getAbsPath('src'),
            actions: getAbsPath('src/actions'),
            reducers: getAbsPath('src/reducers'),
            constants: getAbsPath('src/constants'),
            apis: getAbsPath('src/apis'),
            modules: getAbsPath('src/modules'),
            sass: getAbsPath('src/sass'),
        },
    },

    module: {
        rules: rules(),
    },

    watch: true,

    devServer: {
        contentBase: './public/',
        watchContentBase: true,
        watchOptions: {
            ignored: ['node_modules']
        },
    },

    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true,
        }),
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify('production')
        // }),
        // new webpack.optimize.UglifyJsPlugin()
    ],

    stats: {
        children: false,
    },
};
