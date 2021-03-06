const path = require("path");
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  pages: {
    index: {
      // page 的入口
      entry: "src/main.ts",
    },
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
  pluginOptions: {
    // 全局less文件
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [],
    },
  },
  transpileDependencies: true,
  publicPath: "./",
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve("src"),
      },
    },
  },
});
