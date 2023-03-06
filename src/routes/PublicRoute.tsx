import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

interface IPublicRouteProps {
  isAuthenticated: boolean;
}

function PublicRoute({ isAuthenticated }: IPublicRouteProps) {  
  const { pathname } = useLocation();
  if (isAuthenticated && pathname === '/login') {
      return <Navigate to="/" replace />
  }

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <Outlet />
    </>
  )
}

export default PublicRoute;