import { ChangeEvent, useCallback, useState } from "react";
import { Burger, Input } from "../../ui";
import Channels from "./Channels";
import Friends from "./Friends";

const image = 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Image-HD.png';

const ChatSidebar:React.FC = () => {

    const [searchText, setSearchText] = useState('');

    const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.currentTarget.value);
    }, []);

    const channels = [
        {id: '1', name: 'general', unreadMessages: 5},
        {id: '2', name: 'russia', unreadMessages: 0},
        {id: '3', name: 'great britain', unreadMessages: 0},
        {id: '4', name: 'stalker', unreadMessages: 2},
        {id: '5', name: 'JavaScript', unreadMessages: 18},
        {id: '5', name: 'JavaScript', unreadMessages: 18},
        {id: '5', name: 'JavaScript', unreadMessages: 18}
    ]
    const friends = [
        {id: '1', name: 'Leo Gill', avatar: image, unreadMessages: 5, isOnline: true },
        {id: '2', name: 'Orlando Diggs', avatar: image, unreadMessages: 0, isOnline: false },
        {id: '3', name: 'Alex Lee', avatar: image, unreadMessages: 0, isOnline: true },
        {id: '4', name: 'Marie Jensen', avatar: image, unreadMessages: 3, isOnline: false },
        {id: '5', name: 'Carmen Velasco', avatar: image, unreadMessages: 12, isOnline: false },
        {id: '6', name: 'Johny Dep', avatar: image, unreadMessages: 0, isOnline: true }
    ]

    return (
        <div className="chat__sidebar">
            <div className="chat__sidebar--header">
                <Burger onClick={() => {}} />
                <div className="chat__sidebar--search">
                    <Input value={searchText} onChange={handleOnChange} placeholder="Search..." />
                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.5" fillRule="evenodd" clipRule="evenodd" d="M14.3638 13.866C14.1868 14.04 13.9001 14.04 13.7231 13.866L10.0951 10.2957C9.08286 11.1041 7.79404 11.5901 6.38879 11.5901C3.13655 11.5901 0.500061 8.99556 0.500061 5.79508C0.500061 2.59454 3.13655 2.99811e-05 6.38879 2.99811e-05C9.64103 2.99811e-05 12.2776 2.59454 12.2776 5.79508C12.2776 7.29154 11.6962 8.65109 10.7499 9.67925L14.3638 13.2354C14.5407 13.4097 14.5407 13.6919 14.3638 13.866ZM6.38879 0.891621C3.63681 0.891621 1.40594 3.08689 1.40594 5.79508C1.40594 8.50324 3.63681 10.6986 6.38879 10.6986C9.14069 10.6986 11.3715 8.50324 11.3715 5.79508C11.3715 3.08689 9.14069 0.891621 6.38879 0.891621Z" fill="#FFFFFF"/>
                    </svg>
                </div>
            </div>
            <div className="chat__sidebar--content">
                <Channels channels={channels} />
                <Friends friends={friends} />
            </div>
        </div>
    );
};

export default ChatSidebar;