<template>
  <ElScrollbar>
    <ElMenu :default-active="currRoute.path" :unique-opened="false" :collapse="!appStore.sidebar.opened" mode="vertical">
      <TwSidebarItem v-for="item in items" :key="item.id" :item="item" />
    </ElMenu>
  </ElScrollbar>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import TwSidebarItem from './TwSidebarItem.vue';
import appStore from '@/stores/modules/appStore';
import type { PropType } from 'vue';
import type { IMenuItem } from './types';

defineProps({
  items: {
    type: Object as PropType<IMenuItem[]>,
    required: true,
  },
});

const currRoute = useRoute();
</script>
