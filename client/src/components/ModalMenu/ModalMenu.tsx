import { useCallback, useMemo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { menuActions } from "../../redux/reducer/menuSlice";
import { Modal } from "../../ui";
import Settings from "./Settings";
import CloseSvg from "../../svg/close";
import Friends from "./Friends";
import Channels from "./Channels";
import ModalMenuLevel2 from "./ModalMenuLevel2";

const components = {
    'friends': Friends,
    'channels': Channels,
    'settings': Settings,
    'new_channel': Settings
}

const ModalMenu:React.FC = () => {

    const dispatch = useAppDispatch();

    const isShow = useAppSelector(state => state.menu.isShow);
    const type = useAppSelector(state => state.menu.type);

    const Component = useMemo(() => {
        return components[type];
    }, [type]);

    const handlePrepareClose = useCallback(() => {
        dispatch(menuActions.prepareHideModal());
    }, [dispatch]);

    useEffect(() => {
        if (isShow === 'hide') {
            setTimeout(() => {
                dispatch(menuActions.hideModal());
            }, 400);
        }
    }, [isShow, dispatch]);

    return (
        <>
        {isShow && (
        <Modal id="modal-level1" isHide={isShow === 'hide'}>
            <div className="modal__header">
                <span className="modal__title">
                    {type.split('_').map(item => item.charAt(0).toLocaleUpperCase() + item.slice(1)).join(' ')}
                </span>
                <button className="btn-img">
                    <CloseSvg onClick={handlePrepareClose} />
                </button>
            </div>
            <ModalMenuLevel2 />
            {<Component />}
        </Modal>
        )}
        </>
    );
};

export default ModalMenu;