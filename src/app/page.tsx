import { createSupabaseServerClient } from "@/lib/supabase/server";
import { OracleHomeMain } from "@/components/ops/OracleHomeMain";
import { OracleSidebar } from "@/components/ops/OracleSidebar";
import { redirect } from "next/navigation";

export default async function HomePage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return (
      <div className="login-page">
        <div className="login-card">
          <h1 className="login-title">Falta configuración</h1>
          <p className="login-lead">
            Crea <code className="login-quiet">.env.local</code> a partir de{" "}
            <code className="login-quiet">.env.example</code> y define las
            variables de Supabase.
          </p>
        </div>
      </div>
    );
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) {
    redirect("/login");
  }

  return (
    <div className="app">
      <OracleSidebar userEmail={user.email} />
      <OracleHomeMain />
    </div>
  );
}
