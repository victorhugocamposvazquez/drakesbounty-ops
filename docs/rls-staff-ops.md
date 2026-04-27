# RLS y lectura desde **drakes-ops**

Las migraciones viven en **drakes-affiliate** (`supabase/migrations/`). En ops se usa el **anon** con la **sesión del usuario** (misma instancia Supabase). Si una pantalla devuelve error o tabla vacía, hace falta alinear RLS o usar **`SUPABASE_SERVICE_ROLE_KEY`** solo en rutas de servidor (imports batch), nunca en el cliente.

## Patrones que suelen encajar

1. **`profiles`**: el usuario lee su fila, `id = auth.uid()`.
2. **Staff (email en `OPS_STAFF_EMAILS` o `role` en `profiles`)**: política que compruebe `auth.uid()` y `profiles.role IN ('admin', …)` o un join a una tabla de staff, según vuestro modelo.
3. **`conversions` / `payout_requests` / `operators`**: frecuentemente hace falta un rol de plataforma (admin) o una tabla `platform_staff` referenciada en la política.

## Qué añadir en el repo del afiliado (ejemplo, no copy-paste ciego)

- Revisar tablas reales: `\d+ conversions` en SQL o el editor de Supabase.
- Política **SELECT** acorde al modelo de permisos (solo admin, o solo filas vinculadas, etc.).

**No** duplicar en drakes-ops un segundo directorio de migraciones que diverja del afiliado: el cambio de esquema y las políticas deben quedar trazables en un solo sitio (el repo con migraciones).

## Export CSV de conversiones

El endpoint `GET /api/export/conversions` usa **`SUPABASE_SERVICE_ROLE_KEY`** (bypass RLS) tras comprobar sesión + allowlist. Es el patrón adecuado para volcar datos operativos; no expongas esa clave al cliente.

## Referencia

- `docs/drakes-affiliate-context.md` — tablas y contratos (`(operator_id, external_id)` en conversiones, etc.).
