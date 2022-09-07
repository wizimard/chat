import { useCallback } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { menuActions } from "../../redux/reducer/menuSlice";
import { children } from "../../types/props/children";
import Portal from "../Portal/Portal";

interface ModalProps extends children {
    id: 'modal-level1' | 'modal-level2' | 'modal-level3';
    additionalClass?: string;
    isHide?: boolean;
}

const hideFuncs = new Map();
hideFuncs.set('modal-level1', menuActions.prepareHideModal);
hideFuncs.set('modal-level2', menuActions.prepareHideLevel2);
hideFuncs.set('modal-level3', menuActions.hideLevel3);

const Modal:React.FC<ModalProps> = ({ children, id, additionalClass = '', isHide = false }) => {

    const dispatch = useAppDispatch();

    const handleClose = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!isHide) {
            const func = hideFuncs.get(id);
            dispatch(func());
        }
      }, [id, isHide, dispatch]);
    
      const handleOnClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
      }, []);

    return (
        <Portal onClose={handleClose} className={`portal-${id.split('-')[1]}`}>
            <div className={`modal-container ${additionalClass}`}>
                <div id={id} className={`modal ${isHide ? 'modal_hide' : ''}`} onClick={handleOnClick}>
                    {children}
                </div>
            </div>
        </Portal>
    );
};

export default Modal;