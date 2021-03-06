const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'client/public');
const APP_DIR = path.resolve(__dirname, 'client');
// Redirect to localhost if the REDIRECT variable is set
const REDIRECT = process.env.REDIRECT ? 'http://localhost:9009' : 'http://52.52.22.4';

const config = {
  entry: './app/routes.jsx',
  output: {
    path: BUILD_DIR,
    publicPath: BUILD_DIR,
    filename: 'bundle.js'
  },
  devServer: {
    proxy: {
      '/api/**': {
        target: REDIRECT, 
        secure: false
      },
      '/auth/**': {
        target: REDIRECT,
        secure: false
      }
    },
    port: 3000,
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};

module.exports = config;
