<template>
  <div class="app-wrapper">
    <div v-if="isSmallScreenWidth && isSidebarOpened" id="drawer-bg" class="drawer-bg" @click="appStore.toggleSidebar"></div>

    <div
      id="sidebar-wrapper"
      class="sidebar-wrapper"
      :class="{
        'sidebar-wrapper-opened': !isSmallScreenWidth && isSidebarOpened,
        'sidebar-wrapper-closed': !isSmallScreenWidth && !isSidebarOpened,
        'sidebar-wrapper-small-show': isSmallScreenWidth && isSidebarOpened,
        'full-content-sidebar-wrapper': !isSmallScreenWidth && isFullContent,
      }"
    >
      <TwSidebar :items="menus" />
    </div>
    <div class="main-wrapper">
      <div id="header-wrapper" class="header-wrapper" :class="{ 'full-content-header-wrapper': !isSmallScreenWidth && isFullContent }">
        <TwHeader />
      </div>
      <div id="content-wrapper" class="content-wrapper" :class="{ 'full-content-content-wrapper': !isSmallScreenWidth && isFullContent }">
        <TwAppMain />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import appStore from '@/stores/modules/appStore';
import TwSidebar from './components/TwSidebar/index.vue';
import type { IMenuItem } from './components/TwSidebar/types';
import { ScreenWidthType } from '@/types';
import TwHeader from './components/TwHeader/index.vue';
import TwAppMain from './components/TwAppMain/index.vue';
import { useWindowSize } from '@vueuse/core';
import { computed, watchEffect } from 'vue';

const isSidebarOpened = computed(() => appStore.sidebar.opened);
const isSmallScreenWidth = computed(() => appStore.screen.widthType === ScreenWidthType.Small);
const isFullContent = computed(() => appStore.isFullContent);

watchEffect(() => {
  const smallMaxWidth = 768; // px
  const middleMaxWidth = 1200; // px
  const { width } = useWindowSize();

  if (width.value > middleMaxWidth) {
    appStore.setScreenWidthType(ScreenWidthType.Big);
  } else if (width.value <= smallMaxWidth) {
    appStore.setScreenWidthType(ScreenWidthType.Small);
  } else {
    appStore.setScreenWidthType(ScreenWidthType.Middle);
  }
});
</script>

<script lang="ts">
const menus: IMenuItem[] = [
  {
    id: '1',
    name: '首页',
    path: '/dashboard',
    icon: 'menu-language',
  },
  {
    id: '2',
    name: '测试',
    path: '/testing',
    icon: 'menu-language',
  },
  {
    id: '3',
    name: '外链',
    icon: 'menu-dict',
    children: [
      {
        id: '3-1',
        name: '浏览器标签页',
        icon: 'menu-dict',
        children: [
          {
            id: '3-1-1',
            name: '新标签页打开1',
            path: '/externallink/browser/openInBlank',
            icon: 'menu-dict',
            isTab: false,
          },
          {
            id: '3-1-2',
            name: '新标签页打开2',
            path: 'https://www.bing.com',
            icon: 'menu-dict',
            isTab: false,
          },
          {
            id: '3-1-3',
            name: '当前标签页打开1',
            path: '/externallink/browser/openInCurrentTab',
            icon: 'menu-dict',
            isTab: false,
          },
          {
            id: '3-1-4',
            name: '当前标签页打开2',
            path: '/externallink/browser/openInCurrentTab2',
            icon: 'menu-dict',
            isTab: false,
          },
        ],
      },
      {
        id: '3-2',
        name: '系统标签页（不支持）',
        icon: 'menu-dict',
        disabled: true,
      },
    ],
  },

  {
    id: '4',
    name: '多级菜单',
    icon: 'menu-dict',
    children: [
      {
        id: '4-1',
        name: '一级菜单1',
        path: '/multmenu/level41',
        icon: 'menu-dict',
      },
      {
        id: '4-2',
        name: '一级菜单2',
        icon: 'menu-dict',
        children: [
          {
            id: '4-2-1',
            name: '二级菜单1',
            path: '/multmenu/level42/level421',
            icon: 'menu-dict',
          },
          {
            id: '4-2-2',
            name: '二级菜单2',
            icon: 'menu-dict',
            children: [
              {
                id: '4-2-2-1',
                name: '三级菜单1',
                path: '/multmenu/level42/level422/level4221',
                icon: 'menu-dict',
              },
              {
                id: '4-2-2-2',
                name: '三级菜单2',
                path: '/multmenu/level42/level422/level4222',
                icon: 'menu-dict',
              },
            ],
          },
        ],
      },
    ],
  },
];
</script>

<style lang="scss" scoped>
html,
body,
.app-wrapper {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.app-wrapper {
  display: flex;

  .sidebar-wrapper {
    overflow: hidden;
    background-color: $layout__sidebar__backgrount_color;
  }

  .main-wrapper {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .header-wrapper {
      flex: 0 0 $layout__header_height;
      overflow: hidden;
    }

    .content-wrapper {
      flex: 1 1 auto;
      height: calc(100% - $layout__header_height);
      overflow: hidden;
    }
  }
}
</style>

<style lang="scss" scoped>
/* 大屏 & 中屏（>768px） */
@media (min-width: $screen_width__small) {
  .sidebar-wrapper {
    display: block;
    transition: flex $layout__sidebar__transition_duration;

    &-closed {
      flex: 0 0 $layout__sidebar_width__closed !important;
    }

    &-opened {
      flex: 0 0 $layout__sidebar_width__opened !important;
    }
  }

  .main-wrapper {
    transition: flex $layout__sidebar__transition_duration;
  }

  .full-content {
    &-sidebar-wrapper {
      display: none !important;
    }

    &-header-wrapper {
      display: none !important;
    }

    &-content-wrapper {
      height: 100%;
    }
  }
}
</style>

<style lang="scss" scoped>
/* 大屏（>=1200px） */
@media (min-width: $screen_width__big) {
  .sidebar-wrapper {
    flex: 0 0 $layout__sidebar_width__opened;
  }
}
</style>

<style lang="scss" scoped>
/* 中屏（>768px && < 1200px） */
@media (max-width: $screen_width__big) and (min-width: $screen_width__small) {
  .sidebar-wrapper {
    flex: 0 0 $layout__sidebar_width__closed;
  }
}
</style>

<style lang="scss" scoped>
/* 小屏（<768px） */
@media (max-width: $screen_width__small) {
  .sidebar-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1001;
    height: 100%;
    max-width: 0;
    transition: max-width $layout__sidebar__transition_duration;

    &-small-show {
      max-width: 80% !important;
    }
  }

  .drawer-bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: 0.3;
    display: block;
  }
}
</style>
