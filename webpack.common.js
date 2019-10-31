const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const webpack = require("webpack");
const { InjectManifest } = require("workbox-webpack-plugin");

exports.common = ({ packMode, devMode, PATHS }) => ({
  mode: packMode,
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: "[name]-[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: [/node_modules/, /vendor/],
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: [/node_modules/, /vendor/],
        use: ["file-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: [/node_modules/, /vendor/],
        use: ["file-loader"]
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/, /vendor/],
        enforce: "pre",
        use: "eslint-loader"
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/, /vendor/],
        use: "babel-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      dry: false,
      cleanAfterEveryBuildPatterns: [PATHS.mvcapproot],
      dangerouslyAllowCleanPatternsOutsideProject: true,
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new StyleLintPlugin({
      failOnError: false
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new InjectManifest({
      importWorkboxFrom: 'disabled',
      swSrc: "./src/service-worker.js"
    })
  ]
});
