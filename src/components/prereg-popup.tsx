import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { SITE_PHONE, SITE_TEL_HREF } from "@/lib/site-data";

export function PreregPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === "/register") return;
    try {
      if (sessionStorage.getItem("prereg_popup_seen") === "1") return;
      const until = localStorage.getItem("prereg_hide_until");
      if (until && Date.now() < Number(until)) return;
    } catch { /* ignore */ }
    const timer = window.setTimeout(() => {
      setOpen(true);
      document.body.classList.add("prereg-lock");
      try { sessionStorage.setItem("prereg_popup_seen", "1"); } catch { /* ignore */ }
    }, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  function close(today = false) {
    if (today) {
      try {
        const end = new Date();
        localStorage.setItem("prereg_hide_until", String(Date.now() + 24 * 60 * 60 * 1000));
      } catch { /* ignore */ }
    }
    document.body.classList.remove("prereg-lock");
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const panel = document.querySelector<HTMLElement>(".prereg-pop__panel");
    const first = panel?.querySelector<HTMLElement>("button, a[href]");
    first?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "Tab") {
        const items = panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])');
        if (!items?.length) return;
        const firstItem = items[0];
        const lastItem = items[items.length - 1];
        if (event.shiftKey && document.activeElement === firstItem) {
          event.preventDefault();
          lastItem.focus();
        } else if (!event.shiftKey && document.activeElement === lastItem) {
          event.preventDefault();
          firstItem.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("prereg-lock");
    };
  }, [open]);

  if (!open) return null;
  return (
    <div className="prereg-pop is-in" role="dialog" aria-modal="true" aria-labelledby="prereg-pop-title">
      <button type="button" className="prereg-pop__bg" aria-label="닫기" onClick={() => close()} />
      <div className="prereg-pop__panel">
        <button type="button" className="prereg-pop__x" aria-label="닫기" onClick={() => close()}>✕</button>
        <p>모집공고 10.15(목) 예정 · GRAND OPEN 10.23(금) 예정</p>
        <p>청라 아크원 푸르지오 APT 사전고객등록 이벤트</p>
        <h2 id="prereg-pop-title">백화점 상품권 30만원</h2>
        <p>롯데 · 현대 · 신세계 중 선택</p>
        <p>청약 당첨 및 MGM 인정조건 충족 고객 대상</p>
        <Link className="reg__submit" to="/register">사전고객등록하기</Link>
        <p className="prereg-confirm">사전고객등록 확인은 대표번호 <a href={SITE_TEL_HREF}>{SITE_PHONE}</a>로 문의해 주세요.</p>
        <p className="prereg-fine">※ 사전고객등록은 공식 청약 신청이 아닙니다. 상품권은 지급조건을 모두 충족한 고객에 한해 지급됩니다. <a href="/#event-terms">유의사항 보기</a></p>
        <div className="prereg-pop__actions">
          <button type="button" onClick={() => close(true)}>오늘 하루 보지 않기</button>
          <button type="button" onClick={() => close()}>닫기</button>
        </div>
      </div>
    </div>
  );
}
