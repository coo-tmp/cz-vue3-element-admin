<template>
  <div class="root-layout-header">
    <div class="header-title">
      <div class="hamburger-wrapper" @click="appStore.toggleSidebar">
        <SvgIcon name="layouts-hamburger" :size="svgSize" class="hamburger" :class="{ 'is-active': appStore.sidebar.opened }" />
      </div>
      <!-- <TwBreadcrumb v-if="appStore.screen.widthType !== ScreenWidthType.Small" /> -->
    </div>
    <div class="header-action">
      <span @click="toggle">
        <SvgIcon v-if="isFullscreen" name="layouts-fullscreen_disable" :size="svgSize" />
        <SvgIcon v-else name="layouts-fullscreen_enable" :size="svgSize" />
      </span>
      <span>
        <el-dropdown @command="handleCommand" style="display: flex; justify-content: left">
          <span style="display: flex; align-items: center">
            <SvgIcon name="layouts-user" :size="svgSize" />
            <span style="padding-left: 3px">
              Hello, Cooper<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="a">个人中心</el-dropdown-item>
              <el-dropdown-item command="e" divided>退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </span>
      <span> <SvgIcon name="layouts-settings" size="1em" /> </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core';
import appStore from '@/stores/modules/appStore';
import SvgIcon from '@/components/SvgIcon/index.vue';
import { ArrowDown } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
// import TwBreadcrumb from './TwBreadcrumb.vue';
import { ScreenWidthType } from '@/types';

const { isFullscreen, toggle } = useFullscreen();

const svgSize = '1.2em';
const handleCommand = (command: string | number | object) => {
  ElMessage(`click on item ${command}`);
};
</script>

<style lang="scss" scoped>
.root-layout-header {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #eeeeee;

  .header-title {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    height: 100%;

    .hamburger-wrapper {
      display: flex;
      align-items: center;
      padding: 1px 10px 0;
      height: 100%;
      cursor: pointer;

      &:hover {
        background-color: $hover-background-color;
      }

      .hamburger {
        width: 20px;
        height: 20px;
        vertical-align: -4px;

        &.is-active {
          transform: rotate(180deg);
        }
      }
    }
  }

  .header-action {
    flex: 0 0 fit-content;
    display: flex;
    align-items: center;
    justify-content: right;
    height: 100%;

    > span {
      padding: 0px 10px;
      height: 100%;
      cursor: pointer;
      display: flex;
      align-items: center;

      &:hover {
        background-color: $hover-background-color;
      }

      .el-dropdown {
        height: 100%;

        *:focus-visible {
          outline: none;
        }
      }
    }
  }
}
</style>
