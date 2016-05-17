var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: path.join(__dirname, 'app', 'app.js'),
  output: {
    path: __dirname + '/app',
    filename: 'app.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  },
  resolve: {
    alias: {
      'react-input-suggest': path.join(__dirname, '..', 'src')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
}
