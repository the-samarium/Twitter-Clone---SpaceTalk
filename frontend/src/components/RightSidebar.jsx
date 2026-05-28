import React from "react";
import { Search } from "lucide-react";

// --- RightSidebar Component Modified by Antigravity ---
export default function RightSidebar({ darkMode }) {
  return (
    <aside 
      className={`hidden xl:flex flex-col gap-4 w-80 h-screen py-3 px-4 sticky top-0 overflow-y-auto select-none transition-colors duration-300 ${
        darkMode ? "border-l border-[#2f3336] bg-black" : "border-l border-[#eff3f4] bg-white"
      }`}
    >
      
      {/* Sticky Search bar */}
      <div className={`sticky top-0 py-1 z-30 transition-colors duration-300 ${darkMode ? "bg-black" : "bg-white"}`}>
        <div 
          className={`relative flex items-center rounded-full border border-transparent group transition-all duration-200 ${
            darkMode 
              ? "bg-[#16181c] focus-within:border-[#1d9bf0] focus-within:bg-black" 
              : "bg-[#eff3f4] focus-within:border-[#1d9bf0] focus-within:bg-white"
          }`}
        >
          <Search className="w-5 h-5 text-[#71767b] group-focus-within:text-[#1d9bf0] absolute left-4" />
          <input
            type="text"
            placeholder="Search SpaceTalk"
            className={`w-full bg-transparent py-3 pl-12 pr-4 rounded-full text-sm outline-none transition-colors ${
              darkMode ? "text-[#e7e9ea] placeholder-[#71767b]" : "text-[#0f1419] placeholder-[#536471]"
            }`}
          />
        </div>
      </div>

      {/* Project Information Widget (Replaces trending and follow suggestions) */}
      <section 
        className={`rounded-2xl border p-4 flex flex-col gap-4 transition-colors duration-300 ${
          darkMode ? "bg-[#16181c] border-[#2f3336]" : "bg-[#f7f9f9] border-[#eff3f4]"
        }`}
      >
        <h3 className={`font-extrabold text-xl tracking-tight ${darkMode ? "text-[#e7e9ea]" : "text-[#0f1419]"}`}>
          About SpaceTalk
        </h3>
        
        <div className="flex flex-col gap-3.5 text-[14px] leading-relaxed">
          <p className={darkMode ? "text-[#71767b]" : "text-[#536471]"}>
            SpaceTalk is a high-performance, minimalist microblogging platform built to demonstrate seamless asynchronous database integration.
          </p>

          <div className="flex flex-col gap-1.5">
            <span className={`font-bold ${darkMode ? "text-[#e7e9ea]" : "text-[#0f1419]"}`}>
              Backend Engine
            </span>
            <ul className={`list-disc pl-5 flex flex-col gap-1 ${darkMode ? "text-[#71767b]" : "text-[#536471]"}`}>
              <li>FastAPI Async Framework</li>
              <li>databases[aiosqlite] library</li>
              <li>SQLite database driver</li>
              <li>Raw SQLite SQL query injection</li>
            </ul>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className={`font-bold ${darkMode ? "text-[#e7e9ea]" : "text-[#0f1419]"}`}>
              Frontend Interface
            </span>
            <ul className={`list-disc pl-5 flex flex-col gap-1 ${darkMode ? "text-[#71767b]" : "text-[#536471]"}`}>
              <li>React (Vite scaffolding)</li>
              <li>Tailwind CSS v4 styles</li>
              <li>Lucide vector iconography</li>
              <li>Framer Motion core animations</li>
            </ul>
          </div>
        </div>
      </section>

    </aside>
  );
}
// ---------------------------------------------------
