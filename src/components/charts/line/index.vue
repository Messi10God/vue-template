<template>
  <div id="line"></div>
</template>

<script setup lang="ts">
import { onMounted, defineProps } from 'vue';
import * as echarts from 'echarts';

let line;
let chart;

const props = defineProps({
  option: {
    type: Object,
    default: () => {},
  },
});

const initChart = () => {
  if (!chart) {
    line = document.getElementById('line');
    chart = echarts.init(line);
  }
  chart.setOption(props.option);
};
onMounted(() => {
  initChart();
});
</script>

<style scoped lang="less">
#line {
  height: 400px;
  width: 100%;
}
</style>
