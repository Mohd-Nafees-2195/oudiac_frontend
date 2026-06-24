import { useEffect, useState } from "react";
import { useAuth } from "../../components/Auth/AuthContext";

export default function Login() {
  // const [render, setRender] = useState(false);
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Success! The cookie is now in the browser and state is updated.
      // Redirect or close modal here.
    } catch (err) {
      console.error("Invalid credentials");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 transition-all duration-500 opacity-100 visible opacity-0 invisible"
    >
      {/* Blurred Dark Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
      ></div>

      {/* 3D Perspective Wrapper */}
      <div className="relative w-full max-w-md [perspective:1200px] z-10">
        
        {/* The Animated Modal Card */}
        <div
          className="bg-white rounded-3xl shadow-2xl p-8 transform-gpu transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] opacity-100 scale-100 translate-y-0 [transform:rotateX(0deg)]"
        >

          {/* Header */}
          <div className="text-center mb-8 mt-2">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900">Welcome Back</h2>
            <p className="text-sm text-gray-500 mt-2 font-medium">Log in to the Operations Center</p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">Work Email</label>
              <input
                type="email"
                placeholder="crew@airline.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white text-sm font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-gray-700">Password</label>
                <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">Forgot?</a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white text-sm font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              onClick={handleLoginSubmit}
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-sm shadow-md shadow-blue-500/30 transform transition-transform active:scale-[0.98]"
            >
              Authenticate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}