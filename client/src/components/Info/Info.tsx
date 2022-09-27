import { useAppSelector } from "../../hooks/redux";
import { Empty, Spinner } from "../../ui";

import Channel from "./Channel";
import Person from "./Person";

const Info:React.FC = () => {

  const isLoading = useAppSelector(state => state.chat.isLoadingContact);
  const currentContact = useAppSelector(state => state.chat.currentContact);
  const error = useAppSelector(state => state.chat.errorCurrentContact);

  return (
    <div className='info'>
      {(!isLoading && !error) && (
        <>
        {currentContact ? (
          <>
          {'avatar' in currentContact ? (
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
    </div>
  );
}

export default Info;