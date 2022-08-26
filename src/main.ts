import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import directives from '@/directives';

const app = createApp(App);

const pinia = createPinia();

console.log(process.env.VUE_APP_TEXT);

app.use(router).use(Antd).use(pinia).use(directives).mount('#app');
