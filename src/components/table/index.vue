<template>
  <div class="hello">
    <a-row class="search">
      <a-col :span="20">
        <slot name="search" :params="props.query"></slot>
      </a-col>
      <a-col class="operation" :span="4">
        <a-space>
          <a-button type="primary" @click="search">{{
            t('action.search')
          }}</a-button>
          <a-button type="primary" @click="reset">{{
            t('action.reset')
          }}</a-button>
        </a-space>
      </a-col>
    </a-row>
    <a-row class="tool">
      <a-col :span="12">
        <slot name="toolbox"></slot>
      </a-col>
      <a-col :span="12" class="tool-right">
        <a-button v-if="showExport" type="primary" @click="exportExcel">{{
          t('action.export')
        }}</a-button>
      </a-col>
    </a-row>
    <a-table
      v-bind="$attrs"
      :loading="state.loading"
      :dataSource="state.data"
      :pagination="{
        current: state.pageIndex,
        pageSize: state.pageSize,
        total: state.total,
        pageSizeOptions: ['5', '10', '20', '40'],
        showSizeChanger: true,
      }"
      @change="pageIndexChange"
      :row-selection="selection ? rowSelection : undefined"
    >
      <template
        v-for="name of Object.keys($slots)"
        v-slot:[name]="args"
        :key="name"
      >
        <slot :name="name" v-bind="args"></slot>
      </template>
      <template #tooltipTitle="{ value }">
        {{ value }}
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, defineExpose, watch } from 'vue';
import type { PropType } from 'vue';
import { fetchByApi } from '@/hooks/useFetchByApi';
import i18n from '@/locales';

const { t } = i18n.global;
const props = defineProps({
  api: {
    type: Function as PropType<(params?: any) => Promise<any>>,
    required: true,
  },
  query: {
    type: Object,
    default: () => {},
  },
  selection: {
    type: Boolean,
    default: false,
  },
  showExport: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  'onSelectRowsChange',
  'onSelectKeysChange',
  'clearSelect',
  'exportExcel',
]);

const search = () => {
  reload();
};
const { state, reload, reset, setPageInfo } = fetchByApi(
  props.api,
  props.query
);
watch(
  () => props.query,
  (newQuery: any) => {
    Object.assign(props.query, newQuery);
  },
  {
    deep: true,
  }
);

/** 选择项 */
const selectedRowKeysRef = ref<string[]>([]);
const selectedRowsRef = ref<string[]>([]);
const rowSelection = {
  selectedRowKeys: selectedRowKeysRef,
  onChange: (selectedRowKeys: string[], selectedRows) => {
    selectedRowKeysRef.value = selectedRowKeys;
    selectedRowsRef.value = selectedRows;
    emit('onSelectKeysChange', selectedRowKeys);
    emit('onSelectRowsChange', selectedRows);
  },
};
const clearSelect = () => {
  selectedRowKeysRef.value = [];
  selectedRowsRef.value = [];
  emit('clearSelect');
};

/** 分页 */
/** 当前页码切换 */
const pageIndexChange = (pageInfo) => {
  setPageInfo({ pageSize: pageInfo.pageSize, pageIndex: pageInfo.current });
  reload();
};

/** 导出excel */
const exportExcel = () => {
  emit('exportExcel', selectedRowsRef.value);
};

defineExpose({
  clearSelect,
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.search {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  .operation {
    display: flex;
    justify-content: flex-end;
  }
}
.tool {
  background: #fff;
  padding: 15px 20px;
  .tool-right {
    text-align: right;
  }
}
</style>
