import React from "react";
import { 
  Home, 
  Sun, 
  Moon, 
  Feather, 
  MoreHorizontal 
} from "lucide-react";

export default function LeftSidebar({ darkMode, setDarkMode }) {
  return (
    <aside 
      className={`fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t px-2 sm:relative sm:z-0 sm:flex-col sm:justify-start sm:border-t-0 sm:border-r sm:h-screen sm:w-20 lg:w-64 sm:py-4 sm:px-3 sm:items-start select-none transition-colors duration-300 ${
        darkMode ? "bg-black border-[#2f3336]" : "bg-white border-[#eff3f4]"
      }`}
    >
      
      {/* Navigation - HOME ONLY */}
      <nav className="flex w-full items-center justify-around sm:flex-col sm:items-start sm:gap-2">
        <div
          className={`group flex items-center gap-4 p-3 rounded-sm cursor-pointer transition-all duration-200 w-fit lg:w-full font-bold ${
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
          className={`group flex items-center gap-4 p-3 rounded-sm cursor-pointer transition-all duration-200 w-fit lg:w-full border-0 bg-transparent text-left outline-none ${
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

      {/* User Info Capsule at bottom */}
      <div 
        className={`hidden sm:flex items-center justify-between p-3 rounded-sm cursor-pointer w-full mt-auto mb-2 transition-colors duration-200 ${
          darkMode ? "hover:bg-[#16181c]" : "hover:bg-[#f0f2f3]"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#f97316] via-[#ea580c] to-[#f59e0b] flex items-center justify-center font-bold text-white shadow-inner shrink-0">
            A
          </div>
          <div className="hidden lg:flex flex-col select-none leading-tight">
            <span className={`font-bold text-sm leading-tight ${darkMode ? "text-[#e7e9ea]" : "text-[#0f1419]"}`}>
              Anonymous
            </span>
            <span className="text-[#f59e0b] text-xs">@anonymous</span>
          </div>
        </div>
        <MoreHorizontal className="hidden lg:inline w-5 h-5 text-[#71767b] mr-1" />
      </div>

    </aside>
  );
}
// --------------------------------------------------
