<template>
  <template v-if="disabled">
    <div>
      <slot />
    </div>
  </template>
  <template v-else>
    <a v-if="!isTab && DomUtil.isExternal(to)" :href="to" target="_blank">
      <slot />
    </a>
    <div v-else @click="push">
      <slot />
    </div>
  </template>
</template>

<script lang="ts" setup>
import DomUtil from '@/utils/basic/DomUtil';
import tabViewStore from '@/stores/modules/tabViewStore';
import type { ITabView } from '@/layouts/default/components/TwTabView/types';
import appStore from '@/stores/modules/appStore';
import { ScreenWidthType } from '@/types';
import RouterService from '@/router/RouterService';

const props = defineProps({
  to: {
    type: String,
    required: true,
  },

  isTab: {
    type: Boolean,
    required: false,
    default: true,
  },

  tabTitle: {
    type: String,
    required: false,
  },

  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});

function push() {
  if (props.isTab) {
    const tab: ITabView = {
      title: props.tabTitle ?? props.to,
      path: props.to,
      closable: true,
    };
    tabViewStore.addTab(tab);
  } else {
    RouterService.router.push(props.to);
  }

  if (appStore.screen.widthType === ScreenWidthType.Small) {
    appStore.closeSidebar();
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>
