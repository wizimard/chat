import { ChangeEvent, useCallback, useEffect, useState, MouseEvent } from "react";
import { useLocation } from "react-router-dom";

import { Burger, Input } from "../../ui";
import Person from "./Person";
import Channel from "./Channel";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { menuActions } from "../../redux/reducer/menuSlice";

const ChatSidebar:React.FC = () => {

  const location = useLocation();
  const dispatch = useAppDispatch();

  const [searchText, setSearchText] = useState('');
  const [activeContact, setActiveContact] = useState<{type: string, id: string} | null>(null);

  const contacts = useAppSelector(state => state.chat.contacts);

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.currentTarget.value);
  }, []);
  const handleShowSidebar = useCallback((e: MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.blur();
      dispatch(menuActions.showSidebar());
  }, [dispatch]);

  useEffect(() => {
      const check = location.pathname.split('/')[2];
      if (check && check.startsWith('sel=')) {
          setActiveContact({ type: 'person', id: check.split('sel=')[1] });
          return;
      }
      if (check && check.startsWith('ch=')) {
          setActiveContact({ type: 'channel', id: check.split('ch=')[1] });
          return;
      }
      setActiveContact(null);
  }, [location.pathname]);

  return (
    <div className="chat-sidebar">
      <div className="chat-sidebar__header">
        <Burger onClick={handleShowSidebar} />
        <div className="input__search">
          <Input value={searchText} onChange={handleOnChange} placeholder="Search..." />
          <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.5" fillRule="evenodd" clipRule="evenodd" d="M14.3638 13.866C14.1868 14.04 13.9001 14.04 13.7231 13.866L10.0951 10.2957C9.08286 11.1041 7.79404 11.5901 6.38879 11.5901C3.13655 11.5901 0.500061 8.99556 0.500061 5.79508C0.500061 2.59454 3.13655 2.99811e-05 6.38879 2.99811e-05C9.64103 2.99811e-05 12.2776 2.59454 12.2776 5.79508C12.2776 7.29154 11.6962 8.65109 10.7499 9.67925L14.3638 13.2354C14.5407 13.4097 14.5407 13.6919 14.3638 13.866ZM6.38879 0.891621C3.63681 0.891621 1.40594 3.08689 1.40594 5.79508C1.40594 8.50324 3.63681 10.6986 6.38879 10.6986C9.14069 10.6986 11.3715 8.50324 11.3715 5.79508C11.3715 3.08689 9.14069 0.891621 6.38879 0.891621Z" fill="#FFFFFF"/>
          </svg>
        </div>
      </div>
      <div className="contacts">
        <ul>
          {contacts.filter(contact => contact.name.toLowerCase()
            .includes(searchText.toLowerCase()))
            .map(contact => {
              let className ='';
              if (activeContact?.id === contact.id) {
                if ((activeContact?.type === 'person' && 'isOnline' in contact) ||
                  (activeContact?.type === 'channel' && !('isOnline' in contact))) {
                  className = 'contacts__active';
                }
              }
              return (
                <li key={contact.id} className={className} >
                  {'isOnline' in contact ? <Person {...contact} /> : <Channel {...contact} />}
                </li>
              )
          })}
        </ul>
      </div>
    </div>
  );
};

export default ChatSidebar;