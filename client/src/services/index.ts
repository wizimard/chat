import axios, { AxiosInstance } from "axios"

import AuthService from "./AuthService";

async function responseErrorMiddleware(error: any, api: AxiosInstance) {
    const originalRequest = error.config;
    if (error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await AuthService.checkAuth();

            localStorage.setItem('token', response.data.accessToken);
    
            return api.request(originalRequest);
        } catch(e) {
            console.log('User is unauthorized');
        }
    }
    if (error.response.status !== 401) {
        return Promise.reject(error);
    }
}

const $api = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BACKEND_URL
});

$api.interceptors.request.use((config) => {
    config.headers = {
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        'Content-Type': "application/json; charset=utf-8",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': "GET, POST, PUT, DELETE OPTIONS",
        'Accept': '*',
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    return config;
});
$api.interceptors.response.use((config) => {
    return config;
}, async(error) => responseErrorMiddleware(error, $api));

export default $api;

export const $apiFile = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

$apiFile.interceptors.request.use((config) => {
    config.headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    return config;
});
$apiFile.interceptors.response.use((config) => {
    return config;
}, async(error) => responseErrorMiddleware(error, $apiFile));