import { Link } from "@tanstack/react-router";
import { useEffect, useId, useRef, useState } from "react";
import { SITE_PHONE, SITE_TEL_HREF } from "@/lib/site-data";

const HIDE_KEY = "arkone-popup-hide";

type Hotspot = { to: string; x: number; y: number; w: number; h: number; name: string };

type Popup = {
  src: string;
  title: string;
  links?: Hotspot[];
  phone?: boolean;
};

const POPUPS: Popup[] = [
  { src: "/upload/popup/20260921144145_6968.jpg", title: "사업설명회", phone: true },
  { src: "/upload/popup/20260921144204_6313.jpg", title: "관심고객이벤트" },
  {
    src: "/upload/popup/20260921144226_6715.jpg",
    title: "홍보관 이벤트",
    links: [{ to: "/pages/contact", x: 1, y: 0, w: 100, h: 100, name: "자세히보기" }],
  },
  {
    src: "/upload/popup/20260921144155_9255.jpg",
    title: "청약체크포인트",
    links: [
      { to: "/pages/changeinfo", x: 0, y: 78, w: 100, h: 11, name: "변경" },
      { to: "/pages/docspecial", x: 0, y: 89, w: 50, h: 11, name: "특별" },
      { to: "/pages/docnormal", x: 50, y: 89, w: 50, h: 11, name: "일반" },
    ],
  },
  { src: "/upload/popup/20260921144213_6678.jpg", title: "유사홈페이지" },
];

const ROWS = [
  { label: "네트워크 출근", when: "2026년 10월 12일 (월) 오전 10시" },
  { label: "APT 입주자모집공고", when: "2026년 10월 15일 (목) 예정" },
  { label: "GRAND OPEN", when: "2026년 10월 23일 (금) 예정" },
] as const;

export type ScheduleVariant = "a" | "b" | "c";

export function readScheduleVariant(): ScheduleVariant | null {
  if (typeof window === "undefined") return null;
  const value = new URLSearchParams(window.location.search).get("popup");
  if (value === "a" || value === "b" || value === "c") return value;
  return null;
}

function todayStamp() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function ScheduleCard({ variant }: { variant: ScheduleVariant }) {
  return (
    <article className={`sched sched--${variant}`}>
      {variant === "c" ? <p className="sched__band">일정이 변경되었습니다</p> : <p className="sched__band">일정 안내</p>}
      <h2 className="sched__title" id="sched-title">
        아파트 사업설명회
      </h2>
      {variant === "c" ? (
        <p className="sched__change">
          <s>9.29 (화)</s>
          <span>2026년 10월 7일 (수) 오후 2시</span>
        </p>
      ) : variant === "a" ? (
        <p className="sched__hero">2026년 10월 7일 (수) 오후 2시</p>
      ) : null}
      <p className="sched__place">장소 별도 안내</p>
      {variant === "b" ? (
        <ol className="sched__time">
          <li className="is-main">
            <span>사업설명회</span>
            <strong>2026년 10월 7일 (수) 오후 2시</strong>
          </li>
          {ROWS.map((row) => (
            <li key={row.label}>
              <span>{row.label}</span>
              <strong>{row.when}</strong>
            </li>
          ))}
        </ol>
      ) : (
        <ul className="sched__rows">
          {ROWS.map((row) => (
            <li key={row.label}>
              <span>{row.label}</span>
              <strong>{row.when}</strong>
            </li>
          ))}
        </ul>
      )}
      <p className="sched__later">청약·계약 일정은 재공지 예정</p>
      <p className="sched__who">분양 영업 파트너 대상 · 사전신청 필수 · 명함 지참</p>
      <a className="sched__phone" href={SITE_TEL_HREF}>
        문의 {SITE_PHONE}
      </a>
      <p className="sched__note">일정은 사업주체 사정에 따라 변경될 수 있습니다.</p>
    </article>
  );
}

export function HomePopups() {
  const [open, setOpen] = useState(false);
  const [hideToday, setHideToday] = useState(false);
  const [variant, setVariant] = useState<ScheduleVariant | null>(null);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const preview = readScheduleVariant();
    setVariant(preview);
    if (!preview) {
      try {
        if (window.localStorage.getItem(HIDE_KEY) === todayStamp()) return;
      } catch {
        /* ignore */
      }
    }
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        dismiss();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, hideToday]);

  if (!open) return null;

  const dismiss = () => {
    if (hideToday) {
      try {
        window.localStorage.setItem(HIDE_KEY, todayStamp());
      } catch {
        /* ignore */
      }
    }
    setOpen(false);
    returnFocus.current?.focus();
  };

  return (
    <div
      className="home-popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby={variant ? "sched-title" : titleId}
    >
      <div className="home-popup__bg" onClick={dismiss} />
      <div className={variant ? "home-popup__wrap home-popup__wrap--sched" : "home-popup__wrap"}>
        <button ref={closeRef} type="button" className="home-popup__close" onClick={dismiss}>
          팝업닫기
          <img src="/resources/img/common/popup_closeBtn.v4.png" alt="" />
        </button>
        {variant ? (
          <ScheduleCard variant={variant} />
        ) : (
          <ul className="home-popup__list" id={titleId}>
            {POPUPS.map((item) => (
              <li key={item.src} className="home-popup__item">
                <div className="home-popup__img">
                  <img src={item.src} alt={item.title} />
                  {item.phone ? (
                    <a className="home-popup__phone" href={SITE_TEL_HREF}>
                      {SITE_PHONE}
                    </a>
                  ) : null}
                  {item.links?.map((link) => (
                    <Link
                      key={link.name}
                      to={link.to}
                      className="home-popup__hot"
                      style={{
                        left: `${link.x}%`,
                        top: `${link.y}%`,
                        width: `${link.w}%`,
                        height: `${link.h}%`,
                      }}
                      onClick={dismiss}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
        {variant ? (
          <button type="button" className="sched__close" onClick={dismiss}>
            닫기
          </button>
        ) : null}
        <label className="home-popup__today">
          <input type="checkbox" checked={hideToday} onChange={(e) => setHideToday(e.target.checked)} />
          <strong>{variant ? "오늘 하루 보지 않기" : "오늘 하루동안 보지 않기"}</strong>
        </label>
      </div>
    </div>
  );
}
