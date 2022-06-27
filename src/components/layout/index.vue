<template>
  <a-layout class="main">
    <a-layout-header></a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <SideBar></SideBar
      ></a-layout-sider>
      <a-layout>
        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import SideBar from "@/components/side-bar/index.vue";
</script>

<style scoped lang="less">
.main {
  height: 100vh;
}
</style>
