<template>
  <div>
    <Table :columns="columns" :api="api">
      <template #search>
        <a-form layout="inline">
          <a-form-item label="筛选1">
            <a-input></a-input>
          </a-form-item>
          <a-form-item label="筛选2">
            <a-input></a-input>
          </a-form-item>
        </a-form>
      </template>
      <template #bodyCell="{ record, column }">
        <template v-if="column.dataIndex === 'name'">
          <a-tag>{{ record.name }}</a-tag>
        </template>
        <template v-if="column.dataIndex === 'age'">
          <span style="color: #f00">{{ record.age }}</span>
        </template>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import Table from '@/components/table/index.vue';
import { ref } from 'vue';

const columns = ref([
  {
    title: '名字',
    dataIndex: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
]);
const api = () => {
  return Promise.resolve({
    code: 200,
    data: [
      {
        name: '黄乘车你',
        age: 27,
      },
      {
        name: '小李',
        age: 21,
      },
      {
        name: '张三',
        age: 53,
      },
    ],
  });
};
</script>

<style scoped lang="less"></style>
