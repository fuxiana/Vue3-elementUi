const { defineConfig } = require('@vue/cli-service');
const CompressionWebpackPlugin = require("compression-webpack-plugin")
const productionGzipExtensions = ["js", "css"]
module.exports = defineConfig({
  configureWebpack: (config) => {
  	const plugins = []
  	//start 生成gzip压缩文件
  	plugins.push(
      // Ignore all locale files of moment.js
      // new webpack.IgnorePlugin(/^\.\/locale$/,/moment$/),
      // 配置compression-webpack-plugin压缩
      new CompressionWebpackPlugin({
        algorithm: "gzip",
        test: new RegExp("\\.(" +productionGzipExtensions.join("|") + ")$"),
        threshold: 10240,	//对10K以上的数据进行压缩
        minRatio: 0.8,
      }),
      // new webpack.optimize.LimitChunkCountPlugin({
      //   maxChunks: 5,
      //   minChunkSize: 100,
      // })
    )
    //end 结束生成gzip压缩文件
    config.plugins = [...config.plugins, ...plugins]
  },
  transpileDependencies: true,
  productionSourceMap: false,
  chainWebpack: config => {
    // 查看打包文件体积大小
    config
    .plugin('webpack-bundle-analyzer')
    .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  },
  devServer:{
    https: true,  // 是否https
    proxy:{
      "/api":{
        target: "http://127.0.0.1:8088/",
        changeOrigin: true,
        ws: true,
        pathRewrite:{
            "^/api": ""
        }
      } 
    }
  }
});
