import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginBody, RegisterBody } from './models/requests';
import { AuthService } from './auth.service';
import { Public } from 'src/shared/decorators/public.decorator';
import { JwtTokenService } from '../jwt/jwt.service';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
        private jwtTokenService: JwtTokenService
    ) {}

    @Public()
    @Post('login')
    async login(@Body() loginBody: LoginBody, @Res({ passthrough: true }) res: Response) {
        const tokens = await this.authService.signIn(loginBody.email, loginBody.password)

        res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
        res.cookie('access_token', tokens.accessToken, { httpOnly: true });

        return {
            message: 'Ok'
        }
    }

    @Public()
    @Post('register')
    async register(@Body() registerBody: RegisterBody, @Res({ passthrough: true }) res: Response) {
        const tokens = await this.authService.signUp(registerBody.email, registerBody.password)

        res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
        res.cookie('access_token', tokens.accessToken, { httpOnly: true });

        return {
            message: 'Ok'
        }
    }

    @Get('logout')
    async logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('refresh_token');
        res.clearCookie('access_token');

        return {
            message: 'Ok'
        }
    }

    @Get('refresh')
    async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const tokens = await this.jwtTokenService.updateTokens({
            userId: req.user.userId,
            email: req.user.email
        })

        res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
        res.cookie('access_token', tokens.accessToken, { httpOnly: true });

        return {
            message: 'Ok'
        }
    }
}
