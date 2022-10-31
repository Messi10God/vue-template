import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import i18n from '@/locales';
import { createPinia } from 'pinia';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import directives from '@/directives';
import SvgIcon from '@/components/svg-icon/index.vue';
import themePluginConfig from '../configs/themePluginConfig';
import themeColor from '@/components/theme-color/themeColor.js';

const app = createApp(App);

/** 项目使用svg */
app.component('SvgIcon', SvgIcon);
const req = require.context('./assets/svg', false, /\.svg$/);
console.log(req.keys());
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
requireAll(req);

const pinia = createPinia();

/** 主题色相关start */

/** 获取缓存中的primaryColor，缓存存在时设置缓存中的颜色 */
const themeConfig = sessionStorage.getItem('themeConfig');
if (themeConfig) {
  const themeConfigObj = JSON.parse(themeConfig);
  themeColor.changeColor(themeConfigObj.primaryColor);
}

window.umi_plugin_ant_themeVar = themePluginConfig.theme;
/** 主题色相关end */
app.use(pinia).use(router).use(Antd).use(i18n).use(directives).mount('#app');
