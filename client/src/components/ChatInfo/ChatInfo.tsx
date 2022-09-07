import { useAppSelector } from "../../hooks/redux";

import Channel from "./Channel";
import Person from "./Person";

const ChatInfo:React.FC = () => {

    const isLoading = useAppSelector(state => state.chat.isLoadingContact);
    const currentContact = useAppSelector(state => state.chat.currentContact);
    const error = useAppSelector(state => state.chat.errorCurrentContact);

    return (
        <div className='info'>
            {(!isLoading && !error) && (
                <>
                {currentContact ? (
                    <>
                    {currentContact.type === 'channel' ? (
                        <Channel {...currentContact.content} />
                    ) : (
                        <Person {...currentContact.content} />
                    )}
                    </>
                ) : (
                    <div>Here is empty</div>
                )}
                </>
            )}
            {isLoading && (<span>Loading</span>)}
            {(!isLoading && error) && (<span>{ error }</span>)}
        </div>
    );
}

export default ChatInfo;