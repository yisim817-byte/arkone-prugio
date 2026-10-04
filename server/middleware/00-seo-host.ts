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
  ["/", "2026-10-04"],
  ["/pages/overview", "2026-10-04"],
  ["/pages/compare", "2026-10-04"],
  ["/pages/schedule", "2026-10-04"],
  ["/pages/location", "2026-10-04"],
  ["/pages/contact", "2026-10-04"],
  ["/pages/changeinfo", "2026-10-04"],
  ["/pages/docspecial", "2026-10-04"],
  ["/pages/docnormal", "2026-10-04"],
  ["/pages/premium", "2026-10-04"],
  ["/pages/brand", "2026-10-04"],
  ["/board/news_list", "2026-10-04"],
  ["/pages/video", "2026-10-04"],
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
  "User-agent: OAI-SearchBot",
  "User-agent: ChatGPT-User",
  "User-agent: Claude-SearchBot",
  "User-agent: PerplexityBot",
  "Allow: /",
  "Disallow: /api/",
  "Disallow: /auth/",
  "",
  "User-agent: Yeti",
  "Allow: /",
  "Disallow: /api/",
  "Disallow: /auth/",
  "",
  "User-agent: Bytespider",
  "Disallow: /",
  "",
  `Sitemap: ${KR_ORIGIN}/sitemap.xml`,
  "",
].join("\n");

/** AEO/GEO (2026-10-04): breadcrumb label per KR page (from each page's title). */
const KR_PAGE_NAMES: Record<string, string> = {
  "/": "청라 아크원 푸르지오",
  "/pages/overview": "사업개요",
  "/pages/compare": "아파트·오피스텔 비교",
  "/pages/schedule": "분양 일정",
  "/pages/location": "입지",
  "/pages/contact": "모델하우스·홍보관 위치",
  "/pages/changeinfo": "변경된 청약제도",
  "/pages/docspecial": "특별공급 안내",
  "/pages/docnormal": "일반공급 안내",
  "/pages/premium": "프리미엄",
  "/pages/brand": "히스토리",
  "/board/news_list": "언론보도",
  "/pages/video": "홍보영상",
};

/** KR host only: Organization + WebPage(dateModified) + BreadcrumbList JSON-LD. */
function krPageJsonLd(path: string): string {
  const url = `${KR_ORIGIN}${path}`;
  const lastmod = KR_SITEMAP.find(([p]) => p === path)?.[1];
  const org = {
    "@type": "Organization",
    "@id": "https://www.humanekorea.co.kr/#organization",
    name: "휴메인코리아",
    alternateName: "HUMANE KOREA",
  };
  const graph: Record<string, unknown>[] = [org];
  if (path === "/") {
    graph.push({ "@type": "WebPage", "@id": `${KR_ORIGIN}/#webpage`, dateModified: lastmod });
  } else {
    graph.push(
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${KR_PAGE_NAMES[path]} | 청라 아크원 푸르지오`,
        inLanguage: "ko-KR",
        isPartOf: { "@id": `${KR_ORIGIN}/#website` },
        publisher: { "@id": org["@id"] },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        dateModified: lastmod,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "홈", item: `${KR_ORIGIN}/` },
          { "@type": "ListItem", position: 2, name: KR_PAGE_NAMES[path], item: url },
        ],
      },
    );
  }
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  return `<script type="application/ld+json">${json}</script>`;
}

