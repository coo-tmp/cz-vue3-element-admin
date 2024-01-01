// All Replace

import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import menuRoutes from "./modules/menuRoutes";
import breadcrumbRoutes from "./modules/breadcrumbRoutes"
import { DEFAULT_LAYOUT } from './variables';


const constantRoutes: RouteRecordRaw[] = [
  // 将路由配置添加到此处
  {
    path: '/',
    component: DEFAULT_LAYOUT,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/dashboard/index.vue'),
      },
    ],
  },
];

const allRoutes = [...constantRoutes, ...menuRoutes, ...breadcrumbRoutes];

const router = createRouter({
  routes: allRoutes as RouteRecordRaw[],
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ left: 0, top: 0 }), // 刷新时，还原滚动条位置
});

function setup(app: App<Element>) {
  app.use(router);
}

const RouterService = {
  router,
  setup,
};

export { router };
export default RouterService;
