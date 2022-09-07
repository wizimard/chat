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
  user: {
    id: '1',
    fullname: 'Leo Gill', 
    avatar: 'https://image.winudf.com/v2/image/Y29tLnNlbmNlc3R1ZGlvLmdpcmxzc2VsZmllX3NjcmVlbl8zXzE1MTc0NTg3MTBfMDU0/screen-3.jpg?fakeurl=1&type=.webp',
    email: 'maskim2517@gmail.com',
    links: ['https://facebook.com', 'https://vk.com'],
    bio: 'Frontend developer',
    birthday: (new Date()).toString()
  },
  changeUser: {
    id: '1',
    fullname: 'Leo Gill', 
    avatar: 'https://image.winudf.com/v2/image/Y29tLnNlbmNlc3R1ZGlvLmdpcmxzc2VsZmllX3NjcmVlbl8zXzE1MTc0NTg3MTBfMDU0/screen-3.jpg?fakeurl=1&type=.webp',
    email: 'maskim2517@gmail.com',
    links: ['https://facebook.com', 'https://vk.com'],
    bio: 'Frontend developer',
    birthday: (new Date()).toString(),
    isChanged: false
  }
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
          if (state.changeUser) {
            state.changeUser = {
              ...state.changeUser,
              bio: action.payload,
              isChanged: true
            }
          }
        },
        fullname(state, action: PayloadAction<string>) {
          if (state.changeUser) {
            state.changeUser = {
              ...state.changeUser,
              fullname: action.payload,
              isChanged: true
            }
          }
        },
        email(state, action: PayloadAction<string>) {
          if (state.changeUser) {
            state.changeUser = {
              ...state.changeUser,
              email: action.payload,
              isChanged: true
            }
          }
        },
        username(state, action: PayloadAction<string>) {
          if (state.changeUser) {
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