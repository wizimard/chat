import { useAppSelector } from "../../hooks/redux";
import { BurgerEllipse, OnlineStatus } from "../../ui";

type GenericProps = {
  id: string;
  name: string;
}
type PersonProps = GenericProps & {
  isOnline: boolean;
}
type ChannelProps = GenericProps & {
  members: number;
}

const Person:React.FC<PersonProps> = ({ id, name, isOnline }) => {
  return (
    <>
    <OnlineStatus isOnline={isOnline} />
    <h3 className="content__name">{ name }</h3>
    <BurgerEllipse></BurgerEllipse>
    </>
  );
}
const Channel:React.FC<ChannelProps> = ({ id, name, members }) => {
  return (
    <>
    </>
  );
}

const ContentHeader:React.FC = () => {

  const currentConcat = useAppSelector(state => state.chat.currentContact);

  return (
    <div className="content__header">
      {currentConcat && (
        <>
        {'avatar' in currentConcat ? (
          <Person id={currentConcat.id}
            name={currentConcat.name}
            isOnline={currentConcat.isOnline} />
        ) : (
          <Channel id={currentConcat.id}
            name={currentConcat.name}
            members={currentConcat.members.length} />
        )}
        </>
      )}
    </div>
  );
}

export default ContentHeader;