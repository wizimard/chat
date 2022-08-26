import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface ChannelsProps {
  channels: {id: string, name: string, unreadMessages: number}[]
}

const Channels:React.FC<ChannelsProps> = ({ channels }) => {

  const location = useLocation();

  const [channelActive, setChannelActive] = useState<string | null>(null);

  useEffect(() => {
    const activeChannel = location.pathname.split('/')[2];
    if (activeChannel.startsWith('ch=')) {
      setChannelActive(activeChannel.split('ch=')[1]);
      return;
    }
    setChannelActive(null);
  }, [location.pathname]);

  return (
    <div className="chat__contacts channels">
      <div className="chat__contacts--header">
        <span>Channels</span><span>{channels.length}</span>
      </div>
      <ul>
        {channels.map(channel => (
          <li>
            <Link key={channel.id} 
                  to={`/home/ch=${channel.id}`} 
                  className={`chat__contacts--item ${channel.id === channelActive ? 'chat__contacts--item_active' : ''}`}>
                <span className="chat__contacts--name">#{channel.name}</span>
                <span className="chat__contacts--unread">{channel.unreadMessages}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Channels;