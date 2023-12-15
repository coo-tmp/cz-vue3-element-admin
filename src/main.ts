import './assets/main.css';
import 'element-plus/theme-chalk/index.css';

import { createApp } from 'vue';
import StoreService from '@/stores/StoreService';
import RouterService from '@/router/RouterService';
import ComponetService from '@/components/ComponetService';

import App from './App.vue';

const app = createApp(App);

StoreService.setup(app);
RouterService.setup(app);
ComponetService.setupGlobalComponent(app);

app.mount('#app');
