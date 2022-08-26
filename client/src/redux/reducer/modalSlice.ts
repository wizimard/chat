import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
    type: 'message' | 'error';
    message: string;
    isShow: boolean;
}
const initialState:ModalState = {
    type: 'message',
    message: '',
    isShow: false
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        message(state, action: PayloadAction<string>) {
            state.type = 'message';
            state.message = action.payload;
            state.isShow = true;
        },
        hideModal(state) {
            state.message = '';
            state.isShow = false;
        },
        error(state, action: PayloadAction<string>) {
            state.type = 'error';
            state.message = action.payload;
            state.isShow = true;
        }
    }
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;