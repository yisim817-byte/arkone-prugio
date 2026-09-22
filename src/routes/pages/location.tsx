import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { SubNotice, ZoomButton } from "@/components/notice";

export const Route = createFileRoute("/pages/location")({
  component: LocationPage,
  head: () => ({ meta: [{ title: "입지환경 | 청라 아크원 푸르지오" }] }),
});

function LocationPage() {
  return (
    <SiteShell path="/pages/location">
      <div className="page_content">
        <section className="page_container">
          <header className="location_intro">
            <p>청라의 기다림이 완성되는 곳,</p>
            <h3>푸르지오의 품격을 더하다</h3>
          </header>
          <div className="location_map">
            <figure className="location_map__image">
              <img src="/resources/img/sub/location_map_img.v4.jpg" alt="청라 센트럴 푸르지오 주변 교통 및 생활 인프라 지도" />
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
                  강남까지 바로 잇는 7호선 <br className="m-only" /> 국제업무단지역 초역세권<small>(예정)</small>, <br />{" "}
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
