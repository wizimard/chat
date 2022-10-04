import { useCallback } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { menuActions } from "../../redux/reducer/menuSlice";
import { IChannelShort } from "../../types/models/IChannel";

type ChannelsProps = {
  channels: IChannelShort[];
}

const Channels:React.FC<ChannelsProps> = ({ channels }) => {

  const dispatch = useAppDispatch();

  const handleOnClick = useCallback(() => {
    if (window.document.getElementById('modal-level1')) {
      dispatch(menuActions.prepareHideModal());
    }
  }, [dispatch]);
  
  return (
    <ul className="contacts">
      {channels.map(channel => (
        <Link key={channel.id} 
          to={`/home/ch=${channel.id}`} 
          className='contacts__link' 
          onClick={handleOnClick}>
            <span className="contacts__name">{ channel.name }</span>
        </Link>
      ))}
    </ul>
  );
}

export default Channels;