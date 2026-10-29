import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NAV, SITE_NAME, SITE_PHONE, SITE_TEL_HREF, navForPath } from "@/lib/site-data";
import { isEnHost } from "@/lib/seo-host";

const GUIDE_H1_PATHS = new Set([
  "/pages/overview",
  "/pages/compare",
  "/pages/schedule",
  "/pages/location",
  "/pages/contact",
  "/pages/changeinfo",
  "/pages/docspecial",
  "/pages/docnormal",
  // SEO_PUSH 2026-10-06 P1-1: 페이지 고유 H1을 둔 하위 페이지 (로고는 H2)
  "/pages/brand",
  "/pages/premium",
  "/pages/video",
  "/board/news_list",
  "/event",
]);

export function SiteHeader({ home = false }: { home?: boolean }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const current = navForPath(pathname);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const en = isEnHost();
  const label = (item: { krName: string; enName: string }) => (en ? item.enName : item.krName);
  const inverted = home && atTop && !menuOpen;
  // 홈은 히어로 제목이 주 H1이므로 로고는 H2로 내린다(H1 중복 방지). 하위 페이지는 기존대로 H1.
  // 요약 답변(GuideAnswer)이 있는 하위 페이지는 그 제목이 H1이므로 로고는 H2.
  const LogoTag = pathname === "/" || GUIDE_H1_PATHS.has(pathname) ? "h2" : "h1";

  return (
    <>
      <header className={`header${inverted ? " is-inverted" : ""}${menuOpen ? " is-menu-open" : ""}`}>
        <div className="header__container">
          <LogoTag className="header__logo_wrap">
            <Link to="/" className="header__btn_home">
              <span className="header__btn_logo">{en ? "Cheongna Ark-One Prugio" : SITE_NAME}</span>
            </Link>
          </LogoTag>
          <nav className="gnb" aria-label={en ? "Main menu" : "주요 메뉴"}>
            <ul className="gnb__depth1">
              {NAV.map((item) => (
                <li key={item.krName} className="gnb__depth1_item">
                  {item.disabled ? (
                    <span className="gnb__depth1_link is-disabled">{label(item)}</span>
                  ) : (
                    <Link
                      to={item.to}
                      className={`gnb__depth1_link${current?.krName === item.krName ? " is-current" : ""}`}
                    >
                      {label(item)}
                    </Link>
                  )}
                  {item.children.length > 0 && !item.disabled ? (
                    <ul className="gnb__depth2">
                      {item.children.map((child) => (
                        <li key={child.krName}>
                          {child.disabled ? (
                            <span className="gnb__depth2_link is-disabled">{label(child)}</span>
                          ) : (
                            <Link to={child.to} className="gnb__depth2_link">
                              {label(child)}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>
          <div className="header__util_wrap">
            <a href={SITE_TEL_HREF} className="header__tel">
              {SITE_PHONE}
            </a>
            <a href={SITE_TEL_HREF} className="header__mob_tel" aria-label={en ? "Call" : "전화 연결"}>
              {SITE_PHONE}
            </a>
            <button
              type="button"
              className={`header__btn_menu${menuOpen ? " is-open" : ""}`}
              aria-label={menuOpen ? (en ? "Close menu" : "메뉴 닫기") : (en ? "Open menu" : "전체 메뉴")}
              onClick={() => setMenuOpen((v) => !v)}
            />
          </div>
        </div>
      </header>

      <div className={`allmenu${menuOpen ? " is-open" : ""}`} hidden={!menuOpen} aria-label={en ? "Full menu" : "전체 메뉴"}>
        <div className="allmenu__top_wrap">
          <Link to="/" className="allmenu__btn_logo" onClick={() => setMenuOpen(false)}>
            {en ? "Cheongna Ark-One Prugio" : SITE_NAME}
          </Link>
        </div>
        <nav className="allmenu__menu">
          <ul className="allmenu__depth1_container">
            {NAV.filter((item) => !item.disabled).map((item) => (
              <li key={item.enName}>
                <Link to={item.to} className="allmenu__depth1_item">
                  {label(item)}
                  <span>{item.enName}</span>
                </Link>
                <ul className="allmenu__depth2_container">
                  {item.children
                    .filter((c) => !c.disabled)
                    .map((child) => (
                      <li key={child.krName}>
                        <Link to={child.to}>{label(child)}</Link>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
