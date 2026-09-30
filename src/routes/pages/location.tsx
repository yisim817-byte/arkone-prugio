import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { SubNotice, ZoomButton } from "@/components/notice";
import { canonicalLinks, faqJsonLd } from "@/lib/seo-host";
import { GuideAnswer, GuideDetail, type GuideFaq } from "@/components/seo-guide";
import { SRC_OFFICIAL } from "@/lib/arkone-facts";

const FAQ: GuideFaq[] = [
  {
    q: "청라 아크원 푸르지오는 어디에 있나요?",
    a: "인천광역시 서해구 청라동 86-1번지, 청라국제도시 국제업무단지 내 주상복합용지 M5BL입니다. 2026년 7월 1일 행정구역 개편으로 인천 서구 청라동 일대는 서해구에 속합니다.",
  },
  {
    q: "7호선 역이 가까운가요?",
    a: "서울 지하철 7호선 청라연장선 국제업무단지역은 예정 역이며 개통 시기는 미정입니다. 본 사이트는 개통 연도, 거리, 소요 시간을 안내하지 않습니다.",
  },
  {
    q: "청라하늘대교(제3연륙교)는 개통했나요?",
    a: "네. 청라하늘대교(제3연륙교)는 2026년 1월 5일 개통했고, 2026년 1월 14일 명칭이 확정되었다고 보도되었습니다.",
  },
  {
    q: "학교 배정은 어떻게 되나요?",
    a: "학교 신설은 예정·계획 단계이며, 실제 배정은 해당 지역 교육지원청 기준으로 결정됩니다. 입주 전 교육지원청에 확인하시기 바랍니다.",
  },
];

export const Route = createFileRoute("/pages/location")({
  component: LocationPage,
  head: () => ({
    meta: [
      { title: "청라 아크원 푸르지오 입지 | 청라국제도시 국제업무단지 M5BL" },
      { name: "description", content: "청라 아크원 푸르지오 입지. 인천 서해구 청라동 86-1번지 청라국제도시 국제업무단지 M5BL, 청라하늘대교 개통, 7호선 청라연장선 국제업무단지역(예정·개통 시기 미정) 등 교통·생활·교육 환경과 근거 자료." },
    ],
    links: canonicalLinks("/pages/location"),
    scripts: faqJsonLd(FAQ),
  }),
});

