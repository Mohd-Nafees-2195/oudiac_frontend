import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { ApiWithoutAuth, CustomerApi, getJwtFromCookie } from "../../pages/API/Api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import FuturisticLoader from "../Admin/Layout/FuturisticLoader";
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
                    console.log("Token expired. Logging out.jdjkndjkmmmmmm");
                    setLoading(false);
                    if (window.location.pathname.startsWith('/admin')) {
                        logout();
                    } else {
                        customerLogout();
                    }
                } else {
                    setUser(decodedUser);
                    setLoading(false);
                    if(window.location.pathname.startsWith('/admin')){
                        navigate("/admin");
                    }else {
                        navigate("/home"); 
                    }
                    
                }
            } catch (error) {
                setLoading(false);
                toast("Error decoding user token.");
                // logout();
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Make the login request. Your backend will respond with the Set-Cookie header.
        // The browser will automatically catch it and save it to document.cookie.
        try {
            setLoading(true);
            await ApiWithoutAuth.post("/auth/login", { email, password }, { withCredentials: true });

            // Now that the browser saved it, we can read it and decode it!
            const token = getJwtFromCookie();
            if (token) {
                const decodedUser = jwtDecode(token);
                setUser(decodedUser);
                console.log("kjfkjds Nafees : ",decodedUser);
                if(decodedUser.role==='ADMIN' || decodedUser.role==='MANAGER'){
                    toast("Login successful!");
                    navigate("/admin");
                }
            }else{
                toast("Varify OTP: OTP sent to your email.");
                navigate("/admin/otp-verify", { state: { email } });
            }
            setLoading(false);
            toast("Invalid email or password");
        } catch (error) {
            if (error.response) {
                // Handle the specific 404 for the login page
                if (error.response.status === 404) {
                    toast("User not found. Please check your email or sign up.");
                }
                // Handle wrong password (usually a 401 or 403 depending on your backend)
                else if (error.response.status === 401) {
                    toast("Incorrect password.");
                } else {
                    toast("Invalid email or password");
                }
            } else {
                toast("Network error. Please try again.");
            }
            setLoading(false);
            navigate("/admin/login");
        }
    };
    
    const verifyOtp = async (email, otp) => {
         try {
              // Send OTP to your Spring Boot backend
              const response = await ApiWithoutAuth.post("/auth/verify-email-admin-otp?email=" + email+"&otp="+otp,{ withCredentials: true });
        
              if (response.status === 200) {
                 const token = getJwtFromCookie();
                 console.log(token);
                 if(token){
                    toast("Verification successful!!");
                    const decodedUser = jwtDecode(token);
                    setUser(decodedUser);
                    navigate("/admin"); // navigate to dashboard if this returns the JWT
                 }else{
                    toast("Something went wrong. Please try logging in again.");
                 }
              }
              setLoading(false);
            } catch (err) {
              if (err.response && err.response.status === 400) {
                setError("Invalid or expired OTP. Please try again.");
              } else {
                setError("Something went wrong. Please try again later.");
              }
            } finally {
              setLoading(false);
            }
    }
    const verifyUserOtp = async (email, otp) => {
         try {
              // Send OTP to your Spring Boot backend
              const response = await ApiWithoutAuth.post("/auth/verify-email-user-otp?email=" + email+"&otp="+otp,{},{ withCredentials: true });
              console.log(response,"tttt");
              if (response.status === 200) {
                 const token = getJwtFromCookie();
                 console.log(token,"Print token");
                 if(token){
                    toast("Verification successful!!");
                    const decodedUser = jwtDecode(token);
                    setUser(decodedUser);
                    navigate("/home"); // navigate to dashboard if this returns the JWT
                 }else{
                    toast("Something went wrong. Please try logging in again.");
                 }
              }
              setLoading(false);
            } catch (err) {
              if (err.response && err.response.status === 400) {
                setError("Invalid or expired OTP. Please try again.");
              } else {
                setError("Something went wrong. Please try again later.");
              }
            } finally {
              setLoading(false);
            }
    }
     const customerLogin = async (email) => {
        // Make the login request. Your backend will respond with the Set-Cookie header.
        // The browser will automatically catch it and save it to document.cookie.
        try {
            setLoading(true);
            await ApiWithoutAuth.post("/users/login", { email },{ withCredentials: true });

            // Now that the browser saved it, we can read it and decode it!
            const token = getJwtFromCookie();
            if (token) {
                const decodedUser = jwtDecode(token);
                setUser(decodedUser);
                toast("Login successful!");
                navigate("/customer");
            }else{
                toast("Varify OTP: OTP sent to your email.");
                navigate("/otp-verify", { state: { email } });
            }
            setLoading(false);
        } catch (error) {
            if (error.response) {
                // Handle the specific 404 for the login page
                if (error.response.status === 404) {
                    toast("User not found. Please check your email or sign up.");
                }
            } else {
                toast("Network error. Please try again.");
            }
            setLoading(false);
            navigate("/login");
        }
    };

    const logout = () => {
        // Destroy the cookie manually in React
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setUser(null);
        setLoading(false);
        // setIsAuthenticated(!!user);
        window.location.href = "/admin/login";
    };
    const customerLogout = () => {
        // Destroy the cookie manually in React
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // setUser(null);
        // setIsAuthenticated(!!user);
        window.location.href = "/login";
    };

    return (
        <>
            {loading ? (
                <FuturisticLoader/>
            ) : (
                <AuthContext.Provider value={{ user, login, logout, customerLogout, customerLogin, verifyUserOtp, verifyOtp, isAuthenticated: !!user, loading }}>
                    {!loading && children}
                </AuthContext.Provider>
            )}
        </>
    );
};

export const useAuth = () => useContext(AuthContext);