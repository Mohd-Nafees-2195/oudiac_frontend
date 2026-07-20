import React from "react";

const FuturisticLoader = () => {

  return (
    // 1. The Dark Overlay with Blur
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 backdrop-blur-md">
      
      {/* 2. The Main Spinner Container */}
      <div className="relative flex items-center justify-center w-64 h-64">
        
        {/* Outer Ring (Slow, Blue, Clockwise) */}
        <div className="absolute w-56 h-56 border-[6px] border-transparent border-t-blue-600 border-b-blue-600 rounded-full animate-[spin_3s_linear_infinite] shadow-[0_0_30px_rgba(37,99,235,0.4)] opacity-80"></div>

        {/* Middle Ring (Medium, Cyan, Counter-Clockwise) */}
        {/* Note: the '_reverse' at the end makes it spin backwards! */}
        <div className="absolute w-48 h-48 border-[6px] border-transparent border-r-cyan-400 border-l-cyan-400 rounded-full animate-[spin_2s_linear_infinite_reverse] shadow-[0_0_20px_rgba(34,211,238,0.5)] opacity-90"></div>

        {/* Inner Ring (Fast, Light Blue, Clockwise) */}
        <div className="absolute w-40 h-40 border-[4px] border-transparent border-t-blue-400 border-b-blue-400 rounded-full animate-[spin_1s_linear_infinite] shadow-[0_0_15px_rgba(96,165,250,0.6)]"></div>

        {/* 3. The Center Core with Text */}
        <div className="absolute flex flex-col items-center justify-center bg-gray-900/50 rounded-full w-32 h-32 backdrop-blur-sm border border-blue-500/30 shadow-[inset_0_0_20px_rgba(59,130,246,0.5)]">
          
          <span className="text-cyan-300 font-bold tracking-[0.2em] text-sm animate-pulse drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
            LOADING
          </span>
          
          {/* Bouncing dots underneath the text */}
          <div className="flex gap-1 mt-2">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
          
        </div>
        
      </div>
    </div>
  );
};

export default FuturisticLoader;