<template>
  <div class="breadcrumb">
    <a-breadcrumb :routes="breadcrumbRoutes" separator=">">
      <template #itemRender="{ route, paths }">
        <!-- <span>{{ paths }}</span> -->
        <span v-if="!route.allowJump">
          {{ route.meta.title }}
        </span>
        <router-link v-else :to="`/${paths.pop()}`">
          {{ route.meta.title }}
        </router-link>
      </template>
    </a-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

interface BreadcrumbRoute {
  meta: any;
  path: string;
  /** 是否允许点击跳转 */
  allowJump: boolean;
}

const route = useRoute();
const router = useRouter();

const routes = router.getRoutes();
const breadcrumbRoutes = ref<BreadcrumbRoute[]>([]);

const initRoutes = () => {
  breadcrumbRoutes.value = [];
  /** 获取当前路由的上级路由path数组，去掉第一个/是为了除去空数组，因为path以/开头 */
  const pathArr = route.path.slice(1).split('/');
  let path = '';
  for (let item of pathArr) {
    path = path + '/' + item;
    let breadcrumbRoute = routes.find((t) => t.path === path)!;
    const obj: BreadcrumbRoute = {
      meta: breadcrumbRoute.meta,
      path: breadcrumbRoute.path,
      allowJump: !breadcrumbRoute.meta.hideInBreadcrumb,
    };
    breadcrumbRoutes.value.push(obj);
  }
};

/** 监听路由变化，重新获取面包屑数据 */
watch(
  route,
  () => {
    initRoutes();
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
