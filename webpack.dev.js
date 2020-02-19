const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const url = require('url');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common');

const devpaths = {
  app: path.join(__dirname, 'src', 'app'),
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
    new HtmlWebpackPlugin({
      template: 'index.html',
      favicon: 'favicon.ico',
    }),
    new CopyPlugin([
      { from: 'manifest.json', to: devpaths.build },
    ]),
  ],
});

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
);
