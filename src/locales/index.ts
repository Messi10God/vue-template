import { createI18n } from 'vue-i18n';
import { defaultConfig } from '@/store/configs';
import zh from './lang/zh-CN';
import en from './lang/en-US';

const messages = {
  en: en,
  zh: zh,
};

console.log(messages);

const currentLang = sessionStorage.getItem('themeConfig')
  ? JSON.parse(sessionStorage.getItem('themeConfig') as string)?.lang
  : defaultConfig.lang;
const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: currentLang, // 设置语言
  fallbackLocale: defaultConfig.lang, // 设置默认语言
  messages, // 设置语言的文字
});

export default i18n;
