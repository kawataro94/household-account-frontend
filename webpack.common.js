const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const babelLoader = {
	loader: 'babel-loader',
	options: {
		presets: [
			[
				'@babel/preset-env',
				{
					targets: {
						node: true,
					},
				},
			],
			'@babel/preset-react',
			'@emotion/babel-preset-css-prop',
		],
		plugins: ['transform-class-properties'],
	},
};

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '',
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'style.css',
		}),
	],
	optimization: {
		minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
	},
	module: {
		rules: [
			{
				test: /\.(scss|sass|less|css)$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: './images/[name].[ext]',
						},
					},
				],
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [babelLoader],
			},
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: [
					babelLoader,
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
};
