"use client";

import { useEffect } from "react";

type Props = { error: Error & { digest?: string }; reset: () => void };

export default function RootError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="login-page">
      <div className="login-card" style={{ maxWidth: 440 }}>
        <h1 className="login-title">Algo salió mal</h1>
        <p className="login-lead" style={{ color: "var(--oxblood)" }}>
          {error.message || "Error inesperado al renderizar."}
        </p>
        <button type="button" className="login-submit" onClick={reset}>
          Reintentar
        </button>
      </div>
    </div>
  );
}
