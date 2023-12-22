<template>
  <div class="root">
    <div class="tabview-wrapper">
      <TwTabView class="tabview-content" />
      <div class="tabview-operation"><button v-if="appStore.screen.widthType !== ScreenWidthType.Small" @click="toggleFullContent">全屏</button></div>
    </div>
    <div class="view-container">
      <ElScrollbar>
        <router-view v-slot="{ Component, route }">
          <keep-alive :include="tabViewStore.allTabs.map((i) => i.path)">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
        </router-view>
      </ElScrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import tabViewStore from '@/stores/modules/tabViewStore';
import TwTabView from '@/layouts/default/components/TwTabView/index.vue';
import appStore from '@/stores/modules/appStore';
import { ScreenWidthType } from '@/types';

function toggleFullContent() {
  var sidebar = document.getElementById('sidebar-wrapper');
  var header = document.getElementById('header-wrapper');
  var content = document.getElementById('content-wrapper');
  sidebar?.classList.toggle('full-content-sidebar-wrapper');
  header?.classList.toggle('full-content-header-wrapper');
  content?.classList.toggle('full-content-content-wrapper');
}
</script>

<style lang="scss" scoped>
.root {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .tabview-wrapper {
    flex: 0 0 $layout__tabview_height;
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: space-between;

    > .tabview-content {
      width: 800px;
    }
  }

  .view-container {
    flex: 1 1 auto;
    height: calc(100% - $layout__tabview_height);
    background-color: lightpink;
    overflow: auto;
  }
}
</style>
