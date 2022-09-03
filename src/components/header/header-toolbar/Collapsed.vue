<template>
  <MenuUnfoldOutlined
    v-if="themeConfig.collapsed"
    class="trigger"
    @click="trigger"
  />
  <MenuFoldOutlined v-else class="trigger" @click="trigger" />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '@/store/themeConfig';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';

const themeConfigStore = useThemeConfig();
const { themeConfig } = storeToRefs(themeConfigStore);
const { setConfig } = themeConfigStore;
const trigger = () => {
  setConfig({
    collapsed: !themeConfig.value.collapsed,
  });
};
</script>

<style scoped lang="less">
.trigger {
  cursor: pointer;
  font-size: 20px;
}
</style>
