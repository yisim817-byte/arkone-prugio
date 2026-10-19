// arkone-prereg-submit — 청라 아크원 푸르지오 APT 사전고객등록 접수 (4개 사이트 공통)
// v7 발송 로그·멱등성, 재등록 알림 억제 / v8 폭주 카운터에서 전화상담 제외
// v9 (2026-09-29): 관리자 이메일 알림 추가(카톡과 병행)
// v10 (2026-09-29): Gmail SMTP(앱 비밀번호) 경로
// v11 (2026-09-29): Google Apps Script 메일 중계 경로 추가. 우선순위 gas_mail_url > gmail_app_password > resend_api_key
// v12 (2026-09-29): Apps Script 302 리다이렉트를 직접 추적(자동 추적 시 타임아웃 발생)
// v13 (2026-10-07): 고객 등록완료 문자(SOLAPI, 대표번호 발신). arkone_config.customer_sms_enabled='true'일 때만 발송
// v14 (2026-10-16): 상가 고객군 추가(대표 지시). INTEREST에 「상가」, productGroup에 commercial/상가 → 「상가」. 그 외 동작 동일
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SB_URL = Deno.env.get("SUPABASE_URL")!;
const SB_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const TBL = "arkone_prereg";
const CFG = "arkone_kakao_cfg";
const CFG_MAIN = "arkone_config";
const KLOG = "arkone_kakao_log";
const MLOG = "kakao_message_logs";
const LINK = "https://www.xn--oi2bj1bg5twzasy72kx8fj1ipxj.site/";
const PHONE_CHANNEL_SITE = "전화상담-직원입력";
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
const TEST_ORIGIN = /^https:\/\/[a-z0-9-]+-yisim817-6215s-projects\.vercel\.app$/;

const SIDO = new Set([
  "서울특별시", "부산광역시", "대구광역시", "인천광역시", "광주광역시", "대전광역시",
  "울산광역시", "세종특별자치시", "경기도", "강원특별자치도", "충청북도", "충청남도",
  "전북특별자치도", "전라남도", "경상북도", "경상남도", "제주특별자치도",
]);
const INTEREST = new Set(["", "APT 84㎡", "APT 103㎡", "오피스텔", "상가", "미정"]);
const SPECIAL = new Set(["", "신혼부부", "생애최초", "신생아", "다자녀", "노부모", "기관추천", "해당없음", "모름"]);
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
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors(origin), "Content-Type": "application/json; charset=utf-8" },
  });
}

const str = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[<>]/g, "").trim().slice(0, max) : "";

function anyRrn(value: unknown): boolean {
  if (typeof value === "string") return RRN.test(value.replace(/[^\d\-\s]/g, " "));
  if (Array.isArray(value)) return value.some(anyRrn);
  if (value && typeof value === "object") return Object.values(value).some(anyRrn);
  return false;
}

function phoneOf(v: unknown): string | null {
  const d = typeof v === "string" ? v.replace(/\D/g, "") : "";
  if (!/^010\d{8}$/.test(d)) return null;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
}

function validBirth6(v: string): boolean {
  if (!/^\d{6}$/.test(v)) return false;
  const m = Number(v.slice(2, 4));
  const d = Number(v.slice(4, 6));
  return m >= 1 && m <= 12 && d >= 1 && d <= 31;
}

function isoOrNull(v: unknown): string | null {
  if (typeof v !== "string" || !v) return null;
  const t = new Date(v);
  return isNaN(t.getTime()) ? null : t.toISOString();
}

