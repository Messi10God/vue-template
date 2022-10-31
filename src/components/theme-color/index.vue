<template>
  <div>
    <div style="height: 20px">
      <a-tooltip
        class="setting-drawer-theme-color-colorBlock"
        v-for="(item, index) in colorList"
        :key="index"
      >
        <template #title>
          {{ item.key }}
        </template>
        <a-tag :color="item.color" @click="changeColor(item.color)">
          <a-icon type="check" v-if="item.color === primaryColor"></a-icon>
        </a-tag>
      </a-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import message from 'ant-design-vue/es/message';
import { ref } from 'vue';
import themeColor from './themeColor.js';
import colors from './colors.js';
import { useThemeConfig } from '@/store/themeConfig';

const themeConfigStore = useThemeConfig();

const colorList = colors;

const primaryColor = ref<string>(themeConfigStore.themeConfig.primaryColor);
const updateTheme = (newPrimaryColor) => {
  const hideMessage = message.loading('正在切换主题！', 0);
  themeColor
    .changeColor(newPrimaryColor)
    .then(() => {
      themeConfigStore.setConfig({
        primaryColor: newPrimaryColor,
      });
    })
    .finally(() => {
      setTimeout(() => {
        hideMessage();
      }, 10);
    });
};

const changeColor = (color) => {
  updateTheme(color);
};
</script>

<style scoped lang="less">
.setting-drawer-theme-color-colorBlock {
  width: 20px;
  height: 20px;
  border-radius: 2px;
  float: left;
  cursor: pointer;
  margin-right: 8px;
  padding-left: 0px;
  padding-right: 0px;
  text-align: center;
  color: #fff;
  font-weight: 700;

  i {
    font-size: 14px;
  }
}
</style>
