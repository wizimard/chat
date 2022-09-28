import { AddMessage, Messages } from "..";
import { useAppSelector } from "../../hooks/redux";
import { Empty } from "../../ui";
import ContentHeader from "./ContentHeader";

const Content:React.FC = () => {

  const isEmpty = useAppSelector(state => state.chat.isEmpty);

  return (
    <>
    {!isEmpty ? (
      <>
      <ContentHeader />
      <Messages />
      <AddMessage />
      </>
    ) : (
      <Empty />
    )}
    </>
  );
}

export default Content;