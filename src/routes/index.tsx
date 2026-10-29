import { imgDims } from "@/components/img";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useId, useState } from "react";
import { Img } from "@/components/img";
import { SiteShell } from "@/components/site-shell";
import { NoticeSummary } from "@/components/notice-summary";
import { PlansBanner } from "@/components/plans-banner";
import { YoutubeModal } from "@/components/youtube-modal";
import { SITE_NAME, SITE_PHONE, SITE_TEL_HREF, YOUTUBE_ID } from "@/lib/site-data";
import { EN_ORIGIN, KR_ORIGIN, LEGACY_ORIGIN, canonicalLinks, isEnHost, isKrHost, tx } from "@/lib/seo-host";
import { META } from "@/lib/i18n/en";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: tx("청라 아크원 푸르지오 | 분양 일정·비교·청약 안내", META.home.title) },
      {
        name: "description",
        content: tx(
          "청라 아크원 푸르지오 분양 일정·청약 안내. 공고 2026.10.22 게시 · 특별공급 11.02 · 1순위 11.03 · 2순위 11.04 · 당첨자 발표 11.10.",
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
        dateModified: "2026-10-29",
      },
    ],
  });
}

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
              <span className="hero__title_line">CHEONG NA</span>
              <br />
              <span className="hero__title_line">ARK-ONE</span>
              <br />
              <span className="hero__title_line">PRUGIO</span>
              <span className="hero__title_ko">{tx("청라 아크원 푸르지오", "Cheongna Ark-One Prugio")}</span>
            </h1>
            <p className="hero__answer">
              {isEnHost()
                ? "Cheongna Ark-One Prugio is a mixed-use complex at 86-1 Cheongna-dong Seohae-gu Incheon on block M5. It has Apt 868 units and officetel 987 rooms. The recruitment notice was posted on 22 Oct 2026 and contracts run from 22 to 24 Nov 2026."
                : "청라 아크원 푸르지오는 인천광역시 서해구 청라동 86-1번지 M5블록의 주거복합 단지입니다. 아파트 868세대와 오피스텔 987실입니다. 입주자모집공고는 2026.10.22에 게시되었고 계약은 2026년 11월 22일부터 24일까지입니다."}
            </p>
            <p className="hero__answer">
              {isEnHost() ? (
                <>
                  Source: <a href="https://www.applyhome.co.kr" target="_blank" rel="noopener noreferrer">Applyhome</a> recruitment notice (posted 22 Oct 2026) · checked 2026-10-29
                </>
              ) : (
                <>
                  출처: <a href="https://www.applyhome.co.kr" target="_blank" rel="noopener noreferrer">청약홈</a> 입주자모집공고(2026.10.22 게시) · 확인 기준일 2026-10-29
                </>
              )}
            </p>
            <span className="hero__open">
              <span className="hero__open_phrase">{tx("입주자모집공고 게시", "Recruitment notice posted")} <strong>2026.10.22</strong>{tx("(목)", " Thu")}</span> · <span className="hero__open_phrase">{tx("견본주택 GRAND OPEN", "Model house GRAND OPEN")} <strong>10.30</strong>{tx("(금)", " Fri")}</span>
            </span>
          </div>
          <div className="hero__ui">
            <a className="hero__scroll" href="#overview">
              <span className="hero__scroll_line" />
              <span>SCROLL</span>
            </a>
            <button type="button" className="hero__video_trigger" onClick={() => setVideo(true)}>
              <span>
                <b>{tx("청라 아크원", "Cheongna Ark-One")}</b> <br className="m-only" /> {tx("홍보영상", "promo video")}
              </span>
              <span className="hero__video_play">
                <img src="/resources/img/pages/main/ico_yt.svg" alt="" {...imgDims("/resources/img/pages/main/ico_yt.svg")} data-dims="" />
              </span>
            </button>
            <div className="hero__quick">
              <a className="hero__quick_item" href={SITE_TEL_HREF} aria-label={tx(`${SITE_PHONE} 전화 연결`, `Call ${SITE_PHONE}`)}>
                <HeroOrbit />
                <img
                  className="hero__quick_content"
                  src="/resources/img/pages/main/hero_circle_01.svg"
                  alt="분양가 상한제 적용단지"
                  {...imgDims("/resources/img/pages/main/hero_circle_01.svg")}
                  data-dims=""
                />
              </a>
              <Link to="/register" className="hero__quick_item" aria-label={tx("사전고객등록", "Pre-registration")}>
                <HeroOrbit />
                <img className="hero__quick_content" src="/resources/img/pages/main/hero_circle_register.svg" alt="사전고객등록 원형 바로가기" {...imgDims("/resources/img/pages/main/hero_circle_register.svg")} data-dims="" />
              </Link>
            </div>
          </div>
        </section>

        <PlansBanner />

        <section className="event-card" aria-labelledby="event-title">
          <div className="event-card__inner">
            <p className="event-card__eyebrow">{tx("사전고객등록 고객 대상 이벤트", "Event for pre-registered customers")}</p>
            <h2 id="event-title">{tx("백화점 상품권 30만원", "Department-store gift card 300000 won")}</h2>
            <p className="event-card__brands">{tx("상품권 종류: 롯데·현대·신세계 백화점 가운데 1종", "One gift card from Lotte Hyundai or Shinsegae")}</p>
            <p className="event-card__basis">{tx("받으실 수 있는 분: 이 홈페이지에서 사전고객등록을 한 뒤 청약에 당첨되어 지급 조건을 충족한 고객입니다.", "Who can receive it: a customer who pre-registers on this site then wins an application and meets the payout terms.")}</p>
            <p className="event-card__payout">{tx("상품권은 당첨과 지급 조건 충족이 확인되면 계약하는 날 드립니다.", "The card is given on the contract day after the win and the payout terms are confirmed.")}</p>
            <ol className="event-card__steps"><li>{tx("STEP 1 사전고객등록(홈페이지)", "STEP 1 Pre-register on this site")}</li><li>{tx("STEP 2 청약 신청(특별공급 11.02 · 1순위 11.03 · 2순위 11.04)", "STEP 2 Apply (special supply 2 Nov · first rank 3 Nov · second rank 4 Nov)")}</li><li>{tx("STEP 3 당첨·지급 조건 확인", "STEP 3 Win and payout terms confirmed")}</li><li>{tx("STEP 4 계약일 상품권 수령", "STEP 4 Receive the card on the contract day")}</li></ol>
            <div className="event-card__actions"><Link className="event-card__button" to="/register">{tx("사전고객등록하기", "Pre-register")}</Link><a href="#event-terms">{tx("유의사항 자세히 보기", "Read the notes")}</a></div>
            <p className="event-card__schedule">{tx("일정: 입주자모집공고 게시 2026.10.22(목) · 견본주택 GRAND OPEN 10.30(금) · 세부 일정은 대표번호 1833-3872로 문의", "Schedule: notice posted 22 Oct 2026 · model house grand opening 30 Oct · call 1833-3872")}</p>
            <p className="event-card__notice">{tx("※ 청약 접수는 별도 절차이며, 사전고객등록만으로 청약이 되지는 않습니다.", "Applying is a separate step. Pre-registration alone is not an application.")}</p>
            <p>등록 여부는 <a href={SITE_TEL_HREF}>1833-3872</a>(대표번호)에서 확인하실 수 있습니다.</p>
            <details id="event-terms" className="event-card__terms"><summary>이벤트 유의사항 (청라 아크원 푸르지오 APT 사전고객등록)</summary>
              <ol>
                <li>지급 대상: 이 홈페이지에서 사전고객등록을 한 뒤, 청라 아크원 푸르지오 아파트 청약에 당첨되어 지급 조건을 충족한 고객</li>
                <li>혜택 내용: 롯데·현대·신세계 백화점 상품권 가운데 1종, 30만원</li><li>지급일: 당첨과 지급 조건 충족을 확인한 뒤 계약 당일</li>
                <li>한 사람에게 한 번만 지급하며, 같은 사람과 같은 휴대전화번호는 한 사람으로 봅니다.</li>
                <li>부적격 당첨이거나 계약을 체결하지 않은 경우, 계약이 취소·해제된 경우에는 지급하지 않습니다. 지급 뒤 이런 사유가 생기면 처리 기준을 담당자가 따로 알려 드립니다.</li>
                <li>제세공과금은 기준이 정해지면 담당자가 따로 알려 드립니다.</li>
                <li>이벤트 내용은 미리 알린 뒤 바뀌거나 일찍 끝날 수 있습니다.</li>
                <li>사전고객등록은 청약 신청이 아닙니다. 청약 자격과 일정은 입주자모집공고 기준입니다.</li>
              </ol><p>등록 확인·문의: 1833-3872</p>
            </details>
          </div>
        </section>

        <NoticeSummary />

        <section className="hero-define">
          <Img className="hero-define__visual" src="/resources/img/pages/main/hero_brand_img.v4.webp" alt="청라 아크원 푸르지오 엠블럼" />
          <div className="hero-define__copy">
            <Img src="/resources/img/pages/main/ico_star.svg" alt="" width={28} height={28} />
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

        <section id="overview" className="section-overview">
          <Img className="bg" src="/resources/img/pages/main/overview_bg.v4.webp" alt="" />
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
                푸르지오 대규모 브랜드타운
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
            <Img src="/resources/img/pages/main/location_img.v4.webp" alt="검은 배경에 크기가 다른 흑백 구체들이 세로로 배열된 추상 그래픽" />
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
              { y: "시기 미정", img: "history_img_공고 후.v4.jpg", cap: ["영상문화복합단지 (계획)"] },
              { y: "2031.08", img: "history_img_ark_one.v4.jpg", cap: ["청라 아크원 푸르지오 (2031년 08월 입주예정)"] },
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
                  <Img src={`/resources/img/pages/main/${ev.img}`} alt={`${ev.y} ${ev.cap.join(", ")} 이미지`} />
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
              <Img src="/resources/img/pages/main/premium_visual_img_01.v4.webp" alt="거실 인테리어 이미지컷(CG)" />
              <Img src="/resources/img/pages/main/premium_visual_img_02.v4.webp" alt="주방·다이닝 인테리어 이미지컷(CG)" />
              <Img src="/resources/img/pages/main/premium_visual_img_03.v4.webp" alt="침실 인테리어 이미지컷(CG)" />
              <Img src="/resources/img/pages/main/premium_visual_img_04.v4.webp" alt="거실·발코니 인테리어 이미지컷(CG)" />
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
            <Img className="bg" src="/resources/img/pages/main/brand_bg.v4.webp" alt="" />
          </picture>
          <div className="frame">
            <p className="section-brand__eyebrow">THE NATURAL NOBILITY</p>
            <h2>본연이 지니는 고귀함</h2>
            <p>
              견고한 기본에 더해진 세련된 편안함,
              <br />내 삶의 본연을 집에서 찾다
            </p>
            <Img className="section-brand__logo" src="/resources/img/pages/main/brand_logo.svg" alt="홈 브랜드 구역의 푸르지오 로고" />
          </div>
        </section>

        <section id="contact" className="section-contact">
          <Img className="bg" src="/resources/img/pages/main/contact_bg.v4.webp" alt="" />
          <h2>CONTACT US</h2>
          <div className="contact-schedule">
            <p><b>청라 아크원 푸르지오(APT) 청약 일정 — 입주자모집공고 기준</b></p>
            <p>입주자모집공고 게시 2026.10.22(목)</p>
            <p>특별공급 11.02(월) · 일반공급 1순위 11.03(화) · 일반공급 2순위 11.04(수)</p>
            <p>당첨자 발표 11.10(화) · 당첨자 서류접수 11.12(목)~11.16(월) · 계약 11.22(일)~11.24(화)</p>
            <p>견본주택 GRAND OPEN 10.30(금) · 인천광역시 서해구 청라동 87-1</p>
            <p>청약은 한국부동산원 청약홈(www.applyhome.co.kr)에서 인터넷으로 신청합니다.</p>
            <p>세부 일정 문의: 대표번호 1833-3872</p>
            <small>※ 일정은 사업주체 사정에 따라 변경될 수 있으며, 입주자모집공고문이 우선합니다.</small>
          </div>
          <div className="contact-home-grid">
            <article className="contact-home-card">
              <Img src="/resources/img/pages/main/contact_map_01.v4.png" alt="청라 아크원 푸르지오 현장과 견본주택 약도" />
              <div className="contact-row">
                <div>
                  <h3>견본주택</h3>
                  <address>인천광역시 서해구 청라동 87-1번지</address>
                </div>
                <div className="map-btns">
                  <a href="https://naver.me/xNpQLQ3L" target="_blank" rel="noreferrer">
                    <Img src="/resources/img/common/ico_naver.svg" alt="견본주택 네이버 지도 바로가기" />
                  </a>
                  <a href="https://kko.to/06V9ttVXOK" target="_blank" rel="noreferrer">
                    <Img src="/resources/img/common/ico_kko_map.svg" alt="견본주택 카카오 지도 바로가기" />
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
                    <Img src="/resources/img/common/ico_naver.svg" alt="현장 네이버 지도 바로가기" />
                  </a>
                  <a href="https://kko.to/27AvJsaNys" target="_blank" rel="noreferrer">
                    <Img src="/resources/img/common/ico_kko_map.svg" alt="현장 카카오 지도 바로가기" />
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
                    인천광역시 서해구 중봉대로 586번길 19
                    <br />
                    홍익파크 1층 108, 109호(스타벅스 옆)
                  </address>
                </div>
                <div className="map-btns">
                  <a href="https://naver.me/xwmqyGWk" target="_blank" rel="noreferrer">
                    <Img src="/resources/img/common/ico_naver.svg" alt="홍보관 네이버 지도 바로가기" />
                  </a>
                  <a href="https://kko.to/hM9WpE-0fz" target="_blank" rel="noreferrer">
                    <Img src="/resources/img/common/ico_kko_map.svg" alt="홍보관 카카오 지도 바로가기" />
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
