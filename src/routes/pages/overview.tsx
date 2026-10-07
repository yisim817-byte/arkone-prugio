import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { SubNotice } from "@/components/notice";
import { canonicalLinks, faqJsonLd } from "@/lib/seo-host";
import { GuideAnswer, GuideDetail, type GuideFaq } from "@/components/seo-guide";
import { SRC_APPLYHOME, SRC_OFFICIAL, SRC_OFFICIAL_PREMIUM } from "@/lib/arkone-facts";

const FAQ: GuideFaq[] = [
  {
    q: "청라 아크원 푸르지오는 몇 세대인가요?",
    a: "사업주체 공개 사업개요 기준 총 1,855세대·실로, 아파트 868세대와 오피스텔 987실로 구성됩니다. 지상 1~2층에는 상업시설이 계획되어 있습니다.",
  },
  {
    q: "아파트 전용면적은 어떻게 되나요?",
    a: "아파트는 전용 84㎡와 103㎡ 두 가지로 공개되어 있습니다. 타입별 세대수는 84A 248세대, 84B·84C·84D·103A·103B 각 124세대로 총 868세대입니다(분양 자료 기준). 타입별 세부 면적과 평면도는 아직 공개되지 않았으며(미정), 입주자모집공고에서 확인하실 수 있습니다.",
  },
  {
    q: "시행사와 시공사는 어디인가요?",
    a: "시행은 ㈜청라스마트시티, 시공은 대우건설입니다. 이 사이트는 홈페이지운영 휴메인코리아가 운영하는 분양 정보 안내 페이지입니다.",
  },
  {
    q: "분양가는 얼마인가요?",
    a: "분양가는 아직 공개되지 않았습니다(미정). 사업주체는 이 단지를 '분양가 상한제 적용단지'로 표기하고 있으며, 실제 금액은 입주자모집공고에서 확정됩니다.",
  },
];

export const Route = createFileRoute("/pages/overview")({
  component: OverviewPage,
  head: () => ({
    meta: [
      { title: "청라 아크원 푸르지오 사업개요 | 868세대·987실" },
      { name: "description", content: "청라 아크원 푸르지오 사업개요. 청라동 86-1번지 M5BL, 지하 5층~지상 49층 6개동, 아파트 868세대·오피스텔 987실, 시행 ㈜청라스마트시티·시공 대우건설." },
    ],
    links: canonicalLinks("/pages/overview"),
    scripts: faqJsonLd(FAQ),
  }),
});

function OverviewPage() {
  return (
    <SiteShell path="/pages/overview">
      <div className="page_content">
        <section className="page_container">
          <GuideAnswer title="청라 아크원 푸르지오 분양 개요 한눈에 보기">
            <p>
              청라 아크원 푸르지오는 인천광역시 서해구 청라동 86-1번지(청라국제도시 주상복합용지 M5BL)에 계획된 주거복합
              단지입니다.
            </p>
            <p>
              지하 5층~지상 49층 6개동 규모로, 아파트 868세대(전용 84·103㎡)와 오피스텔 987실(전용 105·121·136㎡) 등 총
              1,855세대·실와 지상 1~2층 상업시설로 구성됩니다.
            </p>
            <p>시행은 ㈜청라스마트시티, 시공은 대우건설이며, 현재는 입주자모집공고 전 단계입니다.</p>
            <p>
              청라 아크원 푸르지오는 10월 중 OPEN 예정이며, 분양가와 청약 일정은 공고에서 확정됩니다(현재 미정).
            </p>
          </GuideAnswer>
          <div className="overview_tab__content">
            <figure className="overview_image">
              <picture>
                <source media="(max-width: 1024px)" srcSet="/resources/img/sub/overview_apt_img_m.v4.jpg" />
                <img src="/resources/img/sub/overview_apt_img.v4.jpg" alt="청라 아크원 푸르지오 단지 연출 이미지" />
              </picture>
              <span className="overview_image__caption">이미지컷</span>
              <figcaption className="overview_image__text">
                <p>
                  아파트 868세대
                  <br />
                  오피스텔 987실
                </p>
                <span className="overview_summary__line" />
                <h3>
                  청라국제업무단지 <br /> M5블록 주상복합
                </h3>
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
              { label: "아파트 전용면적", value: "84㎡, 103㎡ (타입별 세부 면적·평면도는 공고 시 공개)", status: "공개값 / 평면 미정" },
              { label: "아파트 타입별 세대수", value: "84A 248 · 84B 124 · 84C 124 · 84D 124 · 103A 124 · 103B 124 (총 868세대)", status: "분양 자료 기준" },
              { label: "오피스텔 전용면적", value: "105㎡, 121㎡, 136㎡", status: "공개값" },
              { label: "대지면적 · 건축면적", value: "35,306.00㎡ · 12,278.4410㎡", status: "공개값" },
              { label: "주차대수", value: "총 3,124대 (APT 1,389대 · OT 1,695대 · 상업시설 40대)", status: "공개값" },
              { label: "상업시설", value: "피크원 53·아크원 43, 총 96개 점포 · 지상 1~2층 (1층 47 · 2층 49)", status: "분양 자료 기준" },
              { label: "시행 · 시공", value: "㈜청라스마트시티 · 대우건설", status: "공개값" },
              { label: "분양가", value: "미공개 (사업주체 표기: 분양가 상한제 적용단지)", status: "미정" },
              { label: "APT 입주자모집공고", value: "10월 중 OPEN 예정", status: "예정" },
              { label: "입주 시기", value: "2031년 입주 예정", status: "예정" },
            ]}
            faq={FAQ}
            links={[
              { to: "/pages/compare", label: "아파트·오피스텔 비교" },
              { to: "/pages/schedule", label: "분양 일정·청약 안내" },
              { to: "/pages/location", label: "입지환경" },
              { to: "/pages/contact", label: "견본주택·홍보관 오시는길" },
              { to: "/register", label: "사전고객등록" },
            ]}
            sources={[SRC_OFFICIAL, SRC_OFFICIAL_PREMIUM, SRC_APPLYHOME]}
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
