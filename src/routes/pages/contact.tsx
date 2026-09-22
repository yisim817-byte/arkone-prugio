import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { SubNotice } from "@/components/notice";

export const Route = createFileRoute("/pages/contact")({
  component: ContactPage,
  head: () => ({ meta: [{ title: "오시는길 | 청라 아크원 푸르지오" }] }),
});

function MapLinks({ naver, kakao, label }: { naver: string; kakao: string; label: string }) {
  return (
    <div className="contact_location__links map-btns" aria-label={`${label} 지도 바로가기`}>
      <a href={naver} target="_blank" rel="noopener noreferrer" aria-label={`네이버 지도에서 ${label} 보기`}>
        <img src="/resources/img/common/ico_naver.svg" alt="" />
      </a>
      <a href={kakao} target="_blank" rel="noopener noreferrer" aria-label={`카카오 지도에서 ${label} 보기`}>
        <img src="/resources/img/common/ico_kko_map.svg" alt="" />
      </a>
    </div>
  );
}

function ContactPage() {
  return (
    <SiteShell path="/pages/contact">
      <div className="page_content">
        <section className="page_container">
          <div className="contact_map">
            <div className="contact_map__box">
              <figure className="contact_map__image">
                <img src="/resources/img/sub/contact_map_img_1.v4.jpg" alt="청라 아크원 푸르지오 현장과 견본주택 약도" />
              </figure>
              <div className="contact_map__locations">
                <article className="contact_location">
                  <div>
                    <h3>청라 아크원 푸르지오 현장</h3>
                    <address>인천광역시 서해구 청라동 86-1번지</address>
                  </div>
                  <MapLinks naver="https://naver.me/xSBYFSR0" kakao="https://kko.to/27AvJsaNys" label="현장" />
                </article>
                <article className="contact_location">
                  <div>
                    <h3>청라 아크원 푸르지오 견본주택</h3>
                    <address>인천광역시 서해구 청라동 87-1번지</address>
                  </div>
                  <MapLinks naver="https://naver.me/xNpQLQ3L" kakao="https://kko.to/06V9ttVXOK" label="견본주택" />
                </article>
              </div>
            </div>
            <div className="contact_map__box">
              <figure className="contact_map__image">
                <img src="/resources/img/sub/contact_map_img_2.v4.jpg" alt="청라 아크원 푸르지오 홍보관 약도" />
              </figure>
              <div className="contact_map__locations">
                <article className="contact_location">
                  <div>
                    <h3>청라 아크원 푸르지오 홍보관</h3>
                    <address>
                      인천광역시 서해구 중봉대로 586번길 19
                      <br />
                      홍익파크 1층 108,109호(스타벅스 옆)
                    </address>
                  </div>
                  <MapLinks naver="https://naver.me/xwmqyGWk" kakao="https://kko.to/hM9WpE-0fz" label="홍보관" />
                </article>
              </div>
            </div>
          </div>
          <SubNotice
            items={[
              "※ 현장, 견본주택 및 홍보관 위치는 반드시 주소를 확인하시고, 주변 도로 및 건물, 경로 등은 네이버, 카카오 지도를 통해 확인하시기 바랍니다.",
            ]}
          />
        </section>
      </div>
    </SiteShell>
  );
}
