

module.exports = {
  configureWebpack: {
    plugins: [
    
    ],
  },
  devServer:{
    proxy:{
      "/api":{
        target: "http://127.0.0.1:3000/",
        changeOrigin: true,
        ws: true,
        pathRewrite:{
            "^/api": ""
        }
      } 
    }
  }
};
