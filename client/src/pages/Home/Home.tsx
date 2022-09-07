import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ChatInfo, ChatSidebar, Messages, ModalMenu, Sidebar } from "../../components";
import { useAppDispatch } from "../../hooks/redux";
import { fetchContacts, fetchCurrentContact } from "../../redux/action-creators/chat.action-creator";

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
        }
    }, [dispatch, location.pathname]);

    return (
        <div className="chat">
            <Sidebar />
            <ChatSidebar />
            <Messages />
            <ChatInfo />
            <ModalMenu />
        </div>
    );
}

export default Home;