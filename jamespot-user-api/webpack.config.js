const webpack = require('webpack');
const path = require('path');

let config = {
    entry: './lib/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './jamespot-user-api.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
};

module.exports = config;
