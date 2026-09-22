import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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

function todayStamp() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export function HomePopups() {
  const [open, setOpen] = useState(false);
  const [hideToday, setHideToday] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(HIDE_KEY) === todayStamp()) return;
    } catch {
      /* ignore */
    }
    setOpen(true);
  }, []);

  if (!open) return null;

  const close = () => {
    if (hideToday) {
      try {
        window.localStorage.setItem(HIDE_KEY, todayStamp());
      } catch {
        /* ignore */
      }
    }
    setOpen(false);
  };

  return (
    <div className="home-popup" role="dialog" aria-label="공지 팝업">
      <div className="home-popup__bg" onClick={close} />
      <div className="home-popup__wrap">
        <button type="button" className="home-popup__close" onClick={close}>
          팝업닫기
          <img src="/resources/img/common/popup_closeBtn.v4.png" alt="" />
        </button>
        <ul className="home-popup__list">
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
                    onClick={close}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
        <label className="home-popup__today">
          <input type="checkbox" checked={hideToday} onChange={(e) => setHideToday(e.target.checked)} />
          <strong>오늘 하루동안 보지 않기</strong>
        </label>
      </div>
    </div>
  );
}
