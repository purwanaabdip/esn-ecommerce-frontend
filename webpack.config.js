var debug = process.env.NODE_ENV !== "production";
var webpack = require("webpack");

module.exports = {
  context: __dirname + "/app",
  devtool: debug ? "inline-sourcemap" : null,
  entry: {
    app: "./index.js"
},
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015", "stage-0"],
          plugins: ["react-html-attrs", "transform-class-properties", "transform-decorators-legacy"]
        }
      }
    ]
  },
  output: {
    path: __dirname + "/app",
    filename: "bundle.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({mangle:false, sourcemap:false}),
  ],
}
