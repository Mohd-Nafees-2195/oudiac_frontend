import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Dashboard from "../../pages/Admin/Dashboard";
import { useEffect } from "react";
import { getJwtFromCookie } from "../../pages/API/Api";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();


//   useEffect(() =>{

//     // const token = getJwtFromCookie();
//     // if (token) {
//     //    const decodedUser = jwtDecode(token);
//     //     if (decodedUser.exp * 1000 < Date.now()) {
//     //       navigate("/admin/login");
//     //     }
//     //   navigate("/admin"); //send user data as state
//     // }

//         // if (!loading && !isAuthenticated) {
//         //     console.log("User is not authenticated, redirecting to login...");
//         //     navigate("/admin/login");
//         // }

//   },[isAuthenticated] )

  // 1. If we are still checking the backend, show a loader (prevents flickering)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin">
            <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  // 2. If checking is done and there's no user, kick them to the login page
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // 3. If they are authenticated, render the child route (e.g., the Dashboard)
  return <Outlet />;
}