import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { modalActions } from "../../redux/reducer/modalSlice";
import { Button } from "../../ui";
import ModalContainer from "./ModalContainer";

const Error:React.FC = () => {

  const dispatch = useAppDispatch();

  const modal = useAppSelector(state => state.modal);

  const handleCloseModal = useCallback(() => {
      dispatch(modalActions.prepareHideModal());
  }, [dispatch]);
  
  return (
    <ModalContainer>
      <div className="modal-component__content">
          <p>{modal.message}</p>
      </div>
      <div className="btn-group">
        <Button onClick={handleCloseModal}>OK</Button>
      </div>
    </ModalContainer>
  );
}

export default Error;