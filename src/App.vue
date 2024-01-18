<template>
  <RouterView />
</template>

<script setup lang="ts">
window.addEventListener('beforeunload', function () {
  userStore.logout();
});
</script>

<style scoped></style>
