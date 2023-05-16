import { Navigate, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import { IIsAuthenticatedProps } from "../types/common";

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