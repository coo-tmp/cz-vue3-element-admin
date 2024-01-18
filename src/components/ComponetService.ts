import type { App } from 'vue';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const ComponetService = {
  setupGlobalComponent(app: App) {
    app.use(ElementPlus);

    // element icons
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
export default ComponetService;
