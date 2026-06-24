import React from 'react';

export default function ServerDown() {
  const handleReload = () => {
    window.location.href = "/admin/login"; 
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 font-sans text-gray-800">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 text-center transform transition-all">
        
        {/* Floating Server/Disconnected Icon */}
        <div className="relative w-32 h-32 mx-auto mb-8 animate-[bounce_3s_infinite]">
          <div className="absolute inset-0 bg-red-100 rounded-full blur-xl opacity-50"></div>
          <div className="relative flex items-center justify-center w-full h-full bg-white border-4 border-red-50 rounded-full shadow-sm">
            <svg 
              className="w-16 h-16 text-red-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 22v-4m-3 4l6-8" 
                className="text-red-600"
              />
            </svg>
          </div>
        </div>

        {/* Error Text */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
          503
        </h1>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Connection Lost
        </h2>
        <p className="text-gray-500 text-sm md:text-base font-medium mb-8 leading-relaxed">
          We are unable to connect to the backend servers right now. Our engineering team has been notified and is investigating the issue.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleReload}
            className="w-full sm:w-auto px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </button>
          <a
            href="mailto:support@yourcompany.com"
            className="w-full sm:w-auto px-8 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-xl border border-gray-200 transition-all active:scale-[0.98]"
          >
            Contact Support
          </a>
        </div>

      </div>
    </div>
  );
}