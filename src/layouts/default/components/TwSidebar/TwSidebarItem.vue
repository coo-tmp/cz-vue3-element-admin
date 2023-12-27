<template>
  <template v-if="!hasChild(item)">
    <TwLink v-if="item.visiable ?? true" :to="item.path ?? '#'" :is-tab="item.isTab ?? true" :tab-title="item.title" :disabled="item.disabled ?? false">
      <ElMenuItem :index="item.path" :disabled="item.disabled ?? false">
        <SvgIcon v-if="item.icon" :name="item.icon" :color="scss.sidebarTextcolor" />
        <template #title>
          {{ item.title }}
        </template>
      </ElMenuItem>
    </TwLink>
  </template>

  <ElSubMenu v-else :index="item.id" teleported :disabled="item.disabled ?? false">
    <template #title>
      <SvgIcon v-if="item.icon" :name="item.icon" :color="scss.sidebarTextcolor" />
      <span v-if="item.title">{{ item.title }}</span>
    </template>

    <TwSidebarItem v-for="child in item.children" :key="child.id" :item="child" />
  </ElSubMenu>
</template>

<script setup lang="ts">
import scss from '@/layouts/scss/variables.module.scss';
import TwLink from '@/layouts/default/components/TwLink/index.vue';
import SvgIcon from '@/components/SvgIcon/index.vue';
import type { PropType } from 'vue';
import type { IMenuItem } from './types';

defineProps({
  item: {
    type: Object as PropType<IMenuItem>,
    required: true,
  },
});

/**
 * 判断当前菜单是否包含可显示的子菜单
 *
 * @param item 当前菜单
 */
function hasChild(item: IMenuItem) {
  const effectives = item.children?.filter((item: any) => {
    return item.visiable ?? true;
  });

  if (null == effectives || effectives.length === 0) {
    return false;
  }

  return true;
}
</script>

<style lang="scss" scoped>
.svg-icon {
  margin-right: 8px;
}
</style>
