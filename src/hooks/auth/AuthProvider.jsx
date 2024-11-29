import { api } from "@/lib/apiWrapper";
import { jwtDecode } from "jwt-decode";
import { useContext, createContext, useState, useEffect } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [token, setToken] = useState(localStorage.getItem("authToken") || "");

  const login = (data) => {
    setToken(data.token);
    setUserName(data.user.email);
    localStorage.setItem("userName", data.user.email);
    localStorage.setItem("authToken", data.token);
  }

  const logout = () => {
    setToken(null);
    setUserName(null);
    localStorage.removeItem("userName");
    localStorage.removeItem("authToken");
  }

  useEffect(() => {
    if(token){
      const decodedToken = jwtDecode(token);
      setUser(decodedToken)
      console.log(decodedToken)
    }
  }, [token])
  
  return (
    <AuthContext.Provider value={{ user, userName, token, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
};


export const useAuth = () => {
  return useContext(AuthContext);
};