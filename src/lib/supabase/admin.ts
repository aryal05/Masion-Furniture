import { createClient } from "@supabase/supabase-js";

// Admin client with service_role key — SERVER ONLY
// Used for bypassing RLS, admin operations, webhooks
if (typeof window !== "undefined") {
  throw new Error("supabase/admin.ts must only be used on the server");
}

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
