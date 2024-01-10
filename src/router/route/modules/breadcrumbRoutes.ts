import { IBreadcrumbMode, type IBreadcrumbRaw } from '@/types/RouterMeta/IBreadcrumb';
import type { RouteRecordRaw } from 'vue-router';
import { DEFAULT_LAYOUT } from '../../variables';

const nodes: IBreadcrumbRaw = {
  title: '节点1',
  child: {
    title: '节点1-1',
    child: {
      title: '节点1-1-1',
    },
  },
};

const routes: RouteRecordRaw[] = [
  {
    // RoutemMode
    path: '/xxx/advancedemo/breadcrumb/routeMode',
    component: DEFAULT_LAYOUT,
    redirect: '/xxx/advancedemo/breadcrumb/routeMode/1',
    meta: {
      breadcrumb: {
        title: '一级菜单',
      },
    },
    children: [
      {
        path: '/xxx/advancedemo/breadcrumb/routeMode/1',
        redirect: '/xxx/advancedemo/breadcrumb/routeMode/1/1',
        meta: {
          breadcrumb: {
            title: '二级菜单',
          },
        },
        children: [
          {
            path: '/xxx/advancedemo/breadcrumb/routeMode/1/1',
            meta: {
              // 不设置breadcrumb，表示不在Breadcrumb路径上显示
            },
            children: [
              {
                path: '/advancedemo/breadcrumb/routeMode',
                component: () => import('@/views/advancedemo/breadcrumb/RouteMode.vue'),
                meta: {
                  breadcrumb: {
                    mode: IBreadcrumbMode.RouteMode,
                    title: '自定义Breadcrumb：RouteMode',
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    // MenuItemMode
    path: '/xxx/advancedemo/breadcrumb/menuItemMode/redirect',
    component: DEFAULT_LAYOUT,
    redirect: '/advancedemo/breadcrumb/menuItemMode',
    children: [
      {
        path: '/advancedemo/breadcrumb/menuItemMode',
        component: () => import('@/views/advancedemo/breadcrumb/MenuItemMode.vue'),
        meta: {
          breadcrumb: {
            mode: IBreadcrumbMode.MenuItemMode,
            title: '自定义Breadcrumb：MenuItemMode',
            menuPath: '/advancedemo/breadcrumb',
            parents: nodes,
          },
        },
      },
    ],
  },
  {
    // FreeMode
    path: '/xxx/advancedemo/freeMode/redirect',
    component: DEFAULT_LAYOUT,
    redirect: '/advancedemo/breadcrumb/freeMode',
    children: [
      {
        path: '/advancedemo/breadcrumb/freeMode',
        component: () => import('@/views/advancedemo/breadcrumb/FreeMode.vue'),
        meta: {
          breadcrumb: {
            mode: IBreadcrumbMode.FreeMode,
            title: '自定义Breadcrumb：FreeMode',
            parents: nodes,
          },
        },
      },
    ],
  },
];

export default routes;
