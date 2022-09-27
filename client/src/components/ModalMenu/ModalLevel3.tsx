import { useMemo, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { authAction } from "../../redux/reducer/authSlice";
import { menuActions } from "../../redux/reducer/menuSlice";
import { Button, Input, Modal } from "../../ui";

interface ComponentProps {
  initialValue: string;
  handlerOnCancel: () => void;
}

const Name:React.FC<ComponentProps> = ({ initialValue, handlerOnCancel }) => {

  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const handleOnChangeFirstName = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setFirstName(e.currentTarget.value);
  }, []);
  const handleOnChangeLastName = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setLastName(e.currentTarget.value);
  }, []);

  const handleOnSave = () => {
    const fullname = firstName + ' ' + lastName;
    dispatch(authAction.name(fullname.trim()));
    handlerOnCancel();
  }

  useEffect(() => {
    const values = initialValue.split(' ');
    setFirstName(values[0] || '');
    setLastName(values[1] || '');
  }, [initialValue]);

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
      <Button onClick={handleOnSave}>save</Button>
      <Button onClick={handlerOnCancel}>cancel</Button>
    </div>
    </>
  );
}
const Email:React.FC<ComponentProps> = ({ initialValue, handlerOnCancel }) => {

  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>('');

  const handleOnChangeEmail = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  }, []);

  const handleOnSave = () => {
    dispatch(authAction.email(email.trim()));
    handlerOnCancel();
  }

  useEffect(() => {
    const values = initialValue.split(' ');
    setEmail(values[0] || '');
  }, [initialValue]);

  return (
    <>
    <Input autoFocus={true}
      value={email}
      onChange={handleOnChangeEmail}
      placeholder='Email' />
    <div className="btn-group">
      <Button onClick={handleOnSave}>save</Button>
      <Button onClick={handlerOnCancel}>cancel</Button>
    </div>
    </>
  );
}
const Username:React.FC<ComponentProps> = ({ initialValue, handlerOnCancel }) => {

  const dispatch = useAppDispatch();

  const [username, setUsername] = useState<string>('');

  const handleOnChangeUsername = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.includes('@')) 
      e.currentTarget.value = e.currentTarget.value.replaceAll('@', '');
    setUsername(e.currentTarget.value);
  }, []);

  const handleOnSave = () => {
    dispatch(authAction.username(('@' + username).trim()));
    handlerOnCancel();
  }

  useEffect(() => {
    const values = initialValue.split(' ');
    setUsername(values[0] ? values[0].replaceAll('@', '') : '');
  }, [initialValue]);

  return (
    <>
    <div className="modal-level3__username">
      <Input autoFocus={true}
        value={username}
        onChange={handleOnChangeUsername}
        placeholder='Username' />
    </div>
    <div className="btn-group">
      <Button onClick={handleOnSave}>save</Button>
      <Button onClick={handlerOnCancel}>cancel</Button>
    </div>
    </>
  );
}

const Link:React.FC<ComponentProps> = ({ initialValue, handlerOnCancel }) => {

  const dispatch = useAppDispatch();

  const [link, setLink] = useState('');

  const handlerOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.currentTarget.value);
  }, []);

  const handlerOnSave = () => {
    dispatch(authAction.link({
      oldValue: initialValue,
      newValue: link
    }));
    handlerOnCancel();
  }

  useEffect(() => {
    if (initialValue && initialValue !== 'new')
      setLink(initialValue);
  }, [initialValue]);

  return (
    <>
    <Input autoFocus={true}
      value={link}
      onChange={handlerOnChange} />
    <div className="btn-group">
      <Button onClick={handlerOnSave}>save</Button>
      <Button onClick={handlerOnCancel}>cancel</Button>
    </div>
    </>
  );
}

const components = new Map();
components.set('name', Name);
components.set('email', Email);
components.set('username', Username);
components.set('link', Link);

const ModalLevel3:React.FC = () => {

  const dispatch = useAppDispatch();

  const isShow = useAppSelector(state => state.menu.isShowLevel3);
  const type = useAppSelector(state => state.menu.typeLevel3);
  const initialValue = useAppSelector(state => state.menu.valueLevel3);

  const Component = useMemo(() => {
    return components.get(type);
  }, [type]);

  const handlerOnCancel = useCallback(() => {
    dispatch(menuActions.hideLevel3());
  }, [dispatch]);

  return(
    <>
    {isShow && (
      <Modal id='modal-level3'>
        <Component initialValue={initialValue} handlerOnCancel={handlerOnCancel} />
      </Modal>
    )}
    </>
  );
}

export default ModalLevel3;