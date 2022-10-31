/** 自定义风格配置start */
export interface Config {
  collapsed: boolean;
  sideBarWidth: number;
  headerHeight: number;
  lang: string;
  primaryColor: string;
}

export const defaultConfig: Config = {
  collapsed: false,
  sideBarWidth: 200,
  headerHeight: 64,
  lang: 'zh',
  primaryColor: '#1890FF',
};

export const LangEnum = {
  zh: '中文',
  en: 'English',
};

/** 自定义风格配置end */
