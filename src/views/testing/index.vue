<template>
  <button @click="testStoreHandler">Test Store</button>
  <button @click="testHttpApi">Test HttpApi</button><br />
  <div id="idScss">SCSS</div>

  <div>
    <SvgIcon name="logo" color="#FF0000" />
    <SvgIcon name="menu-dict" color="#FF0000" />
    <SvgIcon name="menu-language" color="#FF0000" size="32px" /><!-- 使用logo.svg重命名为language.svg -->
    <SvgIcon name="basic-language" color="#FF0000" width="40px" height="64px" />
  </div>
</template>

<script setup lang="ts">
import testStore from '@/views/testing/store.vue';
import HttpApi from '@/api/HttpApi';
import SvgIcon from '@/components/SvgIcon/index.vue';

function testStoreHandler() {
  testStore();
}

function testHttpApi() {
  HttpApi.test
    .create({
      testId: 1234,
      name: 'Tom',
    })
    .then((resp) => {
      console.log(resp);
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>

<style lang="scss" scoped>
#idScss {
  width: 100%;
  height: 50px;
  background-color: $background-color;
  color: $text-color;
}
</style>
