import React, { useState, useEffect } from "react";
import { MessageCircle, MoreHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CommentSection from "./CommentSection";

// Helper function to format timestamp
const formatTimestamp = (timestamp) => {
  if (!timestamp) return "Just now";
  
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return `${diffSecs}s`;
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  
  return date.toLocaleDateString();
};

// --- PostCard Component Modified by Antigravity ---
export default function PostCard({ post, darkMode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [replyCount, setReplyCount] = useState(0);

  // Asynchronously query the exact number of replies for this specific post from SQLite
  useEffect(() => {
    const fetchReplyCount = async () => {
      try {
        const response = await fetch(`http://localhost:8000/comments?post_id=${post.id}`);
        if (response.ok) {
          const data = await response.json();
          setReplyCount(data.length);
        }
      } catch (err) {
        console.error("Error fetching reply count:", err);
      }
    };

    fetchReplyCount();
  }, [post.id, isExpanded]); // Re-fetch on expand in case new replies are added!

  return (
    <article 
      onClick={() => setIsExpanded(!isExpanded)}
      className={`flex gap-3 px-4 py-4 border-b transition-colors duration-200 cursor-pointer select-none ${
        darkMode ? "border-[#2f3336] bg-black hover:bg-[#080808]" : "border-[#eff3f4] bg-white hover:bg-[#f7f9f9]"
      }`}
    >
      {/* Column 1: User Avatar */}
      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1d9bf0] to-[#8b5cf6] flex items-center justify-center font-bold text-white shadow-md text-sm shrink-0">
        P
      </div>

      {/* Column 2: Content details */}
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        
        {/* Post meta details row */}
        <div className="flex items-center justify-between text-[15px]">
          <div className="flex items-center gap-1.5 truncate">
            <span className={`font-bold hover:underline truncate ${darkMode ? "text-[#e7e9ea]" : "text-[#0f1419]"}`}>
              Anonymous Poster
            </span>
            <span className={`truncate ${darkMode ? "text-[#71767b]" : "text-[#536471]"}`}>
              @anon_poster · {formatTimestamp(post.created_at)}
            </span>
          </div>
          <button className={`p-1.5 rounded-full transition-colors ${
            darkMode ? "hover:bg-[#1d9bf0]/10 text-[#71767b]" : "hover:bg-[#1d9bf0]/10 text-[#536471]"
          }`}>
            <MoreHorizontal className="w-4 h-4 hover:text-[#1d9bf0]" />
          </button>
        </div>

        {/* Post text body */}
        <p className={`text-[15px] leading-relaxed white-space-pre-wrap word-break-break-word ${
          darkMode ? "text-[#e7e9ea]" : "text-[#0f1419]"
        }`}>
          {post.body}
        </p>

        {/* Tags Row: Displays Comment Number and Reply Number (Simplified UI) */}
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <span 
            className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${
              darkMode 
                ? "bg-[#1d9bf0]/10 text-[#1d9bf0]" 
                : "bg-[#1d9bf0]/12 text-[#1a8cd8]"
            }`}
          >
            Post #{post.id}
          </span>
          <span 
            className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${
              darkMode 
                ? "bg-[#06b6d4]/10 text-[#06b6d4]" 
                : "bg-[#06b6d4]/12 text-[#0891b2]"
            }`}
          >
            Replies: {replyCount}
          </span>
        </div>

        {/* Expand indicator and button */}
        <div className="flex items-center gap-2 text-[13px] text-[#71767b] mt-1">
          <MessageCircle className="w-4 h-4 text-[#1d9bf0]" />
          <span className="font-semibold text-xs text-[#71767b] hover:text-[#1d9bf0] transition-colors">
            {isExpanded ? "Hide Replies" : "View & Reply"}
          </span>
        </div>

        {/* Lazy load comments only when card is expanded */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <CommentSection postId={post.id} darkMode={darkMode} />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </article>
  );
}
// ------------------------------------------------
