import { Request, Response } from 'express';
import { VerifyTokenUseCase } from './VerifyTokenUseCase';
import { UnauthorizedException } from '../../exceptions/UnauthorizedException';

export class VerifyTokenController {
    constructor(
        private verifyTokenUseCase: VerifyTokenUseCase,
    ) {}

    async handle(request: Request, response: Response): Promise<void> {
        const token = request.headers.authorization;

        if (!token) {
            response.send(401);
        }

        const isValid = this.verifyTokenUseCase.execute(token);

        const status = isValid ? 200 : 401;

        response.status(status).send();
    }
}