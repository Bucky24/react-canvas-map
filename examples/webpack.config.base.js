var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (dirname) => {
	console.log(path.resolve(__dirname, '../src/index.js'));
	return {
		entry: path.resolve(dirname, './index.js'),
		output: {
			path: path.resolve(dirname, 'build'),
			filename: 'main.bundle.js'
		},
		resolve: {
			alias: {
				'@bucky24/react-canvas-map': path.resolve(__dirname, '../src/index.js'),
			}
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								require.resolve('@babel/preset-env'),
								'@babel/preset-react'
							],
							plugins: ["@babel/plugin-proposal-class-properties"]
						}
					}
				},
				{
					test: /\.css$/,
					loader: 'style-loader'
				},
				{
					test: /\.css$/,
					loader: 'css-loader',
					query: {
						modules: true,
						localIdentName: '[name]__[local]___[hash:base64:5]'
					}
				},
				{
					test: /\.(jpe?g|png|gif|svg)$/i,
					loaders: [
						'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
						{
							loader: 'image-webpack-loader',
							query: {
								optipng: {
									optimizationLevel: 4,
								}
							}
						}
					]
				}
			]
		},
		stats: {
			colors: true
		},
		devtool: 'source-map',
		plugins: [
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, 'index.tmpl.html')
			})
		]
	};
};
