import { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router,
    Routes,
    Route,
    Navigate } from 'react-router-dom';
    
import routes from './routes/routes';

import { ModalComponent } from './components';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { checkAuth } from './redux/action-creators/auth.action-creator';
import { ModalSpinner } from './ui';
import { menuActions } from './redux/reducer/menuSlice';
import { modalActions } from './redux/reducer/modalSlice';

const App:React.FC = () => {

  const isAuth = useAppSelector(state => state.auth.isAuth);

  const dispatch = useAppDispatch();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    dispatch(checkAuth()).then(() => {
      setIsReady(true);
    });
    
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
      }
    }
    document.addEventListener('keydown', handleOnKeyDown);

    return () => {
      document.removeEventListener('keydown', handleOnKeyDown);
    }
  }, [dispatch]);

  if (!isReady) return (<ModalSpinner />);

  return (
    <div className="app">
      <Router>
        <Routes>
          {isAuth ? (
            <>
            {routes.private.map(route => (
              <Route key={route.path} path={route.path} element={(
                <Suspense fallback={(<span>loading...</span>)}> 
                  <route.element />
                </Suspense>
              )} />
            ))}
            </>
          ): (
            <>
            {routes.public.map(route => (
              <Route key={route.path} path={route.path} element={(
                <Suspense fallback={(<span>loading...</span>)}> 
                  <route.element />
                </Suspense>
              )} />
            ))}
            </>
          )}
          <Route path='*' element={<Navigate to={isAuth ? '/home' : '/login'} replace />} />
        </Routes>
      </Router>
      <ModalComponent />
    </div>
  );
}

export default App;