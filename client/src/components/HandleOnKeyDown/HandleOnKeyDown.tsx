import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { menuActions } from "../../redux/reducer/menuSlice";
import { modalActions } from "../../redux/reducer/modalSlice";

const HandleOnKeyDown:React.FC = () => {

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {    
    const handleOnKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (document.getElementById('modal-component')) {
          dispatch(modalActions.prepareHideModal());
          return;
        }
        if (document.getElementById('modal-level3')) {
          dispatch(menuActions.hideLevel3());
          return;
        }
        if (document.getElementById('modal-level2')) {
          dispatch(menuActions.prepareHideLevel2());
          return;
        }
        if (document.getElementById('modal-level1')) {
          dispatch(menuActions.prepareHideModal());
          return;
        }
        if (document.getElementById('sidebar')) {
          dispatch(menuActions.hideSidebar());
          return;
        }
        navigate('/home');
      }
    }
    document.addEventListener('keydown', handleOnKeyDown);

    return () => {
      document.removeEventListener('keydown', handleOnKeyDown);
    }
  }, [dispatch]);

  return (
    <></>
  );
}

export default HandleOnKeyDown;