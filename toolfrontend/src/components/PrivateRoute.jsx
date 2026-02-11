// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const PrivateRoute = ({ children }) => {
//   const { isAuthenticated, loading } = useAuth();

//   if (loading) return null; // or spinner

//   return isAuthenticated ? children : <Navigate to="/login" replace />;
// };

// export default PrivateRoute;


import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null; // or <Spinner />
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

