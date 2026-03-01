// vue-cli 配置文件

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://luxmeth.cn",
      }
    }
  }
};