import { useCallback } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { menuActions } from "../../redux/reducer/menuSlice";
import { IUserShort } from "../../types/models/IUser";
import { Avatar } from "../../ui";

type PeopleProps = {
  people: IUserShort[];
}

const People:React.FC<PeopleProps> = ({ people }) => {

  const dispatch = useAppDispatch();

  const handleOnClick = useCallback(() => {
    if (window.document.getElementById('modal-level1')) {
      dispatch(menuActions.prepareHideModal());
    }
  }, [dispatch]);

  return (
    <ul className="contacts">
      {people.map(item => (
        <Link key={item.id} 
          to={`/home/sel=${item.id}`} 
          className='contacts__link' 
          onClick={handleOnClick}>
            <div className={`${item.isOnline ? 'online' : 'offline'}`}></div>
            <Avatar name={item.name} 
              img={item.avatar?.url}
              attributes={{ className: 'contacts__avatar' }} />
            <span className="contacts__name">{ item.name }</span>
        </Link>
      ))}
    </ul>
  );
}

export default People;