const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
	devtool: 'inline-source-map',
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
            },
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url-loader',
				query: {
					limit: 8 * 1024
				}
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
