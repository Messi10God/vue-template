<template>
  <div>
    <Table :columns="columns" :query="query" :api="getUsers">
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
        <template v-if="column.dataIndex === 'id'">
          <div>
            {{ record.id }}<CopyOutlined class="pointer" v-copy="record.id" />
          </div>
        </template>
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
import { getUsers } from '@/api/table';
import { CopyOutlined } from '@ant-design/icons-vue';

const query = reactive({
  name: undefined,
  age: undefined,
});

const columns = ref([
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: '名字',
    dataIndex: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
]);
</script>

<style scoped lang="less"></style>
