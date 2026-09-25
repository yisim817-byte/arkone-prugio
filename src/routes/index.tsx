import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useId, useState } from "react";
import { HomePopups } from "@/components/home-popups";
import { SiteShell } from "@/components/site-shell";
import { YoutubeModal } from "@/components/youtube-modal";
import { SITE_NAME, SITE_PHONE, SITE_TEL_HREF, YOUTUBE_ID } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: SITE_NAME },
      { name: "description", content: "공식 홈페이지ㅣ청라의 정점을 빛내는 푸르지오의 완성" },
    ],
  }),
});

const SECTIONS = ["hero", "overview", "location", "history", "premium", "brand", "contact"] as const;

function HeroOrbit() {
  const id = `orbit-${useId().replace(/:/g, "")}`;
  return (
    <svg className="hero__quick_orbit" viewBox="0 0 132 132" aria-hidden="true">
      <defs>
        <path id={id} d="M66 66 m-52 0 a52 52 0 1 1 104 0 a52 52 0 1 1 -104 0" fill="none" />
      </defs>
      <text fill="#fff" fontSize="9.5" fontFamily="SUIT, Pretendard, sans-serif" letterSpacing="0.12em">
        <textPath href={`#${id}`}>{`${SITE_PHONE}   ·   ${SITE_PHONE}   ·  `}</textPath>
      </text>
    </svg>
  );
}

