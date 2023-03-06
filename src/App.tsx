import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Loader from './components/Loader';
import LoginPage from './components/LoginPage';
import NoFoundComponent from './components/NoFoundComponent';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

function App() {
  const isAuthenticated = Boolean(localStorage.getItem('token'));
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
            <Route path='login' element={<LoginPage />} />
          </Route>
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path='/' element={<HomePage />} />
          </Route>
          <Route path="*" element={<NoFoundComponent />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
