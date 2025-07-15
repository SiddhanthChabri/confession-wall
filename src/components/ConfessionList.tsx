"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@/lib/supabaseBrowserClient";


const supabase = createBrowserClient();

type Confession = {
  id: number;
  content: string;
  created_at: string;
};

export default function ConfessionList() {
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchConfessions();
  }, []);

  async function fetchConfessions() {
    const { data, error } = await supabase
      .from("confessions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching confessions:", error.message);
    } else {
      setConfessions(data || []);
    }
  }


  const displayedConfessions = showAll
    ? confessions
    : confessions.slice(0, 5);

  return (
    <div className="space-y-4">
      

      {displayedConfessions.map((c) => (
        <div
          key={c.id}
          className="border rounded p-3 bg-black shadow"
        >
          {c.content}
        </div>
      ))}

      {confessions.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
        >
          {showAll ? "View Less" : "View More"}
        </button>
      )}
    </div>
  );
}
