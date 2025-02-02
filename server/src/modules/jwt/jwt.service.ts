import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtPayloadType } from './jwt.types';
import prisma from 'src/db/prisma/client';
import { JwtService } from '@nestjs/jwt';
import { JWT_ACCESS_SECRET } from 'src/shared/constants/jwt.constants';

@Injectable()
export class JwtTokenService {

    constructor(private jwtService: JwtService) {}

    async generateTokens(payload: JwtPayloadType) {
        await this.deleteTokens(payload.userId)

        const accessToken = await this.jwtService.signAsync(payload, {
            secret: JWT_ACCESS_SECRET,
            expiresIn: '15m'
        });

        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: JWT_ACCESS_SECRET,
            expiresIn: '7d'
        });

        const authTokens = await prisma.authToken.create({
            data: {
                userId: payload.userId,
                accessToken,
                refreshToken
            }
        })

        if (!authTokens) {
            throw new InternalServerErrorException()
        }

        return {
            accessToken,
            refreshToken
        }
    }

    async deleteTokens(userId: number) {
        const authToken = await prisma.authToken.deleteMany({
            where: {
                userId,
            }
        })

        return !!authToken
    }

    async updateTokens(payload: JwtPayloadType) {
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: JWT_ACCESS_SECRET,
            expiresIn: '15m'
        });

        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: JWT_ACCESS_SECRET,
            expiresIn: '7d'
        });

        const authTokens = await prisma.authToken.update({
            where: {
                userId: payload.userId
            },
            data: {
                accessToken,
                refreshToken
            }
        })

        if (!authTokens) {
            throw new InternalServerErrorException()
        }

        return {
            accessToken,
            refreshToken
        }
    }
}
