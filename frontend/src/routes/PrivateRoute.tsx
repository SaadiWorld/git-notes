import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import { IIsAuthenticatedProps } from "../types/common";

function PrivateRoute({ isAuthenticated }: IIsAuthenticatedProps) {  
  if (!isAuthenticated) {
      return <Navigate to="/login" replace />
  }

  return (
    <Layout isAuthenticated={isAuthenticated} />
  );
}

export default PrivateRoute;