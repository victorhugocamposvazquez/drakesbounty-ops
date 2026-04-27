# drakes-ops

Backoffice interno (**Next.js 16**, App Router). Misma instancia **Supabase** que [drakes-affiliate](https://github.com/) — las migraciones SQL viven solo en ese repo: ver `docs/drakes-affiliate-context.md` y el resumen de ecosistema en `docs/ecosistema-repos.md`.

- Maquetación de referencia: `html-dashboard-ops/drakesbounty-oracle.html` (el runtime es esta app, no el HTML en bruto).
- Variables: copia `.env.example` a `.env.local` y rellena `NEXT_PUBLIC_APP_URL` con la URL canónica de **esta** despliegue (Vercel de ops o `http://localhost:3000`).

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). La ruta `/` reproduce el shell y la primera pantalla del Oráculo (HTML de referencia).

**Noindex:** `metadata.robots` + `app/robots.ts` con `disallow: /` para desalentar indexación.

### Autenticación (Supabase Auth)

- Entrada: `/login` — enlace mágico al correo (PKCE). El callback es `/auth/callback`; añade esa URL en Supabase → **Redirect URLs** usando el mismo `NEXT_PUBLIC_APP_URL` que en Vercel.
- Salida: `GET /auth/signout` (enlace «Cerrar sesión» en el sidebar).
- **Allowlist:** variable `OPS_STAFF_EMAILS` (emails separados por comas). Si está **vacía**, entra cualquier usuario con sesión (cómodo en local; en producción define la lista).
- **Middleware** protege `/` y el resto de rutas salvo `/login`, `/auth/*`. Si Supabase no está en `.env`, el dashboard muestra un aviso de configuración.
