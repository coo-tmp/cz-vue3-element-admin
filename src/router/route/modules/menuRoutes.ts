/**路由结构与menu结构无关 */
import type { RouteRecordRaw } from 'vue-router';
import { router } from '../../RouterService';
import { DEFAULT_LAYOUT } from '../../variables';

// 示例：Route与Menu层级结构完全不同
const routeLinkWithDiffStructRoutes: RouteRecordRaw[] = [
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

// 示例：Route与Menu层级结构相同
const externalLinkWithdSameStructRoutesRoutes: RouteRecordRaw[] = [
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

const defaultRoutes: RouteRecordRaw[] = [
  {
    name: '测试',
    path: '/xxx/testing/redirect',
    component: DEFAULT_LAYOUT,
    meta: {
      id: '2',
    },
    redirect: '/testing',
    children: [
      {
        name: 'test_home',
        path: '/testing',
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
    path: '/xxx/advancedemo/CustomBreadcrumb/redirect',
    component: DEFAULT_LAYOUT,
    redirect: '/advancedemo/breadcrumb',
    meta: {
      title: '自定义Breadcrumb',
    },
    children: [
      {
        path: '/advancedemo/breadcrumb',
        component: () => import('@/views/advancedemo/breadcrumb/index.vue'),
      },
    ],
  },
];

const menuRoutes = [...routeLinkWithDiffStructRoutes, ...externalLinkWithdSameStructRoutesRoutes, ...defaultRoutes];
export default menuRoutes;
