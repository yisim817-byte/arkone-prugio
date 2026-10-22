// arkone-visit-submit — 모델하우스 방문예약 접수 (작업지시서 13, 2026-10-22). A·B·C 사이트 공통.
// 사전고객등록(arkone-prereg-submit)과 별도: 표 arkone_visit_reservations 에만 쓴다.
// - 날짜는 arkone-visit-config 와 같은 규칙(visit_enabled=true 또는 Preview Origin · 날짜가 목록 안)으로 검증. 목록 밖이면 날짜만 비우고 접수.
// - 휴대폰 010 형식 검사. 같은 번호·같은 날짜를 10분 안에 다시 보내면 새로 쓰지 않고 「이미 접수」(duplicate: true)로 응답.
// - Preview Origin(*.vercel.app)은 is_test=true.
// - 관리자 알림: 사전고객등록과 같은 경로(카카오 나에게 보내기 + 관리자 메일), 제목 앞 「[방문예약]」. 고객 문자는 보내지 않는다.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SB_URL = Deno.env.get("SUPABASE_URL")!;
const SB_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const TBL = "arkone_visit_reservations";
const CFG_KAKAO = "arkone_kakao_cfg";
const CFG_MAIN = "arkone_config";
const KLOG = "arkone_kakao_log";
const DEFAULT_FROM = "청라 아크원 접수알림 <onboarding@resend.dev>";
const MAILER = "https://deno.land/x/denomailer@1.6.0/mod.ts";

const PROD_ORIGINS: Record<string, string> = {
  "https://www.xn--oi2bj1bg5twzasy72kx8fj1ipxj.site": "청라아크원푸르지오.site",
  "https://xn--oi2bj1bg5twzasy72kx8fj1ipxj.site": "청라아크원푸르지오.site",
  "https://www.xn--oi2bj1bo0vusd6seb8o.site": "청라푸르지오.site",
  "https://xn--oi2bj1bo0vusd6seb8o.site": "청라푸르지오.site",
  "https://www.xn--2w2b19sita0u67iz2mi7g.site": "아크원푸르지오.site",
  "https://xn--2w2b19sita0u67iz2mi7g.site": "아크원푸르지오.site",
  "https://www.arkone-prugio.site": "arkone-prugio.site",
  "https://arkone-prugio.site": "arkone-prugio.site",
};
const TEST_ORIGIN = /^https:\/\/(arkone-prugio|cheongna-arkone-prugio|cheongna-arkone-prugio-main)-[a-z0-9-]+-yisim817-6215s-projects\.vercel\.app$/;

const INTEREST = new Set(["", "아파트", "오피스텔", "상가"]);
const SLOT_LABEL: Record<string, string> = { AM: "오전", PM: "오후", ANY: "시간 상관없음" };
const VISIT_KEYS = ["visit_enabled", "visit_open_from", "visit_open_to", "visit_closed_dates", "visit_min_lead_days"];
const DOW = ["일", "월", "화", "수", "목", "금", "토"];
const RRN = /(\d{6}\s*-?\s*[1-8]\d{6})|(\d{13})/;

function originInfo(origin: string | null) {
  if (!origin) return null;
  if (PROD_ORIGINS[origin]) return { origin, label: PROD_ORIGINS[origin], test: false };
  if (TEST_ORIGIN.test(origin)) return { origin, label: new URL(origin).hostname, test: true };
  return null;
}

function cors(origin: string | null): Record<string, string> {
  const info = originInfo(origin);
  const base: Record<string, string> = { Vary: "Origin" };
  if (!info) return base;
  return {
    ...base,
    "Access-Control-Allow-Origin": info.origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Max-Age": "600",
  };
}

function reply(origin: string | null, status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), { status, headers: { ...cors(origin), "Content-Type": "application/json; charset=utf-8" } });
}

const str = (v: unknown, max: number) => typeof v === "string" ? v.replace(/[<>]/g, "").trim().slice(0, max) : "";

function phoneOf(v: unknown): string | null {
  const d = typeof v === "string" ? v.replace(/\D/g, "") : "";
  if (!/^010\d{8}$/.test(d)) return null;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
}

