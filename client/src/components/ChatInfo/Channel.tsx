import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { IChannel } from "../../types/models/IChannel";
import { Avatar, Button } from "../../ui";

const Channel:React.FC<IChannel> = ({
  id,
  name,
  description,
  isPublic,
  admin,
  administrators,
  members,
  links,
  attachs,
  role,
  link,
  isSubscribed
}) => {

  const [statusCopyLink, setStatusCopyLink] = useState<string | null>(null);

  const handleCopyLink = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget } = e;

    currentTarget.blur();
    currentTarget.disabled = true;

    navigator.clipboard.writeText(link)
      .finally(() => setTimeout(() => {
        setStatusCopyLink(null);
        currentTarget.disabled = false;
      }, 5000))
      .then(() => setStatusCopyLink('copied in buffer'))
      .catch(() => setStatusCopyLink('error'));

  }, [link]);

  return (
    <>
    <div className="info__header info__header-channel">
      <span className="info__title info__text">{ name }</span>
      <p className="info__label info__text">{ description }</p>
      <button className="info__link info__label" onClick={handleCopyLink}>{ link }</button>
      <span className={`info__link--status info__label ${statusCopyLink ? 'info__link--hide' : ''}`}>
        { statusCopyLink }
      </span>
      {isSubscribed ? (
        <Button additionalClass="info__btn info__btn-channel" text="leave from channel" />
      ) : (
        <Button additionalClass="info__btn info__btn-channel" text="join to channel" />
      )}
    </div>
    <div className="contacts contacts_list info__members">
      <button className="info__label info__members--title">Admin</button>
      <Link to={`/home/sel=${admin.id}`} 
        className="contacts__item">
        <Avatar img={admin.avatar} className={'contacts__avatar'} />
        <span className="contacts__name">{ admin.fullname }</span>
      </Link>
      {administrators.length > 0 && (
        <>
        <button className="info__label info__members--title">Administrators <span>{administrators.length}</span></button>
        <ul>
          {administrators.slice(0, 5).map(administrator => (
            <li key={administrator.id}>
              <Link to={`/home/sel=${administrator.id}`} 
                className="contacts__item">
                <Avatar img={administrator.avatar} className={'contacts__avatar'} />
                <span className="contacts__name">{ administrator.fullname }</span>
              </Link>
            </li>
          ))}
        </ul>
        </>
      )}
      {members.length > 0 && (
        <>
        <button className="info__label info__members--title">Members <span>{members.length}</span></button>
          <ul>
            {members.slice(0, 5).map(member => (
              <li key={member.id}>
                <Link to={`/home/sel=${member.id}`} 
                  className="contacts__item">
                  <Avatar img={member.avatar} className={'contacts__avatar'} />
                  <span className="contacts__name">{ member.fullname }</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
    {Object.keys(attachs).length > 0 && (
        <div className="info__attach">
          <button className="info__label">Attachs</button>
          {attachs.images.length > 0 && (
            <button className="info__label">images <span>{attachs.images.length}</span></button>
          )}
          {attachs.videos.length > 0 && (
            <button className="info__label">videos <span>{attachs.videos.length}</span></button>
          )}
          {attachs.files.length > 0 && (
            <button className="info__label">files <span>{attachs.files.length}</span></button>
          )}
          {attachs.links.length > 0 && (
            <button className="info__label">links <span>{attachs.links.length}</span></button>
          )}
        </div>
      )}
      {links.length > 0 && (
        <div className="info__links">
          <span className="info__label info__members--title">Links</span>
          {links.map(link => (
              <a key={link} href={link} target="_blank" rel="noreferrer">{ link }</a>
            ))}
        </div>
      )}
    </>
  );
}

export default Channel;