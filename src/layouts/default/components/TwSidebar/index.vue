<template>
  <div class="root-layout-sidebar">
    <Logo :collapse="!appStore.sidebar.opened" />
    <ElScrollbar>
      <ElMenu
        :default-active="getCurrPath"
        :unique-opened="false"
        mode="vertical"
        :collapse="!appStore.sidebar.opened && appStore.screen.widthType !== ScreenWidthType.Small"
        :collapse-transition="false"
        :background-color="scss.sidebarBackgroundcolor"
        :text-color="scss.sidebarTextcolor"
      >
        <TwSidebarItem v-for="item in items" :key="item.id" :item="item" />
      </ElMenu>
    </ElScrollbar>
  </div>
</template>

<script setup lang="ts">
import scss from '@/layouts/scss/variables.module.scss';
import TwSidebarItem from './TwSidebarItem.vue';
import appStore from '@/stores/modules/appStore';
import RouterService from '@/router/RouterService';
import { computed, type PropType } from 'vue';
import type { IMenuItem } from './types';
import { ScreenWidthType } from '@/types';
import Logo from './Logo.vue';
import tabViewStore from '@/stores/modules/tabViewStore';

defineProps({
  items: {
    type: Object as PropType<IMenuItem[]>,
    required: true,
  },
});

const getCurrPath = computed(() => {
  let path = RouterService.router.currentRoute.value.path;
  if (tabViewStore.activeTab !== path) {
    const matched = RouterService.router.currentRoute.value.matched.filter((item) => {
      return item.path === tabViewStore.activeTab;
    });
    if (matched.length > 0) {
      path = matched[0].path;
    }
  }

  return path;
});
</script>

<style lang="scss">
.root-layout-sidebar {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;

  logo {
    flex: 0 0 auto;
  }

  .el-scrollbar {
    flex: 1 1 auto;
    .el-scrollbar__view {
      min-width: $layout__sidebar_width__opened;
      width: fit-content;
    }

    .el-menu {
      border: 0 !important;
    }
  }
}
</style>
