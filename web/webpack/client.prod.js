const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const API_PORT = process.env.FRONTEND_PORT || 3004;

module.exports = {
  context: path.join(__dirname, '../client'),
  devtool: 'source-map',
  entry: ['./index.js'],
  mode: 'production',
  output: {
    path: path.join(__dirname, '../public'),
    filename: './js/bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        API_URI: JSON.stringify(`http://localhost:${API_PORT}/api/graphql`),
      },
    }),
    new UglifyJSPlugin({
      cache: true,
      parallel: true,
      uglifyOptions: {
        compress: false,
        ecma: 6,
        mangle: true,
      },
      sourceMap: true,
    }),
  ],
};
