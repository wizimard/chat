import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { modalActions } from "../../redux/reducer/modalSlice";
import { children } from "../../types/props/children";
import { ModalComponent } from "../../ui";

const ModalContainer:React.FC<children> = ({ children }) => {

  const dispatch = useAppDispatch();

  const modal = useAppSelector(state => state.modal);

  const addClass = useMemo(() => {
    return `modal-component_${modal.type} ${modal.isShow === 'hide' ? 'modal-component_hide' : ''}`
  }, [modal.type, modal.isShow]);

  const handleCloseModal = useCallback(() => {
      dispatch(modalActions.prepareHideModal());
  }, [dispatch]);

  return (
    <ModalComponent addClass={addClass}>
      <div className="modal-component__header">
          <span className="modal-component__type">{modal.type}</span>
          <button className="btn-img click modal-component__close" onClick={handleCloseModal}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.17157 8.00003L0.585785 3.41424L3.41421 0.585815L8 5.1716L12.5858 0.585815L15.4142 3.41424L10.8284 8.00003L15.4142 12.5858L12.5858 15.4142L8 10.8285L3.41421 15.4142L0.585785 12.5858L5.17157 8.00003Z" fill="#ffffff"/>
            </svg>
          </button>
      </div>
      { children }
    </ModalComponent>
  );
}

export default ModalContainer;