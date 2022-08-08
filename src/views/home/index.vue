<template>
  <div>
    <Line></Line>
    <VirtualList :list="list">
      <template #default="{ item }">
        <div style="text-align: center">{{ item }}</div>
      </template>
    </VirtualList>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VirtualList from '@/components/virtual-list/index.vue';
import Line from '@/components/charts/line/index.vue';

const list = ref<string[]>([]);
for (let i = 0; i < 100; i++) {
  list.value?.push(i + '');
}
</script>

<style scoped lang="less"></style>
