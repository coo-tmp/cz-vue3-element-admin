<template>
  <ElBreadcrumb>
    <TransitionGroup name="breadcrumb">
      <ElBreadcrumbItem v-for="item in breadcrumbs" :key="item.id">
        <template v-if="!isInMenus(item)">
          {{ item.title }}
        </template>

        <TwLink v-else :to="item.path as string">sdsds</TwLink>
      </ElBreadcrumbItem>
    </TransitionGroup>
  </ElBreadcrumb>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import RouterService from '@/router/RouterService';
import type { IMenuItem } from '../TwSidebar/types';
import menuStore from '@/stores/modules/menuStore';
import TwLink from '@/components/TwLink/index.vue';

const breadcrumbs = ref<IMenuItem[]>([]);
watch(
  () => RouterService.router.currentRoute.value.path,
  (path) => {
    breadcrumbs.value = getBreadcrumbs(path, menuStore.menus);
  },
);

function getMatchedMenuPath(val: string, item: IMenuItem, matchedTree: IMenuItem[]): IMenuItem[] | null {
  if (item.path && item.path === val) {
    return matchedTree.concat(item);
  }

  if (item.children) {
    for (const it of item.children) {
      const matched = getMatchedMenuPath(val, it, matchedTree.concat(item));
      if (matched) {
        return matched;
      }
    }
  }

  return null;
}

function getMenuBreadcrumbs(val: string, items: IMenuItem[]): IMenuItem[] | null {
  for (const item of items) {
    const matched: IMenuItem[] | null = getMatchedMenuPath(val, item, []);
    if (matched) {
      return matched;
    }
  }
  return null;
}

/**
 * menu配置path可能是route redirect前的path，所以需要获取真实的menu path
 * @param menus
 */
function getTruthMenuRouteBreadcrumbs(menus: IMenuItem[]): IMenuItem[] | null {
  for (const menu of menus) {
    for (const item of RouterService.router.currentRoute.value.matched) {
      if (menu.path && menu.path === item.path) {
        const matched: IMenuItem[] | null = getMenuBreadcrumbs(menu.path, menus);
        if (matched) {
          return matched;
        }
      }
    }
  }

  return null;
}

function getBreadcrumbs(val: string, menus: IMenuItem[]): IMenuItem[] {
  const matched: IMenuItem[] | null = getMenuBreadcrumbs(val, menus);
  if (matched) {
    return matched;
  }

  const matchedRoutes = RouterService.router.currentRoute.value.matched.filter((item) => {
    return item.path === val;
  });

  if (matchedRoutes.length === 0) {
    return [];
  }

  const truthMenuRoute: IMenuItem[] | null = getTruthMenuRouteBreadcrumbs(menus);
  if (truthMenuRoute) {
    return truthMenuRoute;
  }

  // 非menu redirect的路由，即非Menu Route
  const items: IMenuItem[] = [];
  RouterService.router.currentRoute.value.matched.forEach((item) => {
    if (item.meta && item.meta.title) {
      items.push({
        id: item.path,
        title: item.meta.title as string,
        path: item.path,
      });
    }
  });
  return items;
}

function isInMenus(val: IMenuItem) {
  return menuStore.menus.some((item) => {
    return item.path && val.path && item.path === val.path;
  });
}
</script>

<style lang="scss">
.el-breadcrumb {
  .el-breadcrumb__inner,
  .el-breadcrumb__separator {
    color: var(--el-text-color-placeholder) !important;
  }
}
</style>
