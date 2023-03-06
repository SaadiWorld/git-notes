import { Navigate, Outlet } from "react-router-dom";

interface IPublicRouteProps {
  isAuthenticated: boolean;
}

function PrivateRoute({ isAuthenticated }: IPublicRouteProps) {  
  if (!isAuthenticated) {
      return <Navigate to="/login" replace />
  }

  return <Outlet />;
}

export default PrivateRoute;