import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [user,setUser] = useState([])

  // // no needed manually
  // useEffect(()=>{

  //   const storedUser = sessionStorage.getItem("user");

  //   if (storedUser){
  //     setUser(JSON.parse(storedUser))
  //     setIsUserLoggedIn(true)
  //   }


  //   const cookieToken = document.cookie
  //   ?.split("; ")
  //   .find(row => row.startsWith("token="))
  //   ?.split("=")[1]

  //   console.log("Raw cookie: ",document.cookie);
  //   console.log("filtered cookie: ",cookieToken);
  //   console.log(storedUser);
    
    
    
  //   if(cookieToken){
  //     setToken(cookieToken)
  //   }

  // },[])


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
