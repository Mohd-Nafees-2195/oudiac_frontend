import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, User, Search, Droplet } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Layout({ children }) {
  const { cartCount } = useApp();
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/shop", label: "Shop" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 text-neutral-900 font-sans">
      {/* Luxury Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Droplet className="text-amber-600" size={28} />
              <span className="text-2xl font-serif font-bold tracking-widest text-neutral-900 uppercase">
                Oudiac
              </span>
            </Link>

            {/* Center Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium tracking-wide uppercase transition-colors ${
                    location.pathname === link.path ? "text-amber-600" : "text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-6">
              <button className="text-neutral-500 hover:text-neutral-900 transition-colors">
                <Search size={20} />
              </button>
              <Link to="/profile" className="text-neutral-500 hover:text-neutral-900 transition-colors">
                <User size={20} />
              </Link>
              <Link to="/cart" className="relative text-neutral-500 hover:text-neutral-900 transition-colors">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
            
          </div>
        </div>
      </header>

      {/* Dynamic Page Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 py-12 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-serif text-white uppercase tracking-widest mb-4">Oudiac</h2>
          <p className="text-sm">Masterpieces of modern perfumery and authentic attars.</p>
          <div className="mt-8 border-t border-neutral-800 pt-8 text-xs">
            © 2026 Oudiac Fragrances. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}