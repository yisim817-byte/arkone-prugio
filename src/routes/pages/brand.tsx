import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { SubNotice } from "@/components/notice";

export const Route = createFileRoute("/pages/brand")({
  component: BrandPage,
  head: () => ({
    meta: [
      { title: "히스토리 | 청라 아크원 푸르지오" },
      { name: "description", content: "청라 아크원 푸르지오 히스토리. 청라 주변 개발 계획을 연도별로 정리했습니다. 일정은 예정·계획 기준이며 변경될 수 있습니다." },
    ],
    links: [{ rel: "canonical", href: "https://www.arkone-prugio.site/pages/brand" }],
  }),
});

const HISTORY = [
  {
    year: "2026",
    items: ["청라하늘대교 (개통)", "하나드림타운 (예정)"],
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
    img: "/resources/img/sub/brand_history_img_4.png",
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

function BrandPage() {
  return (
    <SiteShell path="/pages/brand">
      <div className="page_content">
        <section className="page_container">
          <div className="brand_image__container">
            <figure className="brand_image__img">
              <picture>
                <source media="(max-width: 1024px)" srcSet="/resources/img/sub/brand_content_img_m.v4.jpg" />
                <img src="/resources/img/sub/brand_content_img.v4.jpg" alt="청라를 잇는 교량과 도심 야경" />
              </picture>
            </figure>
            <div className="brand_image__txt_wrap">
              <h3>
                총 2,911가구<small>(B1 & M5 블록)</small>
                <br />
                청라를 대표하는 푸르지오
                <br />
                대규모 브랜드타운
              </h3>
              <p>
                국제업무단지 B1 블록의
                <br />
                눈부신 성공에 이어
                <br />
                M5 블록으로 더 커지는
                <br />
                푸르지오 브랜드타운!
                <br />
                청라를 드높일
                <br className="pc-only" />
                위대한 가치를 세웁니다
              </p>
            </div>
            <picture className="brand_image__slogan">
              <img src="/resources/img/sub/brand_slogan_img.svg" alt="" />
            </picture>
          </div>

          <section className="brand_history">
            <header className="brand_history__intro">
              <p className="brand_history__eyebrow">MASTERPLAN PROGRESS</p>
              <h3>
                푸르지오가 완성하는<strong>청라의 클라이맥스</strong>
              </h3>
            </header>
            <div className="brand_history__timeline">
              {HISTORY.map((item) => (
                <article className="brand_history__item" key={item.year + item.img}>
                  <h4>{item.year}</h4>
                  <ul>
                    {item.items.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                  <figure className="brand_history__thumb">
                    <img src={item.img} alt="" />
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
    </SiteShell>
  );
}
