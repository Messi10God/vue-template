import { defineStore } from 'pinia';
import type { RouteRecordName, RouteLocationNormalized } from 'vue-router';

interface RouterTags {
  path: string;
  name: RouteRecordName;
  meta: any;
}

export type Tag = RouterTags | RouteLocationNormalized;
const defaultTags: Tag[] = [
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: '首页',
    },
  },
];
export const routeTagsStore = defineStore('routeTags', {
  state: () => ({
    tags: [...defaultTags],
  }),
  actions: {
    addTag(tag: Tag) {
      /** 找到位置 */
      const index = this.tags.findIndex((t) => t.name === tag.name);
      /** 如果不存在，则添加 */
      if (index === -1) {
        this.tags.push(tag);
      }
    },
    clearOtherTags(tag: Tag) {
      this.tags = [...defaultTags, tag];
    },
    clearCurrentTag(tag: Tag) {
      /** 找到位置 */
      const index = this.tags.findIndex((t) => t.name === tag.name);
      this.tags.splice(index, 1);
    },
    clearAll() {
      this.tags = defaultTags;
    },
  },
});
