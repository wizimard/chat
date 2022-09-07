import { useCallback, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { menuActions } from "../../redux/reducer/menuSlice";
import BackSvg from "../../svg/back";
import { Modal } from "../../ui";
import ModalLevel3 from "./ModalLevel3";
import Profile from "./Profile";
import Security from "./Security";

const components = new Map();
components.set('profile', Profile);
components.set('security', Security);

const ModalMenuLevel2:React.FC = () => {

  const dispatch = useAppDispatch();

  const isShow = useAppSelector(state => state.menu.isShowLevel2);
  const type = useAppSelector(state => state.menu.typeLevel2);

  const Component = useMemo(() => {
    return components.get(type);
  }, [type]);

  const handleBack = useCallback(() => {
    dispatch(menuActions.prepareHideLevel2());
  }, [dispatch]);

  useEffect(() => {
    if (isShow === 'hide') {
      setTimeout(() => {
        dispatch(menuActions.hideLevel2());
      }, 400);
    }
  }, [dispatch, isShow]);

  return (
    <>
    {isShow && (
      <Modal id='modal-level2' isHide={isShow === 'hide'}>
        <div className="modal__header">
          <button className="btn-img" onClick={handleBack}>
            <BackSvg />
          </button>
          <span className="modal__title">
            {type.split('_').map(item => item.charAt(0).toLocaleUpperCase() + item.slice(1)).join(' ')}
          </span>
        </div>
        <Component />
        <ModalLevel3 />
      </Modal>
    )}
    </>
  );
}

export default ModalMenuLevel2;