import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { menuActions } from "../../redux/reducer/menuSlice";
import LockSvg from "../../svg/lock";
import LogoutSvg from "../../svg/logout";
import ThemeSvg from "../../svg/theme";
import UserSvg from "../../svg/user";
import { Avatar } from "../../ui";

const actions = new Map();
actions.set('profile', menuActions.profile);
actions.set('security', menuActions.security);

const Settings:React.FC = () => {

  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.auth.user);

  const handlerOnClickMenuItem = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const func = actions.get(e.currentTarget.name);
    if (func) dispatch(func());
    e.currentTarget.blur();
  }, [dispatch]);

  return (
    <>
    {user && (
      <div className="modal__user">
        <Avatar img={user.avatar} />
        <div className="modal__user--info">
          <span className="modal__user--username">{user.fullname}</span>
          <span>{user.email}</span>
        </div>
      </div>
    )}
    <div className="modal__menu">
      <button className="modal__btn"
        name='profile'
        onClick={handlerOnClickMenuItem}>
        <UserSvg />
        Edit profile
      </button>
      <button className="modal__btn"
        name='security'
        onClick={handlerOnClickMenuItem}>
        <LockSvg />
        Security
      </button>
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