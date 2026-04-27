# Si al abrir la URL de la app sale **404**

En Vercel, un Next.js deja de resolver rutas si el **despliegue** no es el de una app Next válida. Revisa en este orden (Project → Settings → General / Build and Deployment):

1. **Root directory**  
   - Si el repo solo es `drakes-ops`, deja el directorio raíz **vacío** o **`.`**.  
   - Si el repositorio es un monorepo, pon la carpeta donde está el `package.json` de Next (p. ej. `drakes-ops`).

2. **Output directory** (crítico)  
   - Para **Next.js con App Router** el campo **Output directory** debe ir **vacío** (Vercel usa internamente el resultado de `next build`).  
   - Si pones `out`, `dist`, `build` o `export` sin `output: 'export'`, el deploy suele acabar en **404** en todas las rutas.

3. **Framework**  
   - Debe detectarse **Next.js**. Si hace falta, el build command: `npm run build` (o el que uses) y asegurarte de que en los logs se ve `▲ Next.js` y el build acaba con éxito.

4. **Variables de entorno**  
   - No provocan 404 por sí solas; si faltan `NEXT_PUBLIC_SUPABASE_*` la app aún responde (aviso de configuración o redirecciones de auth).  
   - Comprueba en **Deployments** que el **último** deploy tenga el estado *Ready* (no *Error* con un despliegue antiguo roto superpuesto a la URL de producción).

5. **URL que abres**  
   - Debe ser la asignada por Vercel (`https://<proyecto>.vercel.app` o el dominio custom) **sin** path incorrecto. La home es **`/`**, el login es **`/login`**.

6. **Proyecto o equipo equivocado**  
   - Confirma en el dashboard de Vercel que la URL abre el proyecto y el entorno (Production) que crees.

Tras el cambio, haz **Redeploy** del último commit exitoso o un push vacío para forzar un build limpio.
