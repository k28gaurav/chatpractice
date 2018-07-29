const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const getAbsPath = (_path) => path.resolve(__dirname, '../', _path);

module.exports = function() {
    const scssResources = [
        getAbsPath('src/sass/index.scss'),
    ];

    const commonRules = [
        {
            test: /\.js$/,
            include: [
                getAbsPath('src'),
                getAbsPath('node_modules/camelcase'),
            ],
            use: ['babel-loader']
        },
        {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'url-loader',
            options: {
                context: getAbsPath('assets/images'),
                name: '[path][name].[ext]',
                limit: 2048,
                outputPath: 'images/',
            }
        },
        {
            test: /\.(mp3)$/,
            loader: 'file-loader',
            options: {
                context: getAbsPath('assets/audio'),
                name: '[path][name].[ext]',
                outputPath: 'audio/',
            }
        },
        {
            test: /\.(eot|ttf|woff|woff2|otf)$/,
            loader: 'url-loader',
            options: {
                name: '[name].[ext]',
                limit: 10000,
                outputPath: 'fonts/',
            }
        },
        {
            test: /\.(scss|sass)$/,

            // github.com/webpack-contrib/extract-text-webpack-plugin#options
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    {
                        // github.com/webpack-contrib/css-loader#options-1
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 4,
                            camelCase: true,
                            minimize: false,
                            /* https://github.com/webpack-contrib/css-loader/issues/101 */
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            modules: true,
                            importLoaders: 4,
                            // incluePaths is to resolve sass imports in node_modules
                            // Uncomment when required
                            // includePaths: [getAbsPath('node_modules')]
                        }
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: scssResources
                        },
                    },
                ],
            })
        },
        {
            test: /\.(css)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    /*
                        Not including postcss and autoprefixer plugin for .css files
                        Assuming css files would be vendor files and will already be prefixed
                    */
                    {
                        // github.com/webpack-contrib/css-loader#options-1
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                        }
                    }
                ]
            })
        }
    ];

    const devRules = [
        ...commonRules,
        {
            enforce: 'pre',
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'eslint-loader',
            options: {
                failOnWarning: false,
                failOnError: false,
            }
        }
    ];

    return devRules;
};
