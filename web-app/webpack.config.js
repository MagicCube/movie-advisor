const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

module.exports = {
    context: path.resolve(__dirname, "./src"),
    entry: {
        vendor: [ "jquery" ],
        ma: [ "./ma/res/index.less" ]
    },
    output: {
        path: path.resolve(__dirname, "./public/assets"),
        filename: "[name]/bundle.js",
        chunkFilename: "[id]/chunk.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            {
                test: /\.(png|jpg)$/,
                loader: "url-loader?limit=10240"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("./[name]/res/index.css")
    ]
};
