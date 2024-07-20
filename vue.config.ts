import AutoImport from "unplugin-auto-import/webpack";
import Components from "unplugin-vue-components/webpack";
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = {
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  devServer:{
    proxy:{
      "/api":{
        target: "http://localhost:3000",
        changeOrigin: true,
        ws: true,
        pathRewrite:{
            "^/api": ""
        }
      } 
    }
  }
};
