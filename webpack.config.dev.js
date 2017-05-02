/* eslint-disable */
/* linting disabled temporarily due to scope of this pull request */

const path = require('path'),
    webpack = require('webpack');

module.exports = {
    entry: {
        dataTable: './demos/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: '[name].js',
        publicPath: '/assets/'
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        })
    ],
    /* Allows debugging */
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'raw-loader'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            }
        ]
    },
    devServer: {
        contentBase: [
            path.join(__dirname, 'demos'),
            path.join(__dirname, 'dist'),
            path.join(__dirname, 'node_modules')
        ]
    },
    resolve: {
        modules: [
            'node_modules'
        ],
        extensions: [
            '.js',
            '.scss',
            '.json'
        ]
    }
};
