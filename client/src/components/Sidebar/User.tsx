import { useAppSelector } from "../../hooks/redux";
import { Avatar } from "../../ui";

const User:React.FC = () => {

  const user = useAppSelector(state => state.auth.user);

  return (
    <>
    {user && (
      <div className="sidebar__user">
        <Avatar name={user.name} 
          img={user.avatar?.url} 
          attributes={{ className: 'sidebar__avatar' }} />
        <span className="sidebar__name">{ user.name }</span>
      </div>
    )}
    </>
  );
}

export default User;