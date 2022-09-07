import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalState = {
    type: 'message' | 'error' | 'loading';
    message: string;
    isShow: boolean | 'hide';
};

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
        error(state, action: PayloadAction<string>) {
            state.type = 'error';
            state.message = action.payload;
            state.isShow = true;
        },
        loading(state) {
            state.type = 'loading';
            state.isShow = true;
        },
        prepareHideModal(state) {
            state.isShow = 'hide';
        },
        hideModal(state) {
            state.message = '';
            state.isShow = false;
        }
    }
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;