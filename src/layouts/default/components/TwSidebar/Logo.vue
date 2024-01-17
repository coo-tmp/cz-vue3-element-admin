<template>
  <div :class="$style.root">
    <SvgIcon name="logo" size="32px" />
    <span v-if="!collapse">CZ Admin</span>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue';

defineProps({
  collapse: {
    type: Boolean,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
span {
  font-size: 1.2em;
  margin-left: 4px;
  font-weight: bold;
  color: $layout__sidebar__active_color;
}
</style>

<style lang="scss" module>
.root {
  display: flex;
  align-items: center;
  justify-content: center;
  height: $layout__header_height;
}
</style>