function Home() {
  const [intro, setIntro] = useState(true);
  const [video, setVideo] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const t = window.setTimeout(() => setIntro(false), 3800);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis?.target.id) setActive(vis.target.id);
      },
      { threshold: 0.35 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [intro]);

  return (
    <SiteShell home>
      {intro ? (
        <section className="intro" aria-label="청라 아크원 푸르지오 인트로">
          <video autoPlay muted loop playsInline>
            <source src="/resources/img/pages/main/intro_video.mp4" type="video/mp4" />
          </video>
          <div className="intro__copy">
            <p className="intro__phrase">청라의 정점을 빛내는</p>
            <p className="intro__title">푸르지오의 완성</p>
            <p className="intro__kicker">청라 아크원 푸르지오</p>
            <p className="intro__brand">CHEONG NA ARK-ONE PRUGIO</p>
          </div>
          <button type="button" className="intro__skip" onClick={() => setIntro(false)}>
            SKIP
          </button>
        </section>
      ) : null}

      <nav className="indicator" aria-label="메인 섹션 바로가기">
        {SECTIONS.map((id) => (
          <button
            key={id}
            type="button"
            className={active === id ? "is-on" : ""}
            aria-label={id.toUpperCase()}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
          />
        ))}
      </nav>

      <main>
        <section id="hero" className="hero">
          <div className="hero__media">
            <picture>
              <source media="(max-width: 1024px)" srcSet="/resources/img/pages/main/hero_bg_m.v4.jpg" />
              <img src="/resources/img/pages/main/hero_bg.v4.jpg" alt="" />
            </picture>
            <video className="pc-only" autoPlay muted loop playsInline>
              <source src="/resources/img/pages/main/hero_video.mp4" type="video/mp4" />
            </video>
            <video className="m-only" autoPlay muted loop playsInline>
              <source src="/resources/img/pages/main/hero_video_m.mp4" type="video/mp4" />
            </video>
          </div>
          <span className="hero__dim" />
          <div className="hero__copy">
            <p className="hero__eyebrow">
              <span>THE PRESENT</span>
              <span>OF</span>
            </p>
            <h1 className="hero__title">
              <span className="hero__title_line">CHEONG NA</span>
              <br />
              <span className="hero__title_line">ARK-ONE</span>
              <br />
              <span className="hero__title_line">PRUGIO</span>
              <span className="hero__title_ko">청라 아크원 푸르지오</span>
            </h1>
            <span className="hero__open">
              <strong>10월 OPEN</strong>예정
            </span>
          </div>
          <div className="hero__ui">
            <a className="hero__scroll" href="#overview">
              <span className="hero__scroll_line" />
              <span>SCROLL</span>
            </a>
            <button type="button" className="hero__video_trigger" onClick={() => setVideo(true)}>
              <span>
                <b>청라 아크원</b> <br className="m-only" /> 홍보영상
              </span>
              <span className="hero__video_play">
                <img src="/resources/img/pages/main/ico_yt.svg" alt="" />
              </span>
            </button>
            <div className="hero__quick">
              <a className="hero__quick_item" href={SITE_TEL_HREF} aria-label={`${SITE_PHONE} 전화 연결`}>
                <HeroOrbit />
                <img
                  className="hero__quick_content"
                  src="/resources/img/pages/main/hero_circle_01.svg"
                  alt="분양가 상한제 적용단지"
                />
              </a>
              <Link to="/register" className="hero__quick_item" aria-label="관심고객등록">
                <HeroOrbit />
                <img className="hero__quick_content" src="/resources/img/pages/main/hero_circle_register.svg" alt="" />
              </Link>
            </div>
          </div>
        </section>

        <section className="hero-define">
          <img className="hero-define__visual" src="/resources/img/pages/main/hero_brand_img.v4.png" alt="" />
          <div className="hero-define__copy">
            <img src="/resources/img/pages/main/ico_star.svg" alt="" width={28} height={28} />
            <p className="hero-define__title">아크원(ARK-ONE)이란?</p>
            <strong className="hero-define__keyword">
              <b>A</b>BSOLUTE
              <br />
              <b>R</b>EMAR
              <br />
              <b>K</b>ABLE
              <br />
              <b>ONE</b>
            </strong>
            <p className="hero-define__text">
              청라의 절대적 기준이 될
              <br />
              단 하나의 주거명작을 상징
            </p>
          </div>
        </section>

        <section id="overview" className="section-overview">
          <img className="bg" src="/resources/img/pages/main/overview_bg.v4.jpg" alt="" />
          <span className="dim" />
          <div className="section-overview__inner">
            <header>
              <p className="section-overview__copy_text">
                청라 10년의 기다림,
                <br />그 모든 프리미엄을 담은
              </p>
              <h2 className="section-overview__copy_title">단 하나의 절대적 명작</h2>
              <p className="section-overview__copy_brand">ARK-ONE</p>
            </header>
            <article className="overview-panel">
              <h3>
                총 2,911가구<small>(B1 & M5 블록)</small>
                <br />
                청라를 대표하는
                <br />
                푸르지오 대규모 브랜드타운
              </h3>
              <p>
                국제업무단지 B1 블록의 눈부신 성공에 이어
                <br />
                M5 블록으로 더 커지는 푸르지오 브랜드타운!
                <br />
                청라를 드높일 위대한 가치를 세웁니다
              </p>
              <dl className="overview-metrics">
                <div>
                  <dt>건축면적</dt>
                  <dd>
                    <span className="overview-metrics__prefix">약</span>
                    12,278<span>㎡</span>
                  </dd>
                </div>
                <div>
                  <dt>연면적</dt>
                  <dd>
                    <span className="overview-metrics__prefix">약</span>
                    424,558<span>㎡</span>
                  </dd>
                </div>
                <div>
                  <dt>주차대수</dt>
                  <dd>
                    3,124<span>대</span>
                  </dd>
                </div>
                <div>
                  <dt>세대수</dt>
                  <dd>
                    1,855<span>세대</span>
                  </dd>
                </div>
              </dl>
            </article>
          </div>
        </section>

        <section id="location" className="section-location">
          <div className="section-location__visual">
            <p className="section-location__tag">ABSOLUTE REMARKABLE</p>
            <img src="/resources/img/pages/main/location_img.v4.png" alt="" />
            <h2 className="section-location__title">ARK-ONE</h2>
          </div>
          <div className="section-location__info">
            <p className="section-location__eyebrow">CENTRAL LOCATION</p>
            <p className="section-location__desc">
              모두가 기다려온 프리미엄의 완성,
              <br />
              청라의 중심은 푸르지오.
            </p>
            <Link to="/pages/location" className="section-location__link">
              <span>view more</span>
              <span>›</span>
            </Link>
            <figure className="section-location__map">
              <img
                src="/resources/img/pages/main/location_map.v4.png"
                alt="청라 국제도시 내 청라 아크원 푸르지오 위치"
              />
              <img className="section-location__bubble" src="/resources/img/pages/main/location_bubble.v4.png" alt="" />
            </figure>
          </div>
        </section>

        <section id="history" className="section-history">
          <div className="section-history__head">
            <p>MASTERPLAN PROGRESS — ARKONE</p>
            <h2>
              푸르지오가 완성하는
              <br />
              청라의 클라이맥스
            </h2>
          </div>
          <div className="history-track">
            {[
              { y: "2026", img: "history_img_2026.v4.jpg", cap: ["청라하늘대교 (개통)", "하나드림타운 (예정)"] },
              { y: "2028", img: "history_img_2028.v4.jpg", cap: ["돔구장&스타필드 청라 (개장 예정)"] },
              { y: "2029", img: "history_img_2029.v4.jpg", cap: ["서울아산청라병원 (예정)"] },
              { y: "2030", img: "history_img_2030.v4.jpg", cap: ["7호선 국제업무단지역 (예정)"] },
              { y: "2031", img: "history_img_2031.v4.jpg", cap: ["영상문화복합단지 (계획)"] },
              { y: "2031", img: "history_img_ark_one.v4.jpg", cap: ["청라 아크원 푸르지오 (예정)"] },
            ].map((ev) => (
              <article className="history-card" key={ev.img}>
                <time>
                  <span>20</span>
                  {ev.y.slice(2)}
                </time>
                <figure>
                  <img src={`/resources/img/pages/main/${ev.img}`} alt="" />
                  <figcaption>
                    {ev.cap.map((c) => (
                      <span key={c}>
                        {c}
                        <br />
                      </span>
                    ))}
                  </figcaption>
                </figure>
              </article>
            ))}
          </div>
        </section>

        <section id="premium" className="section-premium">
          <div className="section-premium__intro">
            <div className="premium-mosaic">
              <img src="/resources/img/pages/main/premium_visual_img_01.v4.jpg" alt="" />
              <img src="/resources/img/pages/main/premium_visual_img_02.v4.jpg" alt="" />
              <img src="/resources/img/pages/main/premium_visual_img_03.v4.jpg" alt="" />
              <img src="/resources/img/pages/main/premium_visual_img_04.v4.jpg" alt="" />
            </div>
            <div className="section-premium__copy">
              <h3>
                완벽한
                <br />
                라이프스타일
              </h3>
              <p>
                공간의 특별함
                <br />
                자부심의 가치
                <br />
                정상을 넘어,
                <br />
                새로운 라이프스타일의 기준
              </p>
              <Link to="/pages/premium" className="section-location__link">
                view more ›
              </Link>
            </div>
          </div>
          <div className="section-premium__videos">
            <video poster="/resources/img/pages/main/premium_poster.v4.jpg" muted loop playsInline autoPlay>
              <source src="/resources/img/pages/main/premium_video_01.mp4" type="video/mp4" />
            </video>
            <video poster="/resources/img/pages/main/premium_poster_02.v4.jpg" muted loop playsInline autoPlay>
              <source src="/resources/img/pages/main/premium_video_02.mp4" type="video/mp4" />
            </video>
            <video poster="/resources/img/pages/main/premium_poster_03.v4.jpg" muted loop playsInline autoPlay>
              <source src="/resources/img/pages/main/premium_video_03.mp4" type="video/mp4" />
            </video>
          </div>
        </section>

        <section id="brand" className="section-brand">
          <picture>
            <source media="(max-width: 1024px)" srcSet="/resources/img/pages/main/brand_bg_m.v4.jpg" />
            <img className="bg" src="/resources/img/pages/main/brand_bg.v4.jpg" alt="" />
          </picture>
          <div className="frame">
            <p className="section-brand__eyebrow">THE NATURAL NOBILITY</p>
            <h2>본연이 지니는 고귀함</h2>
            <p>
              견고한 기본에 더해진 세련된 편안함,
              <br />내 삶의 본연을 집에서 찾다
            </p>
            <img className="section-brand__logo" src="/resources/img/pages/main/brand_logo.svg" alt="PRUGIO" />
          </div>
        </section>

        <section id="contact" className="section-contact">
          <img className="bg" src="/resources/img/pages/main/contact_bg.v4.jpg" alt="" />
          <h2>CONTACT US</h2>
          <div className="contact-home-grid">
            <article className="contact-home-card">
              <img src="/resources/img/pages/main/contact_map_01.v4.png" alt="청라 아크원 푸르지오 현장과 견본주택 약도" />
              <div className="contact-row">
                <div>
                  <h3>견본주택</h3>
                  <address>인천광역시 서해구 청라동 87-1번지</address>
                </div>
                <div className="map-btns">
                  <a href="https://naver.me/xNpQLQ3L" target="_blank" rel="noreferrer">
                    <img src="/resources/img/common/ico_naver.svg" alt="네이버 지도" />
                  </a>
                  <a href="https://kko.to/06V9ttVXOK" target="_blank" rel="noreferrer">
                    <img src="/resources/img/common/ico_kko_map.svg" alt="카카오 지도" />
                  </a>
                </div>
              </div>
              <div className="contact-row">
                <div>
                  <h3>현장</h3>
                  <address>인천광역시 서해구 청라동 86-1번지</address>
                </div>
                <div className="map-btns">
                  <a href="https://naver.me/xSBYFSR0" target="_blank" rel="noreferrer">
                    <img src="/resources/img/common/ico_naver.svg" alt="네이버 지도" />
                  </a>
                  <a href="https://kko.to/27AvJsaNys" target="_blank" rel="noreferrer">
                    <img src="/resources/img/common/ico_kko_map.svg" alt="카카오 지도" />
                  </a>
                </div>
              </div>
            </article>
            <article className="contact-home-card">
              <img src="/resources/img/pages/main/contact_map_02.v4.png" alt="청라 아크원 푸르지오 홍보관 약도" />
              <div className="contact-row">
                <div>
                  <h3>홍보관</h3>
                  <address>
                    인천광역시 서해구 중봉대로 586번길 19
                    <br />
                    홍익파크 1층 108, 109호(스타벅스 옆)
                  </address>
                </div>
                <div className="map-btns">
                  <a href="https://naver.me/xwmqyGWk" target="_blank" rel="noreferrer">
                    <img src="/resources/img/common/ico_naver.svg" alt="네이버 지도" />
                  </a>
                  <a href="https://kko.to/hM9WpE-0fz" target="_blank" rel="noreferrer">
                    <img src="/resources/img/common/ico_kko_map.svg" alt="카카오 지도" />
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
      {video ? <YoutubeModal id={YOUTUBE_ID} onClose={() => setVideo(false)} /> : null}
      {!intro ? <HomePopups /> : null}
    </SiteShell>
  );
}
