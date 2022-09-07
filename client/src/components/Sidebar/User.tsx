import { useAppSelector } from "../../hooks/redux";
import { Avatar } from "../../ui";

const User:React.FC = () => {

  const user = useAppSelector(state => state.auth.user);

  return (
    <>
    {user && (
      <div className="sidebar__user">
        <Avatar img={user.avatar} className='sidebar__avatar' />
        <span className="sidebar__fullname">{ user.fullname }</span>
      </div>
    )}
    </>
  );
}

export default User;