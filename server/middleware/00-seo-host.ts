/**
 * Host-based SEO policy (outermost middleware; runs before grok-pwa.ts).
 *
 * - /robots.txt and /sitemap.xml are served per host. Legacy hosts
 *   (www.arkone-prugio.site, *.vercel.app, anything else) get the exact bytes
 *   that were previously served from public/. Only the hardcoded Korean www
 *   host gets an indexable robots.txt + sitemap.
 * - On the Korean www host, adds og:url for allowlisted public pages. The URL is
 *   built from the hardcoded KR origin + allowlisted path, never from Host.
 */

const KR_ORIGIN = "https://www.xn--2w2b19sita0u67iz2mi7g.site";
const KR_HOSTS = new Set(["www.xn--2w2b19sita0u67iz2mi7g.site", "www.아크원푸르지오.site"]);

/** path -> lastmod (git commit date of the page's last content change). */
const KR_SITEMAP: ReadonlyArray<readonly [string, string]> = [
  ["/", "2026-09-30"],
  ["/pages/overview", "2026-09-30"],
  ["/pages/compare", "2026-09-30"],
  ["/pages/schedule", "2026-09-30"],
  ["/pages/location", "2026-09-30"],
  ["/pages/contact", "2026-09-30"],
  ["/pages/changeinfo", "2026-09-30"],
  ["/pages/docspecial", "2026-09-30"],
  ["/pages/docnormal", "2026-09-30"],
  ["/pages/premium", "2026-09-25"],
  ["/pages/brand", "2026-09-26"],
  ["/board/news_list", "2026-09-25"],
  ["/pages/video", "2026-09-25"],
];
const KR_PATHS = new Set(KR_SITEMAP.map(([p]) => p));

const LEGACY_ROBOTS =
  "User-agent: *\r\nAllow: /\r\n\r\nSitemap: https://www.arkone-prugio.site/sitemap.xml\r\n";
const LEGACY_SITEMAP =
  "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\r\n</urlset>\r\n";

const KR_ROBOTS = [
  "User-agent: *",
  "Allow: /",
  "Disallow: /api/",
  "Disallow: /auth/",
  "",
  `Sitemap: ${KR_ORIGIN}/sitemap.xml`,
  "",
].join("\n");

function krSitemap(): string {
  const urls = KR_SITEMAP.map(
    ([path, lastmod]) => `  <url>\n    <loc>${KR_ORIGIN}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`,
  ).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

interface SeoEvent {
  url: URL;
  req: { method: string; headers: Headers };
}

function isKr(event: SeoEvent): boolean {
  const raw =
    event.req.headers.get("x-forwarded-host") ?? event.req.headers.get("host") ?? event.url.host;
  const host = String(raw ?? "").split(",")[0].trim().split(":")[0].toLowerCase();
  return KR_HOSTS.has(host);
}

const TEXT_HEADERS = {
  "cache-control": "public, max-age=0, must-revalidate",
  vary: "Host, X-Forwarded-Host",
};

// Naver Search Advisor + Bing Webmaster ownership tags — Korean www host home page only.
const NAVER_VERIFICATION_TAG =
  '<meta name="naver-site-verification" content="de62f79902ef13d12123bd871fb74794666efd56" />' +
  '<meta name="msvalidate.01" content="1CA8C4AC579A0BA4C40BC37CD046AC48" />';

function injectOgUrl(response: Response, ogUrl: string, extra = ""): Response {
  const tag = new TextEncoder().encode(`<meta property="og:url" content="${ogUrl}">${extra}`);
  const marker = "</head>";
  let done = false;
  let carry = "";
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const body = response.body!.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        if (done) {
          controller.enqueue(chunk);
          return;
        }
        carry += decoder.decode(chunk, { stream: true });
        const at = carry.indexOf(marker);
        if (at === -1) return;
        done = true;
        controller.enqueue(encoder.encode(carry.slice(0, at)));
        controller.enqueue(tag);
        controller.enqueue(encoder.encode(carry.slice(at)));
        carry = "";
      },
      flush(controller) {
        const rest = carry + decoder.decode();
        if (rest) controller.enqueue(encoder.encode(rest));
      },
    }),
  );
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(body, { status: response.status, statusText: response.statusText, headers });
}

export default async function seoHostMiddleware(
  event: SeoEvent,
  next: () => unknown | Promise<unknown>,
): Promise<unknown> {
  const method = (event.req.method ?? "GET").toUpperCase();
  if (method !== "GET" && method !== "HEAD") return next();
  const path = event.url.pathname;

  if (path === "/robots.txt") {
    const kr = isKr(event);
    return new Response(method === "HEAD" ? null : kr ? KR_ROBOTS : LEGACY_ROBOTS, {
      headers: { "content-type": "text/plain; charset=utf-8", ...TEXT_HEADERS },
    });
  }
  if (path === "/sitemap.xml") {
    const kr = isKr(event);
    return new Response(method === "HEAD" ? null : kr ? krSitemap() : LEGACY_SITEMAP, {
      headers: { "content-type": "application/xml", ...TEXT_HEADERS },
    });
  }

  if (method !== "GET" || !KR_PATHS.has(path) || !isKr(event)) return next();

  const result = await next();
  if (
    result instanceof Response &&
    result.status === 200 &&
    result.body &&
    String(result.headers.get("content-type") ?? "").includes("text/html") &&
    !result.headers.get("content-encoding")
  ) {
    return injectOgUrl(result, `${KR_ORIGIN}${path}`, path === "/" ? NAVER_VERIFICATION_TAG : "");
  }
  return result;
}
