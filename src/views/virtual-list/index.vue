<template>
  <div>
    <VirtualList :list="list" class="list">
      <template #default="{ item }">
        <div class="list-item">{{ item }}</div>
      </template>
    </VirtualList>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VirtualList from '@/components/virtual-list/index.vue';

const list = ref<string[]>([]);
for (let i = 0; i < 100; i++) {
  list.value?.push(i + '');
}
</script>

<style scoped lang="less">
.list {
  width: 100%;
  margin: 10px auto;
  background: #fff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.04),
    0px 8px 20px rgba(0, 0, 0, 0.08);
  &-item {
    text-align: center;
    height: 100%;
  }
}
</style>
