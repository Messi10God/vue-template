<template>
  <a-config-provider :locale="isCN ? zh_CN : en_US">
    <router-view></router-view>
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import zh_CN from 'ant-design-vue/lib/locale/zh_CN';
import en_US from 'ant-design-vue/lib/locale/en_US';
import { useThemeConfig } from '@/store/themeConfig';

export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    const themeConfigStore = useThemeConfig();

    /** 当前是否是中文 */
    const isCN = computed(() => {
      return themeConfigStore.themeConfig.lang === 'zh';
    });

    return {
      zh_CN,
      en_US,
      isCN,
    };
  },
});
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-width: 1366px;
}

/*滚动条整体样式,一般只设置(竖直滚动条)宽度,和(水平)高度*/
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

/*滚动条轨道样式，一般设置背景色*/
::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.098) !important;
}

/*滑块样式*/
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.11) !important;
}
/*滑块激活样式*/
::-webkit-scrollbar-thumb:active {
  background-color: rgba(0, 0, 0, 0.2) !important;
}
</style>
