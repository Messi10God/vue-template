import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/components/layout/index.vue';
import { RouterView } from 'vue-router';

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
    path: '',
    name: 'Layout',
    component: Layout,
    redirect: '/home',
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
        redirect: '/table/normalTable',
        meta: {
          title: '表格',
        },
        component: RouterView,
        children: [
          {
            path: '/table/normalTable',
            name: 'Table.NormalTable',
            meta: {
              title: '普通表格',
            },
            component: () => import('@/views/table/normal-table/index.vue'),
          },
          {
            path: '/table/selectTable',
            name: 'Table.SelectTable',
            meta: {
              title: '选择表格',
            },
            component: () => import('@/views/table/select-table/index.vue'),
          },
        ],
      },
      {
        path: '/virtualList',
        name: 'VirtualList',
        meta: {
          title: '虚拟列表',
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
