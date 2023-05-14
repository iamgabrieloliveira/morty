import { IUsersRepository } from '../../../respositories/IUsersRepository';
import { LoginDto } from '../login/LoginDto';
import { User } from "../../../entities/User";
import { UnauthorizedException } from '../../../exceptions/UnauthorizedException';
import jwt from 'jsonwebtoken';

export interface LoginResponseData {
    user: {
        name: string,
    },
    token: string,
}

export class LoginUseCase {
    constructor(
        private usersRepository: IUsersRepository,
    ) {}

    async execute({ name, email, password }: LoginDto): Promise<LoginResponseData> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user || user.password !== password) {
            throw new UnauthorizedException('Wrong Credentials');
        }

        const token = jwt.sign(user, 'secret123', { expiresIn: '30m' });

        return {
            token,
            user: { name: user.name },
        }
    }
}