async function rest(path: string, init: RequestInit = {}) {
  return await fetch(`${SB_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SB_KEY,
      Authorization: `Bearer ${SB_KEY}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
}

function kst(iso: string) {
  const k = new Date(new Date(iso).getTime() + 9 * 3600 * 1000);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(k.getUTCMonth() + 1)}.${p(k.getUTCDate())} ${p(k.getUTCHours())}:${p(k.getUTCMinutes())}`;
}

async function kakao(row: Record<string, unknown>, text: string) {
  const id = String(row.id ?? "");
  let ok = false;
  let detail = "";
  try {
    const cr = await rest(`${CFG}?select=key,value`);
    const cfg: Record<string, string> = {};
    for (const r of (await cr.json()) ?? []) if (r.value) cfg[r.key] = String(r.value).trim();
    if (!cfg.rest_key || !cfg.refresh_token) throw new Error("not configured");

    const form: Record<string, string> = {
      grant_type: "refresh_token",
      client_id: cfg.rest_key,
      refresh_token: cfg.refresh_token,
    };
    if (cfg.client_secret) form.client_secret = cfg.client_secret;
    const tr = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" },
      body: new URLSearchParams(form),
    });
    const tk = await tr.json();
    if (!tr.ok || !tk.access_token) throw new Error(`token_http_${tr.status}`);
    if (tk.refresh_token) {
      await rest(`${CFG}?key=eq.refresh_token`, {
        method: "PATCH",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({ value: String(tk.refresh_token), updated_at: new Date().toISOString() }),
      });
    }

    const sr = await fetch("https://kapi.kakao.com/v2/api/talk/memo/default/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tk.access_token}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: new URLSearchParams({
        template_object: JSON.stringify({
          object_type: "text",
          text: text.slice(0, 200),
          link: { web_url: LINK, mobile_web_url: LINK },
          button_title: "현장 홈페이지",
        }),
      }),
    });
    ok = sr.ok;
    if (!ok) await sr.text();
    detail = ok ? "prereg sent" : `prereg send failed: http_${sr.status}`;
  } catch (e) {
    detail = `prereg error: ${String(e).slice(0, 80)}`;
  }
  await rest(KLOG, {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ lead_id: id || null, ok, detail }),
  });
  await rest(`${TBL}?id=eq.${id}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ kakao_ok: ok, kakao_detail: detail.slice(0, 300) }),
  });
  return { ok, detail };
}

function maskPhone(v: unknown): string | null {
  const p = phoneOf(v);
  return p ? `${p.slice(0, 3)}-****-${p.slice(-4)}` : null;
}

async function claimMessage(row: Record<string, unknown>, recipientType: "ADMIN" | "CUSTOMER", messageType: string, provider: string) {
  const id = String(row.id ?? "");
  if (!id) return null;
  const r = await rest(`${MLOG}?on_conflict=registration_id,recipient_type,message_type`, {
    method: "POST",
    headers: { Prefer: "resolution=ignore-duplicates,return=representation" },
    body: JSON.stringify({
      registration_id: id,
      recipient_type: recipientType,
      recipient_phone: maskPhone(recipientType === "ADMIN" ? null : row.phone),
      provider,
      message_type: messageType,
      status: "PENDING",
    }),
  });
  if (!r.ok) {
    console.error("[arkone-prereg-submit] message log claim failed", r.status);
    return null;
  }
  const rows = await r.json();
  return rows?.[0]?.id ? String(rows[0].id) : null;
}

