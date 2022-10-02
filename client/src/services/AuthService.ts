import axios, { AxiosResponse } from "axios";

import $api from '.';
import { IUser } from "../types/models/IUser";
import { UserEditRequest } from "../types/request/UserEditRequest";
import { AuthResponse, AuthResponseEdit } from "../types/response/AuthResponse";

class AuthService {
    async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return await $api.post<AuthResponse>('/login', { email, password });
    }
    async register(email: string, password: string, name: string) {
        return await $api.post('/register', { email, password, name });
    }
    async logout() {
        return await $api.post('/logout');
    }
    async checkAuth(): Promise<AxiosResponse<AuthResponse>> {
        return await axios.get<AuthResponse>(`${process.env.REACT_APP_API_URL}/refresh`, {
            withCredentials: true
        })
    }
    async editUser(data: UserEditRequest): Promise<AxiosResponse<AuthResponseEdit>> {
        return await $api.put<AuthResponseEdit>('/user/edit', { data });
    }
}

export default new AuthService();