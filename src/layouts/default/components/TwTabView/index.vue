<template>
  <div class="root">
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

<style>
.root {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: auto;
}
.main-tab {
  --el-tabs-header-height: 20px;
}
.main-tab > .el-tabs__header {
  margin: 0 !important;
}
</style>
