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
    id: 'RES_DASGBOARD',
    name: '首页',
    path: '/',
    icon: 'menu-language',
  },
  {
    id: 'RES_TESTING',
    name: '测试',
    path: '/testing',
    icon: 'menu-language',
  },
  {
    id: 'RES_TESTING2',
    name: '示例',
    icon: 'menu-dict',
    children: [
      {
        id: 'RES_TESTING_TESTA',
        name: '菜单A',
        path: '/testing/testA',
        icon: 'menu-dict',
      },
      {
        id: 'RES_TESTING_TESTB',
        name: '菜单B',
        path: '/testing/testB',
        icon: 'menu-dict',
      },
      {
        id: 'RES_TESTING_TESTC',
        name: '菜单C',
        path: '/testing/testC',
        icon: 'menu-dict',
      },
      {
        id: 'RES_TESTING_TESTD',
        name: '菜单D',
        path: '/testing/testD',
        icon: 'menu-dict',
      },
      {
        id: 'RES_TESTING_TESTE',
        name: '菜单E',
        path: '/testing/testE',
        icon: 'menu-dict',
      },
      {
        id: 'RES_TESTING_TESTF',
        name: '菜单F',
        path: '/testing/testF',
        icon: 'menu-dict',
      },
    ],
  },
  {
    id: 'RES_EXTERNALLINK1ss',
    name: '外链1',
    path: 'https://www.bing.com',
    icon: 'menu-dict',
  },
  {
    id: 'RES_EXTERNALLINK1ss',
    name: '外链2',
    path: '/bing2',
    icon: 'menu-dict',
  },
  {
    id: 'RES_EXTERNALLINK',
    name: '外链3',
    path: '/externallink',
    icon: 'menu-dict',
    children: [
      {
        id: 'RES_EXTERNALLINK_BING_1',
        name: '外链3_1',
        path: 'https://www.bing.com',
        icon: 'menu-dict',
      },
      {
        id: 'RES_EXTERNALLINK_BING_3',
        name: '外链3_2',
        path: '/openInCurrentTag',
        icon: 'menu-dict',
      },
      {
        id: 'RES_EXTERNALLINK_BING_4',
        name: '外链3_3',
        path: '/openInNewTag',
        icon: 'menu-dict',
      },
    ],
  },
  {
    id: 'RES_MULTILEVELMENU',
    name: '多级菜单',
    icon: 'menu-dict',
    children: [
      {
        id: 'RES_MULTILEVELMENU_1',
        name: '一级菜单1',
        path: 'level1_1',
        icon: 'menu-dict',
      },
      {
        id: 'RES_MULTILEVELMENU_2',
        name: '一级菜单2',
        icon: 'menu-dict',
        children: [
          {
            id: 'RES_MULTILEVELMENU_1_1',
            name: '二级菜单',
            icon: 'menu-dict',
            children: [
              {
                id: 'RES_MULTILEVELMENU_1_1_1',
                name: '三级菜单',
                path: 'level3_1',
                icon: 'menu-dict',
              },
              {
                id: 'RES_MULTILEVELMENU_1_1_2',
                name: '三级菜单',
                path: 'level3_2',
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
