// src/app/api/hello/route.ts

import { createServerClient } from "@/lib/supabaseServerClient";

export async function GET() {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return Response.json({ userId: user?.id ?? null });
}