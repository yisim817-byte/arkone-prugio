import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";
import { SITE_NAME } from "@/lib/site-data";
import { EN_ORIGIN, KR_ORIGIN, A4_INDEX_OPEN, isEnHost, isIndexablePath, isKrHost } from "@/lib/seo-host";
import { DESC_HOME_EN } from "@/lib/stage-copy";

export const Route = createRootRoute({
  head: ({ matches }) => {
    const en = isEnHost();
    const rssOrigin = isKrHost() ? KR_ORIGIN : EN_ORIGIN;
    return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      // 2026-11-10 PM 지시: 브라우저 자동번역이 화면 글자를 바꾸지 못하게 한다.
      { name: "google", content: "notranslate" },
      // 구 네이버 토큰은 레거시 호스트에서만 유지. 한글 도메인은 홈에만 de62f799·msvalidate(미들웨어)를 둔다.
      ...(isKrHost() ? [] : [{ name: "naver-site-verification", content: "3c9a81c691a4cdec3415b6d3e7f832ea0015e2a9" }]),
      { title: en ? "Cheongna Ark-One Prugio | Guide" : SITE_NAME },
      {
        name: "description",
        content: en
          ? DESC_HOME_EN
          : "청라 아크원 푸르지오 분양 정보 안내",
      },
      { name: "theme-color", content: "#004B45" },
      {
        name: "robots",
        content:
          (isKrHost() || (en && A4_INDEX_OPEN)) &&
          matches.length > 1 &&
          matches[matches.length - 1]?.routeId !== "__root__" &&
          !matches.some((m) => m.status === "notFound" || m.status === "error") &&
          isIndexablePath(matches[matches.length - 1]?.pathname ?? "")
            ? "index,follow"
            : "noindex,follow",
      },
    ],
    links: [
      { rel: "icon", type: "image/png", sizes: "144x144", href: "/g-icon-144.png?v=20261009" },
      { rel: "shortcut icon", href: "/g-icon-144.png?v=20261009" },
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: en ? "Cheongna Ark-One Prugio RSS" : "청라 아크원 푸르지오 분양 일정·청약 RSS",
        href: `${rssOrigin}/rss.xml`,
      },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/g-icon-180.png" },
      ...(isKrHost()
        ? [
            { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
            { rel: "manifest", href: "/site.webmanifest" },
          ]
        : []),
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2.0.5/fonts/static/woff2/SUIT.css",
        integrity: "sha384-mMsv9ePXdDSZ5/ow3/9MfU9yh0kB3kl9FhTuYEPbeOmoJWs1mpXtQ2AlPvHVDLqs",
        crossOrigin: "anonymous",
      },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preload", as: "style", href: "https://fonts.googleapis.com/css2?family=Aboreto&display=swap" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Aboreto&display=swap" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/earlyaccess/nanummyeongjo.css",
      },
    ],
  };
  },
  component: () => (
    <html lang={isEnHost() ? "en" : "ko"} translate="no" className="notranslate" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
        <script src="/plan-open-bar.js" data-href="/pages/plans" defer />
      </body>
    </html>
  ),
});
