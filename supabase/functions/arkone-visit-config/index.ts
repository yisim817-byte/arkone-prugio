// arkone-visit-config — 모델하우스 방문 희망일 설정 (작업지시서 9, 2026-10-19)
// GET 전용·공개·읽기 전용. arkone_config 에서 아래 5개 키만 읽는다(다른 키는 조회하지도 않는다).
// 응답: { enabled, dates:[{value,label}], slots:[{value,label}] }
// Preview(6개 Vercel 프로젝트의 *.vercel.app) Origin 은 enabled=true 로 응답한다(운영 공개 전 확인용).
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SB_URL = Deno.env.get("SUPABASE_URL")!;
const SB_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const KEYS = ["visit_enabled", "visit_open_from", "visit_open_to", "visit_closed_dates", "visit_min_lead_days"];

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

const SLOTS = [
  { value: "AM", label: "오전" },
  { value: "PM", label: "오후" },
  { value: "ANY", label: "시간 상관없음" },
];
const DOW = ["일", "월", "화", "수", "목", "금", "토"];
const ISO = /^\d{4}-\d{2}-\d{2}$/;

function dayMs(iso: string): number {
  if (!ISO.test(iso)) return NaN;
  const t = Date.UTC(Number(iso.slice(0, 4)), Number(iso.slice(5, 7)) - 1, Number(iso.slice(8, 10)));
  return new Date(t).toISOString().slice(0, 10) === iso ? t : NaN;
}

function todayKstMs(now: number): number {
  const k = new Date(now + 9 * 3600 * 1000);
  return Date.UTC(k.getUTCFullYear(), k.getUTCMonth(), k.getUTCDate());
}

export function visitDates(cfg: Record<string, string>, now = Date.now()) {
  const from = dayMs(cfg.visit_open_from ?? "");
  const to = dayMs(cfg.visit_open_to ?? "");
  const lead = Math.max(0, Math.min(30, Number.parseInt(cfg.visit_min_lead_days ?? "1", 10) || 0));
  if (Number.isNaN(from) || Number.isNaN(to)) return [];
  const closed = new Set((cfg.visit_closed_dates ?? "").split(",").map((s) => s.trim()).filter(Boolean));
  const start = Math.max(from, todayKstMs(now) + lead * 86400000);
  const out: { value: string; label: string }[] = [];
  for (let t = start; t <= to && out.length < 120; t += 86400000) {
    const d = new Date(t);
    const value = d.toISOString().slice(0, 10);
    if (closed.has(value)) continue;
    out.push({ value, label: `${value.slice(5, 7)}.${value.slice(8, 10)}(${DOW[d.getUTCDay()]})` });
  }
  return out;
}

async function readConfig(): Promise<Record<string, string> | null> {
  const r = await fetch(`${SB_URL}/rest/v1/arkone_config?select=key,value&key=in.(${KEYS.join(",")})`, {
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
  });
  if (!r.ok) return null;
  const cfg: Record<string, string> = {};
  for (const x of (await r.json()) ?? []) if (KEYS.includes(x.key)) cfg[x.key] = String(x.value ?? "").trim();
  return cfg;
}

function headers(origin: string | null): Record<string, string> {
  const h: Record<string, string> = { Vary: "Origin", "Content-Type": "application/json; charset=utf-8" };
  if (origin && (PROD_ORIGINS.has(origin) || PREVIEW_ORIGIN.test(origin))) {
    h["Access-Control-Allow-Origin"] = origin;
    h["Access-Control-Allow-Methods"] = "GET, OPTIONS";
    h["Access-Control-Max-Age"] = "600";
  }
  return h;
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: headers(origin) });
  if (req.method !== "GET") return new Response(JSON.stringify({ enabled: false }), { status: 405, headers: headers(origin) });
  let cfg: Record<string, string> | null = null;
  try { cfg = await readConfig(); } catch { cfg = null; }
  if (!cfg) {
    return new Response(JSON.stringify({ enabled: false, dates: [], slots: SLOTS }), {
      status: 503, headers: { ...headers(origin), "Cache-Control": "no-store" },
    });
  }
  const preview = !!origin && PREVIEW_ORIGIN.test(origin);
  const dates = visitDates(cfg);
  const enabled = (preview || cfg.visit_enabled === "true") && dates.length > 0;
  return new Response(JSON.stringify({ enabled, dates: enabled ? dates : [], slots: SLOTS }), {
    status: 200, headers: { ...headers(origin), "Cache-Control": "public, max-age=300" },
  });
});
