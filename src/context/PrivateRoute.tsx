import React from "react";
import { Route, Navigate, RouteProps } from "react-router-dom";
import { useAuth } from "./AuthContext";

// interface PrivateRouteProps extends RouteProps {
//   element: React.ReactNode;
// }
interface PrivateRouteProps {
  path?: string;
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      element={currentUser ? element : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
