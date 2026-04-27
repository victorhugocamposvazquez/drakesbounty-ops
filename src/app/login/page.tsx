import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Entrar — Backoffice",
  robots: { index: false, follow: false, nocache: true },
};

function messageForParam(code: string) {
  if (code === "not_staff") {
    return "Correo no autorizado en esta consola. Contacta a un administrador.";
  }
  if (code === "auth") {
    return "Falta el código de inicio de sesión. Pide un enlace nuevo.";
  }
  try {
    return `Error: ${decodeURIComponent(code)}`;
  } catch {
    return `Error: ${code}`;
  }
}

type Props = {
  searchParams: Promise<{ error?: string; reason?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const p = await searchParams;
  const err = p.error ?? p.reason;
  const topMsg = err ? messageForParam(err) : null;

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Backoffice</h1>
        <p className="login-lead">
          Acceso con enlace al correo (misma instancia Supabase que el
          producto afiliado).
        </p>
        {topMsg ? (
          <p className="login-error" role="alert">
            {topMsg}
          </p>
        ) : null}
        <LoginForm />
        <p className="login-foot">
          <Link className="login-quiet" href="/">
            Volver
          </Link>{" "}
          — sin sesión no verás el dashboard
        </p>
      </div>
    </div>
  );
}
