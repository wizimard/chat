import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChannel } from "../../types/models/IChannel";
import { IChat, IChatPerson } from "../../types/models/IChat";
import { IUserInfo } from "../../types/models/IUser";

interface ChatState {
 contacts: (IChat | IChatPerson)[];
 currentContact: ChatCurrentContact | null;
 isLoadingContacts: boolean;
 isLoadingContact: boolean;
 errorContacts: string;
 errorCurrentContact: string;
}
type ChatCurrentContact = {type: 'channel', content: IChannel} | {type: 'person', content: IUserInfo};

const initialState: ChatState = {
    contacts: [],
    currentContact: null,
    isLoadingContacts: false,
    isLoadingContact: false,
    errorContacts: '',
    errorCurrentContact: ''
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        fetchContacts(state) {
            state.isLoadingContacts = true;
            state.errorContacts = '';
        },
        fetchContactsSuccess(state, action: PayloadAction<(IChat | IChatPerson)[]>) {
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
        fetchCurrentContactSuccess(state, action: PayloadAction<ChatCurrentContact | null>) {
            state.isLoadingContact = false;
            state.currentContact = action.payload;
        },
        fetchCurrentContactError(state, action: PayloadAction<string>) {
            state.errorCurrentContact = action.payload;
            state.currentContact = null;
            state.isLoadingContact = false;
        }
    }
});

export const chatActions = chatSlice.actions;

export default chatSlice.reducer;