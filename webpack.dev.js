const merge = require('webpack-merge');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const path = require('path');
const url = require('url');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');

const devpaths = {
  app: path.join(__dirname, 'src', 'app'),
  mvcapproot: path.join(__dirname, 'public', 'build'),
  build: path.join(__dirname, 'public', 'dist'),
  public: path.join(__dirname, 'public'),
};

devServer = () => ({
  devServer: {
    publicPath: '/',
    historyApiFallback: true,
    hot: true,
    stats: 'errors-only',
    port: 8080,
    overlay: {
      errors: true,
      warnings: false,
    },
    disableHostCheck: true,
    proxy: {
      api: {
        bypass: (req) => {
          const { pathname, query } = url.parse(req.url);
          const searchParams = new URLSearchParams(query);

          if (searchParams && searchParams.get('id')) {
            return `mocks${pathname}.${searchParams.get('id')}.json`;
          }

          return `mocks${pathname}.json`;
        },
      },
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
});


browserSync = () => {
  const hostName = 'localhost';
  return BrowserSyncPlugin ? {
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html',
      }),
      new BrowserSyncPlugin({
        logLeve: 'debug',
        host: hostName,
        port: 3000,
        proxy: 'http://localhost:8080/',
      },
      {
        reload: false,
      }),
    ],
  } : null;
};

devTool = (devtool) => ({
  devtool,
});

exports.dev = () => merge(
  devTool('source-map'),
  {
    plugins: [new webpack.DefinePlugin({ __DEV__: JSON.stringify(true) })],
  },
  common.common({ packMode: 'development', devMode: true, PATHS: devpaths }),
  devServer(),
  browserSync(),
);
