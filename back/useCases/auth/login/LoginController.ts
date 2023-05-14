import { Request, Response } from 'express';
import { LoginUseCase } from './LoginUseCase';

export class LoginController {
    constructor(
        private loginUseCase: LoginUseCase,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        try {
            const responseData = await this.loginUseCase.execute({ name, email, password });

            return response.status(200).send(responseData);
        } catch (error) {
            return response.status(401).send('Wrong credentials');
        }
    }
}