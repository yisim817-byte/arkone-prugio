import { imgDims } from "@/components/img";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Img } from "@/components/img";
import { SiteShell } from "@/components/site-shell";
import { OtFeature } from "@/components/ot-official";
import { NoticeSummary } from "@/components/notice-summary";
import { PlansBanner } from "@/components/plans-banner";
import { YoutubeModal } from "@/components/youtube-modal";
import { SITE_NAME, SITE_TEL_HREF, YOUTUBE_ID } from "@/lib/site-data";
import { EN_ORIGIN, KR_ORIGIN, LEGACY_ORIGIN, canonicalLinks, faqJsonLd, isEnHost, isKrHost, isOtMainHost, tx } from "@/lib/seo-host";
import { META } from "@/lib/i18n/en";

const STAGE_S1 = "청라 아크원 푸르지오 아파트 당첨자 계약(2026년 11월 22일~24일)은 끝났습니다. 103㎡B 선착순 공급은 11월 28일(토) 진행 예정이며 세부 시간은 참여의향서 접수 고객에게 개별 안내합니다. 오피스텔 청약은 12월 7일(월)입니다.";
const HOME_FAQ = [
  { q: "청라 피크원 푸르지오와 같은 단지인가요?", a: "아닙니다. 2,911세대·실은 피크원(B1블록 1,056실)과 아크원을 합산한 브랜드타운이며 단일 단지가 아닙니다. 아크원 단지는 아파트 868세대와 오피스텔 987실입니다." },
  { q: "아파트 당첨자 계약은 끝났나요?", a: "청라 아크원 푸르지오 아파트 당첨자 계약(2026년 11월 22일~24일)은 끝났습니다." },
  { q: "103㎡B 선착순 공급은 언제인가요?", a: "103㎡B 선착순 공급은 11월 28일(토) 진행 예정이며 세부 시간은 참여의향서 접수 고객에게 개별 안내합니다." },
  { q: "오피스텔 청약은 언제인가요?", a: "오피스텔 청약은 12월 7일(월)입니다. 세부 조건은 오피스텔 입주자모집공고 기준입니다." },
  { q: "상담 전화는 무엇인가요?", a: "상담 전화는 1833-3872 하나입니다." },
];

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: tx("청라 아크원 푸르지오 | 분양 일정·비교·청약 안내", META.home.title) },
      {
        name: "description",
        content: tx(
          "청라 아크원 푸르지오 아파트 계약은 11.24에 끝났습니다. 103㎡B 선착순은 11.28 예정, 오피스텔 청약은 12.7입니다.",
          META.home.desc,
        ),
      },
    ],
    links: canonicalLinks("/"),
    scripts: [
      {
        type: "application/ld+json",
        children: homeJsonLd(isEnHost() ? EN_ORIGIN : isKrHost() ? KR_ORIGIN : LEGACY_ORIGIN, isEnHost()),
      },
      ...faqJsonLd(HOME_FAQ, "/"),
    ],
  }),
});

function homeJsonLd(origin: string, en: boolean) {
  const name = en ? "Cheongna Ark-One Prugio" : SITE_NAME;
  const lang = en ? "en-US" : "ko-KR";
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        url: `${origin}/`,
        name,
        alternateName: [en ? "arkone-prugio.site" : "아크원푸르지오.site"],
        inLanguage: lang,
        publisher: { "@id": "https://www.humanekorea.co.kr/#organization" },
      },
      {
        "@type": "WebPage",
        "@id": `${origin}/#webpage`,
        url: `${origin}/`,
        name,
        inLanguage: lang,
        isPartOf: { "@id": `${origin}/#website` },
        dateModified: "2026-11-25",
      },
    ],
  });
}

