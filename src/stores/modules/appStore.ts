import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { store } from '../StoreService';
import { ScreenWidthType } from '@/types';

const useStore = defineStore('AppStore', () => {
  // state
  const sidebar = reactive({
    opened: true,
    withoutAnimation: false,
  });
  const screen = reactive({
    widthType: ScreenWidthType.Big,
  });

  // actions
  function openSidebar() {
    sidebar.opened = true;
  }
  function closeSidebar() {
    sidebar.opened = false;
  }
  function toggleSidebar() {
    sidebar.opened = !sidebar.opened;
  }

  function setScreenWidthType(type: ScreenWidthType) {
    screen.widthType = type;
    switch (screen.widthType) {
      case ScreenWidthType.Big:
        openSidebar();
        break;
      case ScreenWidthType.Middle:
        closeSidebar();
        break;
      case ScreenWidthType.Small:
        closeSidebar();
        break;
    }
  }

  return {
    sidebar,
    screen,
    openSidebar,
    closeSidebar,
    toggleSidebar,
    setScreenWidthType,
  };
});

const appStoreHook = useStore(store); // 在useStore()前声明，可解决错误：etActivePinia()" was called but there was no active Pinia. Did you forget to install pinia?

export default useStore();
export { appStoreHook };
