// pages/test-realtime.tsx
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function TestRealtime() {
  useEffect(() => {
    const channel = supabase
      .channel("confessions-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "confessions",
        },
        (payload) => {
          console.log("Change received!", payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return <div>Check your console for realtime changes!</div>;
}
