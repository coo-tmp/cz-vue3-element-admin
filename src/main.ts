import './assets/main.css';
import 'element-plus/theme-chalk/index.css';
import 'virtual:svg-icons-register';

import { createApp } from 'vue';
import StoreService from '@/stores/StoreService';
import RouterService from '@/router/RouterService';
import ComponetService from '@/components/ComponetService';

import App from './App.vue';

if (import.meta.env.MODE === 'mock') {
  import('@/mock/index');
}

const app = createApp(App);

StoreService.setup(app);
RouterService.setup(app);
ComponetService.setupGlobalComponent(app);

app.mount('#app');
