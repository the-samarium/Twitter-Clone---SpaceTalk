import React, { useState } from "react";

export default function CreatePost({ onPostCreated }) {
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const maxLength = 280; // Twitter classic limit

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!body.trim() || body.length > maxLength) return;

    setIsSubmitting(true);
    try {
      // POST the post to the backend endpoint
      const response = await fetch("http://localhost:8000/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: body.trim() }),
      });

      if (response.ok) {
        setBody(""); // Clear textarea
        if (onPostCreated) {
          onPostCreated(); // Callback to trigger reload of timeline
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

  return (
    <form onSubmit={handleSubmit} className="glass-panel create-post-box">
      <textarea
        className="create-post-textarea"
        placeholder="What's happening?"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        disabled={isSubmitting}
      />
      <div className="create-post-footer">
        <span 
          className={`char-counter ${
            charsLeft <= 20 ? (charsLeft < 0 ? "error" : "warning") : ""
          }`}
        >
          {charsLeft} characters remaining
        </span>
        <button
          type="submit"
          className="btn-primary"
          disabled={isSubmitting || !body.trim() || charsLeft < 0}
        >
          {isSubmitting ? "Posting..." : "Post"}
        </button>
      </div>
    </form>
  );
}
// -------------------------------------------------
