// Custom hook allows us to use what we need from the AuthContext instead of doing useContext(AuthContext) in every single component that needs to use the context.
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
