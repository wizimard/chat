import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUser } from "../../types/models/IUser";

interface AuthState {
  isAuth: boolean;
  isLoading: boolean;
  user: IUser | null;
  changeUser: IUser & {
    isChanged: boolean;
  } | null;
};

const initialState:AuthState = {
  isAuth: false,
  isLoading: false,
  user: null,
  changeUser: null
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
        login(state, action: PayloadAction<IUser>) {
            state.isLoading = false;
            state.isAuth = true;
            state.user = action.payload;
            state.changeUser = {
              ...action.payload,
              isChanged: false
            };
        },
        logout(state) {
            state.isAuth = false;
            state.user = null;
        },
        bio(state, action: PayloadAction<string>) {
          if (state.changeUser && state.changeUser.bio !== action.payload) {
            state.changeUser = {
              ...state.changeUser,
              bio: action.payload,
              isChanged: true
            }
          }
        },
        name(state, action: PayloadAction<string>) {
          if (state.changeUser && state.changeUser.name !== action.payload) {
            state.changeUser = {
              ...state.changeUser,
              name: action.payload,
              isChanged: true
            }
          }
        },
        email(state, action: PayloadAction<string>) {
          if (state.changeUser && state.changeUser.email !== action.payload) {
            state.changeUser = {
              ...state.changeUser,
              email: action.payload,
              isChanged: true
            }
          }
        },
        username(state, action: PayloadAction<string>) {
          if (state.changeUser && state.changeUser.username !== action.payload) {
            state.changeUser = {
              ...state.changeUser,
              username: action.payload,
              isChanged: true
            }
          }
        },
        avatar(state, action: PayloadAction<string>) {
          if (state.changeUser) {
            state.changeUser = {
              ...state.changeUser,
              avatar: action.payload,
              isChanged: true
            }
          }
        },
        link(state, action: PayloadAction<{ oldValue: string, newValue: string }>) {
          if (state.changeUser) {
            if (action.payload.newValue in state.changeUser.links) return;

            if (action.payload.oldValue === 'new') {
              state.changeUser.links = [...state.changeUser.links, action.payload.newValue.trim()];
            } else {
              state.changeUser.links = state.changeUser.links.join(' ')
                .replace(action.payload.oldValue.trim(), action.payload.newValue.trim())
                .split(' ');
            }
          }
        },
        save(state) {
          if (state.changeUser) {
            state.user = state.changeUser;
            state.changeUser.isChanged = false;
          }
        },
        cancel(state) {
          if (state.user) {
            state.changeUser = JSON.parse(JSON.stringify(state.user));
          }
        }
    }
});

export const authAction = authSlice.actions;

export default authSlice.reducer;