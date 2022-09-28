import { Editor } from "../../ui";

const AddMessage:React.FC = () => {
  return (
    <div className="add-message">
      <Editor className="add-message__editor"
        placeholder="Type a message" />
    </div>
  );
}

export default AddMessage;