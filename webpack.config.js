const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const isProd = process.argv.indexOf("-p") > -1;
const staticPath = path.resolve(__dirname, "octoprint_themeify/static");
module.exports = {
    entry: [
        path.join(staticPath, "js", "themeinject.js"),
        path.join(staticPath, "less", "base.less")
    ],
    output: {
        filename: "themeinject.min.js",
        path: path.join(staticPath, "dist")
    },
    devtool: isProd ? 'false' : 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: { url: false, minimize: true }
                        },
                        {
                            loader: "less-loader"
                        }
                    ],
                    fallback: "style-loader"
                })
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            comments: false
        }),
        new ExtractTextPlugin({
            filename: "../dist/themeinject.min.css",
            disable: false,
            allChunks: true
        })
    ]
};
