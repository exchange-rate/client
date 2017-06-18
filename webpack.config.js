const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
	devtool: 'source-map',
	entry: {
		popup: path.resolve(__dirname, 'src/popup.js'),
        background: path.resolve(__dirname, './src/background.js')
    },
	output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
	},
	module: {
		rules: [
            {
                test: /\.jsx?$/,
				exclude: /node_modules/,
				use: [{
                	loader: 'babel-loader',
					options: {
						presets: ['react', 'es2015', 'stage-0']
					}
				}],

            },
            {
				test: /\.sass$/,
				use: ExtractTextPlugin.extract({
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
