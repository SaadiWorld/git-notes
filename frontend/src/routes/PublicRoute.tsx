import { Navigate, useLocation } from "react-router-dom";
import { IIsAuthenticatedProps } from ".";
import Layout from "../components/Layout";

function PublicRoute({ isAuthenticated }: IIsAuthenticatedProps) {  
  const { pathname } = useLocation();
  if (isAuthenticated && pathname === '/login') {
      return <Navigate to="/" replace />
  }

  return (
    <Layout isAuthenticated={isAuthenticated} />
  )
}

export default PublicRoute;