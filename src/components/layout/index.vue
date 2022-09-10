<template>
  <a-layout class="main">
    <a-layout-header class="header" :height="themeConfig.headerHeight">
      <Header></Header>
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        :width="themeConfig.sideBarWidth"
        style="background: #fff"
        v-model:collapsed="themeConfig.collapsed"
        :trigger="null"
        collapsible
      >
        <SideBar></SideBar
      ></a-layout-sider>
      <a-layout>
        <PageTags></PageTags>
        <a-layout-content class="content">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import SideBar from '@/components/side-bar/index.vue';
import Header from '@/components/header/index.vue';
import PageTags from '@/components/page-tags/index.vue';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '@/store/themeConfig';

const { themeConfig } = storeToRefs(useThemeConfig());
</script>

<style scoped lang="less">
.main {
  height: 100vh;
  .header {
    background: #fff;
  }
  .content {
    margin: 20px;
    // background: #fff;
    // border-radius: 10px;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
