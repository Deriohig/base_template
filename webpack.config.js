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
    publicPath: '../dist/',
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
               test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
               loader: 'file-loader',
               
               //loader: 'file?name=public/fonts/[name].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        loaders: [
            'file-loader?hash=sha512&digest=hex&name=[name].[ext]',
            'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
          ],
      },
      {
        test: /\.(sass|scss)$/, //Check for sass or scss file names
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
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
