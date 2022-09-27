import { useCallback } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { menuActions } from "../../redux/reducer/menuSlice";
import MessagesSvg from "../../svg/messages";
import PlusSvg from "../../svg/plus";
import SettingsSvg from "../../svg/settings";
import UsersSvg from "../../svg/users";
import { MenuButton } from "../../ui";

enum NAMES {
  NEW_CHANNEL = 'NEW_CHANNEL',
  FRIENDS = 'FRIENDS',
  CHANNELS = 'CHANNELS',
  SETTINGS = 'SETTINGS'
}

const actions = new Map();
actions.set(NAMES.NEW_CHANNEL, menuActions.newChannel);
actions.set(NAMES.FRIENDS, menuActions.friends);
actions.set(NAMES.CHANNELS, menuActions.channels);
actions.set(NAMES.SETTINGS, menuActions.settings);

const Menu:React.FC = () => {
  const dispatch = useAppDispatch();

  const handleOnClick = useCallback((name: string) => {
    return () => {
      const func = actions.get(name);
      if (func) dispatch(func());
    };
  }, [dispatch]);

  return (
    <ul className="menu">
      <li>
        <MenuButton onClick={handleOnClick(NAMES.SETTINGS)}>
          <PlusSvg />
          <span>New Channel</span>
        </MenuButton>
      </li>
      <li>
        <MenuButton onClick={handleOnClick(NAMES.FRIENDS)}>
          <UsersSvg />
          <span>Friends</span>  
        </MenuButton>
      </li>
      <li>
        <MenuButton onClick={ handleOnClick(NAMES.CHANNELS)}>
          <MessagesSvg />
          <span>Channels</span>
        </MenuButton>
      </li>
      <li>
        <MenuButton onClick={handleOnClick(NAMES.SETTINGS)}>
          <SettingsSvg />
          <span>Settings</span>
        </MenuButton>
      </li>
    </ul>
  );
}

export default Menu;