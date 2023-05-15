import { MysqlUsersRepository } from '../../../respositories/implementations/MysqlUsersRepository';
import { RegisterUseCase } from './RegisterUseCase';
import { faker } from '@faker-js/faker';

describe('Register user tests', () => {
    it('should repository register a new user', async () => {
        // Prepare
        const input = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: 'secret123',
        }

        const repository = new MysqlUsersRepository();
        const useCase = new RegisterUseCase(repository);

        // Act
        await useCase.execute(input);

        const user = await repository.findByEmail(input.email);

        // Assert
        expect(user.name).toBe(input.name);
        expect(user.email).toBe(input.email);
        expect(user.password).toBe(input.password);
    });

    it('should not register a new user when given email already exists', async () => {
        // Prepare
        const input = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: 'secret123',
        }

        const repository = new MysqlUsersRepository();
        const useCase = new RegisterUseCase(repository);
        await useCase.execute(input);

        // Act
        try {
            await useCase.execute(input);
        } catch (error) {
            // Assert
            expect(error.message).toBe('Email already taken');
        }
    });

    it('should not register a new user when payload missing name', async () => {
        // Prepare
        const input = {
            name: '',
            email: faker.internet.email(),
            password: 'secret123',
        }

        const repository = new MysqlUsersRepository();
        const useCase = new RegisterUseCase(repository);

        // Act
        try {
            await useCase.execute(input);
        } catch (error) {
            // Assert
            expect(error.message).toBe('Cannot create a new user missing the field name.');
        }
    });

    it('should not register a new user when payload missing email', async () => {
        // Prepare
        const input = {
            name: faker.person.fullName(),
            email: '',
            password: 'secret123',
        }

        const repository = new MysqlUsersRepository();
        const useCase = new RegisterUseCase(repository);

        // Act
        try {
            await useCase.execute(input);
        } catch (error) {
            // Assert
            expect(error.message).toBe('Cannot create a new user missing the field email.');
        }
    });

    it('should not register a new user when payload missing password', async () => {
        // Prepare
        const input = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: '',
        }

        const repository = new MysqlUsersRepository();
        const useCase = new RegisterUseCase(repository);

        // Act
        try {
            await useCase.execute(input);
        } catch (error) {
            // Assert
            expect(error.message).toBe('Cannot create a new user missing the field password.');
        }
    });
});