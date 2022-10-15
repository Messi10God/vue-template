<template>
  <div class="tags">
    <a-space>
      <a-tag
        class="tag"
        v-for="item in visitedTags"
        :key="item.name"
        :color="activeTag?.name === item.name ? '#F50' : '#108ee9'"
        :closable="item.name !== 'Home'"
        @close="() => closeCurrentTag(item)"
        @click="toPage(item)"
        @contextmenu="(e) => showMenu(e, item)"
      >
        {{ item.meta?.title }}
      </a-tag>
    </a-space>
  </div>
  <ContextMenu
    ref="contextMenu"
    v-model:visible="visible"
    :data="data"
  ></ContextMenu>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, inject } from 'vue';
import { Tag, routeTagsStore } from '@/store/routerTags';
import { useRoute } from 'vue-router';
import router from '@/router/index';
import ContextMenu from '@/components/context-menu/index.vue';
import type ContextMenuType from '@/components/context-menu/index.vue';
import { reloadType } from '@/components/typing';

const route = useRoute();
/** 获取已打开页面列表及操作 */
const routeTags = routeTagsStore();

/** 获取所有页面 */
const routes = router.getRoutes();

/** 获取页面刷新方法 */
const reload = inject(reloadType);

/** 获取当前路由信息 */
const getCurrentRoute = () => {
  const path = route.path;
  return routes?.find((t) => t.path === path);
};
const currentRoute = getCurrentRoute()!;
/**  */
routeTags.addTag({
  name: currentRoute.name as string,
  path: currentRoute.path,
  meta: currentRoute.meta,
});

/** 标签列表 */
const visitedTags = computed(() => {
  return routeTags.tags;
});

/** 当前页面的标签 */
const activeTag = computed(() => {
  const name = route.name;
  return visitedTags.value.find((t) => t.name === name);
});

router.beforeEach((to) => {
  /** 如果不存在，则添加 */
  if (!visitedTags.value.some((t) => t.name === to.name)) {
    routeTags.addTag(to);
  }
});

/** 点击标签跳转页面 */
const toPage = (tag: Tag) => {
  const activeName = activeTag.value?.name;
  /** 点击当前页不做操作 */
  if (activeName === tag.name) {
    return;
  }
  router.push(tag.path);
};
/** 打开最后一个标签的页面 */
const toLastTag = () => {
  /** 获取最后一个标签 */
  const toLastTag = visitedTags.value.slice(-1)[0];
  router.replace(toLastTag.path);
};
/** 关闭当前标签 */
const closeCurrentTag = (tag: Tag) => {
  /** 保存当前页面的name，删除后activeTag.value会为undefined */
  const activeName = activeTag.value?.name;
  routeTags.clearCurrentTag(tag);
  /** 如果关闭的是当前激活页，则跳转到最后一个标签的页面 */
  if (activeName === tag.name) {
    toLastTag();
  }
};
/** 关闭其他标签 */
const closeOtherTag = (tag: Tag) => {
  routeTags.clearOtherTags(tag);
  toLastTag();
};

const closeAllTag = () => {
  routeTags.clearAll();
  toLastTag();
};

const visible = ref<boolean>(false);
const data = ref([
  {
    title: '刷新当前页面',
    event: () => reload(),
  },
  {
    title: '关闭当前标签',
    event: () => closeCurrentTag(clickedTag.value as Tag),
  },
  {
    title: '关闭其他标签',
    event: () => closeOtherTag(clickedTag.value as Tag),
  },
  {
    title: '关闭所有标签',
    event: () => closeAllTag(),
  },
]);

/** 右键菜单操作的标签 */
const clickedTag = ref<Tag>();
const contextMenu = ref<InstanceType<typeof ContextMenuType>>();
/** 鼠标右键事件，显示自定义右键菜单 */
const showMenu = (e: PointerEvent, tag: Tag) => {
  e.preventDefault();
  clickedTag.value = tag;
  contextMenu.value?.setCoordinate(e.pageX, e.pageY);
};

onMounted(() => {});
</script>

<style scoped lang="less">
.tags {
  background: #fff;
  padding: 10px 20px;
  overflow-x: auto;
  position: relative;
  .tag {
    cursor: pointer;
  }
}
</style>
