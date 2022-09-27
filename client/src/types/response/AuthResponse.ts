import { IUserAuth } from "../models/IUser";

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUserAuth;
}
export type AuthResponseEdit = string | true;