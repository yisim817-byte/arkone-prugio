import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";
import { SITE_NAME } from "@/lib/site-data";
import { isIndexablePath, isKrHost } from "@/lib/seo-host";

export const Route = createRootRoute({
  head: ({ matches }) => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      // 구 네이버 토큰은 레거시 호스트에서만 유지. 한글 도메인은 홈에만 de62f799·msvalidate(미들웨어)를 둔다.
      ...(isKrHost() ? [] : [{ name: "naver-site-verification", content: "3c9a81c691a4cdec3415b6d3e7f832ea0015e2a9" }]),
      { title: SITE_NAME },
      { name: "description", content: "청라 아크원 푸르지오 분양 정보 안내 | 홈페이지운영 휴메인코리아" },
      { name: "theme-color", content: "#004B45" },
      {
        name: "robots",
        content:
          isKrHost() &&
          matches.length > 1 &&
          matches[matches.length - 1]?.routeId !== "__root__" &&
          !matches.some((m) => m.status === "notFound" || m.status === "error") &&
          isIndexablePath(matches[matches.length - 1]?.pathname ?? "")
            ? "index,follow"
            : "noindex,follow",
      },
    ],
    links: [
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "icon", href: "/favicon.ico" },
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: "청라 아크원 푸르지오 분양 일정·청약 RSS",
        href: "https://www.xn--2w2b19sita0u67iz2mi7g.site/rss.xml",
      },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
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
  }),
  component: () => (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
