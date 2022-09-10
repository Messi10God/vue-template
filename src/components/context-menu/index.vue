<template>
  <div ref="context" class="context" v-if="visible">
    <div
      class="context-item"
      v-for="item in data"
      :key="item.title"
      @click="handleClick(item)"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, defineExpose, nextTick } from 'vue';
import type { PropType } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '@/store/themeConfig';

interface Data {
  title: string;
  event: () => void;
}

const { themeConfig } = storeToRefs(useThemeConfig());

defineProps({
  data: {
    type: Array as PropType<Data[]>,
    default: () => [],
    required: true,
  },
});

const handleClick = (item: Data) => {
  visible.value = false;
  item.event();
};

const visible = ref<boolean>(false);
const context = ref(null);

/** 如果点击到外面，关闭弹窗 */
onClickOutside(context, () => {
  visible.value = false;
});

/** 设置弹窗显示位置 */
const setCoordinate = (x: number, y: number) => {
  visible.value = true;
  nextTick(() => {
    const dom = context.value as any as HTMLElement;
    dom.style.transform = `translate(${x - themeConfig.value.sideBarWidth}px,${
      y - themeConfig.value.headerHeight
    }px)`;
  });
};

defineExpose({
  setCoordinate,
});
</script>

<style scoped lang="less">
.context {
  background: #fff;
  box-shadow: 0 15px 35px rgba(50, 50, 90, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
  position: absolute;
  z-index: 999;
  &-item {
    padding: 10px 20px;
    cursor: pointer;
    border-bottom: 1px solid #ddd;
    transition: all 0.2s;
    text-align: center;
    font-size: 12px;
    &:last-child {
      border-bottom: none;
    }
    &:hover {
      background: rgb(53, 119, 242);
      color: #fff;
    }
  }
}
</style>
