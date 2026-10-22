// arkone-site-phase — 단계 띠(site_phase) 설정 (작업지시서 10, 2026-10-22)
// GET 전용·공개·읽기 전용. arkone_config 에서 key='site_phase' 한 개만 읽는다(다른 키는 조회하지 않는다).
// 응답: { phase } 하나. 실패하면 0. import 방식·verify_jwt(false)는 arkone-visit-config 와 같다.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SB_URL = Deno.env.get("SUPABASE_URL")!;
const SB_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const PROD_HOSTS = [
  "xn--2w2b19sita0u67iz2mi7g.site", // 아크원푸르지오.site
  "arkone-prugio.site",
  "xn--oi2bj1bo0vusd6seb8o.site", // 청라푸르지오.site
  "xn--oi2bj1bg5twzasy72kx8fj1ipxj.site", // 청라아크원푸르지오.site
  "xn--oi2b90bg5twzasy72k38fc1ipxj.site", // 아크원푸르지오청라.site
  "xn--2w2b25ugxct7o.site", // 푸르지오.site
  "xn--oi2b90bo0vusdbte57o.site", // 푸르지오청라.site
];
const PROD_ORIGINS = new Set(PROD_HOSTS.flatMap((h) => [`https://${h}`, `https://www.${h}`]));
const PREVIEW_ORIGIN = /^https:\/\/(arkone-prugio|cheongna-arkone-prugio|cheongna-arkone-prugio-main|arkone-cheongna-staff|prugio-site|prugio-cheongna)-[a-z0-9-]+-yisim817-6215s-projects\.vercel\.app$/;

function headers(origin: string | null): Record<string, string> {
  const h: Record<string, string> = { Vary: "Origin", "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=60" };
  if (origin && (PROD_ORIGINS.has(origin) || PREVIEW_ORIGIN.test(origin))) {
    h["Access-Control-Allow-Origin"] = origin;
    h["Access-Control-Allow-Methods"] = "GET, OPTIONS";
    h["Access-Control-Allow-Headers"] = "authorization, apikey, content-type, x-client-info";
    h["Access-Control-Max-Age"] = "600";
  }
  return h;
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: headers(origin) });
  if (req.method !== "GET") return new Response(JSON.stringify({ error: "method" }), { status: 405, headers: headers(origin) });
  let phase = 0;
  try {
    const r = await fetch(`${SB_URL}/rest/v1/arkone_config?select=value&key=eq.site_phase`, {
      headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
    });
    if (r.ok) {
      const n = Number((await r.json())?.[0]?.value);
      if (Number.isInteger(n) && n >= 0 && n <= 5) phase = n;
    }
  } catch { /* 실패하면 0 */ }
  return new Response(JSON.stringify({ phase }), { status: 200, headers: headers(origin) });
});
