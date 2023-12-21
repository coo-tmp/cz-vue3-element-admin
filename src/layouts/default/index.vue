<template>
  <div class="app-wrapper">
    <!-- 手机设备侧边栏打开遮罩层 -->
    <div id="drawer-bg" class="drawer-bg" @click="toggleSidebar"></div>

    <div id="sidebar-wrapper" class="sidebar-wrapper">
      <TwSidebar :items="menus" />
    </div>
    <div class="main-wrapper">
      <div id="header-wrapper" class="header-wrapper">
        <div>
          <button v-if="appStore.screen.widthType !== ScreenWidthType.Small && appStore.sidebar.opened" @click="toggleSidebar">&lt;&lt;</button>
          <button v-else @click="toggleSidebar">&gt;&gt;</button>
        </div>
        <div>全屏 &nbsp;&nbsp;&nbsp;&nbsp;头像</div>
      </div>
      <div id="content-wrapper" class="content-wrapper">
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
import TwAppMain from './components/TwAppMain/index.vue';

const smallMaxWidth = 768; // px
const middleMaxWidth = 1200; // px

function toggleSidebar() {
  var sidebar = document.getElementById('sidebar-wrapper');
  var drawerBg = document.getElementById('drawer-bg');

  var width = document.body.clientWidth;
  if (width > middleMaxWidth) {
    sidebar?.classList.remove('sidebar-wrapper-middle-show');
    sidebar?.classList.remove('sidebar-wrapper-small-show');
    drawerBg?.classList.remove('drawer-bg-small-show');
    sidebar?.classList.toggle('sidebar-wrapper-big-hide');
  } else if (width <= smallMaxWidth) {
    sidebar?.classList.remove('sidebar-wrapper-big-hide');
    sidebar?.classList.remove('sidebar-wrapper-middle-show');
    sidebar?.classList.toggle('sidebar-wrapper-small-show');
    drawerBg?.classList.toggle('drawer-bg-small-show');
  } else {
    sidebar?.classList.remove('sidebar-wrapper-big-hide');
    sidebar?.classList.remove('sidebar-wrapper-small-show');
    drawerBg?.classList.remove('drawer-bg-small-show');
    sidebar?.classList.toggle('sidebar-wrapper-middle-show');
  }

  appStore.toggleSidebar();
}

window.addEventListener('resize', () => {
  var width = document.body.clientWidth;
  if (width > middleMaxWidth) {
    appStore.changeScreenWidthType(ScreenWidthType.Big);
    appStore.openSidebar();
  } else if (width <= smallMaxWidth) {
    appStore.changeScreenWidthType(ScreenWidthType.Small);
    appStore.closeSidebar();
  } else {
    appStore.changeScreenWidthType(ScreenWidthType.Middle);
    appStore.closeSidebar();
  }

  var sidebar = document.getElementById('sidebar-wrapper');
  var drawerBg = document.getElementById('drawer-bg');

  sidebar?.classList.remove('sidebar-wrapper-big-hide');
  sidebar?.classList.remove('sidebar-wrapper-small-show');
  sidebar?.classList.remove('sidebar-wrapper-middle-show');
  drawerBg?.classList.remove('drawer-bg-small-show');
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

<style scoped>
/* @media (min-width: 768px)
        @media (min-width: 992px)
        @media (min-width: 1200px)
        @media (max-width: 767px) */
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.app-wrapper {
  display: flex;
  height: 100%;
}

.sidebar-wrapper {
  flex: 0 0 210px;
  display: block;
  overflow: auto;
  background: lightblue;
}

.main-wrapper {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
}

.header-wrapper {
  flex: 0 0 50px;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
  background: lightgreen;
}

.content-wrapper {
  flex: 1 1 auto;
  height: calc(100% - 50px);
  background: lightpink;
  overflow: auto;
}
</style>

<style scoped>
/* 大屏 & 中屏（>768px） */
@media (min-width: 768px) {
  .sidebar-wrapper-full-content {
    /* flex: 0 0 0 !important;
          overflow: hidden; */
    display: none !important;
  }

  .header-wrapper-full-content {
    /* flex: 0 0 0 !important;
          overflow: hidden; */
    display: none !important;
  }

  .content-wrapper-full-content {
    height: 100%;
  }
}
</style>

<style scoped>
/* all: 大屏（>=1200px） */
@media (min-width: 1200px) {
  .sidebar-wrapper-big-hide {
    /*display: none;*/
    flex: 0 0 54px;
    display: block;
  }
}
</style>

<style scoped>
/* 中屏（>768px && < 1200px） */
@media (max-width: 1200px) and (min-width: 768px) {
  .sidebar-wrapper {
    flex: 0 0 54px;
    display: block;
    overflow: hidden;
  }

  .sidebar-wrapper-middle-show {
    flex: 0 0 210px;
    display: block;
  }
}
</style>

<style scoped>
/* all: 小屏（<768px） */
@media (max-width: 768px) {
  .sidebar-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1001;
    height: 100%;
    display: none;
  }

  .drawer-bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.3;
    display: none;
  }

  #sidebar-wrapper.sidebar-wrapper-small-show,
  #drawer-bg.drawer-bg-small-show {
    display: block;
  }
}
</style>
