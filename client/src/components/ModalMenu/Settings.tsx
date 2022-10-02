import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { menuActions } from "../../redux/reducer/menuSlice";
import LockSvg from "../../svg/lock";
import LogoutSvg from "../../svg/logout";
import ThemeSvg from "../../svg/theme";
import UserSvg from "../../svg/user";
import { Avatar, MenuButton } from "../../ui";

enum NAMES {
  PROFILE = 'PROFILE',
  SECURITY = 'SECURITY'
}

const actions = new Map();
actions.set(NAMES.PROFILE, menuActions.profile);
actions.set(NAMES.SECURITY, menuActions.security);

const Settings:React.FC = () => {

  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.auth.user);

  const handlerOnClickMenuItem = useCallback((name: string) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      const func = actions.get(name);
      if (func) dispatch(func());
      e.currentTarget.blur();
    }
  }, [dispatch]);

  return (
    <>
    {user && (
      <div className="modal__user">
        <Avatar name={user.name} 
          img={user?.avatar?.url}
          attributes={{ style: { fontSize: '1.5em' } }} />
        <div className="modal__user--info">
          <span className="modal__user--username">{user.name}</span>
          <span>{user.email}</span>
        </div>
      </div>
    )}
    <div className="modal__menu">
      <MenuButton onClick={handlerOnClickMenuItem(NAMES.PROFILE)}>
        <UserSvg />
        Edit profile
      </MenuButton>
      <MenuButton onClick={handlerOnClickMenuItem(NAMES.SECURITY)}>
        <LockSvg />
        Security
      </MenuButton>
      <button className="btn-img modal__btn modal__btn_abs modal__logout">
        <LogoutSvg />
        Logout
      </button>
      <button className="btn-img modal__btn_abs modal__theme">
        <ThemeSvg />
      </button>
    </div>
    </>
  );
}

export default Settings;