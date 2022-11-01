import type { DirectiveBinding } from 'vue';
import { message } from 'ant-design-vue';
import useClipboard from 'vue-clipboard3';

let doCopy;

const { toClipboard } = useClipboard();

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    doCopy = async () => {
      try {
        await toClipboard(binding.value);
        message.success('复制成功');
      } catch (e) {
        message.error('复制失败');
      }
    };
    el.addEventListener('click', doCopy);
  },
  unmounted(el: HTMLElement) {
    el.removeEventListener('click', doCopy);
  },
};
