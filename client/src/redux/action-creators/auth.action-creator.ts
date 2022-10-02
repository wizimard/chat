import AuthService from "../../services/AuthService";
import { IUser } from "../../types/models/IUser";
import { UserEditRequest } from "../../types/request/UserEditRequest";
import { authAction } from "../reducer/authSlice"
import { modalActions } from "../reducer/modalSlice";
import { AppDispatch } from "../store"

export const login = (email: string, password: string) => {
    return async(dispatch: AppDispatch) => {
        dispatch(authAction.start());
        try {
            const response = await AuthService.login(email, password);

            localStorage.setItem('token', response.data.accessToken);

            dispatch(authAction.login(response.data.user));

        } catch(e: any) {
            if (e.response.status === 403) {
                dispatch(modalActions.message(e.response.data.message));
            }
        }
    }
}
export const register = (email: string, password: string, name: string) => {
    return async(dispatch: AppDispatch) => {
        dispatch(authAction.start());
        try {
            await AuthService.register(email, password, name);

            dispatch(authAction.end());

            dispatch(modalActions.message('An email with a confirmation email link has been sent to your email.\nVerify your email address to continue.'));
        } catch(e: any) {
            if (e.response.status === 400) {
                dispatch(modalActions.error(e.response.data.message));
            }
        }
    }
}
export const logout = () => {
    return async(dispatch: AppDispatch) => {
        try {
            dispatch(authAction.logout());

            await AuthService.logout();
        } catch(e) {
            console.log(e);
        }
    }
}
export const checkAuth = () => {
    return async(dispatch: AppDispatch) => {
        try {
            const response = await AuthService.checkAuth();

            dispatch(authAction.login(response.data.user));

            return true;
        } catch(e) {
            console.log(e);
        }
        return false;
    }
}
export const editUser = (data: UserEditRequest) => {
    return async(dispatch: AppDispatch) => {
        dispatch(modalActions.loading());
        try {
            const response = await AuthService.editUser(data);

            dispatch(authAction.save());

            dispatch(modalActions.hideModal());

            if (typeof response.data === 'string') dispatch(modalActions.message(response.data));
        } catch(e) {
            console.log(e);
            dispatch(modalActions.error('Error while trying to edit user data'));
        }
    }
}