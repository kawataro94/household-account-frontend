const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = merge(common, {
	mode: 'development',
	plugins: [
		new webpack.DefinePlugin({
			'process.env.RUN_ENV': JSON.stringify('development'),
		}),
		new HtmlWebpackPlugin({
			title: 'Household-Accounts DEV',
			template: path.resolve(__dirname, 'template.ejs'),
		}),
		new GenerateSW({
			clientsClaim: true,
			skipWaiting: true,
			maximumFileSizeToCacheInBytes: 1024 * 1024 * 15,
			runtimeCaching: [
				{
					urlPattern: /.+(\/|.html)$/,
					handler: 'NetworkFirst',
					options: {
						cacheName: 'household-accounts' + '-html-cache',
						expiration: {
							maxAgeSeconds: 60 * 60 * 24 * 7,
						},
					},
				},
			],
		}),
		new ForkTsCheckerWebpackPlugin(),
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 3000,
		open: true,
		compress: true,
		historyApiFallback: true,
	},
	devtool: 'inline-source-map',
});
