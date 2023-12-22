import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
import HomeView from '../views/HomeView.vue';
import { createRouter, createWebHashHistory } from 'vue-router';

const DEFAULT_LAYOUT = () => import('@/layouts/default/index.vue');

const constantRoutes: Array<RouteRecordRaw> = [
  // 将路由配置添加到此处
  {
    path: '/',
    name: 'dashboard',
    component: DEFAULT_LAYOUT,
    redirect: '/dashboard/home',
    children: [
      {
        name: 'dashboard_home',
        path: '/dashboard/home',
        component: () => HomeView,
      },
    ],
    // component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: DEFAULT_LAYOUT,
    redirect: '/about/home',
    children: [
      {
        path: '/about/home',
        name: 'about_home',
        component: () => import('../views/AboutView.vue'),
      },
    ],
  },
  {
    path: '/testing',
    name: 'testing',
    component: DEFAULT_LAYOUT,
    redirect: '/testing/home',
    children: [
      {
        path: '/testing/home',
        name: 'testStore',
        component: () => import('../views/testing/index.vue'),
      },
    ],
  },
];

const router = createRouter({
  routes: constantRoutes as RouteRecordRaw[],
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

export default RouterService;
