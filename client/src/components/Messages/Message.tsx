import { IMessage } from "../../types/models/IMessage";

type MessageProps = IMessage & {
  isMe: boolean;
}

const Message:React.FC<MessageProps> = ({ author, date, text, attachments, isMe }) => {
  return (
    <div className="message">

    </div>
  );
}

export default Message;