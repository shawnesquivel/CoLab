import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// useLocation returns the current spot in the tree
// allowedRoles is an array
const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth(); // re-renders when authorization changes
  const location = useLocation();

  // Outlet represnets any child component of RequireAuth
  // Protects all child compoents of it
  // Replaces the login with the location they came from
  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
