import { MysqlUsersRepository } from '../../../respositories/implementations/MysqlUsersRepository';
import { LoginUseCase } from './LoginUseCase';
import { LoginController } from "./LoginController";

const mysqlUsersRepository = new MysqlUsersRepository()

const loginUseCase = new LoginUseCase(mysqlUsersRepository);

const loginController = new LoginController(loginUseCase);

export { loginController };
