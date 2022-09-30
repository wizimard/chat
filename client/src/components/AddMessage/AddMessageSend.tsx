import { useContext } from "react";
import { AddMessageContext } from "./AddMessage";

const AddMessageSend:React.FC = () => {

  const messageContext = useContext(AddMessageContext);
  
  return (
    <button className="btn-img add-message__send">
      <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0H3L14 6V8L3 14H0L1 8H6V6H1L0 0Z" fill={`#${!!messageContext.state.text ? '3577EF' : 'FFFFFF'}`}/>
      </svg>
    </button>
  );
}

export default AddMessageSend;