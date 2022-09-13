<template>
  <div class="breadcrumb">
    <a-breadcrumb :routes="breadcrumbRoutes">
      <template #itemRender="{ route, paths }">
        <span v-if="!route.allowJump">
          {{ route.name }}
        </span>
        <router-link v-else :to="`/${paths.join('/')}`">
          {{ route.name }}
        </router-link>
      </template>
    </a-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

interface BreadcrumbRoute {
  name: string;
  path: string;
  /** 是否允许点击跳转 */
  allowJump: boolean;
}

const route = useRoute();
console.log(route.matched);
const breadcrumbRoutes = ref<BreadcrumbRoute[]>([]);

/** 监听路由变化，重新获取面包屑数据 */
watch(
  route,
  () => {
    /** 使用matched来生成面包屑数据，路由配置的地址必须要有层级关系，一级菜单是/table，二级菜单必须为/table/xxx */
    breadcrumbRoutes.value = route.matched.map((t, i, routeMatchs) => ({
      name: t.meta.title as string,
      path: t.path,
      /** 允许点击跳转的判断，非最后一个且path有路径 */
      allowJump: i < routeMatchs.length - 1 && !['', '/'].includes(t.path),
    }));
    breadcrumbRoutes.value.shift();
  },
  {
    immediate: true,
  }
);
</script>

<style scoped lang="less">
.breadcrumb {
  padding: 10px 20px 0;
}
</style>
