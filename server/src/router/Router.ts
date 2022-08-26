import { Router } from 'express';
import { body } from 'express-validator';

import AuthController from '../controllers/AuthController';

const router = Router();

router.post('/register',
    body('email').isEmail(),
    body('password').isLength({ min: 5, max: 32}),
    AuthController.register
);
router.post('/login', 
    body('email').isEmail(),
    body('password').isLength({ min: 5, max: 32}),
    AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/confirm/:link', AuthController.confirm);
router.get('/refresh', AuthController.refresh);

export default router;