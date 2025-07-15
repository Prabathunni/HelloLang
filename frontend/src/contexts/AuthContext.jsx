import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [user,setUser] = useState([])

  return (
    <AuthContext.Provider value={{ 
      isUserLoggedIn, 
      setIsUserLoggedIn,
      user,
      setUser
      
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
