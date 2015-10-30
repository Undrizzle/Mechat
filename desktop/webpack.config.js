module.exports = {
    entry: {
        app: './app/app.js'
    },
    output: {
        path: 'build',
        filename: "[name]_webpack.js",
        sourceMapFilename: "[name]_webpack.map"
    },
    cache: true,

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader'
            }
        ]
    },

    devtool: "source-map"
};