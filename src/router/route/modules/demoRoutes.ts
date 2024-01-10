import type { RouteRecordRaw } from 'vue-router';
import { DEFAULT_LAYOUT } from '../../variables';

const routes: RouteRecordRaw[] = [
  {
    path: '/demo/desensitive/label/redirect',
    component: DEFAULT_LAYOUT,
    redirect: '/demo/desensitive/label',
    children: [
      {
        path: '/demo/desensitive/label',
        component: () => import('@/views/demo/desensitive/label.vue'),
      },
    ],
  },
];
export default routes;
