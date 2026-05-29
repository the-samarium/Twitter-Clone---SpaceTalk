import React, { useState, useEffect } from "react";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import FeedHeader from "./components/FeedHeader";
import PostComposer from "./components/PostComposer";
import PostCard from "./components/PostCard";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Manage global theme toggle state (Dark mode active by default)
  const [darkMode, setDarkMode] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:8000/posts");
      if (response.ok) {
        const data = await response.json();
        // Sort posts so that the newest post is at the top of the feed (descending order by id)
        const sortedData = data.sort((a, b) => b.id - a.id);
        setPosts(sortedData);
        setError(null);
      } else {
        setError("Failed to load timeline. Server error.");
      }
    } catch (err) {
      console.error("Connection error:", err);
      setError("Unable to connect to the backend server. Make sure FastAPI is running!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div 
      className={`min-h-screen w-full flex justify-center transition-colors duration-300 selection:bg-[#f97316]/30 ${
        darkMode ? "bg-black text-[#e7e9ea]" : "bg-white text-[#0f1419]"
      }`}
    >
      {/* 3-Column Grid Wrapper */}
      <div className="grid grid-cols-[auto_1fr] xl:grid-cols-[auto_1fr_auto] w-full max-w-[1250px] min-h-screen">
        
        {/* Column 1: Left Navigation Sidebar */}
        <LeftSidebar darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Column 2: Central Scrollable Feed Column */}
        <main 
          className={`flex-1 flex flex-col min-w-0 border-x max-w-[600px] w-full md:min-w-[500px] transition-colors duration-300 ${
            darkMode ? "border-[#2f3336]" : "border-[#eff3f4]"
          }`}
        >
          {/* Frosted Sticky Feed Header */}
          <FeedHeader darkMode={darkMode} />

          {/* Post composer panel */}
          <PostComposer onPostCreated={fetchPosts} darkMode={darkMode} />

          {/* Timeline Feed items */}
          <div className="flex-1 flex flex-col pb-24 sm:pb-4">
            {isLoading ? (
              // Loading skeletons
              <div className="flex flex-col">
                {[1, 2, 3].map((n) => (
                  <div 
                    key={n} 
                    className={`flex gap-3 px-4 py-4 border-b animate-pulse ${
                      darkMode ? "border-[#2f3336]" : "border-[#eff3f4]"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full shrink-0 ${
                      darkMode ? "bg-[#16181c]" : "bg-[#eff3f4]"
                    }`} />
                    <div className="flex-1 flex flex-col gap-3">
                      <div className={`h-4 rounded-sm w-1/3 ${darkMode ? "bg-[#16181c]" : "bg-[#eff3f4]"}`} />
                      <div className={`h-4 rounded-sm w-full ${darkMode ? "bg-[#16181c]" : "bg-[#eff3f4]"}`} />
                      <div className={`h-4 rounded-sm w-5/6 ${darkMode ? "bg-[#16181c]" : "bg-[#eff3f4]"}`} />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              // Error panel styling
              <div className="flex flex-col items-center justify-center text-center p-8 gap-4 mt-6">
                <AlertCircle className="w-12 h-12 text-[#f91880]" />
                <p className="text-sm font-bold max-w-xs leading-normal">{error}</p>
                <button 
                  onClick={fetchPosts}
                  className="bg-[#ea580c] hover:bg-[#c2410c] text-white rounded-sm font-bold px-6 py-2.5 text-sm transition-all duration-150 flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retry Connection
                </button>
              </div>
            ) : posts.length === 0 ? (
              // Empty Feed state
              <div className="flex flex-col items-center justify-center text-center p-12 text-[#71767b] mt-4">
                <p className={`font-extrabold text-xl mb-1 ${darkMode ? "text-[#e7e9ea]" : "text-[#0f1419]"}`}>
                  Welcome to SpaceTalk!
                </p>
                <p className="text-sm max-w-xs leading-normal">Write and publish the first post on the timeline above to start the conversation.</p>
              </div>
            ) : (
              // Posts feed list
              posts.map((post) => (
                <PostCard key={post.id} post={post} darkMode={darkMode} />
              ))
            )}
          </div>

        </main>

        {/* Column 3: Right Discovery Sidebar */}
        <RightSidebar darkMode={darkMode} />

      </div>

    </div>
  );
}
// -----------------------------------------------
