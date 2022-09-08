import { Router } from 'express';
import { body } from 'express-validator';

import AuthController from '../controllers/AuthController';
import FileController from '../controllers/FileController';

import AuthMiddleware from '../middlewares/AuthMiddleware';
import { UploadFile } from '../services/FileService';

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

router.post('/file/upload', AuthMiddleware, UploadFile.array('files', 10), FileController.upload);

export default router;