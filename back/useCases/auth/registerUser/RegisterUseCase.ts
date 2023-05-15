import { User } from "../../../entities/User";
import { IUsersRepository } from "../../../respositories/IUsersRepository";
import { RegisterDto } from "./RegisterDto";

export class RegisterUseCase {
    constructor(
        protected usersRepository: IUsersRepository
    ) {
    }

    async execute({ name, email, password }: RegisterDto)
    {
        const user = await this.usersRepository.findByEmail(email);

        if (user) {
            throw new Error('Email already taken');
        }

        if (!name) {
            throw new Error('Cannot create a new user missing the field name.');
        }

        if (!email) {
            throw new Error('Cannot create a new user missing the field email.');
        }

        if (!password) {
            throw new Error('Cannot create a new user missing the field password.');
        }

        const newUser = new User({ name, email, password });

        this.usersRepository.save(newUser);
    }
}