<template>
  <div class="hello">
    <a-row class="search">
      <a-col :span="20">
        <slot name="search" :params="props.query"></slot>
      </a-col>
      <a-col class="operation" :span="4">
        <a-space>
          <a-button type="primary" @click="search">查询</a-button>
          <a-button type="primary" @click="reset">清空</a-button>
        </a-space>
      </a-col>
    </a-row>
    <a-table v-bind="$attrs" :loading="state.loading" :dataSource="state.data">
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
import { defineProps, watch } from 'vue';
import type { PropType } from 'vue';
import { fetchByApi } from '@/hooks/useFetchByApi';

const props = defineProps({
  api: {
    type: Function as PropType<(params?: any) => Promise<any>>,
    required: true,
  },
  query: {
    type: Object,
    default: () => {},
  },
});

const search = () => {
  reload();
};
const { state, reload, reset } = fetchByApi(props.api, props.query);
watch(
  () => props.query,
  (newQuery: any) => {
    Object.assign(props.query, newQuery);
  },
  {
    deep: true,
  }
);
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
</style>