async function finishMessage(logId: string, status: "SENT" | "FAILED" | "SKIPPED", code?: string, providerId?: string, errMsg?: string) {
  const now = new Date().toISOString();
  await rest(`${MLOG}?id=eq.${encodeURIComponent(logId)}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      status,
      ...(status === "SENT" ? { sent_at: now } : {}),
      ...(status === "FAILED" ? { failed_at: now } : {}),
      ...(code ? { error_code: code, error_message: (errMsg || code).slice(0, 200) } : {}),
      ...(providerId ? { provider_message_id: providerId.slice(0, 100) } : {}),
    }),
  });
}

async function sendAdminMessage(row: Record<string, unknown>, text: string, type: "NEW_REGISTRATION" | "ADDITIONAL_INFO") {
  const logId = await claimMessage(row, "ADMIN", type, "kakao_memo_self");
  if (!logId) return;
  const result = await kakao(row, text);
  await finishMessage(logId, result?.ok === true ? "SENT" : "FAILED", result?.ok === true ? undefined : "ADMIN_KAKAO_SEND_FAILED");
}

// ---------- 관리자 이메일 ----------
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

async function emailConfig(): Promise<Record<string, string>> {
  const r = await rest(`${CFG_MAIN}?select=key,value&key=in.(prereg_email_enabled,prereg_email_to,resend_api_key,resend_from,gmail_user,gmail_app_password,gas_mail_url,gas_mail_secret)`);
  const cfg: Record<string, string> = {};
  if (r.ok) for (const x of (await r.json()) ?? []) if (x.value) cfg[x.key] = String(x.value).trim();
  return cfg;
}

function emailHtml(text: string): string {
  const lines = text.split("\n");
  const title = esc(lines[0] ?? "");
  const rows = lines.slice(1).filter((l) => l && !/^─+$/.test(l)).map((l) => {
    const m = l.match(/^(\S+)\s{2,}([\s\S]*)$/);
    return m
      ? `<tr><td style="padding:6px 12px 6px 0;color:#6b7b76;white-space:nowrap;vertical-align:top">${esc(m[1])}</td><td style="padding:6px 0;font-weight:600">${esc(m[2])}</td></tr>`
      : `<tr><td colspan="2" style="padding:6px 0;font-weight:600">${esc(l)}</td></tr>`;
  }).join("\n");
  return `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#18332d;max-width:560px">\n<h2 style="font-size:17px;margin:0 0 14px">${title}</h2>\n<table style="border-collapse:collapse;font-size:15px">\n${rows}\n</table>\n<p style="margin-top:22px;font-size:12px;color:#8a8a8a">개인정보 포함 - 외부 전달 금지. 원본은 접수 DB(arkone_prereg)입니다.</p>\n</div>`;
}

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.race([p, new Promise<T>((_, rej) => setTimeout(() => rej(new Error("timeout")), ms))]);
}

