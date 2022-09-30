import { useContext, useCallback } from "react";
import { Editor } from "../../ui";
import { AddMessageContext } from "./AddMessage";

const AddMessageText:React.FC = () => {

  const messageContext = useContext(AddMessageContext);

  const handleOnInput = useCallback((e: React.FormEvent<HTMLDivElement>) => {
    messageContext.setText(e.currentTarget.innerText);
  }, [messageContext]);

  const handleOnKeyUp = useCallback((e: React.KeyboardEvent) => {
    if (!e.shiftKey && e.key === 'Enter') {
      e.currentTarget.innerHTML = '';
      messageContext.sendMessage();
    }
  }, [messageContext]);

  return (
    <Editor className="add-message__editor"
              onKeyUp={handleOnKeyUp}
              onInput={handleOnInput}
              placeholder="Type a message" />
  );
}

export default AddMessageText;