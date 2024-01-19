<template>
  <div :class="$style.root">
    <div :class="$style['tabview-wrapper']">
      <div :class="$style['tabview-title']">
        <TwTabView :class="$style['tabview-content']" />
      </div>
      <div :class="$style['tabview-action']">
        <div v-if="appStore.screen.widthType !== ScreenWidthType.Small" @click="appStore.toggleFullContent">
          <TwSvgIcon v-if="isFullContent" name="layouts-fullcontent_enable" />
          <TwSvgIcon v-if="!isFullContent" name="layouts-fullcontent_disable" />
        </div>
      </div>
    </div>
    <div :class="$style['view-container']">
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
import TwTabView from '@/layouts/default/components/TwTabView/index.vue';
const isFullContent = computed(() => appStore.isFullContent);
</script>

<style lang="scss" scoped>
:deep(.el-scrollbar__view) {
  margin: 10px;
  padding: 6px;
  background-color: $content__backgrount_color;
}
</style>

<style lang="scss" module>
.root {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .tabview-wrapper {
    flex: 0 0 auto;
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: space-between;

    .tabview-title {
      flex: 1 1 auto;
      overflow: hidden;
    }

    .tabview-action {
      flex: 0 0 fit-content;
      height: 100%;
      cursor: pointer;
      display: flex;
      align-items: center;

      div {
        padding: 0px 10px;
        border-left: 1px solid #eeeeee;

        &:hover {
          background-color: $hover-background-color;
        }
      }
    }
  }

  .view-container {
    flex: 1 1 auto;
    background-color: $layout__maincontent__backgrount_color;
    overflow: hidden;
  }
}
</style>
