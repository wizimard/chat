import { useCallback, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { editUser } from "../../redux/action-creators/auth.action-creator";
import { authAction } from "../../redux/reducer/authSlice";
import { menuActions } from "../../redux/reducer/menuSlice";
import { modalActions } from "../../redux/reducer/modalSlice";
import { Avatar, Button, Editor } from "../../ui";
import FileUpload from "../FileUpload";

const Profile:React.FC = () => {

  const dispatch = useAppDispatch();

  const changeUser = useAppSelector(state => state.auth.changeUser);

  const [bio, setBio] = useState(changeUser?.bio ?? '');

  const handleOnInputBio = useCallback((e: React.FormEvent<HTMLDivElement>) => {
    if (e.currentTarget.innerText.includes('\n')) {
      e.currentTarget.innerText = e.currentTarget.innerText.replaceAll('\n', '');
      e.currentTarget.blur();
      return;
    }
    setBio(e.currentTarget.textContent || '');
  }, []);

  const handleSaveBio = () => {
    dispatch(authAction.bio(bio));
  }

  const handleOnClickBtn = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!changeUser) return;
    const name = e.currentTarget.name;
    switch(name) {
      case 'name':
        dispatch(menuActions.name(changeUser.fullname || ''));
        break;
      case 'email':
        dispatch(menuActions.email(changeUser.email || ''));
        break;
      case 'username':
        dispatch(menuActions.username(changeUser?.username || ''));
        break;
    }
    e.currentTarget.blur();
  }, [dispatch, changeUser]);

  const handleSave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    changeUser && dispatch(editUser(changeUser));
    e.currentTarget.blur();
  }, [dispatch, changeUser]);
  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(authAction.cancel());
    e.currentTarget.blur();
  }, [dispatch]);

  const handleSelectImage = useCallback((files: string[]) => {
    if (files[0]) dispatch(authAction.avatar(files[0]));
   }, [dispatch]);

  useEffect(() => {
    return () => {
      if (changeUser?.isChanged) {
        dispatch(authAction.cancel());
      }
    }
  }, [dispatch, changeUser?.isChanged]);

  return (
    <>
    {changeUser && (
      <div className="modal__content modal__profile">
        <div className="modal__profile--top">
          <div className="modal__profile--avatar">
            <Avatar img={changeUser.avatar} />
            <label className="modal__profile--avatar-change">
              <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 0H14V14H0V0ZM5 8L7 10L12 5V12H2V11L5 8ZM5.5 6C6.32843 6 7 5.32843 7 4.5C7 3.67157 6.32843 3 5.5 3C4.67157 3 4 3.67157 4 4.5C4 5.32843 4.67157 6 5.5 6Z" fill="#FFFFFF"/>
              </svg>
              <FileUpload accept="image/png, image/jpeg, image/jpg" 
                onChange={handleSelectImage} />
            </label>
          </div>
          <span className="modal__profile--title">{ changeUser.fullname }</span>
        </div>
        <Editor className="modal__profile--bio"
          dangerouslySetInnerHTML={{__html: changeUser.bio ?? ''}}
          onInput={handleOnInputBio}
          onBlur={handleSaveBio}
          placeholder='bio...' />
        <button name='name' className="modal__profile--btn" onClick={handleOnClickBtn}>
          <span>Name</span><span>{changeUser.fullname}</span>
        </button>
        <button name='email' className="modal__profile--btn" onClick={handleOnClickBtn}>
          <span>Email</span><span>{changeUser.email}</span>
        </button>
        <button name='username' className="modal__profile--btn" onClick={handleOnClickBtn}>
          <span>Username</span><span>{changeUser.username || 'Add username'}</span>
        </button>
        {changeUser.isChanged && (
          <div className="btn-group">
            <Button text='save' onClick={handleSave} />
            <Button text='cancel' onClick={handleCancel} />
          </div>
        )}
      </div>
    )}
    </>
  );
}

export default Profile;