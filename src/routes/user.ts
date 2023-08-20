import { Router } from 'express';
import LoginRegisterController from '../controllers/LoginRegisterController';
import LoginRegisterMiddleware from '../middlewares/LoginRegisterMiddleware';
import CheckLoggedMiddleware from '../middlewares/CheckLoggedMiddleware';

const router = Router();

router.post('/login', CheckLoggedMiddleware.onlyNotLogged, LoginRegisterMiddleware.login, LoginRegisterController.login);

router.post('/logout', CheckLoggedMiddleware.onlyLogged, LoginRegisterController.logout);

export default router;
