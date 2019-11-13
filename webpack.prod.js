const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common');

const prodpaths = {
  app: path.join(__dirname, 'src', 'app'),
  mvcapproot: path.join(__dirname, '../PRSforMusic.MobileApp'),
  build: path.join(__dirname, '../PRSforMusic.MobileApp', 'wwwroot'),
  public: path.join(__dirname, 'public'),
};

exports.production = () => merge(
  {
    plugins: [
      new CopyPlugin([
        { from: 'images', to: path.join(prodpaths.build, 'images') },
        { from: 'iam-fonts', to: prodpaths.build },
        { from: 'manifest.json', to: prodpaths.build },
        { from: 'favicon.ico', to: prodpaths.build },
      ]),
      new webpack.DefinePlugin({ __DEV__: JSON.stringify(false) }),
    ],
    optimization: {
      splitChunks: {
        name: 'vendor',
        chunks: 'all',
      },
    },
  },
  { devtool: 'source-map' },
  common.common({ packMode: 'production', devMode: false, PATHS: prodpaths }),
);
