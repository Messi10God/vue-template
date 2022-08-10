import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/components/layout/index.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    name: 'Login',
    path: '/login',
    meta: {
      title: '登录页',
    },
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/home',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: {
          title: '主页',
        },
        component: () => import('@/views/home/index.vue'),
      },
      {
        path: '/table',
        name: 'Table',
        meta: {
          title: '表格',
        },
        component: () => import('@/views/table/index.vue'),
      },
      {
        path: '/virtualList',
        name: 'VirtualList',
        meta: {
          title: '虚拟表格',
        },
        component: () => import('@/views/virtual-list/index.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
