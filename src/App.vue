<script setup lang="ts">
import tabViewStore from '@/stores/modules/tabViewStore';

window.addEventListener('load', function () {
  tabViewStore.init();
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
