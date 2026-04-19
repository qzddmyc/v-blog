// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const prod = {
  devtool: "none",
  // plugins: [new BundleAnalyzerPlugin()],
  externals: {
    vue: "Vue",
    vuex: "Vuex",
    "vue-router": "VueRouter",
    axios: "axios",
  }
};

const dev = {};

if (process.env.NODE_ENV === "production") {
  module.exports = prod;
} else {
  module.exports = dev;
}