import { useCallback } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { menuActions } from "../../redux/reducer/menuSlice";
import MessagesSvg from "../../svg/messages";
import PlusSvg from "../../svg/plus";
import SettingsSvg from "../../svg/settings";
import UsersSvg from "../../svg/users";

const actions = new Map();
actions.set('new_channel', menuActions.newChannel);
actions.set('friends', menuActions.friends);
actions.set('channels', menuActions.channels);
actions.set('settings', menuActions.settings);

const Menu:React.FC = () => {
  const dispatch = useAppDispatch();

  const handleOnClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const func = actions.get(e.currentTarget.name);
    if (func) dispatch(func());
  }, [dispatch]);

  return (
    <ul className="menu">
      <li>
        <button name='new_channel' onClick={handleOnClick}>
          <PlusSvg />
          <span>New Channel</span>
        </button>
      </li>
      <li>
        <button name='friends' onClick={handleOnClick}>
          <UsersSvg />
          <span>Friends</span>  
        </button>
      </li>
      <li>
        <button name='channels' onClick={handleOnClick}>
          <MessagesSvg />
          <span>Channels</span>
        </button>
      </li>
      <li>
        <button name='settings' onClick={handleOnClick}>
          <SettingsSvg />
          <span>Settings</span>
        </button>
      </li>
    </ul>
  );
}

export default Menu;