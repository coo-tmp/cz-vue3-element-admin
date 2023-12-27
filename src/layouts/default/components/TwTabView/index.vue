<template>
  <div class="root-layout-tabview">
    <el-tabs v-model="tabViewStore.activeTab" type="card" class="main-tab" @tab-click="handleClick" @tab-remove="handleRemove">
      <el-tab-pane v-for="item in tabViewStore.allTabs" :key="item.path" :name="item.path" :label="item.title" :closable="item.closable"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import type { TabPaneName, TabsPaneContext } from 'element-plus';
import tabViewStore from '@/stores/modules/tabViewStore';

function handleClick(tab: TabsPaneContext) {
  tabViewStore.setActiveTab(tab.paneName as string);
}

function handleRemove(name: TabPaneName) {
  tabViewStore.removeTab(name as String);
}
</script>

<style lang="scss">
.root-layout-tabview {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 2px;
}
.main-tab {
  --el-tabs-header-height: 24px;

  > .el-tabs__header {
    margin: 0 !important;
    border: 0 none;

    .el-tabs__nav-next,
    .el-tabs__nav-prev {
      line-height: 30px;
      color: var(--el-text-color-primary);
    }
  }

  .el-tabs__item {
    border-radius: 6px 6px 0 0;

    &.is-active {
      color: #ffffff;
      background-color: var(--el-color-primary);
      border-color: var(--el-color-primary);
    }
  }
}
</style>