async function sendViaGas(cfg: Record<string, string>, to: string[], subject: string, text: string, html: string) {
  // Apps Script 웹앱은 302로 결과 페이지를 돌려준다. 자동 추적이 멈추는 문제가 있어 직접 따라간다.
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

async function sendViaResend(cfg: Record<string, string>, to: string[], subject: string, text: string, html: string, logId: string) {
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.resend_api_key}`, "Content-Type": "application/json", "Idempotency-Key": `arkone-${logId}` },
    body: JSON.stringify({ from: cfg.resend_from || DEFAULT_FROM, to, subject, text, html }),
  });
  if (!r.ok) throw new Error(`resend_http_${r.status}`);
}

async function sendAdminEmail(row: Record<string, unknown>, text: string, type: "NEW_REGISTRATION" | "ADDITIONAL_INFO") {
  const logId = await claimMessage(row, "ADMIN", `${type}_EMAIL`, "admin_email");
  if (!logId) return;
  let via = "";
  try {
    const cfg = await emailConfig();
    const to = (cfg.prereg_email_to || "").split(",").map((s) => s.trim()).filter(Boolean);
    if (cfg.prereg_email_enabled !== "true" || !to.length) {
      await finishMessage(logId, "SKIPPED", "EMAIL_DISABLED");
      return;
    }
    const subject = `${(text.split("\n")[0] ?? "").replace(" 청라 아크원 푸르지오", "")} ${row.name ?? ""} · ${row.receipt_no ?? ""}`.slice(0, 150);
    const html = emailHtml(text);
    if (cfg.gas_mail_url) {
      via = "google_apps_script";
      await withTimeout(sendViaGas(cfg, to, subject, text, html), 30000);
    } else if (cfg.gmail_app_password) {
      via = "gmail_smtp";
      await withTimeout(sendViaGmail(cfg, to, subject, text, html), 20000);
    } else if (cfg.resend_api_key) {
      via = "resend";
      await withTimeout(sendViaResend(cfg, to, subject, text, html, logId), 15000);
    } else {
      await finishMessage(logId, "SKIPPED", "EMAIL_NOT_CONFIGURED");
      return;
    }
    await finishMessage(logId, "SENT", undefined, via);
  } catch (e) {
    const msg = String(e).replace(/[\r\n]+/g, " ").slice(0, 160);
    console.error("[arkone-prereg-submit] email error", via, msg);
    await finishMessage(logId, "FAILED", `ADMIN_EMAIL_FAILED_${via || "cfg"}`, via, msg);
  }
}

// ---------- 고객 등록완료 문자 (v13, SOLAPI) ----------
// 설정(arkone_config): customer_sms_enabled='true' 일 때만 발송.
//   solapi_api_key / solapi_api_secret / customer_sms_from(발신 대표번호, 숫자만)
//   customer_sms_text(선택, {receipt} {tel} 치환) — 정보성 안내만. 혜택·이벤트 문구 금지(광고성 전환)
const SOLAPI_URL = "https://api.solapi.com/messages/v4/send-many/detail";
const DEFAULT_SMS_TEXT = "[청라 아크원 푸르지오] 사전고객등록이 완료되었습니다. 확인 {tel}";

async function smsConfig(): Promise<Record<string, string>> {
  const r = await rest(`${CFG_MAIN}?select=key,value&key=in.(customer_sms_enabled,solapi_api_key,solapi_api_secret,customer_sms_from,customer_sms_text)`);
  const cfg: Record<string, string> = {};
  if (r.ok) for (const x of (await r.json()) ?? []) if (x.value) cfg[x.key] = String(x.value).trim();
  return cfg;
}

function telDisplay(d: string): string {
  if (/^1\d{7}$/.test(d)) return `${d.slice(0, 4)}-${d.slice(4)}`;
  if (/^01\d{8,9}$/.test(d)) return `${d.slice(0, 3)}-${d.slice(3, -4)}-${d.slice(-4)}`;
  return d;
}

async function solapiAuth(key: string, secret: string): Promise<string> {
  const date = new Date().toISOString();
  const salt = crypto.randomUUID().replace(/-/g, "");
  const k = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", k, new TextEncoder().encode(date + salt)));
  const hex = Array.from(sig, (b) => b.toString(16).padStart(2, "0")).join("");
  return `HMAC-SHA256 apiKey=${key}, date=${date}, salt=${salt}, signature=${hex}`;
}

async function sendCustomerSms(row: Record<string, unknown>) {
  // 접수 1건당 1회만(kakao_message_logs 고유키: registration_id+CUSTOMER+REGISTRATION_COMPLETE)
  const logId = await claimMessage(row, "CUSTOMER", "REGISTRATION_COMPLETE", "solapi_sms");
  if (!logId) return;
  try {
    const cfg = await smsConfig();
    if (cfg.customer_sms_enabled !== "true") {
      await finishMessage(logId, "SKIPPED", "CUSTOMER_SMS_DISABLED");
      return;
    }
    const from = (cfg.customer_sms_from || "").replace(/\D/g, "");
    const to = String(row.phone ?? "").replace(/\D/g, "");
    if (!cfg.solapi_api_key || !cfg.solapi_api_secret || !from) {
      await finishMessage(logId, "SKIPPED", "CUSTOMER_SMS_NOT_CONFIGURED");
      return;
    }
    if (!/^010\d{8}$/.test(to)) {
      await finishMessage(logId, "SKIPPED", "CUSTOMER_SMS_BAD_PHONE");
      return;
    }
    const text = (cfg.customer_sms_text || DEFAULT_SMS_TEXT)
      .replaceAll("{receipt}", String(row.receipt_no ?? ""))
      .replaceAll("{tel}", telDisplay(from))
      .slice(0, 1000);
    const r = await withTimeout(fetch(SOLAPI_URL, {
      method: "POST",
      headers: { Authorization: await solapiAuth(cfg.solapi_api_key, cfg.solapi_api_secret), "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ to, from, text }], allowDuplicates: false, showMessageList: true }),
    }), 15000);
    const body = await r.json().catch(() => ({}));
    // deno-lint-ignore no-explicit-any
    const failed: any[] = Array.isArray(body?.failedMessageList) ? body.failedMessageList : [];
    if (!r.ok || failed.length) {
      const f = failed[0] ?? {};
      const code = String(f.statusCode ?? body?.errorCode ?? `http_${r.status}`).slice(0, 40);
      const msg = String(f.statusMessage ?? body?.errorMessage ?? "").slice(0, 160);
      await finishMessage(logId, "FAILED", `CUSTOMER_SMS_${code}`, String(body?.groupInfo?._id ?? ""), msg);
      return;
    }
    // SENT = SOLAPI 접수 완료. 최종 도달 결과는 SOLAPI 콘솔에서 확인
    const msgId = String(body?.messageList?.[0]?.messageId ?? body?.groupInfo?._id ?? "solapi");
    await finishMessage(logId, "SENT", undefined, msgId);
  } catch (e) {
    const msg = String(e).replace(/[\r\n]+/g, " ").slice(0, 160);
    console.error("[arkone-prereg-submit] customer sms error", msg);
    await finishMessage(logId, "FAILED", "CUSTOMER_SMS_ERROR", undefined, msg);
  }
}

function birthText(v: unknown): string {
  const s = typeof v === "string" ? v : "";
  return /^\d{6}$/.test(s) ? `${s.slice(0, 2)}.${s.slice(2, 4)}.${s.slice(4, 6)} (${s})` : "미입력 — 확인 필요";
}

function productGroup(row: Record<string, unknown>): string {
  const direct = String(row.product_group ?? row.product ?? "").trim().toLowerCase();
  if (direct === "apt" || direct === "아파트") return "아파트";
  if (direct === "officetel" || direct === "오피스텔") return "오피스텔";
  if (direct === "commercial" || direct === "상가") return "상가";
  const interest = String(row.interest_type ?? "").trim();
  if (interest === "오피스텔") return "오피스텔";
  if (interest === "상가") return "상가";
  if (/^APT(?:\s|$)/i.test(interest)) return "아파트";
  try {
    const page = String(row.page ?? "");
    const selected = new URL(page, LINK).searchParams.get("product")?.toLowerCase();
    if (selected === "apt") return "아파트";
    if (selected === "officetel") return "오피스텔";
    if (selected === "commercial") return "상가";
  } catch {
    // ignore
  }
  return "미선택/확인 필요";
}

function step1Text(row: Record<string, unknown>, label: string, again: boolean, test: boolean): string {
  const utm = [row.utm_source, row.utm_campaign].filter(Boolean).join("/").slice(0, 20);
  const src = (test ? "preview" : label) + (utm ? " · " + utm : "");
  return (
    `${test ? "[테스트] " : ""}[사전고객등록${again ? "·재등록" : ""}] 청라 아크원 푸르지오\n` +
    `───────────\n` +
    `연락처  ${row.phone}\n` +
    `이름  ${row.name}\n` +
    `생년월일  ${birthText(row.birth6)}\n` +
    `고객군  ${productGroup(row)}\n` +
    `접수  ${kst(String(again && row.last_submit_at ? row.last_submit_at : row.created_at))} · ${row.receipt_no}\n` +
    (row.visit_request ? `방문상담  희망\n` : "") +
    `광고수신  ${row.consent_marketing ? "O" : "X"}\n` +
    `유입  ${src}`
  );
}

function step2Text(row: Record<string, unknown>, test: boolean): string {
  const addr = [row.addr_sido, row.addr_sigungu, row.addr_dong].filter(Boolean).join(" ");
  return (
    `${test ? "[테스트] " : ""}[사전고객등록·추가정보] 청라 아크원 푸르지오\n` +
    `───────────\n` +
    `${row.receipt_no} · ${row.name}\n` +
    `고객군  ${productGroup(row)}\n` +
    `생년월일  ${birthText(row.birth6)}\n` +
    `주소  ${addr || "미입력"}\n` +
    `관심  ${row.interest_type || "미입력"}\n` +
    `특공  ${row.special_supply || "미입력"}` +
    (row.consent_mgm ? `\nMGM 제공동의  O` : "")
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

  if (req.method === "OPTIONS") {
    return new Response(null, { status: info ? 204 : 403, headers: cors(origin) });
  }
  if (req.method !== "POST") return reply(origin, 405, { ok: false, reason: "method" });
  if (!info) return reply(origin, 403, { ok: false, reason: "origin" });

  const raw = await req.text();
  if (raw.length > 8000) return reply(origin, 413, { ok: false, reason: "too_large" });
  let b: Record<string, unknown>;
  try {
    b = JSON.parse(raw);
  } catch {
    return reply(origin, 400, { ok: false, reason: "json" });
  }

  const typed = ["name", "phone", "birth6", "addr_sido", "addr_sigungu", "addr_dong", "interest_type", "special_supply", "receipt_no"]
    .map((k) => b[k]);
  if (anyRrn(typed)) return reply(origin, 400, { ok: false, reason: "rrn_blocked" });
  if (typeof b.hp === "string" && b.hp.length > 0) return reply(origin, 400, { ok: false, reason: "rejected" });

  const phone = phoneOf(b.phone);
  if (!phone) return reply(origin, 400, { ok: false, reason: "phone" });
  const test = info.test;

  if (b.step === 1) {
    const name = str(b.name, 20);
    if (name.length < 2 || /\d{7,}/.test(name)) return reply(origin, 400, { ok: false, reason: "name" });
    if (b.consent_collect !== true) return reply(origin, 400, { ok: false, reason: "consent" });
    const version = str(b.consent_version, 40);
    if (!version) return reply(origin, 400, { ok: false, reason: "consent_version" });
    const birth1 = typeof b.birth6 === "string" ? b.birth6.trim() : "";
    if (birth1 && !validBirth6(birth1)) return reply(origin, 400, { ok: false, reason: "birth6" });

    const since = new Date(Date.now() - 60_000).toISOString();
    const cnt = await rest(`${TBL}?select=id&created_at=gt.${since}&site=neq.${encodeURIComponent(PHONE_CHANNEL_SITE)}`, {
      method: "HEAD",
      headers: { Prefer: "count=exact" },
    });
    const total = Number((cnt.headers.get("content-range") ?? "*/0").split("/")[1] ?? 0);
    if (total > 30) return reply(origin, 429, { ok: false, reason: "busy" });

    const marketing = b.consent_marketing === true;
    const visit = b.visit_request === true;

    const ex = await rest(
      `${TBL}?select=id,receipt_no,created_at,submit_count,name,phone,birth6,visit_request,consent_marketing,utm_source,utm_campaign,page&phone=eq.${phone}&is_test=eq.${test}`,
    );
    const found = ex.ok ? (await ex.json())[0] : null;
    if (found) {
      await rest(`${TBL}?id=eq.${found.id}`, {
        method: "PATCH",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({
          last_submit_at: new Date().toISOString(),
          page: str(b.page, 200) || found.page || null,
          submit_count: (found.submit_count ?? 1) + 1,
          consent_marketing: marketing || found.consent_marketing,
          visit_request: visit || found.visit_request,
          ...(birth1 ? { birth6: birth1 } : {}),
        }),
      });
      return reply(origin, 200, { ok: true, step: 1, duplicate: true, receipt_no: found.receipt_no, created_at: found.created_at });
    }

    const ins = await rest(TBL, {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({
        name,
        phone,
        birth6: birth1 || null,
        visit_request: visit,
        consent_collect: true,
        consent_marketing: marketing,
        consent_version: version,
        site: info.label,
        page: str(b.page, 200) || null,
        utm_source: str(b.utm_source, 160) || null,
        utm_medium: str(b.utm_medium, 160) || null,
        utm_campaign: str(b.utm_campaign, 160) || null,
        utm_content: str(b.utm_content, 160) || null,
        utm_term: str(b.utm_term, 160) || null,
        referrer: str(b.referrer, 500) || null,
        first_visit_at: isoOrNull(b.first_visit_at),
        is_test: test,
      }),
    });
    if (!ins.ok) {
      const errText = await ins.text();
      if (ins.status === 409 || /23505|duplicate key/i.test(errText)) {
        const raced = await rest(`${TBL}?select=id,receipt_no,created_at&phone=eq.${encodeURIComponent(phone)}&is_test=eq.${test}`);
        const existing = raced.ok ? (await raced.json())?.[0] : null;
        if (existing) return reply(origin, 200, { ok: true, step: 1, duplicate: true, receipt_no: existing.receipt_no, created_at: existing.created_at });
      }
      console.error("[arkone-prereg-submit] insert failed", ins.status);
      return reply(origin, 500, { ok: false, reason: "store" });
    }
    const row = (await ins.json())[0];
    const t1 = step1Text(row, info.label, false, test);
    background(Promise.all([
      sendAdminMessage(row, t1, "NEW_REGISTRATION"),
      sendAdminEmail(row, t1, "NEW_REGISTRATION"),
      sendCustomerSms(row),
    ]));
    return reply(origin, 200, { ok: true, step: 1, receipt_no: row.receipt_no, created_at: row.created_at });
  }

  if (b.step === 2) {
    const receipt = str(b.receipt_no, 20);
    if (!/^ARK-\d{4}-\d{4,}$/.test(receipt)) return reply(origin, 400, { ok: false, reason: "receipt" });
    const birth2 = typeof b.birth6 === "string" ? b.birth6.trim() : "";
    if (birth2 && !validBirth6(birth2)) return reply(origin, 400, { ok: false, reason: "birth6" });
    const sido = str(b.addr_sido, 20);
    const sigungu = str(b.addr_sigungu, 20);
    const dong = str(b.addr_dong, 20);
    const anyAddr = !!(sido || sigungu || dong);
    if (anyAddr) {
      if (!SIDO.has(sido)) return reply(origin, 400, { ok: false, reason: "addr_sido" });
      for (const v of [sigungu, dong]) {
        if (v.length < 2 || /\d{7,}/.test(v)) return reply(origin, 400, { ok: false, reason: "addr" });
      }
    }
    const interestRaw = str(b.interest_type, 20);
    const specialRaw = str(b.special_supply, 20);
    const interest = INTEREST.has(interestRaw) ? interestRaw : "";
    const special = SPECIAL.has(specialRaw) ? specialRaw : "";
    if (interestRaw && !interest) console.warn("[arkone-prereg-submit] dropped interest_type", interestRaw);
    if (specialRaw && !special) console.warn("[arkone-prereg-submit] dropped special_supply", specialRaw);
    const mgm = b.consent_mgm === true;

    const ex = await rest(`${TBL}?select=id,receipt_no,consent_mgm&receipt_no=eq.${receipt}&phone=eq.${phone}&is_test=eq.${test}`);
    const found = ex.ok ? (await ex.json())[0] : null;
    if (!found) return reply(origin, 404, { ok: false, reason: "not_found" });

    const now = new Date().toISOString();
    const upd = await rest(`${TBL}?id=eq.${found.id}`, {
      method: "PATCH",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({
        ...(birth2 ? { birth6: birth2 } : {}),
        ...(anyAddr ? { addr_sido: sido, addr_sigungu: sigungu, addr_dong: dong } : {}),
        ...(interest ? { interest_type: interest } : {}),
        ...(special ? { special_supply: special } : {}),
        consent_mgm: mgm || found.consent_mgm,
        consent_mgm_at: mgm && !found.consent_mgm ? now : undefined,
        step2_at: now,
        last_submit_at: now,
      }),
    });
    if (!upd.ok) {
      console.error("[arkone-prereg-submit] step2 failed", upd.status, (await upd.text()).slice(0, 300));
      return reply(origin, 500, { ok: false, reason: "store" });
    }
    const row2 = (await upd.json())[0];
    if (row2 && (anyAddr || interest || special || birth2 || mgm)) {
      const t2 = step2Text(row2, test);
      background(Promise.all([
        sendAdminMessage(row2, t2, "ADDITIONAL_INFO"),
        sendAdminEmail(row2, t2, "ADDITIONAL_INFO"),
      ]));
    }
    return reply(origin, 200, { ok: true, step: 2, receipt_no: found.receipt_no });
  }

  return reply(origin, 400, { ok: false, reason: "step" });
});
