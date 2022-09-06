<template>
  <div>
    <Table :columns="columns" :query="query" :api="api">
      <template #search="{ params }">
        <a-form layout="inline">
          <a-form-item label="名字">
            <a-input v-model:value="params.name"></a-input>
          </a-form-item>
          <a-form-item label="年龄">
            <a-input v-model:value="params.age"></a-input>
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
import { ref, reactive } from 'vue';

const query = reactive({
  name: undefined,
  age: undefined,
});

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
const api = (params: any) => {
  let data = [
    {
      name: '黄乘车你',
      age: '27',
    },
    {
      name: '小李',
      age: '21',
    },
    {
      name: '张三',
      age: '53',
    },
  ];
  if (params.age || params.name) {
    data = data.filter(
      (t) => t.age.includes(params.age) || t.name.includes(params.name)
    );
  }
  return Promise.resolve({
    code: 200,
    data: data,
  });
};
</script>

<style scoped lang="less"></style>
