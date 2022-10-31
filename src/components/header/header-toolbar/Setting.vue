<template>
  <SettingOutlined @click="openDraw" class="header-icon" />
  <a-drawer v-model:visible="visible" placement="right" title="风格设置">
    <a-form>
      <a-form-item label="头部高度">
        <a-slider v-model:value="headerHeight" :min="64" :max="96" />
      </a-form-item>
      <a-form-item label="侧边栏宽度">
        <a-slider v-model:value="sideBarWidth" :min="150" :max="250" />
      </a-form-item>
      <a-form-item label="主题色">
        <ThemeColor></ThemeColor>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { SettingOutlined } from '@ant-design/icons-vue';
import { useThemeConfig } from '@/store/themeConfig';
import ThemeColor from '@/components/theme-color/index.vue';

const themeConfigStore = useThemeConfig();

/** 防止pinia的响应式和v-model冲突 */
const headerHeight = computed({
  set: (val) => {
    themeConfigStore.setConfig({
      headerHeight: val,
    });
  },
  get: () => {
    return themeConfigStore.themeConfig.headerHeight;
  },
});
const sideBarWidth = computed({
  set: (val) => {
    themeConfigStore.setConfig({
      sideBarWidth: val,
    });
  },
  get: () => {
    return themeConfigStore.themeConfig.sideBarWidth;
  },
});

const visible = ref<boolean>(false);
const openDraw = () => {
  visible.value = true;
};
</script>

<style scoped lang="less"></style>
