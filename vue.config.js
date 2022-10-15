const path = require("path");
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  devServer: {
    host: '0.0.0.0',
    setupMiddlewares: require('./mock/mock-server')
  },
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
      patterns: [path.resolve(__dirname, 'src/assets/less/common.less'), path.resolve(__dirname, 'src/assets/less/transition.less')],
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
    externals: {
      echarts: 'echarts'
    }
  },
  chainWebpack(config) {
    config.module
      .rule('svg')
      .exclude.add(path.resolve('src/assets/svg')) // 排除掉其他loader对svg处理
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.resolve('src/assets/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
});
