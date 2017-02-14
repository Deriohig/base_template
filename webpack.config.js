var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
 context: path.resolve(__dirname, './app'), // `__dirname` is root of project and `src` is source
  entry: {
    app: './app.js',
  },
  output: {
    path: path.resolve(__dirname, 'app/dist'), // `dist` is the destination
    filename: '[name].bundle.js',
    publicPath: '/assets',
  },
  module: {
    rules: [
      {
        test: /\.js$/, //Check for all js files
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] }
        }]
      },
      {
        test: /\.(sass|scss)$/, //Check for sass or scss file names
        loader: ExtractTextPlugin.extract([ 'style-loader', 'css-loader', 'sass-loader']),
      },
      {
        test: /\.json$/,
        use: "json-loader"  //JSON loader
      },

    ],
  },
  plugins: [
    new ExtractTextPlugin({ // define where to save the file
      filename: '[name].bundle.css',
      allChunks: true
    }),
  ],
  devServer: {
    open: true,
    contentBase: path.resolve(__dirname, './app'),  // New
  },
};

module.exports = config;
