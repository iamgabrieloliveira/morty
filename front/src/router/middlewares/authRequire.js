import cookie from 'js-cookie';
import api from '../../api';

const authRequire = (to, _, next) => {
    if (to?.name === 'login') {
        return next();
    }

    const token = cookie.get('morty:token');

    if (!token) {
        return next({ name: 'login' });
    }

    api.get('/auth-verify', {
        headers: { Authorization: 'Bearer ' + token },
    }).then(() => next())
    .catch((error) => {
        return next({ name: 'login' })
    });
};

export default authRequire;