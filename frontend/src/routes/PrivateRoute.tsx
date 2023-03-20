import { Navigate } from "react-router-dom";
import { IIsAuthenticatedProps } from ".";
import Layout from "../components/Layout";

function PrivateRoute({ isAuthenticated }: IIsAuthenticatedProps) {  
  if (!isAuthenticated) {
      return <Navigate to="/login" replace />
  }

  return (
    <Layout isAuthenticated={isAuthenticated} />
  );
}

export default PrivateRoute;