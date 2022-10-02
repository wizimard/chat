import bcrypt from 'bcrypt';
import { v4 as uuid} from 'uuid';

import MailService from './MailService';
import TokenService from './TokenService';

import ApiError from '../exceptions/ApiError';

import UserModel from "../models/UserModel";

import { UserDto } from '../dtos/UserDto';

import { API_URL } from '../constants/env';
import UserService from './UserService';

class AuthService {
    async registration(email: string, password: string, name: string) {
        const candidate = await UserModel.findOne({email});

        if (candidate) {
            throw ApiError.BadRequest(`User with email ${email} already exists`);
        }

        const hashPassword = await bcrypt.hash(password.trim(), 3);

        const confirmLink = uuid();

        const user = await UserModel.create({
            email: email.trim(),
            password: hashPassword,
            name: name.trim(),
            confirmLink
        });

        await MailService.sendConfirmMail(email, `${API_URL}/api/confirm/${confirmLink}`);

        const AuthUserDto = new UserDto(user);

        const tokens = TokenService.generateTokens({...AuthUserDto});

        await TokenService.saveToken(AuthUserDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: AuthUserDto
        }
    }
    async confirm(confirmLink: string) {
        const user = await UserModel.findOne({ confirmLink });

        if (!user) {
            throw ApiError.BadRequest('Uncorrect confirmation link');
        }
        user.username = String(user._id);
        user.isConfirm = true;

        await user.save();
    }
    async login(email: string, password: string) {
        const user = await UserModel.findOne({ email });

        if (!user) {
            throw ApiError.BadRequest("User with this email is not found");
        }

        const isPassEqual = await bcrypt.compare(password, user.password);

        if (!isPassEqual) {
            throw ApiError.BadRequest("Password is incorrect");
        }
        if (!user.isConfirm) {
            throw ApiError.Forbidden();
        }

        const avatar = await UserService.getAvatar(user.avatar);

        const AuthUserDto = new UserDto(user, avatar);

        const tokens = TokenService.generateTokens({...AuthUserDto});

        await TokenService.saveToken(AuthUserDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: AuthUserDto
        }
    }
    async logout(refreshToken: string) {
        const token = await TokenService.removeToken(refreshToken);

        return token;
    }
    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = await TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);
        
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(tokenFromDb.user);

        if (!user) throw ApiError.UnauthorizedError();

        const avatar = await UserService.getAvatar(user.avatar);

        const AuthUserDto = new UserDto(user, avatar);

        const tokens = await TokenService.generateTokens({...AuthUserDto});

        await TokenService.saveToken(AuthUserDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: AuthUserDto
        }
    }
    async edit(data: {
        id: string;
        name: string;
        email: string;
        avatar?: string;
        username?: string;
        bio?: string;
    }) {
        const user = await UserModel.findById(data.id);

        if (!user) {
            throw ApiError.BadRequest('User not found');
        }

        if (data.username) {
            const candidate = await UserModel.findOne({username: data.username});

            if (candidate && candidate._id !== user._id) {
                throw ApiError.BadRequest('Username is busy!');
            }
        }

        const isChangedEmail = data.email === user.email ? false : true;

        await user.updateOne({ ...data });

        await user.save();

        return isChangedEmail ? 'You changed your email.' : true;;
    }
}

export default new AuthService();