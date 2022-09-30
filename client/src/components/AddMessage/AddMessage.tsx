import React, { useCallback, useState, createContext } from "react";
import { children } from "../../types/props/children";
import AddMessageAttach from "./AddMessageAttach";
import AddMessageAttachments from "./AddMessageAttachments";
import AddMessageSend from "./AddMessageSend";
import AddMessageText from "./AddMessageText";

const initialState: {
  text: string;
  attachments: string[];
} = {
  text: '',
  attachments: []
}

export const AddMessageContext = createContext({
  state: initialState,
  setText: (value: string) => {},
  addAttachments: (files: string[]) => {},
  setAttachments: (files: string[]) => {},
  sendMessage: () => {}
});

const AddMessageContextProvide:React.FC<children> = ({ children }) => {

  const handleSendMessage = async() => {
    let value = message.state.text.trim();
    while (true) {
      if (value.indexOf('\n') === 0) value = value.replace('\n', '');
      else if (value.indexOf('\t') === 0) value = value.replace('\t', '');
      else if (value.lastIndexOf('\n') === value.length - 2) value = value.slice(0, value.length - 2);
      else if (value.lastIndexOf('\t') === value.length - 2) value = value.slice(0, value.length - 2);
      else break;
    }
    handleSetText('');
  }

  const handleSetText = (value: string) => {
    setMessage(prev => ({
      ...prev,
      state: {
        ...prev.state,
        text: value
      }
    }));
    return value;
  }
  const handleAddAttachments = (files: string[]) => {

    setMessage(prev => {
      let attachments = [...prev.state.attachments, ...files];

      if (attachments.length > 10) {
        attachments = attachments.slice(0, 10);
        //ToDo: error
      }

      return {
        ...prev,
        state: {
          ...prev.state,
          attachments: attachments
        }
      }
    });
  }
  const handleSetAttachments = (files: string[]) => {
    setMessage(prev => ({
      ...prev,
      state: {
        ...prev.state,
        attachments: files
      }
    }));
  }

  const [message, setMessage] = useState({
    state: initialState,
    setText: handleSetText,
    addAttachments: handleAddAttachments,
    setAttachments: handleSetAttachments,
    sendMessage: handleSendMessage
  })

  return (
    <AddMessageContext.Provider value={message}>
      { children }
    </AddMessageContext.Provider>
  );
}

const AddMessage:React.FC = () => {

  return (
    <AddMessageContextProvide>
      <div className="add-message">
        <div className="add-message__edit">
          <AddMessageAttach />
          <AddMessageText />
          <AddMessageSend />
        </div>
        <AddMessageAttachments />
      </div>
    </AddMessageContextProvide>
  );
}

export default AddMessage;