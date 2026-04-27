"use client";

import { useActionState, useId } from "react";
import { sendMagicLink, type LoginActionState } from "./actions";

const initial: LoginActionState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(sendMagicLink, initial);
  const emailId = useId();

  if (state.ok) {
    return (
      <p className="login-hint" role="status">
        Revisa el correo: te hemos enviado un enlace para entrar. Si no lo ves,
        mira en spam.
      </p>
    );
  }

  return (
    <form className="login-form" action={formAction}>
      <label className="login-label" htmlFor={emailId}>
        Correo
      </label>
      <input
        className="login-input"
        id={emailId}
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder="tú@empresa.com"
        disabled={pending}
      />
      {state.error ? (
        <p className="login-error" role="alert">
          {state.error}
        </p>
      ) : null}
      <button className="login-submit" type="submit" disabled={pending}>
        {pending ? "Enviando…" : "Enviar enlace mágico"}
      </button>
    </form>
  );
}
