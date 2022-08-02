import { createContext, useState } from "react";

// AuthContext is a context object that
const AuthContext = createContext({});

// Children represents the components nested inside the Auth Provider
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  return (
    // Allows consuming components to subscribe to changes
    // Value is passed to consuming components (children)
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
