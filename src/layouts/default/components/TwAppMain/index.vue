<template>
  <div class="tabview-wrapper">
    <TwTabView class="tabview-content" />
    <div class="tabview-operation"><button @click="toggleFullContent">全屏</button></div>
  </div>
  <div class="view-container">
    <router-view v-slot="{ Component, route }">
      <keep-alive :include="tabViewStore.allTabs.map((i) => i.path)">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import tabViewStore from '@/stores/modules/tabViewStore';
import TwTabView from '@/layouts/default/components/TwTabView/index.vue';

function toggleFullContent() {
  var sidebar = document.getElementById('sidebar-wrapper');
  var header = document.getElementById('header-wrapper');
  var content = document.getElementById('content-wrapper');
  sidebar?.classList.toggle('sidebar-wrapper-full-content');
  header?.classList.toggle('header-wrapper-full-content');
  content?.classList.toggle('content-wrapper-full-content');
}
</script>

<style scoped>
.tabview-wrapper {
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
}

.tabview-wrapper > .tabview-content {
  width: 800px;
}
</style>
