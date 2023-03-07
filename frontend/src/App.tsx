import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Loader from './components/Loader';
import LoginPage from './components/LoginPage';
import NoFoundComponent from './components/NoFoundComponent';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import { useAppDispatch } from './store';
import { getToken, getUser } from './store/selectors/auth';
import { setAuthData } from './store/slices/auth';

function App() {
  const dispatch = useAppDispatch();
  const storeToken = useSelector(getToken);
  const storeUser = useSelector(getUser);
  const token = window.localStorage.getItem('token');
  const user = window.localStorage.getItem('user') || '';
  const isAuthenticated = Boolean(token && user);

  useEffect(() => {
    if (isAuthenticated && !(storeToken && storeUser)) {
      dispatch(setAuthData({ token, user: JSON.parse(user) }));
    }
  }, []);
  
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
            <Route path='login' element={<LoginPage />} />
            <Route path='/' element={<HomePage />} />
          </Route>
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          </Route>
          <Route path="*" element={<NoFoundComponent />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
