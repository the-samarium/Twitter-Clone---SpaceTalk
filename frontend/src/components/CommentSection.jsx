import React, { useState, useEffect } from "react";
import { Send } from "lucide-react";

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

export default function CommentSection({ postId, darkMode }) {
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:8000/comments?post_id=${postId}`);
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        } else {
          console.error("Failed to fetch comments");
        }
      } catch (err) {
        console.error("Error fetching comments:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:8000/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_id: postId,
          body: newCommentText.trim(),
        }),
      });

      if (response.ok) {
        const addedComment = await response.json();
        setComments((prev) => [...prev, addedComment]);
        setNewCommentText("");
      } else {
        console.error("Failed to post comment");
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className={`mt-3 pt-3 border-t flex flex-col gap-3.5 ${
        darkMode ? "border-[#2f3336]" : "border-[#eff3f4]"
      }`}
      onClick={(e) => e.stopPropagation()} // Avoid triggering card toggle
    >
      <span className="text-[13px] font-bold text-[#71767b] px-1 uppercase tracking-wider">Replies</span>

      {isLoading ? (
        <div className="flex justify-center items-center py-6 gap-2 text-[#71767b]">
          <div className="w-5 h-5 border-2 border-transparent border-t-[#f97316] rounded-full animate-spin"></div>
          <span className="text-xs">Loading replies...</span>
        </div>
      ) : comments.length === 0 ? (
        <div className={`text-center py-6 text-sm italic rounded-sm border border-dashed ${
          darkMode 
            ? "text-[#71767b] bg-[#16181c]/20 border-[#2f3336]" 
            : "text-[#536471] bg-[#f7f9f9]/50 border-[#eff3f4]"
        }`}>
          No replies yet. Be the first to reply!
        </div>
      ) : (
        <div className="flex flex-col gap-1 relative pl-1">
          {/* Thread Connector Line */}
          <div className={`absolute left-[20px] top-6 bottom-6 w-[2px] z-0 ${
            darkMode ? "bg-[#2f3336]" : "bg-[#eff3f4]"
          }`} />

          {comments.map((comment) => (
            <div key={comment.cid} className="flex gap-3 py-2 z-10 relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 border shadow-sm ${
                darkMode 
                  ? "bg-linear-to-tr from-[#71767b] to-[#2f3336] text-white border-black" 
                  : "bg-linear-to-tr from-[#cfd9db] to-[#9ca3af] text-black border-white"
              }`}>
                U
              </div>
              <div 
                className={`flex-1 flex flex-col min-w-0 border rounded-sm p-3 transition-colors duration-150 ${
                  darkMode 
                    ? "bg-[#16181c]/40 hover:bg-[#16181c]/70 border-[#2f3336]/60 text-[#e7e9ea]" 
                    : "bg-[#f7f9f9]/80 hover:bg-[#f7f9f9] border-[#eff3f4]/80 text-[#0f1419]"
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold">Anonymous</span>
                  <div className="flex items-center gap-2">
                    <span className={darkMode ? "text-[#71767b]" : "text-[#536471]"}>#{comment.cid}</span>
                    <span className={darkMode ? "text-[#71767b]" : "text-[#536471]"}>· {formatTimestamp(comment.created_at)}</span>
                  </div>
                </div>
                <p className="text-[14px] leading-relaxed word-break-break-word">
                  {comment.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reply input field form */}
      <form onSubmit={handleSubmitComment} className="flex gap-2 items-center mt-1">
        <input
          type="text"
          className={`flex-1 border rounded-sm px-4 py-2 text-sm outline-none transition-all ${
            darkMode 
              ? "bg-[#16181c] border-[#2f3336] text-[#e7e9ea] focus:border-[#f97316] focus:bg-black" 
              : "bg-[#eff3f4] border-[#eff3f4] text-[#0f1419] focus:border-[#f97316] focus:bg-white placeholder-[#536471]"
          }`}
          placeholder="Write a reply..."
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          disabled={isSubmitting}
        />
        <button
          type="submit"
          className="bg-[#f97316]/10 hover:bg-[#f97316] text-[#f97316] hover:text-white border border-[#f97316]/20 hover:border-transparent rounded-sm p-2.5 transition-all duration-150 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          disabled={isSubmitting || !newCommentText.trim()}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
// ------------------------------------------------------
