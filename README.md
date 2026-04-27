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

**Noindex:** `metadata.robots` + `app/robots.ts` con `disallow: /` para desalentar indexación; el siguiente paso típico es autenticación de staff (mismo Supabase Auth) y RLS/allowlist según vuestro modelo.
