import { Link } from "react-router";
import { CheckCircle2 } from "lucide-react";

export default function OrderConfirmedPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center font-[Poppins,sans-serif] p-8">
      {/* Success animation */}
      <div className="w-32 h-32 bg-[#53B175] rounded-full flex items-center justify-center mb-8 shadow-lg shadow-[#53B175]/30">
        <CheckCircle2 size={60} className="text-white" />
      </div>

      <h1 className="text-3xl font-bold text-[#181725] mb-3 text-center">Your Order has<br />been Accepted</h1>
      <p className="text-[#7C7C7C] text-center mb-10 max-w-sm">
        Your items have been placed and are on their way to you.
      </p>

      {/* Estimated delivery card */}
      <div className="bg-[#F2F3F2] rounded-3xl p-6 w-full max-w-md mb-8 text-center">
        <p className="text-sm text-[#7C7C7C] mb-1">Estimated Delivery Time</p>
        <p className="text-2xl font-bold text-[#181725]">30 – 45 minutes</p>
        <div className="mt-4 flex justify-between text-xs text-[#7C7C7C]">
          <span>Order placed ✓</span>
          <span>In transit →</span>
          <span>Delivered</span>
        </div>
        <div className="mt-2 w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-[#53B175] rounded-full w-1/3" />
        </div>
      </div>

      <div className="flex gap-4 w-full max-w-md">
        <Link
          to="/order-tracking"
          className="flex-1 bg-[#53B175] text-white py-4 rounded-2xl font-semibold text-center hover:bg-[#3d9a5f] transition-colors"
        >
          Track Order
        </Link>
        <Link
          to="/home"
          className="flex-1 border-2 border-[#53B175] text-[#53B175] py-4 rounded-2xl font-semibold text-center hover:bg-[#f0faf5] transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
