import React, { useState, useRef, useEffect } from "react";
import { Image, BarChart2, Smile, Calendar, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PostComposer({ onPostCreated, darkMode }) {
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);
  const maxLength = 280;

  // Auto-expand the textarea as the user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [body]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!body.trim() || body.length > maxLength) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:8000/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: body.trim() }),
      });

      if (response.ok) {
        setBody("");
        setIsFocused(false);
        if (onPostCreated) {
          onPostCreated(); // Refresh posts timeline feed
        }
      } else {
        console.error("Failed to create post");
      }
    } catch (err) {
      console.error("Error creating post:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const charsLeft = maxLength - body.length;
  const percentageFilled = Math.min((body.length / maxLength) * 100, 100);

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`flex gap-3 px-4 py-3 border-b transition-colors duration-300 ${
        darkMode ? "border-[#2f3336] bg-black" : "border-[#eff3f4] bg-white"
      }`}
    >
      {/* Avatar block */}
      <div className="w-10 h-10 rounded-full bg-linear-to-tr from-[#f97316] via-[#ea580c] to-[#f59e0b] flex items-center justify-center font-bold text-white shadow-md text-sm shrink-0">
        U
      </div>

      {/* Editor Main block */}
      <div className="flex-1 flex flex-col gap-2">
        <textarea
          ref={textareaRef}
          className={`w-full bg-transparent border-0 text-[19px] leading-relaxed outline-none resize-none min-h-[52px] py-1 transition-colors ${
            darkMode ? "text-[#e7e9ea] placeholder-[#71767b]" : "text-[#0f1419] placeholder-[#536471]"
          }`}
          placeholder="What's happening?!"
          value={body}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => setBody(e.target.value)}
          disabled={isSubmitting}
          rows={1}
        />

        {/* Floating border active indicator only on focus */}
        <AnimatePresence>
          {isFocused && (
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              className="h-[1px] bg-[#f97316] origin-left w-full mb-1"
            />
          )}
        </AnimatePresence>

        {/* Action bar and submit controls */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-transparent">
          {/* Media upload mock icons */}
        <div className="flex items-center gap-1.5 text-[#f97316]">
            <button type="button" className={`p-2 rounded-sm transition-colors cursor-pointer active:scale-95 duration-100 ${
              darkMode ? "hover:bg-[#f97316]/10" : "hover:bg-[#f97316]/8"
            }`}>
              <Image className="w-[19px] h-[19px] stroke-[2.2]" />
            </button>
            <button type="button" className={`p-2 rounded-sm transition-colors cursor-pointer active:scale-95 duration-100 ${
              darkMode ? "hover:bg-[#f97316]/10" : "hover:bg-[#f97316]/8"
            }`}>
              <BarChart2 className="w-[19px] h-[19px] stroke-[2.2]" />
            </button>
            <button type="button" className={`p-2 rounded-sm transition-colors cursor-pointer active:scale-95 duration-100 ${
              darkMode ? "hover:bg-[#f97316]/10" : "hover:bg-[#f97316]/8"
            }`}>
              <Smile className="w-[19px] h-[19px] stroke-[2.2]" />
            </button>
            <button type="button" className={`p-2 rounded-sm transition-colors cursor-pointer active:scale-95 duration-100 ${
              darkMode ? "hover:bg-[#f97316]/10" : "hover:bg-[#f97316]/8"
            }`}>
              <Calendar className="w-[19px] h-[19px] stroke-[2.2]" />
            </button>
            <button type="button" className={`p-2 rounded-sm transition-colors cursor-pointer active:scale-95 duration-100 ${
              darkMode ? "hover:bg-[#f97316]/10" : "hover:bg-[#f97316]/8"
            }`}>
              <MapPin className="w-[19px] h-[19px] stroke-[2.2]" />
            </button>
          </div>

          {/* Submitting controls */}
          <div className="flex items-center gap-3">
            {body.length > 0 && (
              <div className="relative w-[28px] h-[28px] flex items-center justify-center">
                {/* SVG circular boundary progress tracker */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="14"
                    cy="14"
                    r="9"
                    className={`stroke-[2] fill-transparent ${darkMode ? "stroke-[#2f3336]" : "stroke-[#eff3f4]"}`}
                  />
                  <circle
                    cx="14"
                    cy="14"
                    r="9"
                    className={`stroke-[2.5] transition-all duration-150 ${
                      charsLeft <= 20 
                        ? (charsLeft < 0 ? "stroke-[#ef4444]" : "stroke-[#f59e0b]") 
                        : "stroke-[#f97316]"
                    }`}
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 9}
                    strokeDashoffset={2 * Math.PI * 9 * (1 - percentageFilled / 100)}
                  />
                </svg>
                {charsLeft <= 20 && (
                  <span className={`absolute text-[9px] font-bold ${
                    charsLeft < 0 ? "text-[#ef4444]" : (darkMode ? "text-[#71767b]" : "text-[#536471]")
                  }`}>
                    {charsLeft}
                  </span>
                )}
              </div>
            )}

            {/* Post button with Framer Motion spring click */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="bg-[#ea580c] hover:bg-[#c2410c] disabled:opacity-50 text-white rounded-sm font-bold px-5 py-2 text-sm shadow-sm transition-all"
              disabled={isSubmitting || !body.trim() || charsLeft < 0}
            >
              {isSubmitting ? "Posting..." : "Post"}
            </motion.button>
          </div>
        </div>

      </div>
    </form>
  );
}
// ---------------------------------------------------
