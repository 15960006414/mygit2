/*
 * @Description: 配置文件
 * @Author: hai-27
 * @Date: 2020-02-07 16:23:00
 * @LastEditors: hai-27
 * @LastEditTime: 2020-03-05 01:41:38
 */
const webpack = require('webpack');

module.exports = {
  publicPath: "/",
  chainWebpack(config) {
    config.plugin("ignore").use(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ja/));        
    config.optimization.minimizer("terser").tap((args) => {
      args[0].terserOptions.compress.drop_console = true;
      args[0].sourceMap = false;
      return args;
    });
    config.optimization.splitChunks({
      chunks: "all",
      cacheGroups: {
        common: {
          name: "chunk-common",
          chunks: "initial",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
        libs: {
          name: "chunk-vendors",
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          priority: 2,
          reuseExistingChunk: true,
          enforce: true,
        },
        elementUI: {
          name: "chunk-elementui",
          test: /[\\/]node_modules[\\/]element-ui[\\/]/,
          chunks: "all",
          priority: 3,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    });
  },
  devServer: {
    open: true
  },
};
