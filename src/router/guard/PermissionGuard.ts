import type { Router } from 'vue-router';
import { userStoreHook } from '@/stores/modules/userStore';
import { RoutePathEnum } from '../RoutePathEnum';
import RouterService from '../RouterService';

function setup(router: Router) {
  router.beforeEach(async (to, from, next) => {
    console.log('to path', to.path);
    // 目标地址为白名单地址
    if (RouterService.isWhiteList(to.path)) {
      next();
      return;
    }

    // 未登录，跳转到登录页面
    if (!userStoreHook.isLogin()) {
      next({ path: RoutePathEnum.LOGIN });
      return;
    }

    // 已登录
    if (to.path === RoutePathEnum.LOGIN) {
      next({ path: RoutePathEnum.HOME });
      return;
    }

    next(); // 跳转到目标地址
  });
}

const PermissionGuard = {
  setup,
};

export default PermissionGuard;
