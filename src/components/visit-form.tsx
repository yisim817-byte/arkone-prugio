import { useEffect, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { SITE_PHONE, SITE_TEL_HREF } from "@/lib/site-data";
import { loadVisitConfig, VISIT_SLOT_LABEL, type VisitOption } from "@/lib/visit-config";

// 작업지시서 13 · 4-2: 모델하우스 방문예약 전용 폼. 사전고객등록(arkone-prereg-submit)과 별도로 arkone-visit-submit 에 접수한다.
const ENDPOINT = "https://jzmktahlrwtrtejjflrw.supabase.co/functions/v1/arkone-visit-submit";
const CONSENT_VERSION = "visit-2026-10-22-v1";
const INTERESTS = ["아파트", "오피스텔", "상가"] as const;

function hyphen(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (digits.length < 4) return digits;
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

function stored(key: string) {
  try { return sessionStorage.getItem(key) || ""; } catch { return ""; }
}

type Done = { receipt: string; dateLabel: string; slotLabel: string; duplicate: boolean };

export function VisitForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [visitSlot, setVisitSlot] = useState("ANY");
  const [interest, setInterest] = useState("");
  const [consent, setConsent] = useState(false);
  const [open, setOpen] = useState(false);
  const [dates, setDates] = useState<VisitOption[] | null>(null);
  const [cfg, setCfg] = useState<"loading" | "ok" | "off">("loading");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [alert, setAlert] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<Done | null>(null);

  useEffect(() => {
    let live = true;
    try {
      const params = new URLSearchParams(location.search);
      ["utm_source", "utm_medium", "utm_campaign"].forEach((key) => {
        const value = params.get(key);
        if (value && !sessionStorage.getItem(key)) sessionStorage.setItem(key, value);
      });
    } catch { /* ignore */ }
    loadVisitConfig().then((c) => {
      if (!live) return;
      setDates(c ? c.dates : null);
      setCfg(c ? "ok" : "off");
    });
    return () => { live = false; };
  }, []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const digits = phone.replace(/\D/g, "");
    const next: Record<string, string> = {};
    if (name.trim().length < 2 || name.trim().length > 20) next.name = "2~20자로 입력해 주세요.";
    if (!(digits.startsWith("010") && digits.length === 11)) next.phone = "010으로 시작하는 11자리를 입력해 주세요.";
    if (cfg === "ok" && !visitDate) next.date = "방문 희망일을 선택해 주세요.";
    if (!consent) next.consent = "개인정보 수집·이용에 동의해 주세요.";
    setErrors(next);
    if (Object.keys(next).length) {
      setAlert("입력 내용을 확인해 주세요.");
      return;
    }
    setBusy(true);
    setAlert("");
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: hyphen(digits),
          visit_date: cfg === "ok" ? visitDate : "",
          visit_slot: cfg === "ok" ? visitSlot : "ANY",
          interest,
          consent_privacy: true,
          consent_version: CONSENT_VERSION,
          page: location.pathname,
          utm_source: stored("utm_source"),
          utm_medium: stored("utm_medium"),
          utm_campaign: stored("utm_campaign"),
          hp: "",
        }),
        signal: AbortSignal.timeout(20000),
      });
      const data = await response.json().catch(() => ({}));
      if (!data || data.ok !== true) {
        setAlert(`접수를 확인하지 못했습니다. 입력 내용은 유지됩니다. 잠시 후 다시 시도하시거나 ${SITE_PHONE}로 문의해 주세요.`);
        return;
      }
      setDone({
        receipt: data.receipt_no || "",
        dateLabel: data.visit_date ? (data.date_label || dates?.find((d) => d.value === data.visit_date)?.label || data.visit_date) : "",
        slotLabel: data.visit_date ? (data.slot_label || VISIT_SLOT_LABEL[data.visit_slot] || "") : "",
        duplicate: Boolean(data.duplicate),
      });
    } catch {
      setAlert(`접수를 확인하지 못했습니다. 입력 내용은 유지됩니다. 잠시 후 다시 시도하시거나 ${SITE_PHONE}로 문의해 주세요.`);
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    const when = [done.dateLabel, done.slotLabel].filter(Boolean).join(" ");
    return (
      <div className="reg reg__done" tabIndex={-1}>
        <p>청라 아크원 푸르지오</p>
        <h3>방문예약 신청이 접수되었습니다.</h3>
        <p>{when ? `${when} · ` : ""}담당자가 확인 후 전화로 방문 시간을 안내해 드립니다.</p>
        {done.receipt ? <p>{done.duplicate ? "이미 접수된 신청입니다. 접수번호" : "접수번호"} <b>{done.receipt}</b></p> : null}
        <p><Link className="reg__submit" to="/register">사전고객등록도 하기</Link></p>
        <p>※ 방문예약은 청약 신청이 아니며, 청약 자격·순위와 관계없습니다.</p>
      </div>
    );
  }

  return (
    <div className="reg visit-form">
      <p className="reg__lead"><b>청라 아크원 푸르지오</b> 모델하우스 방문예약</p>
      <p className="visit-form__desc">방문 희망 날짜를 남겨 주시면, 담당자가 확인 후 방문 시간을 전화로 안내해 드립니다.</p>
      <p className="visit-form__loc">견본주택 위치 · 인천광역시 서해구 청라동 87-1 · GRAND OPEN 10.30(금)</p>
      <form onSubmit={onSubmit} noValidate>
        {alert ? <p className="reg__error" role="alert">{alert}</p> : null}
        <div className={`reg__field${errors.name ? " is-err" : ""}`}>
          <label htmlFor="v-name">이름 *</label>
          <input id="v-name" name="name" type="text" placeholder="이름을 입력해 주세요" value={name} maxLength={20} autoComplete="name" onChange={(e) => setName(e.target.value)} />
          <p className="reg__msg">{errors.name}</p>
        </div>
        <div className={`reg__field${errors.phone ? " is-err" : ""}`}>
          <label htmlFor="v-phone">휴대폰번호 *</label>
          <input id="v-phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel" placeholder="010-0000-0000" value={phone} onChange={(e) => setPhone(hyphen(e.target.value))} />
          <p className="reg__msg">{errors.phone}</p>
        </div>
        {cfg === "off" ? (
          <div className="visit-block">
            <p className="visit-block__note">방문 일정은 담당자가 전화로 확인합니다.</p>
            <p><a className="reg__skip" href={SITE_TEL_HREF}>{`전화 예약 ${SITE_PHONE}`}</a></p>
          </div>
        ) : (
          <>
            <div className={`reg__field${errors.date ? " is-err" : ""}`}>
              <label htmlFor="v-date">방문 희망일 *</label>
              <select id="v-date" name="visit_date" value={visitDate} disabled={cfg !== "ok"} onChange={(e) => setVisitDate(e.target.value)}>
                <option value="">{cfg === "loading" ? "날짜 불러오는 중" : "날짜 선택"}</option>
                {(dates ?? []).map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
              </select>
              <p className="reg__msg">{errors.date}</p>
            </div>
            <fieldset className="visit-block__slots">
              <legend>방문 희망 시간대</legend>
              <div className="prereg-chips">{(["AM", "PM", "ANY"] as const).map((value) => <label key={value}><input type="radio" name="visit_slot" value={value} checked={visitSlot === value} onChange={() => setVisitSlot(value)} /><span>{VISIT_SLOT_LABEL[value]}</span></label>)}</div>
            </fieldset>
          </>
        )}
        <fieldset className="visit-block__slots">
          <legend>관심 상품 (선택)</legend>
          <div className="prereg-chips">{INTERESTS.map((item) => <label key={item}><input type="radio" name="interest" value={item} checked={interest === item} onClick={() => { if (interest === item) setInterest(""); }} onChange={() => setInterest(item)} /><span>{item}</span></label>)}</div>
        </fieldset>
        <div className="prereg-hidden-hp" aria-hidden="true"><label>회사<input name="hp" tabIndex={-1} autoComplete="off" /></label></div>
        <div className={`reg__agree${errors.consent ? " is-err" : ""}`}>
          <input id="v-consent" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
          <label htmlFor="v-consent">[필수] 개인정보 수집·이용 동의</label>
          <button type="button" onClick={() => setOpen(!open)}>보기</button>
        </div>
        {open ? <div className="reg__consent"><p>수집 항목 : 이름, 휴대폰번호, 방문 희망일·시간대, 관심 상품 (자동 수집) 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보, 불량이용 기록, 기기정보</p><p>이용 목적 : 견본주택 방문 일정 안내, 청라 아크원 푸르지오 분양정보 제공 및 마케팅 활용(마케팅 활용은 광고성 정보 수신에 동의한 경우에 한함)</p><p>보유 기간 : 이벤트 종료 시 지체 없이 파기. 최장 수집일로부터 1년</p><p>동의를 거부할 수 있으며, 거부 시 방문예약 신청이 제한됩니다. 전화 예약({SITE_PHONE})은 동의 없이 이용하실 수 있습니다.</p></div> : null}
        {errors.consent ? <p className="reg__msg">{errors.consent}</p> : null}
        <button className="reg__submit" type="submit" disabled={busy}>{busy ? "접수 중…" : "방문예약 신청"}</button>
      </form>
      <p className="visit-block__note">※ 방문 시간은 담당자가 전화로 확정 안내합니다.</p>
      <p className="visit-block__note">※ 방문예약은 청약 신청이 아니며, 청약 자격·순위와 관계없습니다.</p>
      <p className="visit-block__note">※ 방문예약은 사전고객등록과 별개입니다. 백화점 상품권·코스트코 회원권 이벤트는 사전고객등록을 한 분이 대상입니다. <Link to="/register">사전고객등록 하기</Link></p>
    </div>
  );
}
