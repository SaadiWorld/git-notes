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
      <div className="overflow-auto h-[calc(100vh-var(--navbar-height))] top-[var(--navbar-height)] relative">
        <div className="mx-auto max-w-screen-2xl">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default PublicRoute;