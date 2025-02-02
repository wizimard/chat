import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "src/shared/constants/jwt.constants";
import { JwtPayloadType } from "./jwt.types";
import { Request } from "express";

export const extractRefreshTokenFromCookies = (req: Request, tokenName: string) => {
    const refreshToken = req.cookies[tokenName];

    return refreshToken || null;
}

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {
    constructor() {
        super({
            jwtFromRequest: (Req: Request) => extractRefreshTokenFromCookies(Req, 'access_token'),
            ignoreExpiration: false,
            secretOrKey: JWT_ACCESS_SECRET
        })
    }

    async validate(payload: JwtPayloadType) {
        return payload
    }
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: (Req: Request) => extractRefreshTokenFromCookies(Req, 'refresh_token'),
            ignoreExpiration: false,
            secretOrKey: JWT_REFRESH_SECRET,
            passReqToCallback: true
        })
    }

    async validate(payload: JwtPayloadType) {
        return payload
    }
}