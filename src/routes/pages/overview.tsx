import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { SubNotice } from "@/components/notice";

export const Route = createFileRoute("/pages/overview")({
  component: OverviewPage,
  head: () => ({ meta: [{ title: "사업개요 | 청라 아크원 푸르지오" }] }),
});

function OverviewPage() {
  return (
    <SiteShell path="/pages/overview">
      <div className="page_content">
        <section className="page_container">
          <div className="overview_tab__content">
            <figure className="overview_image">
              <picture>
                <source media="(max-width: 1024px)" srcSet="/resources/img/sub/overview_apt_img_m.v4.jpg" />
                <img src="/resources/img/sub/overview_apt_img.v4.jpg" alt="" />
              </picture>
              <span className="overview_image__caption">이미지컷</span>
              <figcaption className="overview_image__text">
                <p>
                  압도적인 스케일
                  <br />
                  독보적인 프리미엄
                </p>
                <span className="overview_summary__line" />
                <h3>
                  청라에 다시없을 <br /> 완벽한 주거중심
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
                  지하 5층~지상 49층 총 6개동 1,855가구
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
