import { AddMessage, Messages } from "..";

const Content:React.FC = () => {
  return (
    <div className="content">
      <div className="content__header">

      </div>
      <Messages />
      <AddMessage />
    </div>
  );
}

export default Content;