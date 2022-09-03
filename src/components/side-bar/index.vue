<template>
  <a-menu
    @click="changeRoute"
    mode="inline"
    v-model:selectedKeys="selectedKeys"
  >
    <template v-for="item in menu" :key="item.name">
      <a-menu-item v-if="!item.children" :key="item.name">
        <MailOutlined />
        <span>{{ item.meta?.title }}</span>
      </a-menu-item>
      <a-sub-menu v-else>
        <template #title>
          <MailOutlined />
          <span>{{ item.meta?.title }}</span>
        </template>
        <a-menu-item v-for="child in item.children" :key="child.name">
          <span>{{ child.meta?.title }}</span>
        </a-menu-item>
      </a-sub-menu>
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

/** 监听路由变化，设置选中项 */
watch(
  () => route.name,
  (newRouteName) => {
    if (typeof newRouteName === 'string') {
      selectedKeys.value[0] = newRouteName;
    } else {
      selectedKeys.value = [];
    }
  },
  {
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
