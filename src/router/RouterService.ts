// All Replace

import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

const DEFAULT_LAYOUT = () => import('@/layouts/default/index.vue');

const constantRoutes: RouteRecordRaw[] = [
  // 将路由配置添加到此处
  {
    path: '/',
    name: 'root',
    redirect: '/dashboard',
  },
];

const menuRoutes: RouteRecordRaw[] = [
  {
    name: '首页',
    path: '/dashboard',
    component: DEFAULT_LAYOUT,
    meta: {
      id: '1',
    },
    redirect: '/dashboard/home',
    children: [
      {
        name: 'dashboard_home',
        path: '/dashboard/home',
        component: () => import('@/views/dashboard/index.vue'),
      },
    ],
  },
  {
    name: '测试',
    path: '/testing',
    component: DEFAULT_LAYOUT,
    meta: {
      id: '2',
    },
    redirect: '/testing/home',
    children: [
      {
        name: 'test_home',
        path: '/testing/home',
        component: () => import('@/views/testing/index.vue'),
      },
    ],
  },
  {
    name: '外链',
    path: '/xxx-1',
    meta: {
      id: '3',
    },
    children: [
      {
        name: '浏览器标签页',
        path: '/xxx-2',
        meta: {
          id: '3-1',
        },
        children: [
          {
            name: '新标签页打开1',
            path: '/externallink/browser/openInBlank',
            beforeEnter(to, from, next) {
              window.open('https://www.bing.com', '_blank');
            },
            component: () => {},
            meta: {
              id: '3-1-1',
            },
          },
          {
            name: '当前标签页打开1',
            path: '/externallink/browser/openInCurrentTab',
            beforeEnter(to, from, next) {
              window.location.href = 'https://www.bing.com';
            },
            component: () => {},
            meta: {
              id: '3-1-3',
            },
          },
          {
            name: '当前标签页打开2',
            path: '/externallink/browser/openInCurrentTab2',
            beforeEnter(to, from, next) {
              window.location.replace('https://www.bing.com');
            },
            component: () => {},
            meta: {
              id: '3-1-4',
            },
          },
        ],
      },
    ],
  },
  {
    name: '多级菜单',
    path: '/xxx-4',
    component: DEFAULT_LAYOUT,
    meta: {
      id: '4',
    },
    children: [
      {
        name: '一级菜单1',
        path: '/multmenu/level41',
        component: () => import('@/views/testing/test.vue'),
        props: {
          message: '一级菜单1',
        },
        meta: {
          id: '4-1',
        },
      },
      {
        name: '一级菜单2',
        path: '/xxx-5',
        meta: {
          id: '4-2',
        },
        children: [
          {
            name: '二级菜单1',
            path: '/multmenu/level42/level421',
            component: () => import('@/views/testing/test.vue'),
            props: {
              message: '二级菜单1',
            },
            meta: {
              id: '4-2-1',
            },
          },
          {
            name: '二级菜单2',
            path: '/xxx-6',
            meta: {
              id: '4-2-2',
            },
            children: [
              {
                name: '三级菜单1',
                path: '/multmenu/level42/level422/level4221',
                component: () => import('@/views/testing/test.vue'),
                props: {
                  message: '三级菜单1',
                },
                meta: {
                  id: '4-2-2-1',
                },
              },
              {
                name: '三级菜单2',
                path: '/multmenu/level42/level422/level4222',
                component: () => import('@/views/testing/test.vue'),
                props: {
                  message: '三级菜单2',
                },
                meta: {
                  id: '4-2-2-2',
                },
              },
            ],
          },
        ],
      },
    ],
  },
];

const allRoutes = [...constantRoutes, ...menuRoutes];

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

export default RouterService;
