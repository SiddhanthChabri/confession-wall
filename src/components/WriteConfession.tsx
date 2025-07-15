"use client";

import { useState } from "react";
import { createBrowserClient } from "@/lib/supabaseBrowserClient";

const supabase = createBrowserClient(); // ✅ move client outside to avoid re-creating

export default function WriteConfession({ onNewConfession }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!text.trim()) {
      setErrorMsg("Confession cannot be empty.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("confessions")
      .insert([{ content: text.trim() }])
      .select();

    setLoading(false);

    if (error) {
      console.error("Error adding confession:", error);
      setErrorMsg("Failed to submit. Try again.");
    } else if (data && data.length > 0) {
      console.log("Confession added:", data[0]);
      setText("");

      // ✅ Call parent to update UI instantly
      if (onNewConfession) onNewConfession(data[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        placeholder="Write your confession..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border rounded p-2"
        rows={4}
      />
      {errorMsg && (
        <p className="text-red-600 text-sm">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
