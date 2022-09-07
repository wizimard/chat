import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { modalActions } from "../../redux/reducer/modalSlice";
import { ModalSpinner } from "../../ui";
import Error from "./Error";
import Message from "./Message";

const components = new Map();
components.set('loading', ModalSpinner);
components.set('message', Message);
components.set('error', Error);

const ModalComponent:React.FC = () => {

    const dispatch = useAppDispatch();

    const modal = useAppSelector(state => state.modal);

    const Component = useMemo(() => {
        return components.get(modal.type);
    }, [modal.type]);

    useEffect(() => {
        if (modal.isShow === 'hide') {
            setTimeout(() => {
                dispatch(modalActions.hideModal());
            }, 400);
        }
    }, [dispatch, modal.isShow]);

    return (
        <>
        {modal.isShow && (
            <Component />
        )}
        </>
    );
};

export default ModalComponent;