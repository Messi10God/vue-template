import { createApp } from 'vue';
import type { DirectiveBinding } from 'vue';
import Loading from '@/components/loading/index.vue';

type CompElement = HTMLElement & { instance: any };
const parent = document.createElement('div');
/** 保存元素的定位方式，因需要设置相对定位，用于还原元素原始定位方式 */
let elOriginStyle: string;
export default {
  mounted(el: CompElement, binding: DirectiveBinding) {
    /** 获取loading组件 */
    elOriginStyle = getComputedStyle(el).position;
    const loadingComp = createApp(Loading).mount(parent).$el;
    el.instance = loadingComp;
    if (binding.value) {
      append(el);
    }
  },
  updated(el: CompElement, binding: DirectiveBinding) {
    if (binding.oldValue && binding.value !== binding.oldValue) {
      if (binding.value) {
        append(el);
      } else {
        remove(el);
      }
    } else if (!binding.oldValue) {
      append(el);
    }
  },
};

function append(el: CompElement) {
  el.style.position = 'relative';
  el.appendChild(el.instance);
}

function remove(el: CompElement) {
  el.style.position = elOriginStyle;
  el.removeChild(el.instance);
}
