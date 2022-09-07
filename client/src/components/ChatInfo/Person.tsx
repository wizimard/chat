import { memo } from "react";

import { IUserInfo } from "../../types/models/IUser";
import { Avatar, Button } from "../../ui";

const Person:React.FC<IUserInfo> = ({ 
  id, 
  email, 
  fullname, 
  avatar, 
  username, 
  bio, 
  links,
  isFriend }) => {

      
  return (
    <>
      <Avatar img={avatar} className='info__avatar' />
      <div className="info__header">
        <span className="info__title info__text">{ fullname }</span>
        {bio && (<p className="info__label info__text">{ bio }</p>)}
        {isFriend ? (
          <Button additionalClass="info__btn" text="remove from friends" />
        ) : (
          <Button additionalClass="info__btn" text="add to friends" />
        )}
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