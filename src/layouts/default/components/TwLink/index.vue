<template>
  <a v-if="!isTab && DomUtil.isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <div v-else @click="push">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import DomUtil from '@/utils/basic/DomUtil';
import tabViewStore from '@/stores/modules/tabViewStore';
import type { ITabView } from '@/layouts/default/components/TwTabView/types';

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
});

function push() {
  const tab: ITabView = {
    title: props.tabTitle ?? props.to,
    path: props.to,
    closable: true,
  };
  tabViewStore.addTab(tab);
}
</script>