/** RSS 2.0 items: path, title, description, pubDate = git last-modified of the route file. */
const RSS_ITEMS: ReadonlyArray<readonly [string, string, string, string]> = [
  ["/", "청라 아크원 푸르지오 | 분양 일정·비교·청약 안내", "APT 입주자모집공고 2026.10.15(목) 예정, GRAND OPEN 2026.10.23(금) 예정, 아파트 868세대·오피스텔 987실.", "Sun, 04 Oct 2026 11:07:31 +0900"],
  ["/pages/schedule", "청라 아크원 푸르지오 분양 일정·청약·분양가 안내 | 사전고객등록", "APT 입주자모집공고 2026.10.15(목) 예정, GRAND OPEN 2026.10.23(금) 예정. 분양가는 공고 전 미정, 2031년 입주 예정.", "Sun, 04 Oct 2026 11:07:31 +0900"],
  ["/pages/compare", "청라 아크원 푸르지오 아파트·오피스텔 비교 | 전용면적·평면도 안내", "아파트 868세대와 오피스텔 987실의 면적·주차·공고 일정·평면도 공개 여부 비교.", "Sun, 04 Oct 2026 11:07:31 +0900"],
  ["/pages/overview", "청라 아크원 푸르지오 사업개요 | 868세대·987실", "청라동 86-1번지 M5BL, 지하 5층~지상 49층 6개동, 시행 ㈜청라스마트시티·시공 대우건설.", "Sun, 04 Oct 2026 11:07:31 +0900"],
  ["/pages/changeinfo", "청라 아크원 푸르지오 청약제도 변경사항 | 청약안내", "청약 전 확인할 청약제도 변경 내용.", "Sun, 04 Oct 2026 11:07:31 +0900"],
  ["/pages/docspecial", "청라 아크원 푸르지오 특별공급 안내 | 청약 자격", "특별공급 유형별 물량·자격·일정은 입주자모집공고에서 확정됩니다.", "Sun, 04 Oct 2026 11:07:31 +0900"],
  ["/pages/docnormal", "청라 아크원 푸르지오 일반공급 안내 | 순위·접수", "일반공급 물량·순위별 접수일·당첨자 발표일은 입주자모집공고에서 확정됩니다.", "Sun, 04 Oct 2026 11:07:31 +0900"],
  ["/pages/contact", "청라 아크원 푸르지오 모델하우스·홍보관 위치 | 오시는길", "견본주택(청라동 87-1번지) GRAND OPEN 2026.10.23(금) 예정.", "Sun, 04 Oct 2026 11:07:31 +0900"],
  ["/pages/location", "청라 아크원 푸르지오 입지 | 국제업무단지 M5BL", "청라동 86-1번지 국제업무단지 M5BL 교통·생활 환경과 근거 자료.", "Sun, 04 Oct 2026 10:51:35 +0900"],
  ["/pages/video", "청라 아크원 푸르지오 홍보영상 | 사업 소개", "사업주체가 공개한 단지 소개 영상.", "Sun, 04 Oct 2026 10:11:10 +0900"],
  ["/board/news_list", "청라 아크원 푸르지오 언론보도 | 분양 관련 기사", "청라 아크원 푸르지오 관련 언론보도 목록.", "Wed, 30 Sep 2026 17:04:45 +0900"],
];

function xmlEsc(v: string): string {
  return v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function rssFeed(): string {
  const items = RSS_ITEMS.map(
    ([path, title, desc, date]) =>
      `<item><title>${xmlEsc(title)}</title><link>${KR_ORIGIN}${path}</link><guid isPermaLink="true">${KR_ORIGIN}${path}</guid><description>${xmlEsc(desc)}</description><pubDate>${date}</pubDate></item>`,
  ).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n<channel>\n<title>청라 아크원 푸르지오 분양 일정·청약 안내</title>\n<link>${KR_ORIGIN}/</link>\n<atom:link href="${KR_ORIGIN}/rss.xml" rel="self" type="application/rss+xml"/>\n<description>청라 아크원 푸르지오 분양 일정·비교·청약 안내 페이지 목록</description>\n<language>ko</language>\n<lastBuildDate>Sun, 04 Oct 2026 11:07:31 +0900</lastBuildDate>\n${items}\n</channel>\n</rss>\n`;
}

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
  if (path === "/rss.xml") {
    return new Response(method === "HEAD" ? null : rssFeed(), {
      headers: { "content-type": "application/rss+xml; charset=utf-8", ...TEXT_HEADERS },
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
    return injectOgUrl(
      result,
      `${KR_ORIGIN}${path}`,
      (path === "/" ? NAVER_VERIFICATION_TAG : "") + krPageJsonLd(path),
    );
  }
  return result;
}
