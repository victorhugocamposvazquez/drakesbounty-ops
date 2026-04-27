# drakes-ops

Backoffice interno (**Next.js 16**, App Router). Misma instancia **Supabase** que [drakes-affiliate](https://github.com/) — las migraciones SQL viven solo en ese repo: ver `docs/drakes-affiliate-context.md` y el resumen de ecosistema en `docs/ecosistema-repos.md`.

- Maquetación de referencia: `html-dashboard-ops/drakesbounty-oracle.html` (el runtime es esta app, no el HTML en bruto).
- Variables: copia la plantilla y rellena **antes** de `npm run dev`:

  `cp .env.example .env.local`

  Misma convención que el afiliado: `docs/drakes-affiliate-context.md`. Checklist: `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `OPS_STAFF_EMAILS` (Vercel); `SUPABASE_SERVICE_ROLE_KEY` cuando tengas lógica server que la necesite.

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). La ruta `/` es el **Oráculo** (maqueta de referencia); **`/conversiones`** lista `conversions` con la sesión de Supabase (lectura: conviene ajustar RLS al rol de staff; imports masivos: `SUPABASE_SERVICE_ROLE_KEY` y `src/lib/supabase/admin.ts`, solo servidor).

**Noindex:** `metadata.robots` + `app/robots.ts` con `disallow: /` para desalentar indexación.

- **Salud del despliegue:** `GET /api/health` (público; no pasa por login).
- **Perfil en sidebar:** se lee `profiles.role` con la sesión actual. Si ves «Rol · no accesible (RLS)», hace falta una política en Supabase que permita al usuario leer su fila en `profiles` (migración en **drakes-affiliate**).

### Autenticación (Supabase Auth)

- Entrada: `/login` — enlace mágico al correo (PKCE). El callback es `/auth/callback`; añade esa URL en Supabase → **Redirect URLs** usando el mismo `NEXT_PUBLIC_APP_URL` que en Vercel.
- Salida: `GET /auth/signout` (enlace «Cerrar sesión» en el sidebar).
- **Allowlist:** variable `OPS_STAFF_EMAILS` (emails separados por comas). Si está **vacía**, entra cualquier usuario con sesión (cómodo en local; en producción define la lista).
- **Middleware** protege `/` y el resto de rutas salvo `/login`, `/auth/*`. Si Supabase no está en `.env`, el dashboard muestra un aviso de configuración.
