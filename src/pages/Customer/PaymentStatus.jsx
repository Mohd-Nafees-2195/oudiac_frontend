import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentStatus = ({ status = 'success', data = {} }) => {
  const isSuccess = status === 'success';

  const navigate=useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center border border-slate-100 transition-all duration-300">
        
        {/* Status Animated Icon Wrapper */}
        <div className="flex justify-center mb-6">
          {isSuccess ? (
            <div className="bg-emerald-50 text-emerald-500 p-4 rounded-full ring-8 ring-emerald-50/50 animate-bounce">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : (
            <div className="bg-rose-50 text-rose-500 p-4 rounded-full ring-8 ring-rose-50/50">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
        </div>

        {/* Dynamic Heading and Subtext */}
        <h1 className={`text-2xl font-bold tracking-tight mb-2 ${isSuccess ? 'text-slate-900' : 'text-rose-600'}`}>
          {isSuccess ? 'Payment Confirmed! 🎉' : 'Payment Failed'}
        </h1>
        <p className="text-slate-500 text-sm mb-6 px-4">
          {isSuccess 
            ? 'Thank you for your purchase! Your order has been securely processed and confirmed.' 
            : 'We couldn\'t process your transaction. Please check your bank details or try using a different payment method.'}
        </p>

        {/* Transaction Details Card */}
        <div className="bg-slate-50 rounded-xl p-4 mb-8 text-left border border-slate-100 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-medium uppercase tracking-wider">Order Reference</span>
            <span className="font-mono font-semibold text-slate-700">{data.orderNumber || 'OUD-2026-XXXX'}</span>
          </div>
          
          {data.razorpayOrderId && (
            <div className="flex justify-between items-center text-xs border-t border-slate-200/60 pt-2">
              <span className="text-slate-400 font-medium uppercase tracking-wider">Gateway Order ID</span>
              <span className="font-mono font-medium text-slate-600">{data.razorpayOrderId}</span>
            </div>
          )}

          {data.razorpayPaymentId && (
            <div className="flex justify-between items-center text-xs border-t border-slate-200/60 pt-2">
              <span className="text-slate-400 font-medium uppercase tracking-wider">Transaction ID</span>
              <span className="font-mono font-medium text-slate-600">{data.razorpayPaymentId}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3">
          {isSuccess ? (
            <button 
              onClick={() => window.location.href = '/dashboard/orders'}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-4 rounded-xl shadow-sm transition-all text-sm"
            >
              Track Your Order
            </button>
          ) : (
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-3 px-4 rounded-xl shadow-sm transition-all text-sm"
            >
              Try Paying Again
            </button>
          )}

          <button 
            onClick={() => navigate("/home")}
            className="w-full bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 font-medium py-3 px-4 rounded-xl transition-all text-sm"
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
};

export default PaymentStatus;