async function rest(path: string, init: RequestInit = {}) {
  return await fetch(`${SB_URL}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, "Content-Type": "application/json", ...(init.headers ?? {}) },
  });
}

function kst(iso: string) {
  const k = new Date(new Date(iso).getTime() + 9 * 3600 * 1000);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(k.getUTCMonth() + 1)}.${p(k.getUTCDate())} ${p(k.getUTCHours())}:${p(k.getUTCMinutes())}`;
}

// ---------- 방문 날짜 (arkone-visit-config 와 같은 규칙) ----------
function dayMs(iso: string): number {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return NaN;
  const t = Date.UTC(Number(iso.slice(0, 4)), Number(iso.slice(5, 7)) - 1, Number(iso.slice(8, 10)));
  return new Date(t).toISOString().slice(0, 10) === iso ? t : NaN;
}

function visitDates(cfg: Record<string, string>, now = Date.now()) {
  const from = dayMs(cfg.visit_open_from ?? "");
  const to = dayMs(cfg.visit_open_to ?? "");
  const lead = Math.max(0, Math.min(30, Number.parseInt(cfg.visit_min_lead_days ?? "1", 10) || 0));
  if (Number.isNaN(from) || Number.isNaN(to)) return [];
  const closed = new Set((cfg.visit_closed_dates ?? "").split(",").map((s) => s.trim()).filter(Boolean));
  const k = new Date(now + 9 * 3600 * 1000);
  const start = Math.max(from, Date.UTC(k.getUTCFullYear(), k.getUTCMonth(), k.getUTCDate()) + lead * 86400000);
  const out: { value: string; label: string }[] = [];
  for (let t = start; t <= to && out.length < 120; t += 86400000) {
    const d = new Date(t);
    const value = d.toISOString().slice(0, 10);
    if (closed.has(value)) continue;
    out.push({ value, label: `${value.slice(5, 7)}.${value.slice(8, 10)}(${DOW[d.getUTCDay()]})` });
  }
  return out;
}

async function checkDate(dateRaw: unknown, test: boolean): Promise<{ value: string; label: string } | null> {
  try {
    const date = typeof dateRaw === "string" ? dateRaw.trim() : "";
    if (!date) return null;
    const r = await rest(`${CFG_MAIN}?select=key,value&key=in.(${VISIT_KEYS.join(",")})`);
    if (!r.ok) return null;
    const cfg: Record<string, string> = {};
    for (const x of (await r.json()) ?? []) if (VISIT_KEYS.includes(x.key)) cfg[x.key] = String(x.value ?? "").trim();
    if (!test && cfg.visit_enabled !== "true") return null;
    return visitDates(cfg).find((d) => d.value === date) ?? null;
  } catch {
    return null;
  }
}

// ---------- 관리자 알림 (사전고객등록과 같은 경로) ----------
async function kakao(row: Record<string, unknown>, text: string, link: string): Promise<boolean> {
  let ok = false;
  let detail = "";
  try {
    const cr = await rest(`${CFG_KAKAO}?select=key,value`);
    const cfg: Record<string, string> = {};
    for (const r of (await cr.json()) ?? []) if (r.value) cfg[r.key] = String(r.value).trim();
    if (!cfg.rest_key || !cfg.refresh_token) throw new Error("not configured");
    const form: Record<string, string> = { grant_type: "refresh_token", client_id: cfg.rest_key, refresh_token: cfg.refresh_token };
    if (cfg.client_secret) form.client_secret = cfg.client_secret;
    const tr = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" },
      body: new URLSearchParams(form),
    });
    const tk = await tr.json();
    if (!tr.ok || !tk.access_token) throw new Error(`token_http_${tr.status}`);
    if (tk.refresh_token) {
      await rest(`${CFG_KAKAO}?key=eq.refresh_token`, {
        method: "PATCH",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({ value: String(tk.refresh_token), updated_at: new Date().toISOString() }),
      });
    }
    const sr = await fetch("https://kapi.kakao.com/v2/api/talk/memo/default/send", {
      method: "POST",
      headers: { Authorization: `Bearer ${tk.access_token}`, "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" },
      body: new URLSearchParams({
        template_object: JSON.stringify({ object_type: "text", text: text.slice(0, 200), link: { web_url: link, mobile_web_url: link }, button_title: "현장 홈페이지" }),
      }),
    });
    ok = sr.ok;
    if (!ok) await sr.text();
    detail = ok ? `visit sent ${row.receipt_no}` : `visit send failed: http_${sr.status}`;
  } catch (e) {
    detail = `visit error: ${String(e).slice(0, 80)}`;
  }
  await rest(KLOG, { method: "POST", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ lead_id: null, ok, detail }) });
  return ok;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function emailHtml(text: string): string {
  const lines = text.split("\n");
  const rows = lines.slice(1).filter((l) => l && !/^─+$/.test(l)).map((l) => {
    const m = l.match(/^(\S+)\s{2,}([\s\S]*)$/);
    return m
      ? `<tr><td style="padding:6px 12px 6px 0;color:#6b7b76;white-space:nowrap;vertical-align:top">${esc(m[1])}</td><td style="padding:6px 0;font-weight:600">${esc(m[2])}</td></tr>`
      : `<tr><td colspan="2" style="padding:6px 0;font-weight:600">${esc(l)}</td></tr>`;
  }).join("\n");
  return `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#18332d;max-width:560px">\n<h2 style="font-size:17px;margin:0 0 14px">${esc(lines[0] ?? "")}</h2>\n<table style="border-collapse:collapse;font-size:15px">\n${rows}\n</table>\n<p style="margin-top:22px;font-size:12px;color:#8a8a8a">개인정보 포함 - 외부 전달 금지. 원본은 접수 DB(${TBL})입니다.</p>\n</div>`;
}

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.race([p, new Promise<T>((_, rej) => setTimeout(() => rej(new Error("timeout")), ms))]);
}

