<template>
  <a-menu
    @click="changeRoute"
    mode="inline"
    v-model:selectedKeys="selectedKeys"
    v-model:openKeys="openKeys"
    @openChange="openChange"
  >
    <template v-for="item in menu" :key="item.name">
      <a-menu-item v-if="!item.children" :key="item.name">
        <MailOutlined />
        <span>{{ item.meta?.title }}</span>
      </a-menu-item>
      <template v-else>
        <a-sub-menu :key="item.name">
          <template #title>
            <MailOutlined />
            <span>{{ item.meta?.title }}</span>
          </template>
          <template v-for="child in item.children" :key="child.name">
            <!-- 不显示hidden的路由 -->
            <a-menu-item v-if="!child.meta?.hidden" :key="child.name">
              <span>{{ child.meta?.title }}</span>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </template>
  </a-menu>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { routes } from '@/router/index';
import { MailOutlined } from '@ant-design/icons-vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const menu = computed(() => {
  return routes.filter((t) => t.name === 'Layout')[0].children;
});

const selectedKeys = ref<string[]>([]);
const openKeys = ref<string[]>([]);

/** openkeys初始化 */
const initOpenKeys = () => {
  /** 获取当前组件name */
  const name = route.name;
  /** 获取上级菜单的name */
  const arr = (name as string).split('.');
  if (arr.length > 1) {
    openKeys.value = arr.slice(0, -1);
  }
};

initOpenKeys();

const openChange = (keys: string[]) => {
  openKeys.value = keys;
};

const setSelectedKeys = (newRoute, oldRoute) => {
  /** 如果旧路由存在，则是由左侧菜单跳转 */
  if (oldRoute) {
    if (newRoute.name.includes(oldRoute.name)) {
      selectedKeys.value[0] = oldRoute.name;
    } else {
      selectedKeys.value[0] = newRoute.name;
    }
  } else {
    /** 如果跳转到不展示在左侧菜单栏的页面，则选中该页面的上级页面 */
    if (newRoute.meta.hidden) {
      selectedKeys.value[0] = newRoute.name.slice(
        0,
        newRoute.name.lastIndexOf('.')
      );
    } else {
      selectedKeys.value[0] = newRoute.name;
    }
  }
};
/** 监听路由变化，设置选中项 */
watch(
  () => route,
  (newRoute, oldRoute) => {
    setSelectedKeys(newRoute, oldRoute);
  },
  {
    deep: true,
    immediate: true,
  }
);

const changeRoute = ({ key }: { key: string }) => {
  router.push({
    name: key,
  });
};
</script>

<style scoped lang="less"></style>
