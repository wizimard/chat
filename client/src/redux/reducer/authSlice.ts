import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAuthUser } from "../../types/models/IAuthUser";

interface AuthState {
    isAuth: boolean;
    isLoading: boolean;
    user: IAuthUser | null;
};

const initialState:AuthState = {
    isAuth: false,
    isLoading: false,
    user: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        start(state) {
            state.isLoading = true;
            state.isAuth = false;
            state.user = null;
        },
        end(state) {
            state.isLoading = false;
            state.isAuth = false;
        },
        login(state, action: PayloadAction<IAuthUser>) {
            state.isLoading = false;
            state.isAuth = true;
            state.user = action.payload;
        },
        logout(state) {
            state.isAuth = false;
            state.user = null;
        }
    }
});

export const authAction = authSlice.actions;

export default authSlice.reducer;