"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@/lib/supabaseBrowserClient";

export default function AuthButtons() {
  const [supabase] = useState(() => createBrowserClient());
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
      } else {
        setUser(data.user);
      }
    };

    getUser();
  }, [supabase]);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error("Google sign-in error:", error.message);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign out error:", error.message);
    } else {
      setUser(null);
    }
  };

  return (
    <div className="space-x-2">
      {user ? (
        <button
          onClick={signOut}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Sign out
        </button>
      ) : (
        <button
          onClick={signInWithGoogle}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
}
