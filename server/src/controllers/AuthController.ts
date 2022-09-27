import { NextFunction, Request, Response } from "express";
import { validationResult } from 'express-validator';

import AuthService from "../services/AuthService";

import ApiError from "../exceptions/ApiError";

import { CLIENT_URL } from "../constants/env";

class AuthController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw ApiError.BadRequest('Validation failed', errors.array());
            }
            const { email, password, name }  = req.body;

            const userData = await AuthService.registration(email, password, name);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });

            return res.json(userData);
        } catch(e) {
            return next(e);
        }
    }
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body;

            const userData = await AuthService.login(email, password);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });

            return res.json(userData);

        } catch(e) {
            return next(e);
        }
    }
    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            
            const token = await AuthService.logout(refreshToken);
            
            res.clearCookie('refreshToken');
            
            return res.status(200).json(token);
        } catch(e) {
            return next(e);
        }
    }
    async confirm(req: Request, res: Response, next: NextFunction) {
        try {
            const confirmationLink = req.params.link;

            await AuthService.confirm(confirmationLink);

            return res.redirect(CLIENT_URL);
        } catch(e) {
            return next(e);
        }
    }
    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            
            const userData = await AuthService.refresh(refreshToken);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });

            return res.json(userData);
        } catch(e) {
            return next(e);
        }
    }
    async edit(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            if (!user) {
                throw ApiError.UnauthorizedError();
            }

            const data = await AuthService.edit({
                id: user.id,
                ...req.body.data
            });

            return res.status(200).json(data);
        } catch(e) {
            return next(e);
        }
    }
}

export default new AuthController();