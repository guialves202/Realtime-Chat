import { Router } from 'express';
import DashboardController from '../controllers/DashboardController';
import DashboardMiddleware from '../middlewares/DashboardMiddleware';
import CheckLoggedMiddleware from '../middlewares/CheckLoggedMiddleware';

const router = Router();

router.get('/', CheckLoggedMiddleware.onlyAdmin, DashboardController.index);

router.post('/forbiddenwords/add', CheckLoggedMiddleware.onlyAdmin, DashboardMiddleware.addForbiddenWord, DashboardController.addForbiddenWords);

export default router;
