import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/components/layout/index.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    name: "Login",
    path: "/login",
    meta: {
      title: "登录页",
    },
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/home",
    name: "Layout",
    component: Layout,
    children: [
      {
        path: "/home",
        name: "Home",
        meta: {
          title: "主页",
        },
        component: () => import("@/views/home/index.vue"),
      },
      {
        path: "/table",
        name: "Table",
        meta: {
          title: "表格",
        },
        component: () => import("@/views/table/index.vue"),
      },
      {
        path: "",
        name: "Echarts",
        meta: {
          title: "Echarts图",
        },
        component: () => import("@/views/table/index.vue"),
        children: [
          {
            path: "/line",
            name: "Line",
            meta: {
              title: "折线图",
            },
            component: () => import("@/views/charts/line/index.vue"),
          },
          {
            path: "/pie",
            name: "Pie",
            meta: {
              title: "饼状图",
            },
            component: () => import("@/views/charts/pie/index.vue"),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
