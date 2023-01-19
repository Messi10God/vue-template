<template>
  <div class="tags" :style="{ '--height': TAGS_LIST_HEIGHT + 'px' }">
    <a-space>
      <div
        class="tag"
        v-for="item in visitedTags"
        :key="item.name"
        @click="toPage(item)"
        @contextmenu="(e) => showMenu(e, item)"
      >
        <ReloadOutlined
          @click.stop="reload"
          :class="{ actived: activeTag.name === item.name }"
        />
        <span
          class="tag-title"
          :class="{ actived: activeTag.name === item.name }"
          >{{ item.meta?.title }}</span
        >
        <CloseOutlined
          @click.stop="closeCurrentTag(item)"
          v-if="item.name !== 'Home'"
        />
      </div>
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
import { Tag, useRouteTags } from '@/store/routerTags';
import { useRoute, useRouter } from 'vue-router';
import ContextMenu from '@/components/context-menu/index.vue';
import type ContextMenuType from '@/components/context-menu/index.vue';
import { reloadType } from '@/components/typing';
import { CloseOutlined, ReloadOutlined } from '@ant-design/icons-vue';

const route = useRoute();
const router = useRouter();

const TAGS_LIST_HEIGHT = ref(48);
/** 获取已打开页面列表及操作 */
const routeTagsStore = useRouteTags();

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
routeTagsStore.addTag({
  name: currentRoute.name as string,
  path: currentRoute.path,
  meta: currentRoute.meta,
});

/** 标签列表 */
const visitedTags = computed(() => {
  return routeTagsStore.tags;
});

/** 当前页面的标签 */
const activeTag = computed(() => {
  const name = route.name;
  /** 关闭后会导致值未undefined，为了不报错做兼容 */
  return visitedTags.value.find((t) => t.name === name) || ({} as Tag);
});

router.beforeEach((to) => {
  /** 如果不存在，则添加 */
  if (!visitedTags.value.some((t) => t.name === to.name)) {
    routeTagsStore.addTag(to);
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
  // eslint-disable-next-line no-debugger
  // debugger;
  /** 保存当前页面的name，删除后activeTag.value会为undefined */
  const activeName = activeTag.value?.name;
  routeTagsStore.clearCurrentTag(tag);
  /** 如果关闭的是当前激活页，则跳转到最后一个标签的页面 */
  if (activeName === tag.name) {
    toLastTag();
  }
};
/** 关闭其他标签 */
const closeOtherTag = (tag: Tag) => {
  routeTagsStore.clearOtherTags(tag);
  toLastTag();
};

const closeAllTag = () => {
  routeTagsStore.clearAll();
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
const showMenu = (e: MouseEvent, tag: Tag) => {
  e.preventDefault();
  clickedTag.value = tag;
  console.log(e);
  contextMenu.value?.setCoordinate(e.pageX, e.pageY - TAGS_LIST_HEIGHT.value);
};

onMounted(() => {});
</script>

<style scoped lang="less">
.tags {
  background: #f0f2f5;
  padding: 0 20px;
  height: var(--height);
  display: flex;
  align-items: center;
  position: relative;
  overflow-x: auto;
  .tag {
    cursor: pointer;
    height: 40px;
    line-height: 40px;
    padding: 0 8px;
    border-radius: 4px;
    background: #fff;
    .tag-title {
      margin: 0 6px 0 8px;
    }
  }
  .actived {
    color: #1890ff;
  }
}
</style>
