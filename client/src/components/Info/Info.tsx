import { useAppSelector } from "../../hooks/redux";
import { Empty, Spinner } from "../../ui";

import Channel from "./Channel";
import Person from "./Person";

const Info:React.FC = () => {

  const isLoading = useAppSelector(state => state.chat.isLoadingContact);
  const currentContact = useAppSelector(state => state.chat.currentContact);
  const error = useAppSelector(state => state.chat.errorCurrentContact);

  return (
    <>
    {(!isLoading && !error) && (
        <>
        {currentContact ? (
          <>
          {'isOnline' in currentContact ? (
            <Person {...currentContact} />
          ) : (
            <Channel {...currentContact} />
          )}
          </>
        ) : (
          <Empty />
        )}
        </>
      )}
      {isLoading && (
        <div className="info__loading"><Spinner size='little' /></div>
      )}
      {(!isLoading && error) && (
        <div className="info__loading">
          <span>{ error }</span>
        </div>
      )}
    </>
  );
}

export default Info;