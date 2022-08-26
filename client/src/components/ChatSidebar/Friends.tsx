import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface FriendsProps {
  friends: {id: string, name: string, avatar: string, unreadMessages: number, isOnline: boolean}[]
}

const Friends:React.FC<FriendsProps> = ({ friends }) => {

  const location = useLocation();

  const [friendActive, setFriendActive] = useState<string | null>(null);

  useEffect(() => {
    const activeFriend = location.pathname.split('/')[2];
    if (activeFriend.startsWith('sel=')) {
        setFriendActive(activeFriend.split('sel=')[1]);
      return;
    }
    setFriendActive(null);
  }, [location.pathname]);

  return (
    <div className="chat__contacts friends">
      <div className="chat__contacts--header">
        <span>friends</span><span>{friends.length}</span>
      </div>
      <ul>
        {friends.map(friend => (
          <li>
            <Link key={friend.id} 
                  to={`/home/sel=${friend.id}`} 
                  className={`chat__contacts--item ${friend.id === friendActive ? 'chat__contacts--item_active' : ''}`}>
                <div>
                    <span className={`friends__online ${friend.isOnline ? 'online' : 'offline'}`}></span>
                    <picture className="chat__contacts--avatar">
                        <img src={friend.avatar} alt="avatar" />
                    </picture>
                    <span className="chat__contacts--name friends__name">{friend.name}</span>
                </div>
                <span className="chat__contacts--unread friends__unread">{friend.unreadMessages}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;