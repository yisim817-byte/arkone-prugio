import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { SubNotice } from "@/components/notice";
import { canonicalLinks } from "@/lib/seo-host";
import { imgDims } from "@/components/img";

export const Route = createFileRoute("/pages/premium")({
  component: PremiumPage,
  head: () => ({
    meta: [
      { title: "청라 아크원 푸르지오 프리미엄 | 상품 특징 안내" },
      { name: "description", content: "청라 아크원 푸르지오 프리미엄. 2,911세대·실 브랜드타운, 오션·시티뷰(일부 세대), 분양가 상한제 적용 등 사업주체 공개 상품 특징을 정리했습니다." },
    ],
    links: canonicalLinks("/pages/premium"),
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
        <img src={src} alt={alt} {...imgDims(src)} data-dims="" />
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
          {/* SEO_PUSH 2026-10-06 P1-1: 페이지 고유 H1 (title 앞부분) */}
          <h1 className="page-h1">청라 아크원 푸르지오 프리미엄</h1>
          <header className="premium_intro">
            <p>청라 아크원 푸르지오 상품 안내</p>
            <h2>주요 상품 특징</h2>
            <strong>청라 아크원 푸르지오</strong>
          </header>
          <div className="premium_features">
            <article className="premium_feature premium_feature-01">
              <div className="premium_feature__content">
                <span className="premium_feature__number">PREMIUM 01</span>
                <h2>
                  총 2,911세대·실 <br className="m-only" /> 푸르지오 브랜드타운
                </h2>
                <p>
                  최고 49층 총 2,911세대·실<small>(청라 피크원 푸르지오 포함)</small>로 <br /> 청라국제업무단지 푸르지오
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
                <h2>
                  국제업무단지의 <br className="m-only" /> 센트럴 라이프
                </h2>
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
                <h2>오션 ∙ 시티뷰 조망 특화</h2>
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
                <h2>
                  분양가 상한제 <br className="m-only" /> 적용 아파트
                </h2>
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
                <h2>멀티 라이프 플랫폼</h2>
                <p>
                  팬트리 2개소 이상 제공
                  <br />
                  다양한 공간 활용의 멀티 발코니<small>(OT)</small>
                </p>
              </div>
              <div className="premium_feature__images premium_feature__images-pair">
                <Pic src="/resources/img/sub/premium_05_img_1.v4.jpg" m="/resources/img/sub/premium_05_img_1_m.v4.jpg" alt="멀티 발코니 공간 활용 이미지컷(CG)" />
                <Pic src="/resources/img/sub/premium_05_img_2.v4.jpg" m="/resources/img/sub/premium_05_img_2_m.v4.jpg" alt="팬트리 수납 공간 이미지컷(CG)" />
              </div>
            </article>
          </div>
          <SubNotice items={["상기 이미지는 소비자의 이해를 돕기 위한 것으로 실제와 차이가 있을 수 있습니다."]} />
        </section>
      </div>
    </SiteShell>
  );
}
