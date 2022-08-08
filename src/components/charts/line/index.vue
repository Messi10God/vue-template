<template>
  <div id="line"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import * as echarts from 'echarts';

let line;
let chart;
const option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true,
    },
  ],
};

const initChart = () => {
  if (!chart) {
    line = document.getElementById('line');
    chart = echarts.init(line);
  }
  chart.setOption(option);
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
