<template>
  <fullscreen-outlined v-if="!isFullscreen" @click="enter" class="trigger" />
  <FullscreenExitOutlined v-else @click="exit" class="trigger" />
</template>

<script setup lang="ts">
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
} from '@ant-design/icons-vue';
import { useFullscreen } from '@vueuse/core';

const { isFullscreen, enter, exit } = useFullscreen();
</script>

<style scoped lang="less">
.trigger {
  cursor: pointer;
  font-size: 20px;
}
</style>
