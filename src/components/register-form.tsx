import { useEffect, useState, type FormEvent } from "react";
import { SITE_PHONE, SITE_TEL_HREF } from "@/lib/site-data";
import { PreregShare } from "@/components/prereg-share";

const ENDPOINT = "https://jzmktahlrwtrtejjflrw.supabase.co/functions/v1/arkone-prereg-submit";
const CONSENT_VERSION = "2026-09-26-v2";
const SIDO = ["서울특별시","부산광역시","대구광역시","인천광역시","광주광역시","대전광역시","울산광역시","세종특별자치시","경기도","강원특별자치도","충청북도","충청남도","전북특별자치도","전라남도","경상북도","경상남도","제주특별자치도"];
const PHRASE = "사전고객등록 확인은 대표번호 1833-3872로 문의해 주세요.";
type Product = "" | "apt" | "officetel";

function hyphen(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (digits.length < 4) return digits;
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

function validDate(value: string) {
  if (!/^\d{6}$/.test(value)) return false;
  const month = Number(value.slice(2, 4));
  const day = Number(value.slice(4, 6));
  return month >= 1 && month <= 12 && day >= 1 && day <= 31;
}

function formatKst(value: string) {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) return value || "";
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Seoul", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false,
  }).formatToParts(date);
  const pick = (type: string) => parts.find((part) => part.type === type)?.value || "";
  return `${pick("year")}.${pick("month")}.${pick("day")} ${pick("hour")}:${pick("minute")}`;
}

function stored(key: string) {
  try { return sessionStorage.getItem(key) || ""; } catch { return ""; }
}

