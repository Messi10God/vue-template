import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import i18n from '@/locales';
import { createPinia } from 'pinia';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import directives from '@/directives';
import SvgIcon from '@/components/svg-icon/index.vue';

const app = createApp(App);

/** 项目使用svg */
app.component('SvgIcon', SvgIcon);
const req = require.context('./assets/svg', false, /\.svg$/);
console.log(req.keys());
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
requireAll(req);

const pinia = createPinia();

console.log(process.env.VUE_APP_TEXT);

app.use(pinia).use(router).use(Antd).use(i18n).use(directives).mount('#app');
