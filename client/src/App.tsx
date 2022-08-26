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
import Home from './pages/Home';

const App:React.FC = () => {

  const isAuth = useAppSelector(state => state.auth.isAuth);

  const dispatch = useAppDispatch();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    dispatch(checkAuth()).then(() => {
      setIsReady(true);
    });
  }, [dispatch]);

  if (!isReady) return (<ModalSpinner />);

  return (
    <div className="app">
      <Router>
        <Suspense fallback={<ModalSpinner />}>
          <Home />
        </Suspense>
        {/* <Routes>
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
        </Routes> */}
      </Router>
      <ModalComponent />
    </div>
  );
}

export default App;