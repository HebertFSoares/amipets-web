import { useContext, createContext, useState } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken") || "");

  const login = (data) => {
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("authToken", data.token);
  }

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
  }
  
  return (
    <AuthContext.Provider value={{ user, token, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
};


export const useAuth = () => {
  return useContext(AuthContext);
};