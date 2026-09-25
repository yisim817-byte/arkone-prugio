import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { SubNotice } from "@/components/notice";

export const Route = createFileRoute("/pages/premium")({
  component: PremiumPage,
  head: () => ({
    meta: [
      { title: "프리미엄 | 청라 아크원 푸르지오" },
      { name: "description", content: "청라 아크원 푸르지오 프리미엄 안내. 단지 특징과 상품 구성 포인트를 소개합니다. 이미지는 소비자 이해를 돕기 위한 연출컷입니다." },
    ],
    links: [{ rel: "canonical", href: "https://www.arkone-prugio.site/pages/premium" }],
  }),
});

function Pic({
  src,
  m,
  alt,
}: {
  src: string;
  m: string;
  alt: string;
}) {
  return (
    <figure className="premium_image">
      <picture>
        <source media="(max-width: 1024px)" srcSet={m} />
        <img src={src} alt={alt} />
      </picture>
      <figcaption>이미지컷</figcaption>
    </figure>
  );
}

function PremiumPage() {
  return (
    <SiteShell path="/pages/premium">
      <div className="page_content">
        <section className="page_container">
          <header className="premium_intro">
            <p>공간의 특별함도 자부심의 높이도</p>
            <h3>정점을 넘어 완성된 라이프로</h3>
            <strong>청라 아크원 푸르지오</strong>
          </header>
          <div className="premium_features">
            <article className="premium_feature premium_feature-01">
              <div className="premium_feature__content">
                <span className="premium_feature__number">PREMIUM 01</span>
                <h3>
                  총 2,911가구 <br className="m-only" /> 푸르지오 브랜드타운
                </h3>
                <p>
                  최고 49층 총 2,911가구<small>(청라 피크원 푸르지오 포함)</small>로 <br /> 청라를 대표하는 푸르지오
                  대규모 브랜드타운
                </p>
              </div>
              <div className="premium_feature__images premium_feature__images-pair">
                <Pic src="/resources/img/sub/premium_01_img_1.v4.jpg" m="/resources/img/sub/premium_01_img_1_m.v4.jpg" alt="저녁 도시 전경" />
                <Pic src="/resources/img/sub/premium_01_img_2.v4.jpg" m="/resources/img/sub/premium_01_img_2_m.v4.jpg" alt="고층 세대에서 바깥을 바라보는 모습" />
              </div>
            </article>

            <article className="premium_feature premium_feature-02 premium_feature-reverse">
              <div className="premium_feature__content">
                <span className="premium_feature__number">PREMIUM 02</span>
                <h3>
                  국제업무단지의 <br className="m-only" /> 센트럴 라이프
                </h3>
                <p>
                  청라의 중심으로 완성되는
                  <br />
                  국제업무단지의 특별한 주거 가치
                </p>
              </div>
              <div className="premium_feature__images">
                <Pic src="/resources/img/sub/premium_02_img_1.v4.jpg" m="/resources/img/sub/premium_02_img_1_m.v4.jpg" alt="도심을 오가는 사람들의 모습" />
              </div>
            </article>

            <article className="premium_feature premium_feature-03">
              <div className="premium_feature__content">
                <span className="premium_feature__number">PREMIUM 03</span>
                <h3>오션 ∙ 시티뷰 조망 특화</h3>
                <p>
                  오션 ∙ 시티뷰를 동시에 누리는 <br /> 2면 or 3면 개방구조<small>(일부세대)</small>
                </p>
              </div>
              <div className="premium_feature__images premium_feature__images-stack">
                <Pic src="/resources/img/sub/premium_03_img_1.v4.jpg" m="/resources/img/sub/premium_03_img_1_m.v4.jpg" alt="바다 풍경이 보이는 모습" />
                <Pic src="/resources/img/sub/premium_03_img_2.v4.jpg" m="/resources/img/sub/premium_03_img_2_m.v4.jpg" alt="노을지는 바다 풍경이 보이는 모습" />
              </div>
            </article>

            <article className="premium_feature premium_feature-04 premium_feature-reverse">
              <div className="premium_feature__content">
                <span className="premium_feature__number">PREMIUM 04</span>
                <h3>
                  높은 희소가치와 <br className="m-only" /> 합리적 분양가
                </h3>
                <p>
                  청라가 기다려온 신규공급 <br /> 2017년 이후 10년만의 분양가 상한제 공급 아파트 <br />{" "}
                  <small>※ 500세대 이상 대단지 기준</small>
                </p>
              </div>
              <div className="premium_feature__images premium_feature__images-pair">
                <Pic src="/resources/img/sub/premium_04_img_1.v4.jpg" m="/resources/img/sub/premium_04_img_1_m.v4.jpg" alt="고급스러운 실내 이미지" />
                <Pic src="/resources/img/sub/premium_04_img_2.v4.jpg" m="/resources/img/sub/premium_04_img_2_m.v4.jpg" alt="프리미엄 실내 인테리어" />
              </div>
            </article>

            <article className="premium_feature premium_feature-05">
              <div className="premium_feature__content">
                <span className="premium_feature__number">PREMIUM 05</span>
                <h3>멀티 라이프 플랫폼</h3>
                <p>
                  팬트리 2개소 이상 제공
                  <br />
                  다양한 공간 활용의 멀티 발코니<small>(OT)</small>
                </p>
              </div>
              <div className="premium_feature__images premium_feature__images-pair">
                <Pic src="/resources/img/sub/premium_05_img_1.v4.jpg" m="/resources/img/sub/premium_05_img_1_m.v4.jpg" alt="" />
                <Pic src="/resources/img/sub/premium_05_img_2.v4.jpg" m="/resources/img/sub/premium_05_img_2_m.v4.jpg" alt="" />
              </div>
            </article>
          </div>
          <SubNotice items={["상기 이미지는 소비자의 이해를 돕기 위한 것으로 실제와 차이가 있을 수 있습니다."]} />
        </section>
      </div>
    </SiteShell>
  );
}
