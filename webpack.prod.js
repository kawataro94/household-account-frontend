const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',
	plugins: [
		new webpack.DefinePlugin({
			'process.env.RUN_ENV': JSON.stringify('production'),
		}),
		new HtmlWebpackPlugin({
			title: 'Household-Accounts Prod',
			template: path.resolve(__dirname, 'template.ejs'),
			hash: true,
		}),
		new GenerateSW({
			clientsClaim: true,
			skipWaiting: true,
			maximumFileSizeToCacheInBytes: 1024 * 1024 * 11,
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
	],
});
