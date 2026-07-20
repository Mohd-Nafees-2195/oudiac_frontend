import React, { useState, useRef, useEffect } from "react"; 
import { ApiWithoutAuth, getJwtFromCookie } from "../API/Api";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../components/Auth/AuthContext";


const CustomerOtpVarify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Retrieve email passed from the Login or Signup page
  const email = location.state?.email || "your email";

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30); // 30-second resend cooldown
  
  const inputRefs = useRef([]);
  const { verifyUserOtp } = useAuth();

  // Countdown timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Handle typing in the inputs
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Auto-focus to the next input box if a number is entered
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle Backspace to auto-focus previous input
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle OTP Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length < 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("new verify",email,otp);
     await verifyUserOtp(email,otpCode);
    } catch (err) {
      console.error("Invalid OTP");
    }
  };

  // Handle Resend OTP
  const handleResend = async () => {
    setTimer(30); // Reset timer
    setOtp(new Array(6).fill("")); // Clear current inputs
    inputRefs.current[0].focus(); // Focus first input
    setError("");

    try {
      await ApiWithoutAuth.post("/auth/send-email-otp", { email });
      toast("A new OTP has been sent to your email.");
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Verify Your Email</h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a 6-digit code to <span className="font-semibold">{email}</span>
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input Boxes */}
          <div className="flex justify-center gap-2">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                name="otp"
                maxLength="1"
                ref={(el) => (inputRefs.current[index] = el)}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={(e) => e.target.select()}
                className="w-12 h-12 text-xl text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* Resend Logic */}
        <div className="text-center text-sm text-gray-600">
          Didn't receive the code?{" "}
          {timer > 0 ? (
            <span className="font-semibold text-gray-900">
              Resend in {timer}s
            </span>
          ) : (
            <button
              onClick={handleResend}
              className="font-semibold text-blue-600 hover:text-blue-500 focus:outline-none"
            >
              Resend Now
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default CustomerOtpVarify;
