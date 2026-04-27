import { fetchProfileForUser, type ProfileSnapshot } from "@/lib/data/profile";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { SupabaseClient, User } from "@supabase/supabase-js";

export type OpsSessionContext =
  | { kind: "missing_env" }
  | {
      kind: "ok";
      supabase: SupabaseClient;
      user: User;
      userEmail: string;
      profile: ProfileSnapshot;
    };

/**
 * Página de backoffice: env + sesión + perfil. Sin env: no redirige; sin user → /login
 */
export async function getOpsSessionContext(): Promise<OpsSessionContext> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return { kind: "missing_env" };
  }
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) {
    redirect("/login");
  }
  const profile = await fetchProfileForUser(supabase, user.id);
  return {
    kind: "ok",
    supabase,
    user,
    userEmail: user.email,
    profile,
  };
}
