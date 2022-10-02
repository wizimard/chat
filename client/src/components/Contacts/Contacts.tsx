import { useCallback } from 'react';
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { menuActions } from "../../redux/reducer/menuSlice";
import { IChannelShort } from '../../types/models/IChannel';
import { IUserFriend } from "../../types/models/IUser";
import { Avatar } from "../../ui";

interface ChannelProps extends IChannelShort {
  onClick: () => void;
}

const Channel:React.FC<ChannelProps> = ({ id, name, onClick }) => {
  return (
    <Link to={`/home/ch=${id}`} className='contacts__link' onClick={onClick}>
      <span className="contacts__name">{name}</span>
    </Link>
  );
}

interface Person extends IUserFriend {
  onClick: () => void;
}

const Person:React.FC<Person> = ({ id, name, avatar, isOnline, onClick }) => {

  return (
    <Link to={`/home/sel=${id}`} className='contacts__link' onClick={onClick}>
      <div className={`${isOnline ? 'online' : 'offline'}`}></div>
      <Avatar name={name} 
        img={avatar?.url}
        attributes={{ className: 'contacts__avatar' }} />
      <span className="contacts__name">{name}</span>
    </Link>
  );
}
interface ContactsProps {
  contacts: (IChannelShort | IUserFriend)[];
}

const Contacts:React.FC<ContactsProps> = ({ contacts }) => {

  const dispatch = useAppDispatch();

  const handleOnClick = useCallback(() => {
    if (window.document.getElementById('modal-level1')) {
      dispatch(menuActions.prepareHideModal());
    }
  }, [dispatch]);

  return (
    <ul className="contacts">
      {contacts.map((contact) => (
        <li key={contact.id}>
          {'isOnline' in contact ? (
            <Person id={contact.id} 
              name={contact.name} 
              avatar={contact.avatar}
              isOnline={contact.isOnline}
              onClick={handleOnClick} />
          ) : (
            <Channel id={contact.id} 
              name={contact.name}
              onClick={handleOnClick} />
          )}
        </li>
      ))}
    </ul>
  );
}

export default Contacts;