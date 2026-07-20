import { Link, useLocation, useNavigate } from "react-router";
import { ShoppingCart, Home, List, Grid, Package, MapPin, Search, User, LogOut, Locate } from "lucide-react";
import { useApp } from "../context/AppContext";
import { useAuth } from "../../Auth/AuthContext";
import CustomerSidebar from "./CustomerSidebar";
import CustomerNavbar from "./CustomerNavbar";
import { useState } from "react";

const navItems = [
  { path: "/home", label: "Shop", icon: Home },
  { path: "/browse", label: "Browse", icon: Grid },
  { path: "/my-list", label: "My List", icon: List },
  { path: "/wholesale", label: "Wholesale", icon: Package },
  { path: "/add-address", label: "Address", icon: Locate },
];

export default function Layout({children}) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { cartCount } = useApp();
   const {customerLogout}=useAuth();
   const handleLogout = () => {
    customerLogout();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
      {/* <LoginPopup 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      /> */}
      <CustomerSidebar isOpen={isSidebarOpen} />

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen transition-all duration-300">
        <CustomerNavbar 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
        <div className="p-4 lg:p-8 flex-1 overflow-x-hidden">{children}</div>
      </main>
    </div>
    // // <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
    //   {/* Sidebar */}
    //   {/* <aside className="w-64 bg-white flex flex-col border-r border-gray-100 shrink-0"> */}
    //     {/* Logo */}
    //     {/* <div className="px-6 pt-8 pb-6">
    //       <Link to="/home" className="flex items-center gap-2">
    //         <div className="w-9 h-9 bg-[#53B175] rounded-xl flex items-center justify-center text-white text-xl font-bold">O</div>
    //         <span className="text-xl font-bold text-[#181725]">Oudiac</span>
    //       </Link>
    //     </div> */}

    //     {/* Location */}
    //     {/* <div className="px-6 pb-6">
    //       <div className="flex items-center gap-2 text-sm text-[#7C7C7C]">
    //         <MapPin size={14} className="text-[#53B175]" />
    //         <span>Dhaka, Bangladesh</span>
    //       </div>
    //     </div> */}

    //     {/* Search */}
    //     {/* <div className="px-4 pb-6">
    //       <div className="flex items-center gap-2 bg-[#F2F3F2] rounded-xl px-3 py-2.5">
    //         <Search size={16} className="text-[#7C7C7C]" />
    //         <input className="bg-transparent text-sm outline-none flex-1 text-[#181725] placeholder:text-[#7C7C7C]" placeholder="Search products..." />
    //       </div>
    //     </div> */}

    //     {/* Nav */}
    //     {/* <nav className="flex-1 px-3 space-y-1">
    //       {navItems.map(({ path, label, icon: Icon }) => {
    //         const active = location.pathname === path;
    //         return (
    //           <Link
    //             key={path}
    //             to={path}
    //             className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${active ? "bg-[#53B175] text-white" : "text-[#7C7C7C] hover:bg-[#F2F3F2] hover:text-[#181725]"}`}
    //           >
    //             <Icon size={18} />
    //             {label}
    //           </Link>
    //         );
    //       })}
    //     </nav> */}

    //     {/* Bottom */}
    //     {/* <div className="p-4 border-t border-gray-200">
    //       <button
    //         onClick={handleLogout}
    //         className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer">
    //         <LogOut className="w-5 h-5" />
    //         Logout
    //       </button>
    //     </div> */}
    //     {/* <div className="px-3 pb-6 space-y-1">
    //       <Link to="/login" className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-[#7C7C7C] hover:bg-[#F2F3F2] hover:text-[#181725] transition-all">
    //         <LogOut size={18} />
    //         Log out
    //       </Link>
    //     </div> */}
    //   // </aside>

    //   {/* Main */}
    //   {/* <div className="flex-1 flex flex-col overflow-hidden"> */}
    //     {/* Top bar */}
    //     {/* <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between shrink-0">
    //       <div className="flex items-center gap-2 text-sm text-[#7C7C7C]">
    //         <span className="text-[#181725] font-semibold capitalize">
    //           {navItems.find(n => n.path === location.pathname)?.label ?? "OUDIAC"}
    //         </span>
    //       </div>
    //       <div className="flex items-center gap-4">
    //         <Link to="/cart" className="relative">
    //           <div className="w-10 h-10 bg-[#F2F3F2] rounded-full flex items-center justify-center hover:bg-[#e8f5ee] transition-colors">
    //             <ShoppingCart size={18} className="text-[#181725]" />
    //           </div>
    //           {cartCount > 0 && (
    //             <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#53B175] text-white text-xs font-bold rounded-full flex items-center justify-center">
    //               {cartCount}
    //             </span>
    //           )}
    //         </Link>
    //         <Link to="/home">
    //           <div className="w-10 h-10 bg-[#53B175] rounded-full flex items-center justify-center text-white font-semibold text-sm">
              
    //             AT
    //           </div>
    //         </Link>
    //       </div>
    //     </header> */}

    //   {/* <CustomerSidebar isOpen={isSidebarOpen} /> */}

    //   {/* Overlay for mobile */}
    //   {/* {isSidebarOpen && (
    //     <div
    //       className="fixed inset-0 bg-black/50 z-30 lg:hidden"
    //       onClick={() => setIsSidebarOpen(false)}
    //     />
    //   )} */}

    //     {/* Page content */}
    //     {/* <main className="flex-1 lg:ml-64 flex flex-col min-h-screen transition-all duration-300">
    //       {children}
    //     </main> */}
    //   {/* </div> */}
    // {/* </div> */}
  );
}