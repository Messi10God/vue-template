<template>
  <a-dropdown :trigger="['click']">
    <SvgIcon iconClass="translate" className="header-icon"></SvgIcon>
    <template #overlay>
      <a-menu @click="handleSwitch">
        <a-menu-item
          v-for="(item, key) in LangEnum"
          :key="key"
          :disabled="key === themeConfigStore.themeConfig.lang"
        >
          <a href="javascript:;">{{ item }}</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import { useThemeConfig } from '@/store/themeConfig';
import { LangEnum } from '@/store/configs';
import { useI18n } from 'vue-i18n';

const themeConfigStore = useThemeConfig();

const { locale } = useI18n();

const handleSwitch = (menuItem) => {
  locale.value = menuItem.key;
  themeConfigStore.setConfig({
    lang: menuItem.key,
  });
};
</script>

<style scoped lang="less"></style>
