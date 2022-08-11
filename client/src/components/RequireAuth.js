import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// useLocation returns the current spot in the tree

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation(); // how does this work?
  // Outlet represnets any child component of RequireAuth
  // Protects all child compoents of it
  // Replaces the login with the location they came from
  return auth?.user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
