import { useCallback } from "react";
import { Link } from "react-router-dom";
import { IContactPerson } from "../../types/models/IContacts";
import { Avatar } from "../../ui";

const Person:React.FC<IContactPerson> = ({ id, name, avatar, isOnline, unread }) => {

  const handlerOnClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.blur();
  }, []);
    
  return (
    <Link to={`/home/sel=${id}`} 
          className='contacts__item contacts__person'
          onClick={handlerOnClick}>
      <div>
        <span className={`contacts__online ${isOnline ? 'online' : 'offline'}`}></span>
        <Avatar name={name} 
          img={avatar?.url}
          attributes={{ className: 'contacts__avatar' }} />
        <span className="contacts__name friends__name">{name}</span>
      </div>
      <span className="contacts__unread friends__unread">{unread}</span>
    </Link>
  );
}

export default Person;