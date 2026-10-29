import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { SubNotice } from "@/components/notice";
import { canonicalLinks, faqJsonLd, isEnHost, tx } from "@/lib/seo-host";
import { GuideAnswer, GuideDetail, type GuideFaq } from "@/components/seo-guide";
import { FAQ_OVERVIEW, META, withPrice } from "@/lib/i18n/en";
import { SRC_APPLYHOME } from "@/lib/arkone-facts";
import { imgDims } from "@/components/img";
import { PRICE_FAQ_ANSWER } from "@/components/notice-sections";

const FAQ: GuideFaq[] = [
  {
    q: "청라 아크원 푸르지오는 몇 세대인가요?",
    a: "사업주체 공개 사업개요 기준 총 1,855세대·실로, 아파트 868세대와 오피스텔 987실로 구성됩니다. 지상 1~2층에는 상업시설이 계획되어 있습니다.",
  },
  {
    q: "아파트 전용면적은 어떻게 되나요?",
    a: "아파트는 전용 84㎡와 103㎡ 두 가지입니다. 타입별 세대수는 84A 248세대, 84B·84C·84D·103A·103B 각 124세대로 총 868세대입니다(입주자모집공고 기준). 견본주택에는 84A·103A 유니트가 설치되어 있습니다. 주택형별 면적은 주택형 안내(입주자모집공고문 5면)에서 확인할 수 있습니다.",
  },
  {
    q: "시행사와 시공사는 어디인가요?",
    a: "시행은 ㈜청라스마트시티, 시공은 대우건설입니다.",
  },
  {
    q: "분양가는 얼마인가요?",
    a: PRICE_FAQ_ANSWER,
  },
  {
    q: "청라 피크원 푸르지오와 같은 단지인가요?",
    a: "아닙니다. 청라 아크원 푸르지오는 아파트와 오피스텔을 합쳐 1,855세대·실입니다. 2,911세대·실은 청라 피크원 푸르지오를 포함한 합산 규모이며 단일 단지가 아닙니다.",
  },
  {
    q: "청라 피크원 푸르지오 2차와 청라 아크원 푸르지오는 같은 단지인가요?",
    a: "「피크원 2차」는 일부 글에서 아크원을 부르는 표기입니다. 단지명은 청라 아크원 푸르지오(M5블록)이고, 청라 피크원 푸르지오(B1블록)와는 다른 단지입니다.",
  },
  {
    q: "청라 아크원 푸르지오 상가(상업시설)도 같은 공고로 분양하나요?",
    a: "이 사이트는 아파트·오피스텔 기준으로 안내합니다. 상업시설의 공급 여부와 방식은 입주자모집공고와 별도로 확인이 필요합니다.",
  },
  {
    q: "청라 아크원 푸르지오 문의 번호는 무엇인가요?",
    a: "이 사이트의 상담 번호는 대표번호 1833-3872입니다.",
  },
];

function overviewFaq(): GuideFaq[] {
  return tx(FAQ, withPrice(FAQ_OVERVIEW));
}

export const Route = createFileRoute("/pages/overview")({
  component: OverviewPage,
  head: () => ({
    meta: [
      { title: tx("청라 아크원 푸르지오 사업개요·세대수 | 868세대·987실", META.overview.title) },
      { name: "description", content: tx("청라 아크원 푸르지오 사업개요·세대수. 청라동 86-1 M5BL, 지하 5~지상 49층 6개동, 아파트 868세대·오피스텔 987실, 시행 청라스마트시티·시공 대우건설.", META.overview.desc) },
    ],
    links: canonicalLinks("/pages/overview"),
    scripts: faqJsonLd(overviewFaq()),
  }),
});

