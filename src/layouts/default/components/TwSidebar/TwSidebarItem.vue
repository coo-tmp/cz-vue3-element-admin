<template>
  <template v-if="!hasChild(item)">
    <TwLink v-if="item.visiable === undefined ? true : item.visiable" :to="item.path ?? '#'">
      <ElMenuItem :index="item.id">
        <SvgIcon v-if="item.icon" :name="item.icon" />
        <template #title>
          {{ item.name }}
        </template>
      </ElMenuItem>
    </TwLink>
  </template>

  <ElSubMenu v-else :index="item.id" teleported>
    <template #title>
      <SvgIcon v-if="item.icon" :name="item.icon" />
      <span v-if="item.name">{{ item.name }}</span>
    </template>

    <TwSidebarItem v-for="child in item.children" :key="child.id" :item="child" />
  </ElSubMenu>
</template>

<script setup lang="ts">
import TwLink from './TwLink.vue';
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
    if (undefined === item.visiable) {
      return true;
    }
    return item.visiable;
  });

  if (null == effectives || effectives.length === 0) {
    return false;
  }

  return true;
}
</script>
