import axios, { AxiosResponse } from "axios";

import $api from '.';
import { IUser } from "../types/models/IUser";
import { AuthResponse } from "../types/response/AuthResponse";

class AuthService {
    async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return await $api.post<AuthResponse>('/login', { email, password });
    }
    async register(email: string, password: string, fullname: string) {
        return await $api.post('/register', { email, password, fullname });
    }
    async logout() {
        return await $api.post('/logout');
    }
    async checkAuth(): Promise<AxiosResponse<AuthResponse>> {
        return await axios.get<AuthResponse>(`${process.env.REACT_APP_API_URL}/refresh`, {
            withCredentials: true
        })
    }
    async editUser(data: IUser) {
        console.log(data);
        return await $api.post('/edit', { data });
    }
}

export default new AuthService();