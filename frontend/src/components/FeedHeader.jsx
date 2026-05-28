import React, { useState } from "react";

export default function FeedHeader({ darkMode }) {
  const [activeTab, setActiveTab] = useState("for-you");

  return (
    <header 
      className={`sticky top-0 z-40 border-b sticky-header-blur select-none transition-colors duration-300 ${
        darkMode ? "border-[#2f3336] text-[#e7e9ea]" : "border-[#eff3f4] text-[#0f1419]"
      }`}
      style={{
        backgroundColor: darkMode ? "rgba(0, 0, 0, 0.65)" : "rgba(255, 255, 255, 0.65)"
      }}
    >
      
      {/* Title block */}
      <div className="flex items-center px-4 py-3">
        <h2 className="font-extrabold text-xl tracking-tight">Home</h2>
      </div>

      {/* Tabs list */}
      <div className="flex w-full border-t border-transparent text-sm">
        {/* 'For You' Tab */}
        <button
          onClick={() => setActiveTab("for-you")}
          className="flex-1 flex flex-col items-center justify-center py-4 cursor-pointer hover:bg-white/5 transition-colors relative"
        >
          <span 
            className={`font-semibold ${
              activeTab === "for-you" 
                ? (darkMode ? "text-[#e7e9ea]" : "text-[#0f1419]") 
                : "text-[#71767b]"
            }`}
          >
            For You
          </span>
          {activeTab === "for-you" && (
            <div className="absolute bottom-0 w-16 h-1 bg-[#1d9bf0] rounded-full" />
          )}
        </button>

        {/* 'Following' Tab */}
        <button
          onClick={() => setActiveTab("following")}
          className="flex-1 flex flex-col items-center justify-center py-4 cursor-pointer hover:bg-white/5 transition-colors relative"
        >
          <span 
            className={`font-semibold ${
              activeTab === "following" 
                ? (darkMode ? "text-[#e7e9ea]" : "text-[#0f1419]") 
                : "text-[#71767b]"
            }`}
          >
            Following
          </span>
          {activeTab === "following" && (
            <div className="absolute bottom-0 w-16 h-1 bg-[#1d9bf0] rounded-full" />
          )}
        </button>
      </div>

    </header>
  );
}
