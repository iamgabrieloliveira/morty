import { Request, Response } from 'express';
import { IUsersRepository } from '../../../respositories/IUsersRepository';
import { RegisterUseCase } from './RegisterUseCase';

export class RegisterController {
    constructor(
        protected registerUseCase: RegisterUseCase
    ) {
    }

    handle(request: Request, response: Response) {
        this.registerUseCase.execute({  });
    }
}