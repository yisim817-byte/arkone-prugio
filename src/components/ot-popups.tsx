import { useEffect, useState } from "react";

// 작업지시서 16: 첫 화면 팝업은 오피스텔·상가 사전고객등록 2개만 띄운다.
// 기존 팝업(상품권·코스트코·오픈 이벤트·방문예약·COMING SOON)은 파일을 두고 렌더만 끈다.

const KEYS = { officetel: "ot_pop_hide_until", commercial: "cm_pop_hide_until" } as const;
type Kind = keyof typeof KEYS;

function hidden(kind: Kind) {
  try {
    return Number(localStorage.getItem(KEYS[kind]) || 0) > Date.now();
  } catch {
    return false;
  }
}

export function OtPopups() {
  const [open, setOpen] = useState<Record<Kind, boolean>>({ officetel: false, commercial: false });
  const [today, setToday] = useState(false);

  useEffect(() => {
    setOpen({ officetel: !hidden("officetel"), commercial: !hidden("commercial") });
  }, []);

  const any = open.officetel || open.commercial;

  useEffect(() => {
    if (!any) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [any, today]);

  function closeAll() {
    if (today) {
      const until = String(Date.now() + 24 * 60 * 60 * 1000);
      try {
        localStorage.setItem(KEYS.officetel, until);
        localStorage.setItem(KEYS.commercial, until);
      } catch {
        /* ignore */
      }
    }
    setOpen({ officetel: false, commercial: false });
  }

  if (!any) return null;

  return (
    <div className="otp" role="dialog" aria-modal="true" aria-label="사전고객등록 안내" onClick={(e) => { if (e.target === e.currentTarget) closeAll(); }}>
      <div className="otp__wrap">
        <button type="button" className="otp__close" onClick={closeAll}>팝업닫기 ✕</button>
        <div className="otp__list">
          {open.officetel ? (
            <article className="otp__card otp__card--ot">
              <header><span>OFFICETEL</span><span>PRUGIO</span></header>
              <div className="otp__body">
                <h2>오피스텔<br />사전고객등록</h2>
                <i aria-hidden="true" />
                <p className="otp__spec">987실 · 전용 105 · 121 · 136㎡<br />최고 49층</p>
                <p className="otp__benefit">사전고객등록 후 오피스텔 계약 시<br /><b>백화점 상품권 50만원</b></p>
                <small>등록만으로는 지급되지 않습니다. 이 사이트 등록분만 인정됩니다.</small>
              </div>
              <p className="otp__when">11월말 분양예정</p>
              <a className="otp__cta" href="/register?product=officetel">오피스텔 사전고객등록<span aria-hidden="true">→</span></a>
            </article>
          ) : null}
          {open.commercial ? (
            <article className="otp__card otp__card--cm">
              <header><span>COMMERCIAL</span><span>PRUGIO</span></header>
              <div className="otp__body">
                <h2>근린생활시설<br />사전고객등록</h2>
                <i aria-hidden="true" />
                <p className="otp__spec">피크원 · 아크원 96개 점포<br />피크원 53 · 아크원 43</p>
                <p className="otp__benefit">사전고객등록 후 상가 계약 시<br /><b>백화점 상품권 50만원</b></p>
                <small>사전고객등록은 분양 신청·계약이 아닙니다. 이 사이트 등록분만 인정됩니다.</small>
              </div>
              <p className="otp__when">11월말 분양예정</p>
              <a className="otp__cta" href="/register?product=commercial">상가 사전고객등록<span aria-hidden="true">→</span></a>
            </article>
          ) : null}
        </div>
        <label className="otp__today">
          <input type="checkbox" checked={today} onChange={(e) => setToday(e.target.checked)} />
          오늘 하루동안 보지 않기
        </label>
      </div>
    </div>
  );
}
