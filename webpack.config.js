const merge = require("webpack-merge");
const dev = require("./webpack.dev");
const prod = require("./webpack.prod");

const devMode = process.env.NODE_ENV !== "production";

module.exports = merge(devMode ? dev.dev : prod.production);
