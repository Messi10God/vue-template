import { defineStore } from 'pinia';
import { defaultConfig } from '@/store/configs';
import type { Config } from '@/store/configs';

export const useThemeConfig = defineStore('themeConfig', {
  state: () => ({
    themeConfig: sessionStorage.getItem('themeConfig')
      ? (JSON.parse(sessionStorage.getItem('themeConfig') as string) as Config)
      : defaultConfig,
  }),
  actions: {
    setConfig(config: Partial<Config>) {
      this.themeConfig = { ...this.themeConfig, ...config };
      sessionStorage.setItem('themeConfig', JSON.stringify(this.themeConfig));
    },
    clearConfig() {
      sessionStorage.removeItem('themeConfig');
      this.themeConfig = defaultConfig;
    },
  },
});
