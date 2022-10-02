import React, { useCallback, useState, createContext } from "react";
import { children } from "../../types/props/children";
import AddMessageAttach from "./AddMessageAttach";
import AddMessageAttachments from "./AddMessageAttachments";
import AddMessageSend from "./AddMessageSend";
import AddMessageText from "./AddMessageText";

const AddMessage:React.FC = () => {

  return (
    <div className="add-message">
      <div className="add-message__edit">
        <AddMessageAttach />
        <AddMessageText />
        <AddMessageSend />
      </div>
      <AddMessageAttachments />
    </div>
  );
}

export default AddMessage;