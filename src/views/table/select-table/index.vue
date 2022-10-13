<template>
  <div>
    <Table
      selection
      row-key="id"
      :columns="columns"
      :query="query"
      :api="getUsers"
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
      <template #toolbox>
        <a-button @click="doAdd">新增</a-button>
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
import { useRouter } from 'vue-router';
import { getUsers } from '@/api/table';

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

const onSelectRowsChange = (selectedRows) => {
  console.log(selectedRows);
};

const router = useRouter();
const doAdd = () => {
  router.push('/table/selectTable/add');
};
</script>

<style scoped lang="less"></style>