const SECTIONS = ["hero", "overview", "location", "history", "premium", "brand", "contact"] as const;

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
            <p className="intro__phrase">청라국제업무단지 M5블록</p>
            <p className="intro__title">아파트 868세대 · 오피스텔 987실</p>
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
              <source media="(max-width: 1024px)" srcSet="/resources/img/pages/main/hero_bg_m.v4.webp" />
              <img src="/resources/img/pages/main/hero_bg.v4.webp" alt="청라 아크원 푸르지오 단지 투시도(CG)" {...imgDims("/resources/img/pages/main/hero_bg.v4.webp")} data-dims="" />
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
              <span className="hero__title_line">CHEONG NA</span>{" "}
              <br />
              <span className="hero__title_line">ARK-ONE</span>{" "}
              <br />
              <span className="hero__title_line">PRUGIO</span>{" "}
              <span className="hero__title_ko">{tx("청라 아크원 푸르지오", "Cheongna Ark-One Prugio")}</span>
            </h1>
            <span className="hero__open">
              {isOtMainHost() ? <span className="hero__open_phrase"><strong>{tx("오피스텔 청약 12.7(월)", "Officetel subscription 12.7 (Mon)")}</strong> · {tx("상가 분양 예정", "retail sales planned")}</span> : <span className="hero__open_phrase">{tx("입주자모집공고 게시", "Recruitment notice posted")} <strong>2026.10.22</strong>{tx("(목)", " Thu")}</span>} · <span className="hero__open_phrase">{tx("견본주택 방문", "Model house visits")} <strong>{tx("사전 예약제", "by reservation only")}</strong></span>
            </span>
          </div>
          <div className="hero__ui">
            <a className="hero__scroll" href={isOtMainHost() ? "#officetel" : "#overview"}>
              <span className="hero__scroll_line" />
              <span>SCROLL</span>
            </a>
            <button type="button" className="hero__video_trigger" onClick={() => setVideo(true)}>
              <span>
                <b>{tx("청라 아크원", "Cheongna Ark-One")}</b> <br className="m-only" /> {tx("홍보영상", "promo video")}
              </span>
              <span className="hero__video_play">
                <img src="/resources/img/pages/main/ico_yt.svg" alt="" aria-hidden="true" {...imgDims("/resources/img/pages/main/ico_yt.svg")} data-dims="" />
              </span>
            </button>
          </div>
          <div className="hero__quick">
            <div className="hero__quick_item" aria-label="분양가 상한제 적용단지">
              <img className="hero__quick_orbit" src="/official/badge/hero_circle_text.v100.svg" alt="" aria-hidden="true" />
              <img className="hero__quick_content" src="/official/badge/hero_circle_01.v100.svg" alt="" aria-hidden="true" />
            </div>
            <Link to="/register" className="hero__quick_item hero__quick_item--reg" aria-label="사전고객등록">
              <img className="hero__quick_orbit" src="/official/badge/hero_circle_text.v100.svg" alt="" aria-hidden="true" />
              <img className="hero__quick_content" src="/official/badge/hero_circle_prereg.svg" alt="" aria-hidden="true" />
            </Link>
          </div>
        </section>

        {isOtMainHost() ? <OtFeature /> : null}

        <PlansBanner />

        <NoticeSummary />

        <section className="hero-define">
          <Img className="hero-define__visual" src="/resources/img/pages/main/hero_brand_img.v4.webp" alt="청라 아크원 푸르지오 엠블럼" />
          <div className="hero-define__copy">
            <Img src="/resources/img/pages/main/ico_star.svg" alt="" aria-hidden="true" width={28} height={28} />
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
              단지명 ARK-ONE은
              <br />
              ABSOLUTE REMARKABLE ONE의 약칭
            </p>
          </div>
        </section>

        <section className="phase-now" aria-label="현재 단계">
          <p>{STAGE_S1}</p>
          <p>출처: 입주자모집공고(2026.10.22 게시, 주택관리번호 2026000496) · 확인 기준일 2026-11-27</p>
          <div>
            {HOME_FAQ.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="overview" className="section-overview">
          <Img className="bg" src="/resources/img/pages/main/overview_bg.v4.webp" alt="" aria-hidden="true" />
          <span className="dim" />
          <div className="section-overview__inner">
            <header>
              <p className="section-overview__copy_text">
                청라 약 10년 만의
                <br />500가구 이상 아파트 공급
                <br />
                <small>2017.7 한신더휴 이후 · 부동산R114 집계(아시아경제 2026.09.02 보도 기준)</small>
              </p>
              <h2 className="section-overview__copy_title">{tx("청라 아크원 푸르지오 사업 규모", "Cheongna Ark-One Prugio scale")}</h2>
              <p className="section-overview__copy_brand">ARK-ONE</p>
            </header>
            <article className="overview-panel">
              <h3>
                {tx("총 2,911세대·실", "2911 units and rooms")}
                <small>{tx("(B1 & M5 블록)", "(blocks B1 and M5)")}</small>
                <br />
                {isEnHost() ? (
                  "A Prugio brand town with Cheongna Peakone Prugio"
                ) : (
                  <>
                청라 피크원 푸르지오와 함께하는
                <br />
                B1·M5 합산 브랜드타운
                  </>
                )}
              </h3>
              <p>
                {isEnHost() ? (
                  "After Cheongna Peakone Prugio on block B1 (1056 rooms) this site supplies Apt 868 units and officetel 987 rooms on block M5. The two blocks together are 2911 units and rooms."
                ) : (
                  <>
                국제업무단지 B1 블록 청라 피크원 푸르지오(1,056실)에 이어
                <br />
                M5 블록에 아파트 868세대·오피스텔 987실을 공급합니다.
                <br />
                두 블록 합계 2,911세대·실 규모입니다.
                  </>
                )}
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
                  <dt>공급 규모</dt>
                  <dd>
                    1,855<span>세대·실</span>
                  </dd>
                </div>
              </dl>
            </article>
          </div>
        </section>

        <section id="location" className="section-location">
          <div className="section-location__visual">
            <p className="section-location__tag">ABSOLUTE REMARKABLE</p>
            <Img src="/resources/img/pages/main/location_img.v4.webp" alt="청라 아크원 푸르지오 검은 배경에 크기가 다른 흑백 구체들이 세로로 배열된 추상 그래픽" />
            <h2 className="section-location__title">ARK-ONE</h2>
          </div>
          <div className="section-location__info">
            <p className="section-location__eyebrow">CENTRAL LOCATION</p>
            <p className="section-location__desc">
              청라국제업무단지 M5블록,
              <br />
              인천 서해구 청라동 86-1번지 일원
            </p>
            <Link to="/pages/location" className="section-location__link">
              <span>view more</span>
              <span>›</span>
            </Link>
            <figure className="section-location__map">
              <Img
                src="/resources/img/pages/main/location_map.v4.png"
                alt="청라 국제도시 내 청라 아크원 푸르지오 위치"
              />
              <Img className="section-location__bubble" src="/resources/img/pages/main/location_bubble.v4.png" alt="청라 아크원 푸르지오 위치 표시" />
            </figure>
          </div>
        </section>

        <section id="history" className="section-history">
          <div className="section-history__head">
            <p>MASTERPLAN PROGRESS — ARKONE</p>
            <h2>
              청라 아크원 푸르지오
              <br />
              주변 개발 일정
            </h2>
          </div>
          <div className="history-track">
            {[
              { y: "2026", img: "history_img_2026.v4.webp", cap: ["청라하늘대교 (개통)", "하나드림타운 (그룹헤드쿼터 준공)"] },
              { y: "2028", img: "history_img_2028.v4.jpg", cap: ["돔구장&스타필드 청라 (개장 예정)"] },
              { y: "2029", img: "history_img_2029.v4.jpg", cap: ["서울아산청라병원 (예정)"] },
              { y: "개통 시기 미정", img: "history_img_2030.v4.webp", cap: ["7호선 국제업무단지역 (예정)"] },
              { y: "시기 미정", img: "history_img_2031.v4.jpg", cap: ["영상·문화 복합단지 (계획)"] },
              { y: "2031.08", img: "history_img_ark_one.v4.jpg", cap: ["청라 아크원 푸르지오 · 입주 예정 2031년 8월"] },
            ].map((ev) => (
              <article className="history-card" key={ev.img}>
                <time>
                  {/^\d{4}$/.test(ev.y) ? (
                    <>
                      <span>20</span>
                      {ev.y.slice(2)}
                    </>
                  ) : (
                    ev.y
                  )}
                </time>
                <figure>
                  <Img src={`/resources/img/pages/main/${ev.img}`} alt={`청라 아크원 푸르지오 ${ev.y} ${ev.cap.join(", ")} 이미지`} />
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
              <Img src="/resources/img/pages/main/premium_visual_img_01.v4.webp" alt="청라 아크원 푸르지오 거실 인테리어 이미지컷(CG)" />
              <Img src="/resources/img/pages/main/premium_visual_img_02.v4.webp" alt="청라 아크원 푸르지오 주방·다이닝 인테리어 이미지컷(CG)" />
              <Img src="/resources/img/pages/main/premium_visual_img_03.v4.webp" alt="청라 아크원 푸르지오 침실 인테리어 이미지컷(CG)" />
              <Img src="/resources/img/pages/main/premium_visual_img_04.v4.webp" alt="청라 아크원 푸르지오 거실·발코니 인테리어 이미지컷(CG)" />
            </div>
            <div className="section-premium__copy">
              <h3>
                인테리어
                <br />
                이미지컷
              </h3>
              <p>
                거실 · 주방 · 침실
                <br />
                발코니 연출 이미지
                <br />
                실제 설계와
                <br />
                다를 수 있습니다(CG)
              </p>
              <Link to="/pages/premium" className="section-location__link">
                view more ›
              </Link>
            </div>
          </div>
          <div className="section-premium__videos">
            <video poster="/resources/img/pages/main/premium_poster.v4.webp" muted loop playsInline autoPlay>
              <source src="/resources/img/pages/main/premium_video_01.mp4" type="video/mp4" />
            </video>
            <video poster="/resources/img/pages/main/premium_poster_02.v4.webp" muted loop playsInline autoPlay>
              <source src="/resources/img/pages/main/premium_video_02.mp4" type="video/mp4" />
            </video>
            <video poster="/resources/img/pages/main/premium_poster_03.v4.webp" muted loop playsInline autoPlay>
              <source src="/resources/img/pages/main/premium_video_03.mp4" type="video/mp4" />
            </video>
          </div>
        </section>

        <section id="brand" className="section-brand">
          <picture>
            <source media="(max-width: 1024px)" srcSet="/resources/img/pages/main/brand_bg_m.v4.webp" />
            <Img className="bg" src="/resources/img/pages/main/brand_bg.v4.webp" alt="" aria-hidden="true" />
          </picture>
          <div className="frame">
            <p className="section-brand__eyebrow">THE NATURAL NOBILITY</p>
            <h2>집에서 찾는 하루</h2>
            <p>
              견고한 기본에 더해진 세련된 편안함,
              <br />내 삶의 본연을 <Link to="/pages/brand">집에서 찾다</Link>
            </p>
            <Img className="section-brand__logo" src="/resources/img/pages/main/brand_logo.svg" alt="홈 브랜드 구역의 푸르지오 로고" />
          </div>
        </section>

        <section id="contact" className="section-contact">
          <Img className="bg" src="/resources/img/pages/main/contact_bg.v4.webp" alt="" aria-hidden="true" />
          <h2>CONTACT US</h2>
          <div className="contact-schedule">
            <p><b>아파트 일정은 공고 날짜로 보면</b></p>
            <p>공고는 2026년 10월 22일에 게시되었습니다.</p>
            <p>특별공급 11월 2일 · 1순위 11월 3일 · 2순위 11월 4일</p>
            <p>발표 11월 10일 · 서류 11월 12일~16일 · 계약은 11월 22일~24일에 진행되었습니다</p>
            <p>견본주택 운영은 별도 공지 전까지입니다.</p>
            <p>인터넷 접수는 청약홈입니다.</p>
            <p>세부 일정 문의: 대표번호 1833-3872</p>
            <small>날짜는 바뀔 수 있어 공고문이 우선합니다.</small>
          </div>
          <div className="contact-home-grid">
            <article className="contact-home-card">
              <Img src="/resources/img/pages/main/contact_map_01.v4.png" alt="청라 아크원 푸르지오 현장과 견본주택 약도" />
              <div className="contact-row">
                <div>
                  <h3>견본주택</h3>
                  <address>인천 서해구 청라동, 지번 87-1</address>
                </div>
                <div className="map-btns">
                  <a href="https://naver.me/xNpQLQ3L" target="_blank" rel="noreferrer">
                    <Img src="/resources/img/common/ico_naver.svg" alt="청라 아크원 푸르지오 견본주택 네이버 지도 바로가기" />
                  </a>
                  <a href="https://kko.to/06V9ttVXOK" target="_blank" rel="noreferrer">
                    <Img src="/resources/img/common/ico_kko_map.svg" alt="청라 아크원 푸르지오 견본주택 카카오 지도 바로가기" />
                  </a>
                </div>
              </div>
              <div className="contact-row">
                <div>
                  <h3>현장</h3>
                  <address>인천 서해구 청라동, 지번 86-1</address>
                </div>
                <div className="map-btns">
                  <a href="https://naver.me/xSBYFSR0" target="_blank" rel="noreferrer">
                    <Img src="/resources/img/common/ico_naver.svg" alt="청라 아크원 푸르지오 현장 네이버 지도 바로가기" />
                  </a>
                  <a href="https://kko.to/27AvJsaNys" target="_blank" rel="noreferrer">
                    <Img src="/resources/img/common/ico_kko_map.svg" alt="청라 아크원 푸르지오 현장 카카오 지도 바로가기" />
                  </a>
                </div>
              </div>
            </article>
            <article className="contact-home-card">
              <Img src="/resources/img/pages/main/contact_map_02.v4.webp" alt="청라 아크원 푸르지오 홍보관 약도" />
              <div className="contact-row">
                <div>
                  <h3>홍보관</h3>
                  <address>
                    인천 서해구 중봉대로 586번길 19
                    <br />
                    홍익파크 1층 108·109호(스타벅스 옆)
                  </address>
                </div>
                <div className="map-btns">
                  <a href="https://naver.me/xwmqyGWk" target="_blank" rel="noreferrer">
                    <Img src="/resources/img/common/ico_naver.svg" alt="청라 아크원 푸르지오 홍보관 네이버 지도 바로가기" />
                  </a>
                  <a href="https://kko.to/hM9WpE-0fz" target="_blank" rel="noreferrer">
                    <Img src="/resources/img/common/ico_kko_map.svg" alt="청라 아크원 푸르지오 홍보관 카카오 지도 바로가기" />
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
      {video ? <YoutubeModal id={YOUTUBE_ID} onClose={() => setVideo(false)} /> : null}
    </SiteShell>
  );
}
