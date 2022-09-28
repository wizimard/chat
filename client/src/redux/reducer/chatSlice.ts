import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChannel } from "../../types/models/IChannel";
import { IContact } from "../../types/models/IContacts";
import { IUserInfo } from "../../types/models/IUser";

type ChatCurrentContact = IChannel | IUserInfo;

interface ChatState {
  contacts: IContact[];
  currentContact: ChatCurrentContact | null;
  isLoadingContacts: boolean;
  isLoadingContact: boolean;
  errorContacts: string;
  errorCurrentContact: string;
  errorChat: string;
  isEmpty: boolean;
}

const initialState: ChatState = {
  contacts: [],
  currentContact: null,
  isLoadingContacts: false,
  isLoadingContact: false,
  errorContacts: '',
  errorCurrentContact: '',
  errorChat: '',
  isEmpty: true
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    fetchContacts(state) {
      state.isLoadingContacts = true;
      state.errorContacts = '';
    },
    fetchContactsSuccess(state, action: PayloadAction<IContact[]>) {
      state.contacts = action.payload;
      state.isLoadingContacts = false;
    },
    fetchConstactsError(state, action: PayloadAction<string>) {
      state.errorContacts = action.payload;
      state.isLoadingContacts = false;
    },
    fetchCurrentContact(state) {
      state.isLoadingContact = true;
      state.errorCurrentContact = '';
    },
    fetchCurrentContactSuccess(state, action: PayloadAction<IChannel | IUserInfo>) {
      state.currentContact = action.payload;
      state.isEmpty = false;
      state.isLoadingContact = false;
    },
    fetchCurrentContactError(state, action: PayloadAction<string>) {
      state.errorCurrentContact = action.payload;
      state.currentContact = null;
      state.isLoadingContact = false;
    },
    clearCurrentContact(state) {
      state.currentContact = null;
      state.isEmpty = true;
    },
    addFriend(state) {
      if (state.currentContact && 'isFriend' in state.currentContact) {
        state.currentContact.isFriend = true;
      }
    },
    removeFriend(state) {
      if (state.currentContact && 'isFriend' in state.currentContact) {
        state.currentContact.isFriend = false;
      }
    }
  }
});

export const chatActions = chatSlice.actions;

export default chatSlice.reducer;