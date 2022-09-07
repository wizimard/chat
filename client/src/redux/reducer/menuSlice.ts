import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MenuState = {
  type: 'new_channel' | 'channels' | 'friends' | 'settings';
  typeLevel2: 'profile' | 'security';
  typeLevel3: 'name' | 'email' | 'username';
  isShow: boolean | 'hide';
  isShowLevel2: boolean | 'hide';
  isShowLevel3: boolean;
  valueLevel3: string;
  isVisibleSidebar: boolean;
}
const initialState:MenuState = {
  type: 'settings',
  typeLevel2: 'profile',
  typeLevel3: 'name',
  isShow: false,
  isShowLevel2: false,
  isShowLevel3: false,
  valueLevel3: '',
  isVisibleSidebar: false
}
export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    showSidebar(state) {
        state.isVisibleSidebar = true;
    },
    hideSidebar(state) {
        state.isVisibleSidebar = false;
    },
    newChannel(state) {
      state.type = 'new_channel'
      state.isShow = true;
      state.isVisibleSidebar = false;
    },
    channels(state) {
      state.type = 'channels'
      state.isShow = true;
      state.isVisibleSidebar = false;
    },
    friends(state) {
      state.type = 'friends'
      state.isShow = true;
      state.isVisibleSidebar = false;
    },
    settings(state) {
      state.type = 'settings'
      state.isShow = true;
      state.isVisibleSidebar = false;
    },
    prepareHideModal(state) {
      state.isShow = 'hide';
    },
    hideModal(state) {
      state.isShow = false;
    },
    profile(state) {
      state.typeLevel2 = 'profile';
      state.isShowLevel2 = true;
    },
    security(state) {
      state.typeLevel2 = 'security';
      state.isShowLevel2 = true;
    },
    prepareHideLevel2(state) {
      state.isShowLevel2 = 'hide';
    },
    hideLevel2(state) {
      state.isShowLevel2 = false;
    },
    name(state, action: PayloadAction<string>) {
      state.typeLevel3 = 'name';
      state.valueLevel3 = action.payload;
      state.isShowLevel3 = true;
    },
    email(state, action: PayloadAction<string>) {
      state.typeLevel3 = 'email';
      state.valueLevel3 = action.payload;
      state.isShowLevel3 = true;
    },
    username(state, action: PayloadAction<string>) {
      state.typeLevel3 = 'username';
      state.valueLevel3 = action.payload;
      state.isShowLevel3 = true;
    },
    hideLevel3(state) {
      state.isShowLevel3 = false;
    }
  }
});

export const menuActions = menuSlice.actions;

export default menuSlice.reducer;