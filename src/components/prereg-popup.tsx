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
    }, 1500);
    return () => window.clearTimeout(timer);
  }, []);

  function close(today = false) {
    if (today) {
      try {
        const end = new Date();
        end.setHours(23, 59, 59, 999);
        localStorage.setItem("prereg_hide_until", String(end.getTime()));
      } catch { /* ignore */ }
    }
    document.body.classList.remove("prereg-lock");
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;
  return (
    <div className="prereg-pop is-in" role="dialog" aria-modal="true" aria-labelledby="prereg-pop-title">
      <button type="button" className="prereg-pop__bg" aria-label="닫기" onClick={() => close()} />
      <div className="prereg-pop__panel">
        <button type="button" className="prereg-pop__x" aria-label="닫기" onClick={() => close()}>✕</button>
        <p>10월 OPEN 예정</p>
        <p>청라 아크원 푸르지오 APT</p>
        <h2 id="prereg-pop-title">사전고객등록</h2>
        <p>청약 일정과 모집공고 소식을<br />등록하신 순서대로 안내해 드립니다.</p>
        <Link className="reg__submit" to="/register">사전고객등록하기</Link>
        <p className="prereg-confirm">사전고객등록 확인은 대표번호 <a href={SITE_TEL_HREF}>{SITE_PHONE}</a>로 문의해 주세요.</p>
        <p className="prereg-fine">※ 사전고객등록은 공식 청약 신청이 아닙니다.</p>
        <div className="prereg-pop__actions">
          <button type="button" onClick={() => close(true)}>오늘 하루 보지 않기</button>
          <button type="button" onClick={() => close()}>닫기</button>
        </div>
      </div>
    </div>
  );
}
