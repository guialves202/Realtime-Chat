import { Router } from 'express';
import LoginRegisterController from '../controllers/LoginRegisterController';
import LoginRegisterMiddleware from '../middlewares/LoginRegisterMiddleware';

const router = Router();

router.post('/login', LoginRegisterMiddleware.login, LoginRegisterController.login);

export default router;
