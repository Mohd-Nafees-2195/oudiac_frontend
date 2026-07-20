import { Link } from "react-router-dom";

const LandingPage=()=>{
    return (
    <div className="min-h-screen flex font-[Poppins,sans-serif]">
      {/* Left: Green hero */}
      <div className="w-1/2 bg-[#53B175] flex flex-col items-center justify-center p-16 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/3 -translate-x-1/3" />

        {/* Logo */}
        <div className="flex items-center gap-3 mb-12 relative z-10">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
            <span className="text-[#53B175] text-2xl font-bold">O</span>
          </div>
          <span className="text-white text-3xl font-bold tracking-tight">oudiac</span>
        </div>

        {/* Produce visual */}
        <div className="relative z-10 mb-10">
          <div className="w-72 h-72 bg-white/20 rounded-full flex items-center justify-center">
            <div className="text-9xl">🛒</div>
          </div>
          {/* Floating items */}
          <div className="absolute -top-4 -right-4 text-5xl animate-bounce">🍎</div>
          <div className="absolute -bottom-4 -left-4 text-5xl animate-bounce" style={{ animationDelay: "0.3s" }}>🥦</div>
          <div className="absolute top-1/2 -right-8 text-4xl animate-bounce" style={{ animationDelay: "0.6s" }}>🍋</div>
          <div className="absolute top-4 -left-8 text-4xl animate-bounce" style={{ animationDelay: "0.9s" }}>🥕</div>
        </div>

        <h1 className="text-white text-4xl font-bold text-center leading-tight relative z-10">
          Welcome to Oudiac<br />
        </h1>
        <p className="text-white/80 text-center mt-4 text-lg relative z-10">
          Get the Fragrance at an Affordable Price. ✅
        </p>
      </div>

      {/* Right: Auth choices */}
      <div className="w-1/2 bg-white flex flex-col items-center justify-center p-16">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-bold text-[#181725] mb-2">Get started</h2>
          <p className="text-[#7C7C7C] mb-10">Sign in or create an account to start shopping.</p>

          <div className="space-y-4">
            <Link
              to="/login"
              className="block w-full bg-[#53B175] text-white py-4 rounded-2xl text-center font-semibold text-lg hover:bg-[#3d9a5f] transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="block w-full border-2 border-[#53B175] text-[#53B175] py-4 rounded-2xl text-center font-semibold text-lg hover:bg-[#f0faf5] transition-colors"
            >
              Create Account
            </Link>
          </div>

          <p className="text-center text-sm text-[#7C7C7C] mt-8">
            By continuing, you agree to our{" "}
            <span className="text-[#53B175] font-medium cursor-pointer">Terms of Service</span>
            {" "}and{" "}
            <span className="text-[#53B175] font-medium cursor-pointer">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}
export default LandingPage;