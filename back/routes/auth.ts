import { Router } from 'express';
import { loginController } from '../useCases/auth/login';
import { verifyTokenController } from '../useCases/auth/verifyToken';

const router = Router();

router.post('/auth', (request, response) => {
    return loginController.handle(request, response);
});

router.get('/token-verify', (request, response) => {
    return verifyTokenController.handle(request, response);
});

export default router;
