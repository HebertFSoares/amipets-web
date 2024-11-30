import { jwtDecode } from "jwt-decode";
import { useContext, createContext, useState, useEffect } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [token, setToken] = useState(localStorage.getItem("authToken") || "");
  const [loading, setLoading] = useState(true)
  
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
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
        // console.log("Validando token...")
      } catch (err) {
        console.error("Token inválido: ", err);
        logout();
      }
    }
    setLoading(false);
  }, [token]);
  
  return (
    <AuthContext.Provider value={{ user, userName, token, loading, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
};


export const useAuth = () => {
  return useContext(AuthContext);
};