var path = require('path');

module.exports = {
  context: __dirname,
  entry: './app/main.js',
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/assets/',
    filename: 'client.js'
  },
  devtool: 'eval',
  module: {
    loaders: [
      {test: /\.js$/, loaders: ['strict-loader', 'eslint-loader'], exclude: /node_modules|STLLoader/},
      {test: /\.glsl$/, loader: 'shader', exclude: /node_modules/},
      {test: /\.stl/, loader: 'raw', exclude: /node_modules/},
      {test: /\.json$/, loader: 'json-loader'}
    ]
  },
  devServer: {
    stats: 'normal'
  }
};
