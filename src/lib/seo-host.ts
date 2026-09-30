import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";

/**
 * Host-based indexing policy (hardcoded allowlist).
 * Only the Korean www host is indexable. The request Host header is ONLY used
 * to pick a boolean; it is never echoed into canonical / og:url / JSON-LD.
 */
export const KR_ORIGIN = "https://www.xn--2w2b19sita0u67iz2mi7g.site";
export const LEGACY_ORIGIN = "https://www.arkone-prugio.site";

const KR_HOSTS = new Set(["www.xn--2w2b19sita0u67iz2mi7g.site", "www.아크원푸르지오.site"]);

/** Public information pages that may be indexed on the Korean www host. */
export const INDEXABLE_PATHS = [
  "/",
  "/pages/overview",
  "/pages/compare",
  "/pages/schedule",
  "/pages/brand",
  "/pages/contact",
  "/pages/location",
  "/pages/premium",
  "/pages/changeinfo",
  "/pages/docspecial",
  "/pages/docnormal",
  "/board/news_list",
  "/pages/video",
] as const;

const INDEXABLE = new Set<string>(INDEXABLE_PATHS);

const readHost = createIsomorphicFn()
  .server(() => getRequestHeader("x-forwarded-host") ?? getRequestHeader("host") ?? "")
  .client(() => (typeof window === "undefined" ? "" : window.location.host));

export function normalizeHost(raw: string | null | undefined): string {
  return String(raw ?? "")
    .split(",")[0]
    .trim()
    .split(":")[0]
    .toLowerCase();
}

export function isKrHostName(raw: string | null | undefined): boolean {
  return KR_HOSTS.has(normalizeHost(raw));
}

export function isKrHost(): boolean {
  try {
    return isKrHostName(readHost());
  } catch {
    return false;
  }
}

export function isIndexablePath(pathname: string): boolean {
  return INDEXABLE.has(pathname);
}

/** Canonical link for a route path. Legacy hosts keep the exact previous URL. */
export function canonicalLinks(path: string) {
  const origin = isKrHost() ? KR_ORIGIN : LEGACY_ORIGIN;
  return [{ rel: "canonical", href: `${origin}${path}` }];
}

/** FAQPage JSON-LD, emitted only on the Korean host and only for visible Q&A. */
export function faqJsonLd(faq: { q: string; a: string }[]) {
  if (!isKrHost() || faq.length === 0) return [];
  return [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }),
    },
  ];
}
