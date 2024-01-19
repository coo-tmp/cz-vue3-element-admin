import type { RouteRecordRaw } from 'vue-router';
import { DEFAULT_LAYOUT } from '../../variables';

const routes: RouteRecordRaw[] = [
  {
    path: '/customcomponent/dock/page/redirect',
    component: DEFAULT_LAYOUT,
    redirect: '/customcomponent/dock/page',
    children: [
      {
        path: '/customcomponent/dock/page',
        component: () => import('@/views/customcomponent/dock/page.vue'),
      },
    ],
  },
];
export default routes;
