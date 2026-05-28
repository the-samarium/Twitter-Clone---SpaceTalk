import React from "react";
import { 
  Home, 
  Sun, 
  Moon, 
  Feather, 
  MoreHorizontal 
} from "lucide-react";

// --- LeftSidebar Component Modified by Antigravity ---
export default function LeftSidebar({ darkMode, setDarkMode }) {
  return (
    <aside 
      className={`fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t px-2 sm:relative sm:z-0 sm:flex-col sm:justify-start sm:border-t-0 sm:border-r sm:h-screen sm:w-20 lg:w-64 sm:py-4 sm:px-3 sm:items-start select-none transition-colors duration-300 ${
        darkMode ? "bg-black border-[#2f3336]" : "bg-white border-[#eff3f4]"
      }`}
    >
      
      {/* App Logo - X-Inspired Icon */}
      <div 
        className={`hidden sm:flex items-center justify-center p-3 rounded-full cursor-pointer mb-2 lg:ml-2 transition-colors duration-200 ${
          darkMode ? "hover:bg-[#16181c] text-[#e7e9ea]" : "hover:bg-[#f0f2f3] text-[#1d9bf0]"
        }`}
      >
        <svg 
          viewBox="0 0 24 24" 
          aria-hidden="true" 
          className="w-8 h-8 fill-current"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
        </svg>
      </div>

      {/* Navigation - HOME ONLY */}
      <nav className="flex w-full items-center justify-around sm:flex-col sm:items-start sm:gap-2">
        <div
          className={`group flex items-center gap-4 p-3 rounded-full cursor-pointer transition-all duration-200 w-fit lg:w-full font-bold ${
            darkMode 
              ? "hover:bg-[#16181c] text-[#e7e9ea]" 
              : "hover:bg-[#f0f2f3] text-[#0f1419]"
          }`}
        >
          <Home 
            className={`w-7 h-7 stroke-[2.2] group-hover:scale-105 transition-transform duration-200 ${
              darkMode ? "text-[#e7e9ea]" : "text-[#0f1419]"
            }`} 
          />
          <span className="hidden lg:inline text-xl font-bold">
            Home
          </span>
        </div>

        {/* LIGHT/DARK THEME TOGGLE BUTTON */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`group flex items-center gap-4 p-3 rounded-full cursor-pointer transition-all duration-200 w-fit lg:w-full border-0 bg-transparent text-left outline-none ${
            darkMode 
              ? "hover:bg-[#16181c] text-[#71767b]" 
              : "hover:bg-[#f0f2f3] text-[#536471]"
          }`}
        >
          {darkMode ? (
            <>
              <Sun className="w-7 h-7 stroke-[2.2] text-[#e7e9ea] group-hover:rotate-45 transition-transform duration-300" />
              <span className="hidden lg:inline text-xl font-medium text-[#e7e9ea]">Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-7 h-7 stroke-[2.2] text-[#0f1419] group-hover:-rotate-12 transition-transform duration-300" />
              <span className="hidden lg:inline text-xl font-medium text-[#0f1419]">Dark Mode</span>
            </>
          )}
        </button>
      </nav>

      {/* Primary Action Button (Tweet / Post) */}
      <button className="hidden sm:flex items-center justify-center w-fit lg:w-full bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white rounded-full font-bold lg:py-3.5 lg:px-8 mt-6 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 lg:text-md border-0 outline-none">
        <Feather className="w-6 h-6 lg:hidden" />
        <span className="hidden lg:inline text-lg font-bold">Post</span>
      </button>

      {/* Floating Action Button for Mobile only */}
      <button className="sm:hidden fixed bottom-20 right-4 bg-[#1d9bf0] text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center active:scale-95 transition-transform duration-150 border-0 outline-none">
        <Feather className="w-6 h-6" />
      </button>

      {/* User Info Capsule at bottom */}
      <div 
        className={`hidden sm:flex items-center justify-between p-3 rounded-full cursor-pointer w-full mt-auto mb-2 transition-colors duration-200 ${
          darkMode ? "hover:bg-[#16181c]" : "hover:bg-[#f0f2f3]"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1d9bf0] to-[#8b5cf6] flex items-center justify-center font-bold text-white shadow-inner shrink-0">
            U
          </div>
          <div className="hidden lg:flex flex-col select-none leading-tight">
            <span className={`font-bold text-sm leading-tight ${darkMode ? "text-[#e7e9ea]" : "text-[#0f1419]"}`}>
              Anonymous User
            </span>
            <span className="text-[#71767b] text-xs">@anon_poster</span>
          </div>
        </div>
        <MoreHorizontal className="hidden lg:inline w-5 h-5 text-[#71767b] mr-1" />
      </div>

    </aside>
  );
}
// --------------------------------------------------
