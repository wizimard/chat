import { useCallback, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { editUser } from "../../redux/action-creators/auth.action-creator";
import { authAction } from "../../redux/reducer/authSlice";
import { menuActions } from "../../redux/reducer/menuSlice";
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
        dispatch(menuActions.name(changeUser.name || ''));
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
  const handleOnClickBtnLink = useCallback((link: string) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      dispatch(menuActions.link(link));
      e.currentTarget.blur();
    }
  }, [dispatch]);

  const handleSave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    changeUser && dispatch(editUser({
      name: changeUser.name,
      email: changeUser.email,
      username: changeUser.username,
      avatar: changeUser.avatar,
      bio: changeUser.bio
    }));
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
          <span className="modal__profile--title">{ changeUser.name }</span>
        </div>
        <Editor className="modal__profile--bio"
          dangerouslySetInnerHTML={{__html: changeUser.bio ?? ''}}
          onInput={handleOnInputBio}
          onBlur={handleSaveBio}
          placeholder='bio...' />
        <button name='name' className="modal__profile--btn" onClick={handleOnClickBtn}>
          <span>Fullname</span><span>{changeUser.name}</span>
        </button>
        <button name='email' className="modal__profile--btn" onClick={handleOnClickBtn}>
          <span>Email</span><span>{changeUser.email}</span>
        </button>
        <button name='username' className="modal__profile--btn" onClick={handleOnClickBtn}>
          <span>Username</span><span>{changeUser.username || 'Add username'}</span>
        </button>
        <button name='birthday' className="modal__profile--btn" onClick={handleOnClickBtn}>
          <span>Birthday</span><span>{changeUser.birthday || 'Add birthday'}</span>
        </button>
        <span className="modal__profile--links-title">Links</span>
        {changeUser.links.map(link => (
          <>
          {link && (
            <button key={link} className="modal__profile--btn" onClick={handleOnClickBtnLink(link)}>
              <span>{ link }</span>
            </button>
          )}
          </>
        ))}
        <button className="modal__profile--btn modal__profile--btn-add" onClick={handleOnClickBtnLink('new')}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 0H5V5L0 5V9H5V14H9V9H14V5L9 5V0Z" fill="#A4A4A4"/>
          </svg>
          <span>Add link</span>
        </button>
        {changeUser.isChanged && (
          <div className="btn-group">
            <Button onClick={handleSave}>save</Button>
            <Button onClick={handleCancel}>cancel</Button>
          </div>
        )}
      </div>
    )}
    </>
  );
}

export default Profile;