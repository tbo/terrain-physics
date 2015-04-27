module.exports = {
    context: __dirname,
    entry: "./app/main.js",
    output: {
        path: './build',
        publicPath: "/assets/",
        filename: 'client.js'
    },
    eslint: {
        configFile: '.eslintrc'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/},
            {test: /\.json$/, loader: 'json-loader'}
        ]
    }
}
