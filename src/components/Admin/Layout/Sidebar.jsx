import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Box,
  ShoppingCart,
  Store,
  Users,
  Bike,
  TrendingUp,
  Tag,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../Auth/AuthContext";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { name: "Products", icon: Package, path: "/admin/products" },
  { name: "Add Product", icon: PlusCircle, path: "/admin/add-product" },
  { name: "Inventory", icon: Box, path: "/admin/inventory" },
  { name: "Orders", icon: ShoppingCart, path: "/admin/orders" },
  { name: "Stores", icon: Store, path: "/admin/stores" },
  { name: "Customers", icon: Users, path: "/admin/customers" },
  { name: "Managers", icon: Users, path: "/admin/managers" },
  { name: "Delivery Partners", icon: Bike, path: "/admin/delivery" },
  { name: "Analytics", icon: TrendingUp, path: "/admin/analytics" },
  { name: "Coupons", icon: Tag, path: "/admin/coupons" },
  { name: "Notifications", icon: Bell, path: "/admin/notifications" },
  { name: "Settings", icon: Settings, path: "/admin/settings" },
];

const Sidebar = ({ isOpen }) => {
  const {logout}=useAuth();

  const handleLogout = () => {
    logout();
  }

  return (
    <aside
      className={`bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-40 transition-transform duration-300 flex flex-col w-64 ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
    >
      {/* Brand Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <div className="flex items-center gap-2 text-emerald-600 font-bold text-2xl tracking-tight">
          <Store className="w-8 h-8" />
          <span>OUDIAC</span>
        </div>
      </div>

      {/* Admin Profile */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <img
            src="https://ui-avatars.com/api/?name=Admin+User&background=10b981&color=fff"
            alt="Admin"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="text-sm font-semibold text-gray-800">ATIF</h3>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-hide">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-emerald-50 text-emerald-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
