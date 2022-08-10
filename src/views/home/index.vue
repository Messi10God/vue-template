<template>
  <div>
    <Line :option="option"></Line>
  </div>
</template>

<script setup lang="ts">
import Line from '@/components/charts/line/index.vue';
import { ref } from 'vue';

const option = ref({
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
});
</script>

<style scoped lang="less"></style>
