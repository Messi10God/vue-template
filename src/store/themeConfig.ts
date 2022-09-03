import { defineStore } from 'pinia';

export interface Config {
  collapsed: boolean;
}

const defaultConfig: Config = {
  collapsed: false,
};
export const useThemeConfig = defineStore('themeConfig', {
  state: () => ({
    themeConfig: sessionStorage.getItem('themeConfig')
      ? (JSON.parse(sessionStorage.getItem('themeConfig') as string) as Config)
      : defaultConfig,
  }),
  actions: {
    setConfig(config: Config) {
      this.themeConfig = { ...this.themeConfig, ...config };
      sessionStorage.setItem('themeConfig', JSON.stringify(this.themeConfig));
    },
    clearToken() {
      sessionStorage.removeItem('themeConfig');
      this.themeConfig = defaultConfig;
    },
  },
});
