import { Router } from 'express';
import ChatController from '../controllers/ChatController';

const router = Router();

router.get('/', ChatController.index);

export default router;
