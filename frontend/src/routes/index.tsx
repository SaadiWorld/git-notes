import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loader from '../components/Loader';
import NoFoundComponent from '../components/NoFound';
import GistPage from '../pages/Gist';
import GistForm from '../pages/GistForm';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import MyGistsPage from '../pages/MyGists';
import Profile from '../pages/Profile';
import StarredGistsPage from '../pages/StarredGists';
import PrivateRoute from '../routes/PrivateRoute';
import PublicRoute from '../routes/PublicRoute';
import { useAppDispatch } from '../store';
import { getToken, getUser } from '../store/selectors/auth';
import { setAuthData } from '../store/slices/auth';

function AppRoutes() {
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
            <Route path='gist/:id' element={<GistPage />} />
            <Route path='/' element={<HomePage />} />
          </Route>
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path='my-gists' element={<MyGistsPage />} />
            <Route path='starred-gists' element={<StarredGistsPage />} />
            <Route path='create-gist' element={<GistForm key={1} />} />
            <Route path='edit-gist/:id' element={<GistForm key={2} />} />
            <Route path='profile' element={<Profile />} />
          </Route>
          <Route path="*" element={<NoFoundComponent />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AppRoutes;
