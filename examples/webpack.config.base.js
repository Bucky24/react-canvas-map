var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (dirname) => {
	return {
		entry: path.resolve(dirname, './index.js'),
		output: {
			path: path.resolve(dirname, 'build'),
			filename: 'main.bundle.js'
		},
		mode: 'development',
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
					options: {
						modules: {
							localIdentName: '[name]__[local]___[hash:base64:5]',
						},
					},
				},
				{
					test: /\.(png|jpe?g|gif|svg)$/i,
					type: "asset/resource"
				},
			],
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
