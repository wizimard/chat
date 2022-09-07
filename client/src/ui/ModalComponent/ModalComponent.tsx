import { useCallback } from "react";
import { Portal } from "..";
import { useAppDispatch } from "../../hooks/redux";
import { modalActions } from "../../redux/reducer/modalSlice";
import { children } from "../../types/props/children";

interface ModalComponentProps extends children {
  addClass?: string;
}

const ModalComponent:React.FC<ModalComponentProps> = ({ children, addClass = '' }) => {

  const dispatch = useAppDispatch();

  const handleClose = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      dispatch(modalActions.prepareHideModal());
    }, [dispatch]);
  
    const handleOnClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
    }, []);
    
  return (
    <Portal onClose={handleClose} className='portal-component'>
      <div id='modal-component' className={`modal-component ${addClass}`} onClick={handleOnClick}>
          {children}
      </div>
    </Portal>
  );
}

export default ModalComponent;