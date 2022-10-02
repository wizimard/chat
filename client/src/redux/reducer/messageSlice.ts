import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFileShort } from "../../types/models/IFile";

type stateType = {
  messages: any[];
  addMessage: {
    type: 'channel' | 'person';
    id: string;
    text: string;
    attachments: IFileShort[];
  } | null;
}
const initialState: stateType = {
  messages: [],
  addMessage: null
}

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    newMessage(state, action: PayloadAction<{ type: 'channel' | 'person', id: string }>) {
      state.addMessage = {
        ...action.payload,
        text: '',
        attachments: []
      }
    },
    setText(state, action: PayloadAction<string>) {
      if (state.addMessage) {
        state.addMessage.text = action.payload;
      }
    },
    addAttachments(state, action: PayloadAction<IFileShort[]>) {
      if (state.addMessage) {
        state.addMessage.attachments = [...state.addMessage.attachments, ...action.payload];
      }
    },
    removeAttachment(state, action: PayloadAction<string>) {
      if (state.addMessage) {
        state.addMessage.attachments = state.addMessage.attachments.filter(attachment => attachment.id !== action.payload);
      }
    },
    sendMessage(state) {
      if (state.addMessage) {
        state.addMessage = {
          ...state.addMessage,
          text: '',
          attachments: []
        }
      }
    },
    clearMessage(state) {
      state.addMessage = null;
    }
  }
});

export const messageActions = messageSlice.actions;

export default messageSlice.reducer;