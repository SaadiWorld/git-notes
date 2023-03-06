import { Navigate, Outlet } from "react-router-dom";

interface IPublicRouteProps {
  isAuthenticated: boolean;
}

function PublicRoute({ isAuthenticated }: IPublicRouteProps) {  
  if (isAuthenticated) {
      return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default PublicRoute;