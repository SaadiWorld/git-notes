import { Navigate, Outlet } from "react-router-dom";
import Layout from "../components/Layout";

interface IPublicRouteProps {
  isAuthenticated: boolean;
}

function PrivateRoute({ isAuthenticated }: IPublicRouteProps) {  
  if (!isAuthenticated) {
      return <Navigate to="/login" replace />
  }

  return (
    <Layout isAuthenticated={isAuthenticated} />
    );
}

export default PrivateRoute;