export function RegisterForm() {
  const [step, setStep] = useState<1 | 2 | "done">(1);
  const [product, setProduct] = useState<Product>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [birthWarn, setBirthWarn] = useState(false);
  const [collect, setCollect] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [sido, setSido] = useState("");
  const [sigungu, setSigungu] = useState("");
  const [dong, setDong] = useState("");
  const [interest, setInterest] = useState("");
  const [special, setSpecial] = useState("");
  const [open, setOpen] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [alert, setAlert] = useState("");
  const [busy, setBusy] = useState(false);
  const [receipt, setReceipt] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [duplicate, setDuplicate] = useState(false);

  useEffect(() => {
    if (step !== 2) return;
    const frame = requestAnimationFrame(() => {
      const section = document.getElementById("additional-information");
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
      section?.querySelector<HTMLElement>("select")?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [step]);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem("prereg_first_visit_at")) {
        sessionStorage.setItem("prereg_first_visit_at", new Date().toISOString());
      }
      const params = new URLSearchParams(location.search);
      const requestedProduct = params.get("product");
      if (requestedProduct === "apt" || requestedProduct === "officetel") {
        setProduct(requestedProduct);
        if (requestedProduct === "officetel") setInterest("오피스텔");
      }
      ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((key) => {
        const value = params.get(key);
        if (value && !sessionStorage.getItem(key)) sessionStorage.setItem(key, value);
      });
    } catch { /* ignore */ }
  }, []);

  async function post(body: Record<string, unknown>) {
    setBusy(true);
    setAlert("");
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(20000),
      });
      const data = await response.json().catch(() => ({}));
      if (!data || data.ok !== true) {
        setAlert(`접수를 확인하지 못했습니다. 입력 내용은 유지됩니다. 잠시 후 다시 시도하시거나 ${SITE_PHONE}로 문의해 주세요.`);
        return null;
      }
      return data as { receipt_no?: string; created_at?: string; duplicate?: boolean };
    } catch {
      setAlert(`접수를 확인하지 못했습니다. 입력 내용은 유지됩니다. 잠시 후 다시 시도하시거나 ${SITE_PHONE}로 문의해 주세요.`);
      return null;
    } finally {
      setBusy(false);
    }
  }

  function base() {
    return {
      consent_version: CONSENT_VERSION,
      site: location.hostname,
      page: `${location.pathname}?product=${product}`,
      utm_source: stored("utm_source"),
      utm_medium: stored("utm_medium"),
      utm_campaign: stored("utm_campaign"),
      utm_content: stored("utm_content"),
      utm_term: stored("utm_term"),
      referrer: document.referrer || "",
      first_visit_at: stored("prereg_first_visit_at"),
    };
  }

  async function onStep1(event: FormEvent) {
    event.preventDefault();
    const digits = phone.replace(/\D/g, "");
    const next: Record<string, string> = {};
    if (!product) next.product = "아파트 또는 오피스텔을 선택해 주세요.";
    if (name.trim().length < 2 || name.trim().length > 20) next.name = "2~20자로 입력해 주세요.";
    if (!(digits.startsWith("010") && digits.length === 11)) next.phone = "010으로 시작하는 11자리를 입력해 주세요.";
    if (!birth) next.birth = "생년월일 6자리를 입력해 주세요.";
    else if (!validDate(birth)) next.birth = "생년월일 6자리를 확인해 주세요. (예: 850101)";
    if (!collect) next.collect = "개인정보 수집·이용에 동의해 주세요.";
    setErrors(next);
    if (Object.keys(next).length) {
      setAlert("입력 내용을 확인해 주세요.");
      return;
    }
    const data = await post({
      ...base(),
      step: 1,
      name: name.trim(),
      phone: hyphen(digits),
      birth6: birth,
      consent_collect: true,
      consent_marketing: marketing,
      visit_request: false,
      hp: "",
    });
    if (!data) return;
    setReceipt(data.receipt_no || "");
    setCreatedAt(data.created_at || "");
    setDuplicate(Boolean(data.duplicate));
    setAlert("");
    setStep(2);
  }

  async function onStep2(event: FormEvent) {
    event.preventDefault();
    const any = Boolean(sido || sigungu.trim() || dong.trim());
    const ok = Boolean(sido) && sigungu.trim().length >= 2 && sigungu.trim().length <= 20 && dong.trim().length >= 2 && dong.trim().length <= 20;
    if (any && !ok) {
      setAlert("주소는 선택 항목입니다. 입력하시려면 시·도, 시·군·구, 읍·면·동을 모두 입력해 주세요.");
      return;
    }
    const data = await post({
      step: 2,
      receipt_no: receipt,
      phone: hyphen(phone),
      addr_sido: any ? sido : "",
      addr_sigungu: any ? sigungu.trim() : "",
      addr_dong: any ? dong.trim() : "",
      interest_type: interest,
      special_supply: special,
      consent_mgm: false,
      consent_version: CONSENT_VERSION,
    });
    if (!data) return;
    if (data.receipt_no) setReceipt(data.receipt_no);
    setStep("done");
  }

  if (step === "done") {
    return (
      <div className="reg reg__done" tabIndex={-1}>
        <p>청라 아크원 푸르지오</p>
        <h3>사전등록 완료되었습니다.</h3>
        <p>등록 상품 {product === "officetel" ? "오피스텔" : "아파트"}</p>
        {duplicate ? <p role="status">이미 사전등록된 번호입니다. 최초 접수번호 <b>{receipt}</b></p> : <p>접수번호 <b>{receipt}</b></p>}
        <p>접수시각 {formatKst(createdAt)}</p>
        <PreregShare receipt={receipt} at={formatKst(createdAt)} />
        <p>이 화면을 캡처해 두시면 등록 확인이 빠릅니다.</p>
        <p className="prereg-confirm">{PHRASE.slice(0, 16)}<a href={SITE_TEL_HREF}>1833-3872</a>{PHRASE.slice(25)}</p>
        <p>STEP 1 홈페이지 사전고객등록 완료</p>
        {product === "apt" ? <>
          <p>STEP 2 MGM 등록 확인 (담당자 안내)</p>
          <p>STEP 3 공식 청약 진행 (입주자모집공고 기준)</p>
          <p>STEP 4 청약 당첨 및 MGM 인정조건 확인</p>
          <p>STEP 5 백화점 상품권 선택 및 지급 (대상 조건 충족 시)</p>
        </> : <p>선택하신 오피스텔 상품으로 담당자가 안내드립니다.</p>}
        <p><a className="reg__submit" href={SITE_TEL_HREF}>등록 확인 전화하기 1833-3872</a></p>
        <p>일정이 변경되면 담당자가 등록하신 휴대전화로 연락드립니다.</p>
        <p>※ 사전고객등록은 공식 청약 신청이 아닙니다.</p>
      </div>
    );
  }

  return (
    <div className="reg">
      <p className="reg__lead"><b>청라 아크원 푸르지오</b> 아파트·오피스텔 사전등록</p>
      <form onSubmit={step === 1 ? onStep1 : onStep2} noValidate>
        <p className="prereg-step">[1/2] 기본 정보 · 필수</p>
        {step === 2 ? <div className="reg__receipt reg__receipt--done" role="status">
          <strong className="reg__done-title">사전등록 완료되었습니다.</strong>
          <span>{duplicate ? "이미 사전등록된 번호입니다. 최초 접수번호" : "접수번호"} {receipt} · 접수시각 {formatKst(createdAt)}</span>
          <span>등록 상품 {product === "officetel" ? "오피스텔" : "아파트"} · 성명 {name} · 휴대전화 {phone} · 생년월일 {birth}</span>
          <PreregShare receipt={receipt} at={formatKst(createdAt)} />
        </div> : null}
        {alert ? <p className="reg__error" role="alert">{alert}</p> : null}
        <div hidden={step === 2}>
        <fieldset className={`reg__product${errors.product ? " is-err" : ""}`} disabled={step === 2}>
          <legend>등록하실 상품을 선택해 주세요 *</legend>
          <div className="reg__product-options">
            <label><input type="radio" name="product" value="apt" checked={product === "apt"} onChange={() => { setProduct("apt"); setInterest(""); setSpecial(""); }} /><span>아파트 사전고객등록</span></label>
            <label><input type="radio" name="product" value="officetel" checked={product === "officetel"} onChange={() => { setProduct("officetel"); setInterest("오피스텔"); setSpecial(""); }} /><span>오피스텔 사전등록</span></label>
          </div>
          {errors.product ? <p className="reg__msg">{errors.product}</p> : null}
        </fieldset>
        <div className={`reg__field${errors.name ? " is-err" : ""}`}>
          <label htmlFor="f-name">성명 *</label>
          <input id="f-name" name="name" type="text" placeholder="이름을 입력해 주세요" value={name} maxLength={20} autoComplete="name" disabled={step === 2} onChange={(e) => setName(e.target.value)} />
          <p className="reg__msg">{errors.name}</p>
        </div>
        <div className={`reg__field${errors.phone ? " is-err" : ""}`}>
          <label htmlFor="f-phone">휴대전화 *</label>
          <input id="f-phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel" placeholder="010-0000-0000" value={phone} disabled={step === 2} onChange={(e) => setPhone(hyphen(e.target.value))} />
          <p className="reg__msg">{errors.phone}</p>
        </div>
        <div className={`reg__field${errors.birth ? " is-err" : ""}`}>
          <label htmlFor="f-birth">생년월일 6자리 *</label>
          <input id="f-birth" name="birth6" inputMode="numeric" placeholder="예: 780315" autoComplete="off" value={birth} disabled={step === 2} onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, "");
            if (digits.length >= 13) { setBirth(""); setBirthWarn(true); return; }
            setBirthWarn(false);
            setBirth(digits.slice(0, 6));
          }} />
          <p className="reg__msg">{errors.birth}</p>
          {birthWarn ? <p>생년월일 6자리만 입력해 주세요. 주민등록번호는 받지 않습니다.</p> : null}
          <p>주민등록번호는 받지 않습니다.</p>
        </div>
        <div className="prereg-hidden-hp" aria-hidden="true"><label>회사<input name="hp" tabIndex={-1} autoComplete="off" /></label></div>
        <div className={`reg__agree${errors.collect ? " is-err" : ""}`}>
          <input id="consent-collect" type="checkbox" checked={collect} disabled={step === 2} onChange={(e) => setCollect(e.target.checked)} />
          <label htmlFor="consent-collect">[필수] 개인정보 수집·이용 동의</label>
          <button type="button" onClick={() => setOpen(open === "collect" ? "" : "collect")}>보기</button>
        </div>
        {open === "collect" ? <div className="reg__consent"><p>수집 항목 : [필수] 성명, 휴대전화번호, 생년월일(앞 6자리)<br />[선택] 주민등록상 주소(시·도, 시·군·구, 읍·면·동), 관심타입, 특별공급 관심 여부<br />(자동 수집) 접속 사이트, 유입 경로, 접수 일시</p><p>이용 목적 : 청라 아크원 푸르지오 청약 일정·모집공고 안내, 청약 해당지역 안내, 사전고객 관리, 이벤트 시행 시 대상 확인</p><p>보유 기간 : 이벤트 종료 시 지체 없이 파기. 최장 수집일로부터 1년</p><p>보관 위치 : Supabase, Inc. 클라우드 데이터베이스 — 일본(도쿄 리전)</p><p>※ 주민등록번호는 수집하지 않습니다.</p><p>동의를 거부할 수 있으며, 거부 시 사전고객등록이 제한됩니다. 전화 문의(1833-3872)는 동의 없이 이용하실 수 있습니다.</p></div> : null}
        <div className="reg__agree">
          <input id="consent-mkt" type="checkbox" checked={marketing} disabled={step === 2} onChange={(e) => setMarketing(e.target.checked)} />
          <label htmlFor="consent-mkt">[선택] 광고성 정보 수신 동의</label>
          <button type="button" onClick={() => setOpen(open === "marketing" ? "" : "marketing")}>보기</button>
        </div>
        {open === "marketing" ? <div className="reg__consent"><p>선택 동의이며, 동의를 거부하셔도 사전고객등록을 진행하실 수 있습니다.</p></div> : null}
        {step === 1 ? <button className="reg__submit" type="submit" disabled={busy}>{busy ? "접수 중…" : "사전고객등록하기"}</button> : null}
        </div>
        <p className="prereg-confirm">사전고객등록 확인은 대표번호 <a href={SITE_TEL_HREF}>1833-3872</a>로 문의해 주세요.</p>
        {step === 2 ? (
          <div>
            <div id="additional-information" className="prereg-additional">
            <p className="prereg-step">[2/2] 추가 정보 · 선택 (접수번호 {receipt})</p>
            <p>입력하지 않으셔도 사전등록은 완료되었습니다.</p>
            <p>접수번호 {receipt} · 접수시각 {formatKst(createdAt)}</p>
            <p>주민등록상 주소 (선택)</p>
            <div className="reg__field"><label htmlFor="f-sido">시·도</label><select id="f-sido" value={sido} onChange={(e) => setSido(e.target.value)}><option value="">선택</option>{SIDO.map((item) => <option key={item}>{item}</option>)}</select></div>
            <div className="reg__field"><label htmlFor="f-sigungu">시·군·구</label><input id="f-sigungu" value={sigungu} maxLength={20} onChange={(e) => setSigungu(e.target.value)} /></div>
            <div className="reg__field"><label htmlFor="f-dong">읍·면·동</label><input id="f-dong" value={dong} maxLength={20} onChange={(e) => setDong(e.target.value)} /></div>
            <p>관심타입</p>
            <div className="prereg-chips">{(product === "apt" ? ["APT 84㎡","APT 103㎡","미정"] : ["오피스텔"]).map((item) => <label key={item}><input type="radio" name="interest_type" checked={interest === item} onChange={() => setInterest(item)} /><span>{item}</span></label>)}</div>
            {product === "apt" ? <><p>특별공급 관심</p>
            <div className="prereg-chips">{["신혼부부","생애최초","신생아","다자녀","노부모","기관추천","해당없음","모름"].map((item) => <label key={item}><input type="radio" name="special_supply" checked={special === item} onChange={() => setSpecial(item)} /><span>{item}</span></label>)}</div></> : null}
            <button className="reg__submit" type="submit" disabled={busy}>{busy ? "접수 중…" : "추가 정보 저장"}</button>
            <button className="reg__skip" type="button" onClick={() => setStep("done")}>건너뛰고 완료</button>
            </div>
          </div>
        ) : null}
      </form>
    </div>
  );
}
