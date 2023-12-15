import './assets/main.css';
import 'element-plus/theme-chalk/index.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ComponetService from '@/components/ComponetService';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
ComponetService.setupGlobalComponent(app);

app.mount('#app');
