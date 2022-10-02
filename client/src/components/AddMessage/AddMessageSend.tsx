import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { messageActions } from "../../redux/reducer/messageSlice";

const AddMessageSend:React.FC = () => {

  const dispatch = useAppDispatch();

  const addMessage = useAppSelector(state => state.message.addMessage);

  const handleSendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    
    if (addMessage) {
      dispatch(messageActions.sendMessage());
    }
  }
  
  return (
    <button className="btn-img add-message__send" onClick={handleSendMessage}>
      <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0H3L14 6V8L3 14H0L1 8H6V6H1L0 0Z" fill='#3577EF' />
      </svg>
    </button>
  );
}

export default AddMessageSend;