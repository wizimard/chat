import { useState, useCallback } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { chatActions } from "../../redux/reducer/chatSlice";
import UserService from "../../services/UserService";
import { Button, Spinner } from "../../ui";

interface PersonBtnProps {
  id: string;
  isFriend: boolean;
}

const PersonBtn:React.FC<PersonBtnProps> = ({ id, isFriend }) => {

  const dispatch = useAppDispatch();
  
  const [isLoading, setIsLoading] = useState(false);

  const handleOnAction = useCallback((action: 'add' | 'remove') => {
    return async(e: React.FormEvent<HTMLButtonElement>) => {
      e.currentTarget.blur();
      setIsLoading(true);
      try {
        if (action === 'add') {
          await UserService.addFriend(id);
          dispatch(chatActions.addFriend());
        }
        else {
          await UserService.removeFriend(id);
          dispatch(chatActions.removeFriend());
        }
      } catch(e) {
        console.log(e);
      }
      setIsLoading(false);
    }
  }, [dispatch, id]);

  return (
    <>
    {isFriend ? (
      <Button className="info__btn" 
        disabled={isLoading}
        onClick={handleOnAction('remove')}>
          {isLoading ? (
            <Spinner size='btn' /> 
          ) : (
            <>remove</>
          )}
      </Button>
    ) : (
      <Button className="info__btn"
        disabled={isLoading}
        onClick={handleOnAction('add')}>
          {isLoading ? (
            <Spinner size='btn' /> 
          ) : (
            <>add</>
          )}
      </Button>
    )}
    </>
  );
}

export default PersonBtn;