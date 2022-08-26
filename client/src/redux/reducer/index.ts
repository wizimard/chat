import { combineReducers } from "redux";

import auth from './authSlice';
import modal from './modalSlice';

export default combineReducers({
    auth,
    modal
});