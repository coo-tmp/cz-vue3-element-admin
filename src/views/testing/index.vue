<template>
  <button @click="testStoreHandler">Test Store</button>
</template>

<script setup lang="ts">
import testStore from '@/views/testing/store.vue';

function testStoreHandler() {
  testStore();
}
</script>
