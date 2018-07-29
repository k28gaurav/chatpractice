const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rules = require('./webpack/rules');
const aliases = require('./webpack/aliases');
//const getAbsPath = (_path) => path.resolve(__dirname, '../', _path);

module.exports = {
    devtool: 'eval',
    // context: getAbsPath("src"),
    //entry: ['./src/index.js'],
    entry: {
        app: ['./src/index.js'],
    },

    output: {
        // path: getAbsPath("public/dist/"),
        filename: '[name].js',
        path: path.resolve(__dirname, './public/dist')
    },

    resolve: {
        modules: [
            './',
            'node_modules',
        ],
        alias: aliases
    },

    module: {
        rules: rules(),
        loaders: [
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    },

    watch: true,

    devServer: {
        contentBase: './public/',
        watchContentBase: true
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
    ]
};
