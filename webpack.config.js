var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
	name: 'market-watcher',
	entry: {
		app: ["./src/index.js"]
	},
    devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, "dist"),
		publicPath: "/",
		filename: "[name].[hash].js"
	},
	plugins : [
		new HtmlWebpackPlugin({
			template : path.resolve(__dirname, "index.html"),
			inject: 'body',
			hash: false,
			filename : 'index.html'
		})
	],
	module : {
		loaders : [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ["react-hot", "babel?presets[]=es2015&presets[]=stage-0&presets[]=react"],
			},
			{
				test: /\.html$/,
				loader: "file?name=[name].[ext]",
			},
			{
				test    : /\.css$/,
				exclude: '/node_modules',
				loader : 'style!css'
			},
			/* eslint-disable */
			{ test: /\.woff(\?.*)?$/,  loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff" },
			{ test: /\.woff2(\?.*)?$/, loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2" },
			{ test: /\.ttf(\?.*)?$/,   loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream" },
			{ test: /\.eot(\?.*)?$/,   loader: "file-loader?prefix=fonts/&name=[path][name].[ext]" },
			{ test: /\.svg(\?.*)?$/,   loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml" },
			{ test: /\.png(\?.*)?$/,   loader: "url-loader?prefix=images/&name=[path][name].[ext]&limit=10000&mimetype=image/png" },
			{ test: /\.cur(\?.*)?$/,   loader: "url-loader?prefix=images/&name=[path][name].[ext]&limit=10000&mimetype=image/cur" }
			/* eslint-enable */
		]
	},
    devServer: {
        proxy: {
            "/api/alerts*": {
                target: 'http://localhost:8000',
                rewrite: (req) => {
                  req.url = req.url.replace(/^\/api/, '');
                }
            }
        }
    }
};
