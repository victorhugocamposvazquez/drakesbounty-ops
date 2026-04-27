"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type LoginActionState = { ok?: boolean; error?: string };

export async function sendMagicLink(
  _prev: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  if (!email) {
    return { error: "Indica un correo." };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!appUrl) {
    return { error: "Falta NEXT_PUBLIC_APP_URL en el servidor." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${appUrl.replace(/\/$/, "")}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }
  return { ok: true };
}
