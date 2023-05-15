import { Request, Response } from 'express';
import { IUsersRepository } from '../../../respositories/IUsersRepository';
import { RegisterUseCase } from './RegisterUseCase';

export class RegisterController {
    constructor(
        protected registerUseCase: RegisterUseCase
    ) {
    }

    handle(request: Request, response: Response) {
        const { name, email, password } = request.body;

        try {
            this.registerUseCase.execute({ name, email, password });
        } catch (error) {
            response.status(400).send(error.message);
        }
    }
}