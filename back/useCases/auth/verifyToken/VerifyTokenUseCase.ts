import { IUsersRepository } from '../../../respositories/IUserRepository';
import { LoginDto } from '../login/LoginDto';
import { User } from '../../../entities/User';
import jwt from 'jsonwebtoken';

export class VerifyTokenUseCase {
    async execute(token: string|null): Promise<void> {
        token = token.split(' ')[1];

                
    }
}