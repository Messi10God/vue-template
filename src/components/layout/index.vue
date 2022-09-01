<template>
  <a-layout class="main">
    <a-layout-header style="background: #fff">
      <Header></Header>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff" collapsible>
        <SideBar></SideBar
      ></a-layout-sider>
      <a-layout>
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
</script>

<style scoped lang="less">
.main {
  height: 100vh;
  .content {
    margin: 20px;
    // background: #fff;
    // border-radius: 10px;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
