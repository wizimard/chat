import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { JwtTokenService } from '../jwt/jwt.service';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtTokenService: JwtTokenService
    ) {}

    async signUp(email: string, password: string) {
        const checkUser = await this.userService.findOne(email);

        if (checkUser) {
            throw new HttpException('email is busy', HttpStatus.BAD_REQUEST)
        }

        const user = await this.userService.create(email, password);

        const tokens = this.jwtTokenService.generateTokens({ userId: user.id, email: user.email })

        return tokens

    }

    async signIn(email: string, password: string) {
        const user = await this.userService.findOne(email)

        if (!user) {
            throw new HttpException('email or password not match', HttpStatus.BAD_REQUEST)
        }

        if (user.password !== password) {
            throw new HttpException('email or password not match', HttpStatus.BAD_REQUEST)
        }

        const tokens = this.jwtTokenService.generateTokens({ userId: user.id, email: user.email })

        return tokens
    }
}
