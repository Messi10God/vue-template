<template>
  <a-layout class="main">
    <a-layout-header
      class="header"
      :style="{ height: themeConfig.headerHeight + 'px' }"
    >
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
      <a-layout class="content">
        <a-layout-content>
          <PageTags></PageTags>
          <Breadcrumb></Breadcrumb>
          <div class="container">
            <l-main v-if="isReload"></l-main>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import LMain from './Main/index.vue';
import SideBar from '@/components/side-bar/index.vue';
import Header from '@/components/header/index.vue';
import PageTags from '@/components/page-tags/index.vue';
import Breadcrumb from '@/components/breadcrumb/index.vue';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '@/store/themeConfig';
import { ref, provide } from 'vue';
import { reloadType } from '@/components/typing';

const { themeConfig } = storeToRefs(useThemeConfig());

const isReload = ref(true);

/** 实现页面的重新加载，相当于卸载组件后再挂载组件 */

const reload = () => {
  isReload.value = false;
  setTimeout(() => {
    isReload.value = true;
  }, 200);
};

provide(reloadType, reload);
</script>

<style scoped lang="less">
.main {
  // 100%和100vh的区别在于有横向滚动条的时候，100vh会出现竖向滚动条，因为100vh的高度是不包含滚动条高度的
  height: 100%;
  .header {
    background: #fff;
  }
  .container {
    margin: 10px 20px;
    // background: #fff;
    // border-radius: 10px;
    overflow-y: auto;
    overflow-x: hidden;
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
