import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Info, ChatSidebar, Messages, ModalMenu, Sidebar, HandleOnKeyDown, Content } from "../../components";
import { useAppDispatch } from "../../hooks/redux";
import { fetchContacts, fetchCurrentContact } from "../../redux/action-creators/chat.action-creator";
import { chatActions } from "../../redux/reducer/chatSlice";

const Home:React.FC = () => {

  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    const urlArr = location.pathname.split('/');
    if (!!urlArr[2] && (urlArr[2].startsWith('ch=') || urlArr[2].startsWith('sel='))) {
      dispatch(fetchCurrentContact(urlArr[2]));
    } else {
      dispatch(chatActions.clearCurrentContact());
    }
  }, [dispatch, location.pathname]);

  return (
    <div className="chat">
      <Sidebar />
      <div className="chat__contacts">
        <ChatSidebar />
      </div>
      <div className="chat__content">
        <Content />
      </div>
      <div className="chat__info">
        <Info />
      </div>
      <ModalMenu />
      <HandleOnKeyDown />
    </div>
  );
}

export default Home;