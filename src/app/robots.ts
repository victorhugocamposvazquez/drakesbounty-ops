import type { MetadataRoute } from "next";

/**
 * Consola interna: no se debe indexar en buscadores.
 * Complementa metadata.robots y el meta robots en el layout.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
