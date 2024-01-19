<template>
  <div :class="$style.root">
    <TwLogo :class="$style.logo" :collapse="!appStore.sidebar.opened" />
    <ElScrollbar>
      <ElMenu
        :default-active="getCurrPath"
        :unique-opened="true"
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
import TwSidebarItem from './TwSidebarItem.vue';
import type { IMenuItem } from './types';
import TwLogo from './TwLogo.vue';

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

<style lang="scss" module>
.root {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;

  .tw-logo {
    flex: 0 0 auto;
  }

  :global(.el-scrollbar) {
    flex: 1 1 auto;
    :global(.el-scrollbar__view) {
      min-width: $layout__sidebar_width__opened;
      width: fit-content;
    }

    :global(.el-menu) {
      border: 0 !important;
    }
  }
}
</style>
