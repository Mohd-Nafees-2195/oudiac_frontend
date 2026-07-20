import React from "react";
import { Menu, Search, Bell, ShoppingCart } from "lucide-react";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const CustomerNavbar = ({ toggleSidebar }) => {
   const { cartCount } = useApp();
   const navigate=useNavigate();
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 lg:hidden text-gray-600"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="hidden md:flex items-center relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3" />
          <input
            type="text"
            placeholder="Search products, orders..."
            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-64 lg:w-96 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
        <button 
          onClick={()=>navigate("/cart")}
          className="relative p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
          <ShoppingCart size={18} className="text-[#181725]" />
          {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#53B175] text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
        </button>
         
        <div className="h-8 w-8 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center cursor-pointer">
          <span className="text-emerald-700 font-semibold text-sm">AT</span>
        </div>
      </div>
    </header>
  );
};

export default CustomerNavbar;
