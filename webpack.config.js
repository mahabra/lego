 var path = require("path");
module.exports = {
	entry: {
		lego: './src/lego.js',
		lego_1: './src/lego.js'
	},
	output: {
		path: path.resolve("./"),
		filename: 'es5.js',
		libraryTarget: 'umd',
		library: 'lego'
	},
	module: {
		loaders: [
			{
				test: /\.js[x]?$/,
				loader: 'babel-loader',
				query: {
					compact: false,
					presets: [
						require.resolve('babel-preset-es2015')
					],
					plugins: [
						require.resolve('babel-plugin-add-module-exports')
					]
				},
				exclude: /node_modules/
			}
		]
	},
	plugins: [],
	extensions: []
};
