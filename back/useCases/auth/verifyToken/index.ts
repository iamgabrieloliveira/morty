import { VerifyTokenController } from './VerifyTokenController';
import { VerifyTokenUseCase } from './VerifyTokenUseCase';

const verifyTokenUseCase = new VerifyTokenUseCase();

const verifyTokenController = new VerifyTokenController(verifyTokenUseCase);

export { verifyTokenController,  verifyTokenUseCase };