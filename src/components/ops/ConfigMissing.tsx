export function ConfigMissing() {
  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Falta configuración</h1>
        <p className="login-lead">
          Crea <code className="login-quiet">.env.local</code> a partir de{" "}
          <code className="login-quiet">.env.example</code> y define las variables
          de Supabase.
        </p>
      </div>
    </div>
  );
}
