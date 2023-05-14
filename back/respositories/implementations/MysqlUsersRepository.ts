import { IUsersRepository } from '../IUserRepository';
import { User } from '../../entities/User';

const DEFAULT_USER = {
    id: '12-93iu12powjkdqw',
    name: 'Gabriel Oliveira',
    email: 'gabriel@email.com',
    password: 'secret123',
};

export class MysqlUsersRepository implements IUsersRepository {
    private users: User[] = [DEFAULT_USER];

    async findByEmail(email: string): Promise<User> {
        const user = this.users.find(user => user.email === email);

        return user;
    }

    async save(user: User): Promise<void> {
        this.users.push(user);
    }
}