async function sendViaGas(cfg: Record<string, string>, to: string[], subject: string, text: string, html: string) {
  const r = await fetch(cfg.gas_mail_url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ secret: cfg.gas_mail_secret || "", to: to.join(","), subject, text, html }),
    redirect: "manual",
  });
  if (r.status >= 300 && r.status < 400) {
    const loc = r.headers.get("location") || "";
    try { await r.body?.cancel(); } catch { /* ignore */ }
    if (!loc) throw new Error("gas_no_location");
    const r2 = await withTimeout(fetch(loc), 12000);
    const t2 = (await r2.text()).trim();
    if (t2 !== "ok") throw new Error(`gas_result_${r2.status}_${t2.replace(/<[^>]*>/g, "").slice(0, 60)}`);
    return;
  }
  const t = (await r.text()).trim();
  if (!r.ok || t !== "ok") throw new Error(`gas_http_${r.status}_${t.replace(/<[^>]*>/g, "").slice(0, 60)}`);
}

async function sendViaGmail(cfg: Record<string, string>, to: string[], subject: string, text: string, html: string) {
  const { SMTPClient } = await import(MAILER);
  const user = cfg.gmail_user || to[0];
  const client = new SMTPClient({
    connection: { hostname: "smtp.gmail.com", port: 465, tls: true, auth: { username: user, password: cfg.gmail_app_password.replace(/\s+/g, "") } },
  });
  try {
    await client.send({ from: user, to, subject, content: text, html });
  } finally {
    try { await client.close(); } catch { /* ignore */ }
  }
}

