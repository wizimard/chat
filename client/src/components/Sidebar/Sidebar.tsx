import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { logout } from "../../redux/action-creators/auth.action-creator";
import { menuActions } from "../../redux/reducer/menuSlice";
import LogoutSvg from "../../svg/logout";
import Menu from "./Menu";
import User from "./User";

const Sidebar:React.FC = () => {

  const dispatch = useAppDispatch();

  const isVisible = useAppSelector(state => state.menu.isVisibleSidebar);

  const [isShow, setIsShow] = useState(false);

  const handleCloseSidebar = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch(menuActions.hideSidebar());
  }, [dispatch]);

  const handleOnClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    window.location.href = '/login';
  }, [dispatch]);

  useEffect(() => {
    if (!isVisible) {
      setTimeout(() => { setIsShow(false) }, 200)
      return;
    }
    setIsShow(true);
  }, [isVisible]);

  return (
    <>
    {isShow && (
    <div className="sidebar-container" onClick={handleCloseSidebar}>
      <div id='sidebar' className={`sidebar ${!isVisible ? 'sidebar-hide' : ''}`} onClick={handleOnClick}>
        <User />
        <Menu />
        <div className="sidebar__logout">
          <button onClick={handleLogout}>
            <LogoutSvg />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
    )}
    </>
  );
}

export default Sidebar;