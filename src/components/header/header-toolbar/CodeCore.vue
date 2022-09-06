<template>
  <GithubOutlined @click="openGithub" class="header-icon" />
</template>

<script setup lang="ts">
import { GithubOutlined } from '@ant-design/icons-vue';

const openGithub = () => {
  window.open('https://github.com/Messi10God/vue-template', '_blank');
};
</script>

<style scoped lang="less"></style>
