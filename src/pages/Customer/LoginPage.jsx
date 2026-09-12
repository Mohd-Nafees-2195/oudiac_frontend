import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FuturisticLoader from "../../components/Admin/Layout/FuturisticLoader";
import toast from "react-hot-toast";
import { useAuth } from "../../components/Auth/AuthContext";

const LoginPage = () => {
  const { customerLogin } = useAuth();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    //send otp from backend and redirect to verification page
    try {
      await customerLogin(email);
      // Success! The cookie is now in the browser and state is updated.
      // Redirect or close modal here.
    } catch (err) {
      console.error("Invalid credentials");
      toast("Invalid credentials");
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <FuturisticLoader />
      ) : (
        <div className="min-h-screen flex font-[Poppins,sans-serif]">
          {/* Left green panel */}
          <div className="w-2/5 bg-[#53B175] flex flex-col items-center justify-center p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full -translate-y-1/4 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full translate-y-1/4 -translate-x-1/4" />
            <div className="relative z-10 text-center">
              <div className="text-8xl mb-8">🛍️</div>
              <h2 className="text-white text-3xl font-bold mb-3">
                Shop smarter,
                <br />
                live better
              </h2>
              <p className="text-white/80 text-base">
                Best and branded delivered
                <br />
                to your door
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="flex-1 bg-white flex flex-col justify-center px-16 py-12">
            <Link to="/" className="flex items-center gap-2 mb-12">
              <div className="w-8 h-8 bg-[#53B175] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <span className="text-xl font-bold text-[#181725]">nectar</span>
            </Link>

            <div className="max-w-md">
              <h1 className="text-3xl font-bold text-[#181725] mb-2">Log in</h1>
              <p className="text-[#7C7C7C] mb-8">
                Enter your credentials to access your account
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* <div>
              <label className="block text-sm font-medium text-[#181725] mb-2">Phone number</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+1 555 000 0000"
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-[#181725] placeholder:text-[#B3B3B3] focus:outline-none focus:border-[#53B175] focus:ring-2 focus:ring-[#53B175]/20 transition-all"
              />
            </div> */}
                <div>
                  <label className="block text-sm font-medium text-[#181725] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example.gmail.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-[#181725] placeholder:text-[#B3B3B3] focus:outline-none focus:border-[#53B175] focus:ring-2 focus:ring-[#53B175]/20 transition-all"
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-[#7C7C7C] cursor-pointer">
                    <input type="checkbox" className="accent-[#53B175]" />
                    Remember me
                  </label>
                  <span className="text-[#53B175] font-medium cursor-pointer hover:underline">
                    Forgot password?
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#53B175] text-white py-4 rounded-2xl font-semibold text-base hover:bg-[#3d9a5f] transition-colors mt-2"
                >
                  Log in
                </button>

                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-100" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-sm text-[#7C7C7C]">
                      or continue with
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full border border-gray-200 text-[#181725] py-3.5 rounded-2xl font-medium text-sm flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-xl">G</span>
                  Continue with Google
                </button>
              </form>

              <p className="text-center text-sm text-[#7C7C7C] mt-8">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-[#53B175] font-semibold hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default LoginPage;
