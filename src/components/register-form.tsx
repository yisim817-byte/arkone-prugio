import { useRef, useState, type FormEvent } from "react";
import { PrivacyModal } from "@/components/privacy-modal";
import { SITE_PHONE } from "@/lib/site-data";

// Supabase publishable (anon) key: public by design; RLS only allows INSERT with consent = true.
const LEAD_URL = "https://jzmktahlrwtrtejjflrw.supabase.co/rest/v1/arkone_leads";
const LEAD_KEY = "sb_publishable_AgIXgF5snH1HQKqpnLVcvA_YienrRMO";
const LEAD_SOURCE = "www.아크원푸르지오.site/register";
const DONE_KEY = "arkone-register-done";

function formatPhone(raw: string) {
  const v = raw.replace(/\D/g, "").slice(0, 11);
  if (v.length < 4) return v;
  if (v.length < 8) return `${v.slice(0, 3)}-${v.slice(3)}`;
  return `${v.slice(0, 3)}-${v.slice(3, 7)}-${v.slice(7)}`;
}

function readDone() {
  try {
    return sessionStorage.getItem(DONE_KEY) === "1";
  } catch {
    return false;
  }
}

export function RegisterForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; agree?: string }>({});
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const [done, setDone] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  // Client-generated primary key: retries / double clicks hit a 409 instead of creating a second row.
  const leadId = useRef<string>(crypto.randomUUID());
  const inFlight = useRef(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (inFlight.current) return;
    const digits = phone.replace(/\D/g, "");
    const next: typeof errors = {};
    if (!name.trim()) next.name = "성명을 입력해 주세요.";
    if (!/^01[016789]\d{7,8}$/.test(digits)) next.phone = "휴대폰번호를 정확히 입력해 주세요.";
    if (!agree) next.agree = "개인정보 수집·이용에 동의해 주세요.";
    setErrors(next);
    if (Object.keys(next).length) return;

    inFlight.current = true;
    setBusy(true);
    setFailed(false);
    try {
      const res = await fetch(LEAD_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: LEAD_KEY,
          Authorization: `Bearer ${LEAD_KEY}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          id: leadId.current,
          name: name.trim(),
          phone: formatPhone(digits),
          product: "undecided",
          consent: true,
          source: LEAD_SOURCE,
          user_agent: (navigator.userAgent || "").slice(0, 300),
        }),
      });
      if (res.ok || res.status === 409) {
        setDone(true);
      } else {
        setFailed(true);
      }
    } catch {
      setFailed(true);
    } finally {
      inFlight.current = false;
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="reg reg__done" role="status">
        <h3>관심고객 등록이 완료되었습니다.</h3>
        <p>
          담당자가 확인 후 분양 정보를 안내드리겠습니다.
          <br />
          문의: {SITE_PHONE}
        </p>
      </div>
    );
  }

  return (
    <div className="reg">
      <p className="reg__lead">
        <b>청라 아크원 푸르지오</b> 관심고객을 위해
        <br />
        성명, 휴대폰번호를 입력해 주시기 바랍니다.
      </p>
      <form onSubmit={onSubmit} noValidate>
        <div className={`reg__field${errors.name ? " is-err" : ""}`}>
          <label htmlFor="reg-name">성명</label>
          <input
            id="reg-name"
            type="text"
            autoComplete="name"
            maxLength={40}
            placeholder="성명을 입력하세요."
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={!!errors.name}
          />
          <p className="reg__msg">{errors.name}</p>
        </div>
        <div className={`reg__field${errors.phone ? " is-err" : ""}`}>
          <label htmlFor="reg-phone">휴대폰번호</label>
          <input
            id="reg-phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="숫자만 입력하세요"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            aria-invalid={!!errors.phone}
          />
          <p className="reg__msg">{errors.phone}</p>
        </div>
        <div className="reg__consent" role="region" aria-label="개인정보 수집 및 이용 동의 내용" tabIndex={0}>
          <ul>
            <li>수집항목 : 성명, 휴대폰번호</li>
            <li>수집·이용목적 : 청라 아크원 푸르지오 분양정보 제공 및 상담 안내</li>
            <li>보유·이용기간 : 분양 종료 시, 동의 철회 시 또는 수집·이용목적 달성 시까지</li>
            <li>홈페이지 운영·관리 : 휴메인코리아</li>
            <li>동의를 거부할 수 있으나, 거부 시 관심고객등록이 제한됩니다.</li>
          </ul>
        </div>
        <div className="reg__agree">
          <input id="reg-agree" type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          <label htmlFor="reg-agree">개인정보수집·이용동의 (필수)</label>
          <button type="button" onClick={() => setPrivacy(true)}>
            보기
          </button>
        </div>
        <p className="reg__msg">{errors.agree}</p>
        <button className="reg__submit" type="submit" disabled={busy}>
          {busy ? "접수 중…" : "관심고객 등록"}
        </button>
        {failed ? (
          <p className="reg__error" role="alert">
            접수 중 오류가 발생했습니다. 잠시 후 다시 시도하시거나 {SITE_PHONE}로 문의해 주세요.
          </p>
        ) : null}
      </form>
      {privacy ? <PrivacyModal onClose={() => setPrivacy(false)} /> : null}
    </div>
  );
}
