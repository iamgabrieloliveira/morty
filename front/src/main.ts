import { createApp } from 'vue';

import toastify from 'vue3-toastify';
import router from './router';

import App from './App.vue';

import './style.css';
import 'vue3-toastify/dist/index.css';

const app = createApp(App);

app.use(router);

app.use(toastify, { autoClose: 3000 });

app.mount('#app');
