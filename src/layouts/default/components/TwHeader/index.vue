<template>
  <div class="root">
    <div>
      <button v-if="appStore.screen.widthType !== ScreenWidthType.Small && appStore.sidebar.opened" @click="appStore.toggleSidebar">&lt;&lt;</button>
      <button v-else @click="appStore.toggleSidebar">&gt;&gt;</button>
    </div>
    <div>
      <button @click="toggle">全屏</button>
      &nbsp;&nbsp;&nbsp;&nbsp;头像
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core';
import { ScreenWidthType } from '@/types';
import appStore from '@/stores/modules/appStore';

const { toggle } = useFullscreen();
</script>

<style lang="scss" scoped>
.root {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(190, 170, 226);
}
</style>