function LocationPage() {
  return (
    <SiteShell path="/pages/location">
      <div className="page_content">
        <section className="page_container">
          <GuideAnswer title="청라 아크원 푸르지오 입지 요약">
            <p>청라 아크원 푸르지오는 청라국제도시 국제업무단지 내 주상복합용지 M5BL(인천광역시 서해구 청라동 86-1번지)에 위치합니다.</p>
            <p>교통은 2026년 1월 개통한 청라하늘대교와 제2외곽순환도로를 이용할 수 있고, 서울 지하철 7호선 청라연장선 국제업무단지역은 예정 역으로 개통 시기는 미정입니다.</p>
            <p>주변에는 스타필드 청라(2028년 개장 예정), 서울아산청라병원(2029년 예정), 하나드림타운(2026년 예정) 등 개발 계획이 있으며, 각 일정은 관계 기관 사정에 따라 변경될 수 있습니다.</p>
            <p>아래 표에 항목별 상태(확정·예정·계획·미정)와 근거 자료를 정리했습니다.</p>
          </GuideAnswer>
          <header className="location_intro">
            <p>청라의 기다림이 완성되는 곳,</p>
            <h3>푸르지오의 품격을 더하다</h3>
          </header>
          <div className="location_map">
            <figure className="location_map__image">
              <img src="/resources/img/sub/location_map_img.v4.jpg" alt="청라 아크원 푸르지오 주변 교통 및 생활 인프라 지도" />
            </figure>
            <ZoomButton href="/resources/img/sub/location_map_img.v4.jpg" />
          </div>
          <section className="location_benefits">
            <h3 className="location_benefits__title">
              CENTRAL <br className="m-only" /> LOCATION
              <br />
              PRUGIO
            </h3>
            <div className="location_benefits__grid">
              <article className="location_benefit location_benefit-traffic">
                <span className="location_benefit__icon" />
                <h4>서울-인천-경기를 잇는 쾌속교통망</h4>
                <p>
                  서울7호선 청라연장선 <br className="m-only" /> 국제업무단지역<small>(예정·개통 시기 미정)</small>, <br />{" "}
                  GTX-D·E<small>(계획)</small>, <br className="m-only" /> 청라하늘대교 개통, 제2외곽순환도로 등
                </p>
              </article>
              <article className="location_benefit location_benefit-vision">
                <span className="location_benefit__icon" />
                <h4>완성되고 있는 핵심 개발비전</h4>
                <p>
                  하나드림타운<small>('26년 예정)</small>, <br className="m-only" /> 영상문화복합단지<small>('31년 계획)</small>,{" "}
                  <br />
                  인천로봇랜드<small>(예정)</small>, <br className="m-only" /> 청라시티타워<small>(계획)</small> 등
                </p>
              </article>
              <article className="location_benefit location_benefit-living">
                <span className="location_benefit__icon" />
                <h4>눈앞에 다가온 트렌디한 생활특권</h4>
                <p>
                  복합쇼핑몰+돔구장 형태의 <br className="m-only" /> 스타필드 청라<small>(`28년 개장 예정)</small>,
                  <br /> 서울아산청라병원<small>('29년 예정)</small>, <br className="m-only" /> 코스트코 청라점 등
                </p>
              </article>
              <article className="location_benefit location_benefit-edu">
                <span className="location_benefit__icon" />
                <h4>단지 앞 안전한 통학길 안심 교육환경</h4>
                <p>
                  도보 5분 초교 신설<small>(예정)</small>, 중교 신설<small>(계획)</small>, <br /> 도보거리 경연초·중교,{" "}
                  <br className="m-only" />
                  청라달튼외국인학교
                </p>
              </article>
            </div>
          </section>
          <GuideDetail
            tableTitle="청라 아크원 푸르지오 주변 입지 항목별 상태"
            columns={["항목", "내용 · 근거", "상태"]}
            rows={[
              { label: "위치", value: "인천광역시 서해구 청라동 86-1번지, 청라국제도시 주상복합용지 M5BL", status: "공개값" },
              { label: "청라하늘대교(제3연륙교)", value: "2026년 1월 5일 개통, 1월 14일 명칭 확정 (경향신문 2026-01-14 보도)", status: "확정" },
              { label: "서울 7호선 청라연장선 국제업무단지역", value: "대도시권광역교통위원회 고시 제2022-01호", status: "예정 · 개통 시기 미정" },
              { label: "GTX-D·E", value: "계획 단계 노선", status: "계획" },
              { label: "스타필드 청라(돔구장 복합)", value: "인천시 보도자료 (2025.1.13)", status: "2028년 개장 예정" },
              { label: "서울아산청라병원", value: "인천경제청 보도자료 (2025.1.2)", status: "2029년 예정" },
              { label: "하나드림타운", value: "인천경제청 보도자료 (2026.5.26)", status: "2026년 예정" },
              { label: "영상문화복합단지", value: "인천경제자유구역청 공고 제2022-176호", status: "2031년 계획" },
              { label: "학교", value: "초등학교 신설(예정), 중학교 신설(계획) — 배정은 교육지원청 기준", status: "예정·계획" },
              { label: "행정구역", value: "2026년 7월 1일부 인천 서구 → 서해구(청라동 포함)", status: "확정" },
            ]}
            faq={FAQ}
            links={[
              { to: "/pages/overview", label: "분양 사업개요" },
              { to: "/pages/brand", label: "청라 개발 히스토리" },
              { to: "/pages/contact", label: "견본주택·홍보관 오시는길" },
              { to: "/pages/schedule", label: "분양 일정·청약 안내" },
              { to: "/register", label: "사전고객등록" },
            ]}
            sources={[
              SRC_OFFICIAL,
              { label: "경향신문 「이름 없던 인천 제3연륙교 명칭 ‘청라하늘대교’로 최종 확정」", href: "https://www.khan.co.kr/article/202601141710001", date: "2026-01-14" },
              { label: "인천광역시 행정구역 개편(서해구·검단구) 안내", href: "https://www.incheon.go.kr/IC01070101", date: "2026-07-01" },
            ]}
          />
          <SubNotice
            items={[
              "본 홈페이지에 사용된 CG 및 일러스트, 이미지 등은 소비자의 이해를 돕기 위한 것으로 실제와 다를 수 있습니다.",
              "본 홈페이지에 표기된 개발계획 및 각종 시설(예정) 등은 추진 예정, 계획 중인 사항으로 인·허가 과정 및 관계 기관의 사업추진 중 변경, 지연, 취소될 수 있으며 당사와는 무관합니다.",
              "본 홈페이지의 내용은 인·허가 과정상 변경될 수 있으니 계약 시 주요 내용을 반드시 확인하시기 바랍니다.",
              "본 홈페이지는 인쇄 과정상 오·탈자가 있을 수 있습니다.",
              "본 홈페이지의 교통시설, 생활시설, 교육시설 및 주변현황 등은 실제와 다소 다를 수 있으므로 현장을 방문하여 확인하시기 바랍니다.",
              "학교 배정에 관한 자세한 사항은 해당 지역 교육지원청에 문의하여 확인하시기 바랍니다.",
              "서울 지하철 7호선 청라 연장선(예정): 대도시권광역교통위원회 고시 제2022-01호",
              "9호선 직결(계획): 보도자료: 인천시의회 신성영 의원, 공항철도-9호선 직결 합의 환영 (2023.11.21 행정안전전문위원실 소관)",
              "인천로봇랜드(28년 예정): 산업통상자원부고시 제2024-199호",
              "서울아산청라병원(29년 예정): 보도자료: 인천경제청, 서울아산청라병원 건축 허가 승인 (2025.1. 2)",
              "돔구장&스타필드 청라(28년 개장 예정): 보도자료: 인천시, 청라국제도시 스타필드청라 현장 점검 (2025. 1. 13)",
              "하나드림타운(26년 예정): 보도자료: 인천경제청-하나금융, 15년의 신의(信義)가 일궈낸 ‘청라 금융 시대’ (2026. 5. 26)",
              "청라시티타워(계획): 보도자료: 송도·청라 초고층 빌딩.. 계획 높이로 확정 (2024.12.26)",
              "영상문화복합단지(31년 계획) :인천경제자유구역청 공고 제2022-176호",
              "I-CON City(계획): 보도자료: 인천경제청, 청라 I-CON City 추진 양해각서 체결 (2026.01.21)",
            ]}
          />
        </section>
      </div>
    </SiteShell>
  );
}