async function sendViaResend(cfg: Record<string, string>, to: string[], subject: string, text: string, html: string, key: string) {
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.resend_api_key}`, "Content-Type": "application/json", "Idempotency-Key": `arkone-visit-${key}` },
    body: JSON.stringify({ from: cfg.resend_from || DEFAULT_FROM, to, subject, text, html }),
  });
  if (!r.ok) throw new Error(`resend_http_${r.status}`);
}

async function adminEmail(row: Record<string, unknown>, text: string): Promise<string> {
  let via = "";
  try {
    const r = await rest(`${CFG_MAIN}?select=key,value&key=in.(prereg_email_enabled,prereg_email_to,resend_api_key,resend_from,gmail_user,gmail_app_password,gas_mail_url,gas_mail_secret)`);
    const cfg: Record<string, string> = {};
    if (r.ok) for (const x of (await r.json()) ?? []) if (x.value) cfg[x.key] = String(x.value).trim();
    const to = (cfg.prereg_email_to || "").split(",").map((s) => s.trim()).filter(Boolean);
    if (cfg.prereg_email_enabled !== "true" || !to.length) return "SKIPPED_DISABLED";
    const subject = `${(text.split("\n")[0] ?? "").replace(" 청라 아크원 푸르지오", "")} ${row.name ?? ""} · ${row.receipt_no ?? ""}`.slice(0, 150);
    const html = emailHtml(text);
    if (cfg.gas_mail_url) { via = "google_apps_script"; await withTimeout(sendViaGas(cfg, to, subject, text, html), 30000); }
    else if (cfg.gmail_app_password) { via = "gmail_smtp"; await withTimeout(sendViaGmail(cfg, to, subject, text, html), 20000); }
    else if (cfg.resend_api_key) { via = "resend"; await withTimeout(sendViaResend(cfg, to, subject, text, html, String(row.id)), 15000); }
    else return "SKIPPED_NOT_CONFIGURED";
    return `SENT_${via}`;
  } catch (e) {
    console.error("[arkone-visit-submit] email error", via, String(e).slice(0, 160));
    return `FAILED_${via || "cfg"}`;
  }
}

function alertText(row: Record<string, unknown>, label: string, test: boolean, dateLabel: string): string {
  const utm = [row.utm_source, row.utm_campaign].filter(Boolean).join("/").slice(0, 20);
  return (
    `${test ? "[테스트] " : ""}[방문예약] 청라 아크원 푸르지오\n` +
    `───────────\n` +
    `이름  ${row.name}\n` +
    `휴대폰  ${row.phone}\n` +
    `방문희망  ${dateLabel || "날짜 미선택(전화 확인)"} · ${SLOT_LABEL[String(row.visit_slot)] ?? "시간 상관없음"}\n` +
    `관심상품  ${row.interest || "미선택"}\n` +
    `사이트  ${test ? "preview" : label}${utm ? " · " + utm : ""}\n` +
    `접수  ${kst(String(row.created_at))} · ${row.receipt_no}`
  );
}

function background(p: Promise<unknown>) {
  // deno-lint-ignore no-explicit-any
  const rt = (globalThis as any).EdgeRuntime;
  if (rt?.waitUntil) rt.waitUntil(p);
  else p.catch(() => {});
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  const info = originInfo(origin);
  if (req.method === "OPTIONS") return new Response(null, { status: info ? 204 : 403, headers: cors(origin) });
  if (req.method !== "POST") return reply(origin, 405, { ok: false, reason: "method" });
  if (!info) return reply(origin, 403, { ok: false, reason: "origin" });

  const raw = await req.text();
  if (raw.length > 4000) return reply(origin, 413, { ok: false, reason: "too_large" });
  let b: Record<string, unknown>;
  try { b = JSON.parse(raw); } catch { return reply(origin, 400, { ok: false, reason: "json" }); }

  if (typeof b.hp === "string" && b.hp.length > 0) return reply(origin, 400, { ok: false, reason: "rejected" });
  const name = str(b.name, 20);
  if (!name) return reply(origin, 400, { ok: false, reason: "name" });
  if (RRN.test(String(b.name ?? ""))) return reply(origin, 400, { ok: false, reason: "rrn_blocked" });
  const phone = phoneOf(b.phone);
  if (!phone) return reply(origin, 400, { ok: false, reason: "phone" });
  if (b.consent_privacy !== true) return reply(origin, 400, { ok: false, reason: "consent" });
  const slot = typeof b.visit_slot === "string" && SLOT_LABEL[b.visit_slot] ? b.visit_slot : "ANY";
  const interest = str(b.interest, 10);
  if (!INTEREST.has(interest)) return reply(origin, 400, { ok: false, reason: "interest" });
  const test = info.test;
  const picked = await checkDate(b.visit_date, test);
  const visitDate = picked ? picked.value : null;

  // 같은 번호·같은 날짜 10분 안 재전송 → 이미 접수
  const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const dq = `${TBL}?select=receipt_no,created_at,visit_date,visit_slot&phone=eq.${encodeURIComponent(phone)}&is_test=eq.${test}` +
    `&created_at=gte.${encodeURIComponent(since)}&visit_date=${visitDate ? `eq.${visitDate}` : "is.null"}&order=created_at.desc&limit=1`;
  const dr = await rest(dq);
  const dup = dr.ok ? (await dr.json())?.[0] : null;
  if (dup) {
    return reply(origin, 200, { ok: true, duplicate: true, receipt_no: dup.receipt_no, visit_date: dup.visit_date, visit_slot: dup.visit_slot, date_label: picked?.label ?? "", slot_label: SLOT_LABEL[dup.visit_slot] ?? "" });
  }

  const ins = await rest(TBL, {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({
      site_host: new URL(info.origin).hostname,
      page: str(b.page, 100) || null,
      name,
      phone,
      visit_date: visitDate,
      visit_slot: slot,
      interest: interest || null,
      consent_privacy: true,
      consent_version: str(b.consent_version, 60) || null,
      utm_source: str(b.utm_source, 60) || null,
      utm_medium: str(b.utm_medium, 60) || null,
      utm_campaign: str(b.utm_campaign, 80) || null,
      is_test: test,
    }),
  });
  if (!ins.ok) {
    console.error("[arkone-visit-submit] insert failed", ins.status, (await ins.text()).slice(0, 200));
    return reply(origin, 500, { ok: false, reason: "store" });
  }
  const row = (await ins.json())[0];
  const text = alertText(row, info.label, test, picked?.label ?? "");
  background((async () => {
    const [k, e] = await Promise.all([kakao(row, text, `${info.origin}/`), adminEmail(row, text)]);
    await rest(`${TBL}?id=eq.${row.id}`, { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ admin_kakao_ok: k, admin_email_status: e }) });
  })());
  return reply(origin, 200, {
    ok: true,
    receipt_no: row.receipt_no,
    visit_date: row.visit_date,
    visit_slot: row.visit_slot,
    date_label: picked?.label ?? "",
    slot_label: SLOT_LABEL[row.visit_slot] ?? "",
    date_dropped: !!(typeof b.visit_date === "string" && b.visit_date && !picked),
  });
});
