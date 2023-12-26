<template>
  <div class="root-layout-app-main">
    <div class="tabview-wrapper">
      <div class="tabview-title">
        <TwTabView class="tabview-content" />
      </div>
      <div class="tabview-action">
        <SvgIcon v-if="appStore.screen.widthType !== ScreenWidthType.Small && isFullContent" name="layouts-fullcontent_enable" @click="appStore.toggleFullContent" />
        <SvgIcon v-if="appStore.screen.widthType !== ScreenWidthType.Small && !isFullContent" name="layouts-fullcontent_disable" @click="appStore.toggleFullContent" />
      </div>
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
import { computed } from 'vue';
import SvgIcon from '@/components/SvgIcon/index.vue';

const isFullContent = computed(() => appStore.isFullContent);
</script>

<style lang="scss" scoped>
.root-layout-app-main {
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

    .tabview-title {
      flex: 1 1 auto;
    }

    .tabview-action {
      padding: 0px 10px;
      height: 100%;
      cursor: pointer;
      display: flex;
      align-items: center;
      border-left: 1px solid #eeeeee;
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
