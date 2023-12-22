import { defineStore } from 'pinia';
import { store } from '../StoreService';
import RouterService from '@/router/RouterService';
import { ref } from 'vue';
import type { ITabView } from '@/layouts/default/components/TwTabView/types';

const useStore = defineStore('TabViewStore', () => {
  // state
  const allTabs = ref<ITabView[]>([]);
  const activeTab = ref<string>('');

  // actions
  function init() {
    if (allTabs.value.length === 0) {
      const tab: ITabView = {
        title: '首页',
        path: '/',
        closable: false,
      };
      addTab(tab);
    }
  }

  function addTab(tab: ITabView) {
    const filters = allTabs.value.filter((item: ITabView) => {
      return item.path === tab.path;
    });

    if (filters.length === 0) {
      allTabs.value.push(tab);
      activeTab.value = tab.path;
    } else {
      activeTab.value = filters[0].path;
    }
    RouterService.router.push(activeTab.value);
  }

  function removeTab(name: String) {
    const tabs = allTabs.value;
    let activeName = activeTab.value;
    if (activeName === name) {
      tabs.forEach((tab: ITabView, index: number) => {
        if (tab.path === name) {
          const nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            activeName = nextTab.path;
          }
        }
      });
    }

    activeTab.value = activeName;
    allTabs.value = tabs.filter((tab) => tab.path !== name);
    RouterService.router.replace(activeTab.value);

    init();
  }

  function setActiveTab(name: string) {
    activeTab.value = name;
    RouterService.router.push(activeTab.value);
  }

  return {
    allTabs,
    activeTab,
    init,
    addTab,
    removeTab,
    setActiveTab,
  };
});

const tabViewStoreHook = useStore(store); // 在useStore()前声明，可解决错误：etActivePinia()" was called but there was no active Pinia. Did you forget to install pinia?

export default useStore();
export { tabViewStoreHook };
