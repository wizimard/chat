import UserService from "../../services/UserService";
import { chatActions } from "../reducer/chatSlice"
import { AppDispatch } from "../store"

export const fetchContacts = () => {
  return async(dispatch: AppDispatch) => {
    try {
    } catch(e) {
      dispatch(chatActions.fetchConstactsError('error'));
    }
  }
}
export const fetchCurrentContact = (url: string) => {
  return async(dispatch: AppDispatch) => {
    dispatch(chatActions.fetchCurrentContact());
    try {
      const [type, id] = url.split('=');

      if ((type !== 'ch' && type !== 'sel') || !id) {
        // dispatch(chatActions.fetchCurrentContactSuccess());
      }
      if (type === 'ch') {
        return;
      }
      const response = await UserService.getUser(id);

      dispatch(chatActions.fetchCurrentContactSuccess(response.data));

    } catch(e) {
      dispatch(chatActions.fetchCurrentContactError('error'));
    }
  }
}