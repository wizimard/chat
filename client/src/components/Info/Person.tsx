import { memo } from "react";

import { IUserInfo } from "../../types/models/IUser";
import { Avatar } from "../../ui";
import PersonBtn from "./PersonBtn";

const Person:React.FC<IUserInfo> = ({ 
  id, 
  email, 
  name, 
  avatar, 
  username, 
  bio, 
  links,
  isFriend,
  isOnline }) => {
      
  return (
    <>
      <Avatar name={name} 
        img={avatar?.url} 
        attributes={{ className: 'info__avatar' }} />
      <div className="info__header">
        <span className="info__title info__text info__name">
          {isOnline ? (<div className="online"></div>) : (<div className="offline"></div>)}
          <span>{ name }</span>
        </span>
        {bio && (<p className="info__label info__text">{ bio }</p>)}
        <PersonBtn id={id} isFriend={isFriend} />
      </div>
      <div className="info__content">
        {username && (
          <div className="info__container">
            <span className="info__label">Username</span>
            <span className="info__text">@{ username }</span>
          </div>
        )}
        {email && (
          <div className="info__container">
            <span className="info__label">Email</span>
            <span className="info__text">{ email }</span>
          </div>
        )}
        {links.length > 0 && (
          <div className="info__links">
            <span className="info__label">Links</span>
            {links.map(link => (
              <a key={link} href={link} target="_blank" rel="noreferrer">{ link }</a>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default memo(Person);