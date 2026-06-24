import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import LoginPopup from "../../../pages/Admin/Login";
import { useNavigate } from "react-router-dom";
import { getJwtFromCookie } from "../../../pages/API/Api";
import { jwtDecode } from "jwt-decode";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
      {/* <LoginPopup 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      /> */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen transition-all duration-300">
        <Navbar 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
        <div className="p-4 lg:p-8 flex-1 overflow-x-hidden">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
