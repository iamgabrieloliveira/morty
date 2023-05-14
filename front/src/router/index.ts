import { createRouter, createWebHashHistory } from 'vue-router';

import { authRequire } from './middlewares/authRequire';

import Login from '../pages/Login.vue';
import Dashboard from '../pages/Dashboard.vue';

const routes = [
    {
        name: 'login',
        path: '/',
        component: Login,
    },
    {
        name: 'dashboard',
        path: '/dashboard',
        component: Dashboard,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach(authRequire);

export default router;