import { NextResponse } from "next/server";

/**
 * Sin autenticación: comprobar que el despliegue responde (Vercel, monitores).
 */
export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: "drakes-ops",
      ts: new Date().toISOString(),
    },
    { status: 200 }
  );
}
