<template>
  <div
    ref="box"
    class="container"
    :style="{ height: containerHeight + 'px' }"
    @scroll="onScroll"
  >
    <div :style="{ height: paddingHeight.top + 'px' }"></div>
    <div
      class="item"
      :style="{ height: itemHeight + 'px' }"
      v-for="item in showList"
      :key="item"
    >
      <slot :item="item"></slot>
    </div>
    <div :style="{ height: paddingHeight.bottom + 'px' }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits, PropType, watch } from 'vue';

const props = defineProps({
  list: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  itemHeight: {
    type: Number,
    default: 100,
  },
  containerHeight: {
    type: Number,
    default: 575,
  },
});

const emit = defineEmits(['toBottom']);
const box = ref();

const list = ref<string[]>(props.list);

/** 新的数据变化后重新计算 */
watch(
  () => props.list,
  () => {
    scrollHandle();
  }
);
/** 滚动的距离 */
const scrollTop = ref<number>(0);
/** 元素的高度 */
const itemHeight = ref<number>(props.itemHeight);
/** 可视区域的高度 */
const containerHeight = ref<number>(props.containerHeight);
/** 可展示的元素数量 */
const showNum = ref<number>(
  Math.ceil(containerHeight.value / itemHeight.value)
);
/** 可视区域中列表的起始和结束位置 */
let startIndex = ref<number>(Math.floor(scrollTop.value / itemHeight.value));
let endIndex = ref<number>(startIndex.value + showNum.value);

/** 用于填充高度，显示合适的滚动条
 *  paddingTop: 前面有多少个元素，起始索引就是可视区第一个元素的索引，索引为多少就代表前面有多少个元素
 *  paddingBottom: endIndex是我们渲染出来的最后一个元素，可能不在可视区内；用list最后一个元素的索引与endIndex相减就可以得到还没有渲染元素的数目
 */
const paddingHeight = computed(() => {
  return {
    top: startIndex.value * itemHeight.value,
    bottom: itemHeight.value * (list.value.length - endIndex.value),
  };
});

/* 用于展示的列表 */
const showList = computed(() => {
  return list.value.slice(startIndex.value, endIndex.value);
});

const scrollHandle = () => {
  scrollTop.value = box.value.scrollTop;
  startIndex.value = Math.floor(scrollTop.value / itemHeight.value);
  endIndex.value = startIndex.value + showNum.value;

  // 提前一个屏幕的距离判断是否滚动到底部
  if (list.value.length - showNum.value * 2 < startIndex.value) {
    console.log(222);
    emit('toBottom');
  }
};

const onScroll = () => {
  scrollHandle();
};
</script>

<style scoped lang="less">
.container {
  border: 1px solid red;
  overflow-y: auto;
  .item {
    border-bottom: 1px solid black;
  }
}
</style>
