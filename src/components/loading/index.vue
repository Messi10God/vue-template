<template>
  <div class="loading-container" @click.stop>
    <div>{{ props.text }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps({
  text: {
    type: String,
    default: 'Loading...',
  },
});
</script>

<style scoped lang="less">
.loading-container {
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
