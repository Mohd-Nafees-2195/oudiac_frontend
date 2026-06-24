import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import Api, { getJwtFromCookie } from "../../pages/API/Api";
import { useNavigate } from "react-router-dom";
// import api, { getJwtFromCookie } from "./Api"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check for the cookie instantly when React loads
  useEffect(() => {
    const token = getJwtFromCookie();
    if (token) {
      try {
        // Decode the token to get the admin's info (e.g., email, role)
        const decodedUser = jwtDecode(token);
        
        // Check if token is expired manually
        if (decodedUser.exp * 1000 < Date.now()) {
            setLoading(false);
            logout();
        } else {
            setUser(decodedUser);
            setLoading(false);
            navigate("/admin"); // Redirect to dashboard if already logged in
        }
      } catch (error) {
        setLoading(false);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Make the login request. Your backend will respond with the Set-Cookie header.
    // The browser will automatically catch it and save it to document.cookie.
    setLoading(true);
    await Api.post("/auth/login", { email, password } , { withCredentials: true });
    
    // Now that the browser saved it, we can read it and decode it!
    const token = getJwtFromCookie();
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
      console.log("Login successful, user info:", decodedUser);
      navigate("/admin"); 
    }
    setLoading(false);
  };

  const logout = () => {
    // Destroy the cookie manually in React
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
    setLoading(false);
    // setIsAuthenticated(!!user);
    window.location.href = "/admin/login";
  };

  return (
    <>
    {loading ? (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    ) : (
      <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
        {!loading && children}
      </AuthContext.Provider>
    )}
    </>
  );
};

export const useAuth = () => useContext(AuthContext);