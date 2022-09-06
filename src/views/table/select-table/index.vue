<template>
  <div>
    <Table
      selection
      row-key="id"
      :columns="columns"
      :query="query"
      :api="api"
      @onSelectRowsChange="onSelectRowsChange"
      :showExport="true"
    >
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
      id: '1',
      name: '黄乘车你',
      age: '27',
    },
    {
      id: '2',
      name: '小吖',
      age: '21',
    },
    {
      id: '3',
      name: '张三',
      age: '53',
    },
    {
      id: '4',
      name: '李四',
      age: '53',
    },
    {
      id: '5',
      name: '王五',
      age: '53',
    },
    {
      id: '6',
      name: '赵六',
      age: '53',
    },
  ];
  if (params.age || params.name) {
    data = data.filter(
      (t) => t.age.includes(params.age) || t.name.includes(params.name)
    );
  }
  let new_data = data.slice(
    (params.pageIndex - 1) * params.pageSize,
    params.pageIndex * params.pageSize
  );
  return Promise.resolve({
    code: 200,
    total: data.length,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    data: new_data,
  });
};

const onSelectRowsChange = (selectedRows) => {
  console.log(selectedRows);
};
</script>

<style scoped lang="less"></style>
