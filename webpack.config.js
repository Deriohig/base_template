const path = require('path');
const webpack = require('webpack');


module.exports = {
 context: path.resolve(__dirname, './app'), // `__dirname` is root of project and `src` is source
  entry: {
    app: './app.js',
  },
  output: {
    path: path.resolve(__dirname, 'app/dist'), // `dist` is the destination
    filename: '[name].bundle.js',
    publicPath: '/assets',
  },
  devServer: {
    contentBase: path.resolve(__dirname, './app'),  // New
  },
};
