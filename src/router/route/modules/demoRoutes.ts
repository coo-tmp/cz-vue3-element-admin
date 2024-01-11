import type { RouteRecordRaw } from 'vue-router';
import { DEFAULT_LAYOUT } from '../../variables';

const routes: RouteRecordRaw[] = [
  {
    path: '/demo/desensitive/text/redirect',
    component: DEFAULT_LAYOUT,
    redirect: '/demo/desensitive/text',
    children: [
      {
        path: '/demo/desensitive/text',
        component: () => import('@/views/demo/desensitive/text.vue'),
      },
    ],
  },
];
export default routes;
