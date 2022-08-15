import type { App } from 'vue';

const directives = require.context(
  // 其组件目录的相对路径
  './',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /\w+\.ts$/
);
export default {
  install(app: App) {
    directives.keys().forEach((directive) => {
      const directiveModule = directives(directive);
      console.log(directiveModule.default);
      const directiveName: string = directive.replace(/\.\/(.+)\.ts$/g, '$1');
      if (directiveName !== 'index')
        app.directive(
          directiveName,
          directiveModule.default || directiveModule
        );
    });
  },
};
