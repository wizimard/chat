import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { messageActions } from "../../redux/reducer/messageSlice";
import { Editor } from "../../ui";

const AddMessageText:React.FC = () => {

  const dispatch = useAppDispatch();

  const addMessage = useAppSelector(state => state.message.addMessage);

  const handleOnBlur = useCallback((e: React.FormEvent<HTMLDivElement>) => {
    dispatch(messageActions.setText(e.currentTarget.innerText));
  }, [dispatch]);

  const handleOnKeyUp = (e: React.KeyboardEvent) => {
    if (!!addMessage && !e.shiftKey && e.key === 'Enter') {
      e.currentTarget.innerHTML = '';
      dispatch(messageActions.sendMessage());
    }
  }

  return (
    <>
    {addMessage && (
      <Editor className="add-message__editor"
        onKeyUp={handleOnKeyUp}
        onBlur={handleOnBlur}
        placeholder="Type a message"
        dangerouslySetInnerHTML={{ __html: addMessage.text }} />
    )}
    </>
  );
}

export default AddMessageText;