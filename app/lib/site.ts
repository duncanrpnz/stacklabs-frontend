// Single source of truth for the site's canonical origin. Used by metadata,
// JSON-LD, the sitemap, robots.txt, and the email templates - edit it here.
//
// The apex 308-redirects to www at the host, so canonical URLs must use www
// or every URL we publish costs a redirect hop and contradicts the redirect.
export const SITE_URL = "https://www.stacklabs.co.nz";

/** Absolute URL for a site-relative path, e.g. url("/work") -> ".../work". */
export function url(path = ""): string {
  return `${SITE_URL}${path}`;
}
