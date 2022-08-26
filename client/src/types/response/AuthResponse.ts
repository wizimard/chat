import { IAuthUser } from "../models/IAuthUser";

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IAuthUser;
}