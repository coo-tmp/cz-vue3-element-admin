<template>
  <RouterView />
</template>

<script setup lang="ts">
import userStore from './stores/modules/userStore';

window.addEventListener('beforeunload', function () {
  userStore.logout();
});
</script>

<style scoped></style>
