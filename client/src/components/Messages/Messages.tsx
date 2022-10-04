import { useAppSelector } from "../../hooks/redux";
import { Empty } from "../../ui";
import Message from "./Message";

const Messages:React.FC = () => {

  const messages = useAppSelector(state => state.message.messages);
  const userId = useAppSelector(state => state.auth.user?.id);

  return (
    <div className="messages">
        {messages.length > 0 ? (
          <>
          {messages.map(message => (
            <Message key={message.id}
              id={message.id}
              author={message.author}
              date={message.date}
              text={message.text}
              attachments={message.attachments}
              isMe={message.author.id === userId} />
          ))}
          </>
        ) : (
          <Empty />
        )}
    </div>
  );
}

export default Messages;