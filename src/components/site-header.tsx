import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { NAV, type NavChild, SITE_NAME, SITE_PHONE, SITE_TEL_HREF, navForPath } from "@/lib/site-data";
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
  const inverted = home && atTop && !menuOpen;
  const LogoTag = pathname === "/" || GUIDE_H1_PATHS.has(pathname) ? "h2" : "h1";
  const close = () => setMenuOpen(false);

  return (
    <>
      <header className={`header${inverted ? " is-inverted" : ""}${menuOpen ? " is-menu-open" : ""}`}>
        <div className="header__container">
          <LogoTag className="header__logo_wrap">
            <Link to="/" className="header__btn_home" aria-label="청라 아크원 푸르지오 홈으로 이동">
              {inverted ? <img className="header__btn_mark" src="/official/header/header_logo.v1.svg" alt="" /> : null}
              <span className={`header__btn_logo${inverted ? " is-home-top" : ""}`}>{en ? "Cheongna Ark-One Prugio" : SITE_NAME}</span>
            </Link>
          </LogoTag>
          <nav className="gnb" aria-label="주요 메뉴">
            <ul className="gnb__depth1">
              {NAV.map((item) => (
                <li key={item.krName} className="gnb__depth1_item">
                  <MenuAnchor to={item.to} className={`gnb__depth1_link${current?.krName === item.krName ? " is-current" : ""}`}>
                    {item.krName}
                  </MenuAnchor>
                  {item.children.length > 0 ? (
                    <ul className="gnb__depth2">
                      {item.children.map((child) => (
                        <li key={child.krName}>
                          {child.children && child.children.length > 0 ? (
                            <>
                              <span className="gnb__depth2_label">{child.krName}</span>
                              <ul className="gnb__depth3">
                                {child.children.map((leaf) => (
                                  <li key={leaf.krName}>
                                    <MenuAnchor to={leaf.to} className="gnb__depth2_link" external={leaf.external}>{leaf.krName}</MenuAnchor>
                                  </li>
                                ))}
                              </ul>
                            </>
                          ) : (
                            <MenuAnchor to={child.to} className="gnb__depth2_link" external={child.external}>{child.krName}</MenuAnchor>
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
            <a href="/commercial" className="header__btn_commercial">
              <span>근린생활시설</span>
            </a>
            <a href={SITE_TEL_HREF} className="header__tel">
              {SITE_PHONE}
            </a>
            <a href={SITE_TEL_HREF} className="header__mob_tel" aria-label={en ? "Call" : "전화 연결"}>
              {SITE_PHONE}
            </a>
            <button
              type="button"
              className={`header__btn_menu${menuOpen ? " is-open" : ""}`}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? (en ? "Close menu" : "전체 메뉴 닫기") : (en ? "Open menu" : "전체 메뉴 열기")}
              onClick={() => setMenuOpen((v) => !v)}
            />
          </div>
        </div>
      </header>

      <div className={`allmenu${menuOpen ? " is-open" : ""}`} hidden={!menuOpen} aria-label="전체 메뉴">
        <div className="allmenu__top_wrap">
          <Link to="/" className="allmenu__btn_logo" onClick={close}>
            {en ? "Cheongna Ark-One Prugio" : SITE_NAME}
          </Link>
        </div>
        <nav className="allmenu__menu">
          <ul className="allmenu__depth1_container">
            {NAV.map((item) => (
              <li key={item.enName}>
                <MenuAnchor to={item.to} className="allmenu__depth1_item" onClick={close}>
                  <span className="allmenu__en">{item.enName}</span>
                  <span className="allmenu__kr">{item.krName}</span>
                </MenuAnchor>
                <MenuGroup items={item.children} onNavigate={close} />
              </li>
            ))}
          </ul>
          <a href="/commercial" className="allmenu__btn_commercial header__btn_commercial" onClick={close}>
            <span>근린생활시설</span>
          </a>
        </nav>
      </div>
    </>
  );
}

function MenuGroup({ items, onNavigate }: { items: NavChild[]; onNavigate: () => void }) {
  if (!items.length) return null;
  return (
    <ul className="allmenu__depth2_container">
      {items.map((child) => (
        <li key={child.krName}>
          {child.children && child.children.length > 0 ? (
            <>
              <span className="allmenu__group">{child.krName}</span>
              <ul>
                {child.children.map((leaf) => (
                  <li key={leaf.krName}>
                    <MenuAnchor to={leaf.to} external={leaf.external} onClick={onNavigate}>{leaf.krName}</MenuAnchor>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <MenuAnchor to={child.to} external={child.external} onClick={onNavigate}>{child.krName}</MenuAnchor>
          )}
        </li>
      ))}
    </ul>
  );
}

function MenuAnchor({
  to,
  className,
  children,
  external,
  popup,
  onClick,
}: {
  to: string;
  className?: string;
  children: ReactNode;
  external?: boolean;
  popup?: "officetel";
  onClick?: () => void;
}) {
  if (to.startsWith("#") || to.includes("#") || external || to.startsWith("http")) {
    return (
      <a
        href={to}
        className={className}
        data-popup-soon={popup}
        aria-haspopup={popup ? "dialog" : undefined}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
