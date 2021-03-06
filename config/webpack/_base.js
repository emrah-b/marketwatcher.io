import HtmlWebpackPlugin from "html-webpack-plugin"
import GitSHAPlugin from "git-sha-webpack-plugin"
import path from "path"
import webpack from "webpack"

export default {
    name: "market-watcher",
    entry: {
        app: ["./src/index.js"]
    },
    output: {
        path: path.resolve(__dirname, "../../dist"),
        publicPath: "/",
        filename: "mw.[chunkgitsha].js"
    },
    plugins : [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new HtmlWebpackPlugin({
            template : path.resolve(__dirname, "../../index.html"),
            inject: "body",
            hash: false,
            filename : "index.html",
            minify   : {
                collapseWhitespace : true
            }
        }),
        new GitSHAPlugin({
            shaLength: 40,
            useHead: true
        }), new webpack.ProvidePlugin({
            fetch: "imports?this=>global!exports?global.fetch!whatwg-fetch"
        })
    ],
    node: {
        net: "empty",
        dns: "empty",
        crypto: "empty",
        moment: "empty"
    },
    module : {
        loaders : [
            {
                test: /\.js$/,
                exclude: [/node_modules/, /joi-browser/],
                loaders: ["babel?presets[]=es2015&presets[]=stage-0&presets[]=react"]
            },
            {
                test: /\.html$/,
                loader: "file?name=[name].[ext]"
            },
            {
                test    : /\.css$/,
                exclude: "/node_modules",
                loader : "style!css"
            },
            {
                test    : /\.json$/,
                loader : "json"
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
    watchOptions: {
        poll: 1000
    }
}
