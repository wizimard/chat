import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { IContactChannel } from "../../types/models/IContacts";

const Channel:React.FC<IContactChannel> = ({ id, name, unread }) => {

  const handlerOnClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.blur();
  }, []);

  return (
    <Link to={`/home/ch=${id}`} 
          className='contacts__item contacts__channel'
          onClick={handlerOnClick}>
      <span className="contacts__name">{name}</span>
      <span className="contacts__unread">{unread}</span>
    </Link>
  );
}

export default Channel;