






/**
 * Resolves the base application URL across local development, Vercel deployments,
 * and custom production domains.
 */
export function getURL(path: string = ""): string {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXT_PUBLIC_VERCEL_URL ||
    (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");

  // Ensure protocol is present
  url = url.startsWith("http") ? url : `https://${url}`;

  // Ensure trailing slash for base URL
  url = url.endsWith("/") ? url : `${url}/`;

  if (path) {
    const cleanPath = path.replace(/^\/+/, "");
    return `${url}${cleanPath}`;
  }

  return url;
}

export default getURL;

