const path = require('path');
// const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
	entry: {
		popup: path.resolve(__dirname, 'src/popup.js'),
        background: path.resolve(__dirname, './src/background.js')
    },
	output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
	},
	module: {
		loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            },
            {
				test: /\.sass$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
            }
		]
	},
	plugins: [
        new ExtractTextPlugin('[name].css'),
		new WebpackNotifierPlugin()/*,
		new webpack.ProvidePlugin({
			React: 'react'
		})*/
	]
};
