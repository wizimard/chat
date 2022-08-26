import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { modalActions } from "../../redux/reducer/modalSlice";
import { Button, Modal } from "../../ui";

const ModalComponent:React.FC = () => {

    const dispatch = useAppDispatch();

    const modal = useAppSelector(state => state.modal);

    const handleCloseModal = useCallback(() => {
        dispatch(modalActions.hideModal());
    }, [dispatch]);

    return (
        <>
        {modal.isShow && (
        <Modal additionalClass={`modal_${modal.type}`}>
            <div className="modal__header">
                <span className="modal__type">Message</span>
                <button className="img-btn click" onClick={handleCloseModal}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.17157 8.00003L0.585785 3.41424L3.41421 0.585815L8 5.1716L12.5858 0.585815L15.4142 3.41424L10.8284 8.00003L15.4142 12.5858L12.5858 15.4142L8 10.8285L3.41421 15.4142L0.585785 12.5858L5.17157 8.00003Z" fill="#000000"/>
                </svg>
                </button>
            </div>
            <div className="modal__content">
                <p>{modal.message}</p>
            </div>
            <Button text="OK" onClick={handleCloseModal} />
        </Modal>
        )}
        </>
    );
};

export default ModalComponent;