// All Replace

import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs';

const DEFAULT_LAYOUT = () => import('@/layouts/default/index.vue');

const constantRoutes: RouteRecordRaw[] = [
  // 将路由配置添加到此处
  {
    path: '/',
    name: 'root',
    redirect: '/dashboard',
  },
  {
    path: '/xxx/advancedemo/nonmenuroutedetail',
    component: DEFAULT_LAYOUT,
    redirect: '/xxx/advancedemo/nonmenuroutedetail/level1',
    meta: {
      title: '非Menu Route',
    },
    children: [
      {
        path: '/xxx/advancedemo/nonmenuroutedetail/level1',
        redirect: '/xxx/advancedemo/nonmenuroutedetail/level1/level11',
        meta: {
          title: '二级菜单',
        },
        children: [
          {
            path: '/xxx/advancedemo/nonmenuroutedetail/level1/level11',
            meta: {
              breadcrumb: false, // 默认为true。设置为false，表示不在Breadcrumb路径上显示
            },
            children: [
              {
                path: '/advancedemo/nonmenuroutedetail',
                component: () => import('@/views/testing/nonmenuroutedetail.vue'),
                meta: {
                  title: '非Menu Route示例', // 需要在末端节点设置title，否则会给用户造成困惑
                },
              },
            ],
          },
        ],
      },
    ],
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
    path: '/xxx/advancedemo/tabviewroute/redirect',
    component: DEFAULT_LAYOUT,
    redirect: '/advancedemo/tabviewroute',
    meta: {
      title: ' 标签页内Route',
    },
    children: [
      {
        path: '/advancedemo/tabviewroute',
        component: () => import('@/views/testing/test.vue'),
        props: {
          message: '标签页内Route',
        },
      },
      {
        path: '/demo/routelink/openInBrowserNewTab2',
        component: () => import('@/views/testing/test.vue'),
        props: {
          message: '内链(Route): 【浏览器】新标签页打开',
        },
        beforeEnter(to, from, next) {
          window.open(router.resolve(to).href, '_blank');
        },
        meta: {
          id: '16598651166273543',
          title: '内链(Route): 【浏览器】新标签页打开',
        },
      },
    ],
  },
  {
    path: '/xxx/advancedemo/nonmenuroute/redirect',
    component: DEFAULT_LAYOUT,
    redirect: '/advancedemo/nonmenuroute',
    meta: {
      title: '非Menu Route',
    },
    children: [
      {
        path: '/advancedemo/nonmenuroute',
        component: () => import('@/views/testing/nonmenuroute.vue'),
      },
    ],
  },
  {
    path: '/xxx/advancedemo/subrouteinmenu/redirect',
    component: DEFAULT_LAYOUT,
    redirect: '/advancedemo/subrouteinmenu',
    children: [
      {
        path: '/advancedemo/subrouteinmenu',
        component: () => import('@/views/testing/SubRouteInMenu.vue'),
      },
    ],
  },
];

// 【路由结构与menu结构无关】示例
const menuRouteLinkRoutes: RouteRecordRaw[] = [
  {
    path: '/demo/routelink/openInBrowserNewTab',
    component: () => import('@/views/testing/test.vue'),
    props: {
      message: '内链(Route): 【浏览器】新标签页打开',
    },
    meta: {
      id: '16598651166273543',
      title: '内链(Route): 【浏览器】新标签页打开',
    },
  },
  {
    path: '/demo/routelink/openInBrowserCurrentTab',
    component: () => import('@/views/testing/test.vue'),
    props: {
      message: '内链(Route): 【浏览器】当前标签页打开',
    },
    meta: {
      id: '16598651166273544',
      title: '内链(Route): 【浏览器】当前标签页打开',
    },
  },
  {
    path: '/demo/routelink/openInSystemNewTab/redirect',
    component: DEFAULT_LAYOUT,
    redirect: '/demo/routelink/openInSystemNewTab',
    props: {
      message: '内链(Route): 【系统】新标签页打开',
    },
    children: [
      {
        path: '/demo/routelink/openInSystemNewTab',
        component: () => import('@/views/testing/test.vue'),
        props: {
          message: '内链(Route): 【系统】新标签页打开',
        },
      },
    ],
    meta: {
      id: '16598651166273546',
      title: '内链(Route): 【系统】新标签页打开',
    },
  },
  {
    path: '/demo/routelink/openInSystemCurrentTab/redirect',
    component: DEFAULT_LAYOUT,
    redirect: '/demo/routelink/openInSystemCurrentTab',
    children: [
      {
        path: '/demo/routelink/openInSystemCurrentTab',
        component: () => import('@/views/testing/test.vue'),
        props: {
          message: '内链(Route): 【系统】当前标签页打开',
        },
      },
    ],
    meta: {
      id: '16598651166273547',
      title: '内链(Route): 【系统】当前标签页打开',
    },
  },
];

// 【路由结构与menu结构无关】，也可与menu相同（不受menu结构影响）
const menuExternallinkRoutes: RouteRecordRaw[] = [
  {
    path: '/xxx/demo',
    meta: {
      title: '示例',
    },
    children: [
      {
        path: '/xxx/demo/externallink',
        meta: {
          title: '外链：内链(Route)实现',
        },
        children: [
          {
            path: '/xxx/demo/externallink',
            meta: {
              title: '外链：内链(Route)实现: 【浏览器】浏览器标签页',
            },
            children: [
              {
                path: '/demo/externallink/openInBrowserNewTab',
                beforeEnter(to, from, next) {
                  window.open('https://www.bing.com', '_blank');
                },
                component: () => {},
                meta: {
                  title: '外链：内链(Route)实现: 【浏览器】新标签页打开',
                },
              },
              {
                path: '/demo/externallink/openInBrowserCurrentTab1',
                beforeEnter(to, from, next) {
                  window.open('https://www.bing.com', '_self');
                },
                component: () => {},
                meta: {
                  title: '外链：内链(Route)实现: 【浏览器】当前标签页打开1',
                },
              },
              {
                path: '/demo/externallink/openInBrowserCurrentTab2',
                beforeEnter(to, from, next) {
                  window.location.href = 'https://www.bing.com';
                },
                component: () => {},
                meta: {
                  title: '外链：内链(Route)实现: 【浏览器】当前标签页打开2',
                },
              },
              {
                path: '/demo/externallink/openInBrowserCurrentTab3',
                beforeEnter(to, from, next) {
                  window.location.replace('https://www.bing.com');
                },
                component: () => {},
                meta: {
                  title: '外链：内链(Route)实现: 【浏览器】当前标签页打开3',
                },
              },
            ],
          },
        ],
      },
    ],
  },
];

const allRoutes = [...constantRoutes, ...menuRoutes, ...menuRouteLinkRoutes, ...menuExternallinkRoutes];

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
