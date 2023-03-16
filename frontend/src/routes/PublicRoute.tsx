import { Navigate, useLocation } from "react-router-dom";
import Layout from "../components/Layout";

interface IPublicRouteProps {
  isAuthenticated: boolean;
}

function PublicRoute({ isAuthenticated }: IPublicRouteProps) {  
  const { pathname } = useLocation();
  if (isAuthenticated && pathname === '/login') {
      return <Navigate to="/" replace />
  }

  return (
    <Layout isAuthenticated={isAuthenticated} />
  )
}

export default PublicRoute;