function OverviewPage() {
  return (
    <SiteShell path="/pages/overview">
      <div className="page_content">
        <section className="page_container">
          <GuideAnswer title={tx("청라 아크원 푸르지오 분양 개요 한눈에 보기", META.overview.h1)}>
            {isEnHost() ? (
              <>
                <p>Cheongna Ark-One Prugio is a mixed-use complex planned at 86-1 Cheongna-dong Seohae-gu Incheon (mixed-use site M5 in the Cheongna International City).</p>
                <p>It is six buildings from basement 5 to floor 49: Apt 868 units (exclusive 84 and 103 sqm) and officetel 987 rooms (exclusive 105 121 and 136 sqm) for 1855 units and rooms plus shops on floors 1 and 2.</p>
                <p>The developer is Cheongna Smart City and the builder is Daewoo E&C. The apartment recruitment notice was posted on 22 Oct 2026.</p>
                <p>Notice posted 22 Oct 2026. Model house grand opening is 30 Oct. Special supply is 2 Nov first rank 3 Nov and second rank 4 Nov. Supply amounts are in the recruitment notice (housing management number 2026000496) by type building floor and unit. Call 1833-3872 for a specific unit.</p>
                <p>Source date 21 Oct 2026. Source: project entity overview.</p>
              </>
            ) : (
              <>
            <p>
              청라 아크원 푸르지오(청라아크원푸르지오)는 인천광역시 서해구 청라동 86-1번지(청라국제도시 주상복합용지 M5BL)에 계획된 주거복합
              단지입니다.
            </p>
            <p>
              지하 5층~지상 49층 6개동 규모로, 아파트 868세대(전용 84·103㎡)와 오피스텔 987실(전용 105·121·136㎡) 등 총
              1,855세대·실와 지상 1~2층 상업시설로 구성됩니다.
            </p>
            <p>시행은 ㈜청라스마트시티, 시공은 대우건설이며, 청라 아크원 푸르지오(APT) 입주자모집공고가 2026.10.22(목) 게시되었습니다.</p>
            <p>
              청라 아크원 푸르지오는 입주자모집공고 게시 2026.10.22(목) · 견본주택 GRAND OPEN 10.30(금)이며, 청약 일정은 특별공급 11.02(월) · 1순위 11.03(화) · 2순위 11.04(수)입니다. 분양가(공급금액)는 입주자모집공고문(주택관리번호 2026000496)의 공급금액표에 주택형·동·층·호별로 공개되어 있습니다. 주택형과 층에 따라 금액이 다르므로 원하시는 조건은 대표번호 1833-3872로 상담해 주세요.
            </p>
            <p>자료 기준일 2026-10-21 · 출처 사업주체 공개 사업개요</p>
              </>
            )}
          </GuideAnswer>
          {isEnHost() ? (
            <p>Cheongna Ark-One Prugio is six buildings from basement 5 to floor 49. Apt 868 units (exclusive 84 and 103 sqm) and officetel 987 rooms (exclusive 105 121 and 136 sqm) total 1855. Parking is 3124 spaces (Apt 1389 officetel 1695 shops 40). The developer is Cheongna Smart City and the builder is Daewoo E&C. The 2911 brand-town figure includes Cheongna Peakone Prugio and is not one complex. Notice posted 22 Oct 2026. Model house grand opening is 30 Oct. Call 1833-3872.</p>
          ) : (
            <p>청라 아크원 푸르지오는 지하 5층~지상 49층, 총 6개동이며 아파트 868세대(전용 84·103㎡)와 오피스텔 987실(전용 105·121·136㎡), 합계 1,855세대·실입니다. 주차대수는 총 3,124대(아파트 1,389대 · 오피스텔 1,695대 · 상업시설 40대)입니다. 시행은 ㈜청라스마트시티, 시공은 대우건설(주)입니다. 푸르지오 브랜드타운 2,911세대·실은 청라 피크원 푸르지오를 포함한 합산 규모이며, 단일 단지가 아닙니다. 청라 아크원 푸르지오는 입주자모집공고 게시 2026.10.22(목) · 견본주택 GRAND OPEN 10.30(금)이며, 세부 일정은 대표번호 1833-3872로 문의할 수 있습니다.</p>
          )}
          <section className="seo-guide" aria-label={isEnHost() ? "Complex distinction" : "단지 구분"}>
            <h2 className="seo-guide__subtitle">{isEnHost() ? "Which complex is which" : "단지 구분"}</h2>
            <ol className="seo-guide__answer">
              {isEnHost() ? (
                <>
                  <li>Cheongna Ark-One Prugio is the M5 complex. Apt 868 units and officetel 987 rooms total 1855. The address is 86-1 Cheongna-dong.</li>
                  <li>2911 units and rooms is the combined total with Cheongna Peakone Prugio and is not one complex.</li>
                  <li>Cheongna Peakone Prugio is Peakone B1 with 1056 rooms and is a different complex from Ark-One.</li>
                  <li>Some articles call Ark-One Peakone phase 2. The complex name is Cheongna Ark-One Prugio.</li>
                  <li>The recruitment notice was posted on 22 Oct 2026. The model house grand opening is 30 Oct.</li>
                </>
              ) : (
                <>
              <li>청라 아크원 푸르지오는 M5블록 단지입니다. 아파트 868세대와 오피스텔 987실을 합쳐 1,855세대·실입니다. 청라동 86-1에 있습니다.</li>
              <li>2,911세대·실은 청라 피크원 푸르지오를 포함한 합산 규모이며 단일 단지가 아닙니다.</li>
              <li>청라 피크원 푸르지오는 B1블록 1,056실 규모로, 아크원과 다른 단지입니다.</li>
              <li>아크원을 「피크원 2차」로 부르는 글이 있습니다. 단지명은 청라 아크원 푸르지오입니다.</li>
              <li>2026년 10월 22일 입주자모집공고가 게시되었습니다. 견본주택 GRAND OPEN은 10.30(금)입니다.</li>
                </>
              )}
            </ol>
          </section>
          <div className="overview_tab__content">
            <figure className="overview_image">
              <picture>
                <source media="(max-width: 1024px)" srcSet="/resources/img/sub/overview_apt_img_m.v4.jpg" />
                <img src="/resources/img/sub/overview_apt_img.v4.jpg" alt="청라 아크원 푸르지오 단지 연출 이미지" {...imgDims("/resources/img/sub/overview_apt_img.v4.jpg")} data-dims="" />
              </picture>
              <span className="overview_image__caption">이미지컷</span>
              <figcaption className="overview_image__text">
                <p>
                  아파트 868세대
                  <br />
                  오피스텔 987실
                </p>
                <span className="overview_summary__line" />
                <h2>
                  청라국제업무단지 <br /> M5블록 주상복합
                </h2>
              </figcaption>
            </figure>
            <dl className="overview_info">
              <div className="overview_info__row">
                <dt>대지위치</dt>
                <dd>
                  인천광역시 서해구 청라동86-1번지
                  <br />
                  <small>(청라국제도시 주상복합용지 M5BL)</small>
                </dd>
              </div>
              <div className="overview_info__row">
                <dt>대지면적</dt>
                <dd>35,306.00㎡ / 10,680.07py</dd>
              </div>
              <div className="overview_info__row">
                <dt>연면적</dt>
                <dd className="pc-only">
                  APT : 173,952.7508㎡ / 52,620.7071py
                  <br />
                  OT : 245,645.4826㎡ / 74,307.7585py
                  <br />
                  상업시설 : 4,959.8424㎡ / 1,500.3523py
                </dd>
                <dd className="m-only">
                  APT
                  <br />
                  <small>173,952.7508㎡(52,620.7071py)</small>
                  <br />
                  <br />
                  OT
                  <br />
                  <small>245,645.4826㎡(74,307.7585py)</small>
                  <br />
                  <br />
                  상업시설
                  <br />
                  <small>4,959.8424㎡(1,500.3523py)</small>
                </dd>
              </div>
              <div className="overview_info__row">
                <dt>건축면적</dt>
                <dd>12,278.4410㎡</dd>
              </div>
              <div className="overview_info__row">
                <dt>건축규모</dt>
                <dd className="pc-only">
                  지하 5층~지상 49층 총 6개동 1,855세대·실
                  <br />
                  APT 868세대 전용 84㎡, 103㎡
                  <br />
                  OT 987실 전용 105㎡, 121㎡, 136㎡
                  <br />
                  상업시설 1~2층
                </dd>
                <dd className="m-only">
                  지하 5층~지상 49층 총 6개동
                  <br />
                  <small>
                    APT 868세대 전용 84㎡, 103㎡
                    <br />
                    OT 987실 전용 105㎡, 121㎡, 136㎡
                    <br />
                    상업시설 1~2층
                  </small>
                </dd>
              </div>
              <div className="overview_info__row">
                <dt>주차대수</dt>
                <dd className="pc-only">
                  APT : 총 3,124대 중 1,389대
                  <br />
                  OT : 총 3,124대 중 1,695대
                  <br />
                  상업시설 : 총 3,124대 중 40대
                </dd>
                <dd className="m-only">
                  APT
                  <br />
                  <small>총 3,124대 중 1,389대</small>
                  <br />
                  <br />
                  OT
                  <br />
                  <small>총 3,124대 중 1,695대</small>
                  <br />
                  <br />
                  상업시설
                  <br />
                  <small>총 3,124대 중 40대</small>
                </dd>
              </div>
            </dl>
          </div>
          <GuideDetail
            tableTitle="청라 아크원 푸르지오 사업 정보 요약"
            rows={[
              { label: "단지명", value: "청라 아크원 푸르지오", status: "공개값" },
              { label: "위치", value: "인천광역시 서해구 청라동 86-1번지 (청라국제도시 주상복합용지 M5BL)", status: "공개값" },
              { label: "건축규모", value: "지하 5층 ~ 지상 49층, 총 6개동", status: "공개값" },
              { label: "공급 구성", value: "총 1,855세대·실 = 아파트 868세대 + 오피스텔 987실, 상업시설 지상 1~2층", status: "공개값" },
              { label: "아파트 전용면적", value: "84㎡, 103㎡ (주택형별 면적은 입주자모집공고문 5면 · 견본주택 84A·103A 유니트)", status: "공개값" },
              { label: "아파트 타입별 세대수", value: "84A 248 · 84B 124 · 84C 124 · 84D 124 · 103A 124 · 103B 124 (총 868세대)", status: "분양 자료 기준" },
              { label: "오피스텔 전용면적", value: "105㎡, 121㎡, 136㎡", status: "공개값" },
              { label: "대지면적 · 건축면적", value: "35,306.00㎡ · 12,278.4410㎡", status: "공개값" },
              { label: "주차대수", value: "총 3,124대 (APT 1,389대 · OT 1,695대 · 상업시설 40대)", status: "공개값" },
              { label: "상업시설", value: "피크원 53·아크원 43, 총 96개 점포 · 지상 1~2층 (1층 47 · 2층 49)", status: "분양 자료 기준" },
              { label: "시행 · 시공", value: "㈜청라스마트시티 · 대우건설", status: "공개값" },
              { label: "분양가", value: "입주자모집공고문(주택관리번호 2026000496) 공급금액표에 주택형·동·층·호별 공개 · 상담 1833-3872 (분양가상한제 적용)", status: "확정" },
              { label: "APT 입주자모집공고", value: "2026.10.22(목) 게시", status: "확정" },
              { label: "입주 시기", value: "입주예정 2031년 08월", status: "공고 기준" },
            ]}
            faq={overviewFaq()}
            links={[
              { to: "/pages/compare", label: "평면·타입 공개 여부" },
              { to: "/pages/schedule", label: "분양 일정·청약 안내" },
              { to: "/pages/location", label: "입지환경" },
              { to: "/pages/contact", label: "견본주택·홍보관 오시는길" },
              { to: "/register", label: "사전고객등록" },
            ]}
            sources={[SRC_APPLYHOME]}
          />
          <SubNotice
            items={[
              "본 홈페이지에 사용된 CG 및 일러스트, 이미지 등은 소비자의 이해를 돕기 위한 것으로 실제와 다를 수 있습니다.",
              "본 홈페이지에 표기된 개발계획(예정) 등은 각 지자체의 사정 및 언론보도자료를 인용한 것으로 국가 기관, 관할 지자체 및 기타 관계 기관의 사업추진 중 변경, 지연, 취소될 수 있습니다.",
              "본 홈페이지의 내용은 인·허가 과정상 변경될 수 있으며 계약 시 주요내용을 반드시 확인하시기 바랍니다.",
              "하자 등에 대한 사항은 공동주택관리법 등 관련 법령에 따라 적용됩니다.",
            ]}
          />
        </section>
      </div>
    </SiteShell>
  );
}
