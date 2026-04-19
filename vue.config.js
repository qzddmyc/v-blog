// vue-cli 配置文件

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://luxmeth.cn",
        changeOrigin: true,
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp|ico)(\?.*)?$/)
      .end();
  },
  configureWebpack: require("./webpack.config"),
};