import { combineReducers } from "redux";

import auth from './authSlice';
import modal from './modalSlice';
import chat from './chatSlice';
import menu from './menuSlice';

export default combineReducers({
    auth,
    modal,
    chat,
    menu
});