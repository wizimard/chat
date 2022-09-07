import React, { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { menuActions } from "../../redux/reducer/menuSlice";

import { IChatPerson } from '../../types/models/IChat';
import { Avatar, Input, Spinner } from "../../ui";

const Friends:React.FC = () => {

  const dispatch = useAppDispatch();

  const contacts = useAppSelector(state => state.chat.contacts);

  const [searchText, setSearchText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const friends = useMemo(() => {
    return contacts.filter((contact): contact is IChatPerson => 'avatar' in contact)
      .filter(contact => contact.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
      .sort((contact1, contact2) => contact1.name.localeCompare(contact2.name));
  }, [contacts, searchText]);

  const handleOnChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  }, []);

  const handlerOnClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.blur();
    dispatch(menuActions.prepareHideModal());
  }, [dispatch]);

  return (
    <div className="contacts contacts_list modal__content">
      <div className="input__search">
        <Input value={searchText} onChange={handleOnChange} placeholder="Search..." />
        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.5" fillRule="evenodd" clipRule="evenodd" d="M14.3638 13.866C14.1868 14.04 13.9001 14.04 13.7231 13.866L10.0951 10.2957C9.08286 11.1041 7.79404 11.5901 6.38879 11.5901C3.13655 11.5901 0.500061 8.99556 0.500061 5.79508C0.500061 2.59454 3.13655 2.99811e-05 6.38879 2.99811e-05C9.64103 2.99811e-05 12.2776 2.59454 12.2776 5.79508C12.2776 7.29154 11.6962 8.65109 10.7499 9.67925L14.3638 13.2354C14.5407 13.4097 14.5407 13.6919 14.3638 13.866ZM6.38879 0.891621C3.63681 0.891621 1.40594 3.08689 1.40594 5.79508C1.40594 8.50324 3.63681 10.6986 6.38879 10.6986C9.14069 10.6986 11.3715 8.50324 11.3715 5.79508C11.3715 3.08689 9.14069 0.891621 6.38879 0.891621Z" fill="#FFFFFF"/>
        </svg>
      </div>
      <ul>
        {friends.map(friend => (
          <li key={friend.id}>
            <Link to={`/home/sel=${friend.id}`} 
              className='contacts__item contacts__person'
              onClick={handlerOnClick}>
              <span className={`contacts__online ${friend.isOnline ? 'online' : 'offline'}`}></span>
              <Avatar img={friend.avatar} className="contacts__avatar" />
              <span className="contacts__name">{friend.name}</span>
            </Link>
          </li>
        ))}
        {isLoading && (
          <div className="spinner__center">
            <Spinner size="little" />
          </div>
        )}
      </ul>
    </div>
  );
}

export default Friends;