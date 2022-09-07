import { useMemo, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { authAction } from "../../redux/reducer/authSlice";
import { menuActions } from "../../redux/reducer/menuSlice";
import { Button, Input, Modal } from "../../ui";

const Name:React.FC = () => {

  const dispatch = useAppDispatch();

  const initialState = useAppSelector(state => state.menu.valueLevel3);

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const handleOnChangeFirstName = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setFirstName(e.currentTarget.value);
  }, []);
  const handleOnChangeLastName = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setLastName(e.currentTarget.value);
  }, []);

  const handleOnCancel = useCallback(() => {
    dispatch(menuActions.hideLevel3());
  }, [dispatch]);

  const handleOnSave = () => {
    const fullname = firstName + ' ' + lastName;
    dispatch(authAction.fullname(fullname.trim()));
    handleOnCancel();
  }

  useEffect(() => {
    const values = initialState.split(' ');
    setFirstName(values[0]);
    setLastName(values[1]);
  }, [initialState]);

  return (
    <>
    <Input autoFocus={true}
      value={firstName}
      onChange={handleOnChangeFirstName}
      placeholder='First name' />
    <Input value={lastName}
      onChange={handleOnChangeLastName}
      placeholder='Last name' />
    <div className="btn-group">
      <Button text='save' onClick={handleOnSave} />
      <Button text='cancel' onClick={handleOnCancel} />
    </div>
    </>
  );
}
const Email:React.FC = () => {

  const dispatch = useAppDispatch();

  const initialState = useAppSelector(state => state.menu.valueLevel3);

  const [email, setEmail] = useState<string>('');

  const handleOnChangeEmail = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  }, []);

  const handleOnCancel = useCallback(() => {
    dispatch(menuActions.hideLevel3());
  }, [dispatch]);

  const handleOnSave = () => {
    dispatch(authAction.email(email.trim()));
    handleOnCancel();
  }

  useEffect(() => {
    const values = initialState.split(' ');
    setEmail(values[0]);
  }, [initialState]);

  return (
    <>
    <Input autoFocus={true}
      value={email}
      onChange={handleOnChangeEmail}
      placeholder='Email' />
    <div className="btn-group">
      <Button text='save' onClick={handleOnSave} />
      <Button text='cancel' onClick={handleOnCancel} />
    </div>
    </>
  );
}
const Username:React.FC = () => {

  const dispatch = useAppDispatch();

  const initialState = useAppSelector(state => state.menu.valueLevel3);

  const [username, setUsername] = useState<string>('');

  const handleOnChangeUsername = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.includes('@')) 
      e.currentTarget.value = e.currentTarget.value.replaceAll('@', '');
    setUsername(e.currentTarget.value);
  }, []);

  const handleOnCancel = useCallback(() => {
    dispatch(menuActions.hideLevel3());
  }, [dispatch]);

  const handleOnSave = () => {
    dispatch(authAction.username(('@' + username).trim()));
    handleOnCancel();
  }

  useEffect(() => {
    const values = initialState.split(' ');
    setUsername(values[0].replaceAll('@', ''));
  }, [initialState]);

  return (
    <>
    <div className="modal-level3__username">
      <Input autoFocus={true}
        value={username}
        onChange={handleOnChangeUsername}
        placeholder='Username' />
    </div>
    <div className="btn-group">
      <Button text='save' onClick={handleOnSave} />
      <Button text='cancel' onClick={handleOnCancel} />
    </div>
    </>
  );
}

const components = new Map();
components.set('name', Name);
components.set('email', Email);
components.set('username', Username);

const ModalLevel3:React.FC = () => {

  const isShow = useAppSelector(state => state.menu.isShowLevel3);
  const type = useAppSelector(state => state.menu.typeLevel3);

  const Component = useMemo(() => {
    return components.get(type);
  }, [type]);

  return(
    <>
    {isShow && (
      <Modal id='modal-level3'>
        <Component />
      </Modal>
    )}
    </>
  );
}

export default ModalLevel3;