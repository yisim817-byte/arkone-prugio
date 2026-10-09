import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { GuideDetail } from "@/components/seo-guide";
import { SubNotice } from "@/components/notice";
import { canonicalLinks } from "@/lib/seo-host";
import { imgDims } from "@/components/img";

export const Route = createFileRoute("/pages/brand")({
  component: BrandPage,
  head: () => ({
    meta: [
      { title: "청라 아크원 푸르지오 히스토리 | 주변 개발 일정" },
      { name: "description", content: "청라 아크원 푸르지오 히스토리. 청라 주변 개발 계획을 연도별로 정리했습니다. 일정은 예정·계획 기준이며 관계기관 사정에 따라 변경될 수 있습니다." },
    ],
    links: canonicalLinks("/pages/brand"),
  }),
});

const HISTORY = [
  {
    year: "2026",
    items: ["청라하늘대교 (개통)", "하나드림타운 (그룹헤드쿼터 준공)"],
    img: "/resources/img/sub/brand_history_img_1.png",
  },
  {
    year: "2028",
    items: ["돔구장&스타필드 청라 (개장 예정)"],
    img: "/resources/img/sub/brand_history_img_2.png",
  },
  {
    year: "2029",
    items: ["서울아산청라병원 (예정)"],
    img: "/resources/img/sub/brand_history_img_4.webp",
    badge: "청라 피크원 푸르지오(예정)",
  },
  {
    year: "개통 시기 미정",
    items: ["7호선 국제업무단지역 (예정)"],
    img: "/resources/img/sub/brand_history_img_5.png",
  },
  {
    year: "2031",
    items: ["영상문화복합단지 (계획)"],
    img: "/resources/img/sub/brand_history_img_6.png",
    badge: "청라 아크원 푸르지오(예정)",
    primary: true,
  },
];


const FAQ = [
  { q: "이 페이지는 무엇을 정리하나요?", a: "청라 아크원 푸르지오 히스토리. 청라 주변 개발 계획을 연도별로 정리했습니다." },
  { q: "일정은 어떤 기준인가요?", a: "일정은 예정·계획 기준이며 관계기관 사정에 따라 변경될 수 있습니다." },
];

function BrandPage() {
  return (
    <SiteShell path="/pages/brand">
      <div className="page_content">
        <section className="page_container">
          {/* SEO_PUSH 2026-10-06 P1-1: 페이지 고유 H1 (title 앞부분) */}
          <p>푸르지오 브랜드타운 2,911세대·실은 청라 피크원 푸르지오를 포함한 합산 규모이며, 단일 단지가 아닙니다.</p><h1 className="page-h1">청라 아크원 푸르지오 히스토리·주변 개발 일정</h1>
          <div className="brand_image__container">
            <figure className="brand_image__img">
              <picture>
                <source media="(max-width: 1024px)" srcSet="/resources/img/sub/brand_content_img_m.v4.jpg" />
                <img src="/resources/img/sub/brand_content_img.v4.webp" alt="청라를 잇는 교량과 도심 야경" {...imgDims("/resources/img/sub/brand_content_img.v4.webp")} data-dims="" />
              </picture>
            </figure>
            <div className="brand_image__txt_wrap">
              <h2>
                총 2,911세대·실<small>(B1 & M5 블록)</small>
                <br />
                청라국제업무단지 푸르지오
                <br />
                대규모 브랜드타운
              </h2>
              <p>
                국제업무단지 B1 블록의
                <br />
                청라 피크원 푸르지오에 이어
                <br />
                M5 블록으로 이어지는
                <br />
                푸르지오 브랜드타운
                <br />
                두 블록 합계
                <br className="pc-only" />
                2,911세대·실 규모입니다
              </p>
            </div>
            <picture className="brand_image__slogan">
              <img src="/resources/img/sub/brand_slogan_img.svg" alt="" {...imgDims("/resources/img/sub/brand_slogan_img.svg")} data-dims="" />
            </picture>
          </div>

          <section className="brand_history">
            <header className="brand_history__intro">
              <p className="brand_history__eyebrow">MASTERPLAN PROGRESS</p>
              <h2>
                청라 주변<strong>개발 일정</strong>
              </h2>
            </header>
            <div className="brand_history__timeline">
              {HISTORY.map((item) => (
                <article className="brand_history__item" key={item.year + item.img}>
                  <h3>{item.year}</h3>
                  <ul>
                    {item.items.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                  <figure className="brand_history__thumb">
                    <img src={item.img} alt={`${item.year} ${item.items.join(", ")} 이미지`} {...imgDims(item.img)} data-dims="" />
                  </figure>
                  {item.badge ? (
                    <p className={`brand_history__badge${item.primary ? " brand_history__badge-primary" : ""}`}>
                      {item.badge}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
          <SubNotice
            items={[
              "각종 개발계획, 예정사항 등은 사업주체, 국가기관, 지자체 등 관계 기관의 사업 추진 중 일부 변경, 지연, 취소될 수 있으며 당사와 무관합니다.",
              "본 홈페이지에 표기된 서울 지하철 7호선 현황 및 개발 계획은 관계기관의 홈페이지 등을 참조하여 작성된 것으로 사업계획 및 일정은 당사와는 무관하며, 추후 변경될 수 있습니다.",
            ]}
          />
        </section>
      </div>
          <GuideDetail faq={FAQ} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      }) }} />

    </SiteShell>
  );
}
