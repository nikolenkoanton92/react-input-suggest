var express = require('express')
var app = express()
var port = process.env.PORT || 8000
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var WebpackConfig = require('./webpack.config')

// app.use('/static', express.static('./client'))

app.use(webpackDevMiddleware(webpack(WebpackConfig), {
  publicPath: '/static/',
  stats: {
    colors: true
  }
}))

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

app.listen(port, function() {
  console.log('Server listen on *:' + port)
})
