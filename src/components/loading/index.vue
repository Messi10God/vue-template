<template>
  <div class="loading-container" @click.stop>
    <LoadingOutlined style="font-size: 22px" />
    <div class="loading-text">{{ props.text }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { LoadingOutlined } from '@ant-design/icons-vue';

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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #1890ff;
  .loading-text {
    margin-top: 10px;
    font-size: 16px;
  }
}
</style>
