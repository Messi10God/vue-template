<template>
  <div :id="id" :style="{ width, height }"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, defineProps } from 'vue';
import * as echarts from 'echarts';

let line;
let chart;

const props = defineProps({
  option: {
    type: Object,
    default: () => {},
  },
  id: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '400px',
  },
});

const initChart = () => {
  if (!chart) {
    line = document.getElementById(props.id);
    chart = echarts.init(line);
  }
  chart.setOption(props.option);
};

const resize = () => {
  chart?.resize();
};
onMounted(() => {
  initChart();

  window.addEventListener('resize', resize);
});
onUnmounted(() => {
  window.removeEventListener('resize', resize);
});
</script>

<style scoped lang="less"></style>
