import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Info, ChatSidebar, ModalMenu, Sidebar, Content, WebSocketProvider } from "../../components";
import { useAppDispatch } from "../../hooks/redux";
import { fetchContacts, fetchCurrentContact } from "../../redux/action-creators/chat.action-creator";
import { chatActions } from "../../redux/reducer/chatSlice";
import { menuActions } from "../../redux/reducer/menuSlice";
import { messageActions } from "../../redux/reducer/messageSlice";
import { modalActions } from "../../redux/reducer/modalSlice";

const HandleOnKeyDown:React.FC = () => {

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {    
    const handleOnKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && (activeElement.tagName === 'input' || activeElement.className.includes('editor'))) {
          activeElement.blur();
          return;
        }
        if (document.getElementById('modal-component')) {
          dispatch(modalActions.prepareHideModal());
          return;
        }
        if (document.getElementById('modal-level3')) {
          dispatch(menuActions.hideLevel3());
          return;
        }
        if (document.getElementById('modal-level2')) {
          dispatch(menuActions.prepareHideLevel2());
          return;
        }
        if (document.getElementById('modal-level1')) {
          dispatch(menuActions.prepareHideModal());
          return;
        }
        if (document.getElementById('sidebar')) {
          dispatch(menuActions.hideSidebar());
          return;
        }
        navigate('/home');
      }
    }
    document.addEventListener('keydown', handleOnKeyDown);

    return () => {
      document.removeEventListener('keydown', handleOnKeyDown);
    }
  }, [dispatch, navigate]);

  return (
    <></>
  );
}

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

      const urlParams = urlArr[2].split('=');
      if (urlParams[0] === 'sel') {
        dispatch(messageActions.newMessage({
          type: 'person',
          id: urlParams[1]
        }));
      } else {
        dispatch(messageActions.newMessage({
          type: 'channel',
          id: urlParams[1]
        }));
      }
    } else {
      dispatch(chatActions.clearCurrentContact());
    }
  }, [dispatch, location.pathname]);

  return (
    <div className="chat">
      <WebSocketProvider />
      <Sidebar />
      <div className="chat__contacts">
        <ChatSidebar />
      </div>
      <div className="content">
        <Content />
      </div>
      <div className="info">
        <Info />
      </div>
      <ModalMenu />
      <HandleOnKeyDown />
    </div>
  );
}

export default Home;