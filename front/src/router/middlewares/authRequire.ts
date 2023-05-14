import { NavigationGuard } from 'vue-router';
import cookie from 'js-cookie';
import api from '../../api';

const authRequire: NavigationGuard = async (to, from, next) => {
    if (to.name === 'login') {
        return next();
    }

    const jwt = cookie.get('morty:token');

    if (!jwt) {
        return next({ name: 'login' });
    }

    try {
        await api.get('/token-verify', { headers: { Authorization: `Bearer ${jwt}` } });

        return next();

    } catch (error) {
        return next({ name: 'login' });
    }
}

export { authRequire };