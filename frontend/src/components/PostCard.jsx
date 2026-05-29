import React, { useState, useEffect } from "react";
import { MessageCircle, MoreHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CommentSection from "./CommentSection";

// Helper function to format timestamp from SQLite (UTC string) into relative or absolute display
const formatTimestamp = (timestamp) => {
  if (!timestamp) return "Just now";

  // SQLite returns "2026-05-29 14:32:01.123456" with no timezone — append Z to treat as UTC
  const normalized = timestamp.includes("T") ? timestamp : timestamp.replace(" ", "T") + "Z";
  const date = new Date(normalized);
  if (isNaN(date)) return timestamp; // fallback: show raw if parsing fails

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

  // Older than a week: show formatted date e.g. "May 29, 2026"
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const avatarThemes = [
  { gradient: "from-[#f97316] via-[#ea580c] to-[#f59e0b]" },
  { gradient: "from-[#fb7185] via-[#f43f5e] to-[#f97316]" },
  { gradient: "from-[#38bdf8] via-[#0ea5e9] to-[#3b82f6]" },
  { gradient: "from-[#22c55e] via-[#16a34a] to-[#15803d]" },
  { gradient: "from-[#8b5cf6] via-[#a855f7] to-[#c084fc]" },
  { gradient: "from-[#facc15] via-[#f59e0b] to-[#f97316]" },
];

const getAvatarTheme = (seed) => avatarThemes[seed % avatarThemes.length];

const getAvatarInitials = (seed) => {
  const first = String.fromCharCode(65 + (seed % 26));
  const second = String.fromCharCode(65 + ((seed + 7) % 26));
  return `${first}${second}`;
};

export default function PostCard({ post, darkMode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [replyCount, setReplyCount] = useState(0);
  const avatarTheme = getAvatarTheme(post.id);
  const avatarInitials = getAvatarInitials(post.id);

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
      <div className={`w-10 h-10 rounded-full bg-linear-to-tr ${avatarTheme.gradient} flex items-center justify-center font-bold text-white shadow-md text-sm shrink-0`}> 
        {avatarInitials}
      </div>

      {/* Column 2: Content details */}
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        
        {/* Post meta details row */}
        <div className="flex items-center justify-between text-[15px]">
          <div className="flex items-center gap-1.5 truncate">
            <span className={`font-bold hover:underline truncate ${darkMode ? "text-[#71767b]" : "text-[#4b5563]"}`}>
              Anonymous
            </span>
            <span className={`truncate ${darkMode ? "text-[#71767b]" : "text-[#6b7280]"}`}>
              @anonymous · {formatTimestamp(post.created_at)}
            </span>
          </div>
          <button className={`p-1.5 rounded-sm transition-colors ${
            darkMode ? "hover:bg-[#f97316]/10 text-[#71767b]" : "hover:bg-[#f97316]/10 text-[#536471]"
          }`}>
            <MoreHorizontal className="w-4 h-4 hover:text-[#f97316]" />
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
            className={`px-3 py-1 text-xs font-bold rounded-sm transition-colors ${
              darkMode 
                ? "bg-[#f97316]/10 text-[#f97316]" 
                : "bg-[#f97316]/12 text-[#c2410c]"
            }`}
          >
            Post #{post.id}
          </span>
          <span 
            className={`px-3 py-1 text-xs font-bold rounded-sm transition-colors ${
              darkMode 
                ? "bg-[#fb923c]/10 text-[#fb923c]" 
                : "bg-[#fb923c]/12 text-[#ea580c]"
            }`}
          >
            Replies: {replyCount}
          </span>
        </div>

        {/* Expand indicator and button */}
        <div className="flex items-center gap-2 text-[13px] text-[#71767b] mt-1">
          <MessageCircle className="w-4 h-4 text-[#f97316]" />
          <span className="font-semibold text-xs text-[#71767b] hover:text-[#f97316] transition-colors">
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
