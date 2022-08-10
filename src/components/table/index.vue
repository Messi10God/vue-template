<template>
  <div class="hello">
    <div class="search">
      <slot name="search"></slot>
    </div>
    <a-table v-bind="$attrs" :loading="loading" :dataSource="state.data">
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
import { ref, defineProps } from 'vue';
import type { PropType } from 'vue';

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

const fetchByApi = () => {
  const state = {
    data: [],
  };
  const getList = async () => {
    loading.value = true;
    try {
      const { data } = await props.api(props.query);
      state.data = data;
      loading.value = false;
    } catch (error) {
      loading.value = false;
    }
  };
  getList();
  return {
    state,
  };
};

const loading = ref<boolean>(true);
const { state } = fetchByApi();
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
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
}
</style>
