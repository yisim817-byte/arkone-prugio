import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { SubNotice } from "@/components/notice";
import { canonicalLinks, faqJsonLd } from "@/lib/seo-host";
import { GuideAnswer, GuideDetail, type GuideFaq } from "@/components/seo-guide";
import { SRC_OFFICIAL_CONTACT } from "@/lib/arkone-facts";

const FAQ: GuideFaq[] = [
  {
    q: "청라 아크원 푸르지오 모델하우스(견본주택)는 어디에 있나요?",
    a: "견본주택 주소는 인천광역시 서해구 청라동 87-1번지입니다. 사업 현장 주소는 청라동 86-1번지이며, 이 페이지의 네이버·카카오 지도 버튼으로 경로를 확인할 수 있습니다.",
  },
  {
    q: "모델하우스는 언제 여나요?",
    a: "10월 중 OPEN 예정입니다. 세부 일정은 대표번호 1833-3872로 문의해 주세요. 사업주체 분양 홈페이지에도 '10월 OPEN 예정'으로 표기되어 있으며, 일정은 사업주체 사정에 따라 변경될 수 있습니다.",
  },
  {
    q: "견본주택 오픈 전에 상담받을 수 있는 곳이 있나요?",
    a: "홍보관(인천광역시 서해구 중봉대로 586번길 19 홍익파크 1층 108, 109호, 스타벅스 옆)에서 안내를 받을 수 있습니다. 운영 시간은 방문 전 대표번호 1833-3872로 확인해 주세요.",
  },
  {
    q: "방문 전에 무엇을 확인하면 좋을까요?",
    a: "방문 장소(견본주택·홍보관)의 주소와 운영 여부를 먼저 확인하고, 청약 자격과 일정은 입주자모집공고 게시 후 청약홈 공고문을 기준으로 확인하시기 바랍니다.",
  },
];

export const Route = createFileRoute("/pages/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "청라 아크원 푸르지오 모델하우스·홍보관 위치 | 오시는길" },
      { name: "description", content: "청라 아크원 푸르지오 견본주택(청라동 87-1번지) 10월 중 OPEN 예정. 현장·홍보관 주소와 지도, 대표번호 1833-3872 안내." },
    ],
    links: canonicalLinks("/pages/contact"),
    scripts: faqJsonLd(FAQ),
  }),
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
          <GuideAnswer title="청라 아크원 푸르지오 모델하우스·홍보관 안내">
            <p>청라 아크원 푸르지오 견본주택(모델하우스)은 인천광역시 서해구 청라동 87-1번지에 있으며, 10월 중 OPEN 예정입니다. 세부 일정은 대표번호 1833-3872로 문의해 주세요.</p>
            <p>사업 현장은 인천광역시 서해구 청라동 86-1번지이고, 홍보관은 중봉대로 586번길 19 홍익파크 1층 108, 109호(스타벅스 옆)입니다.</p>
            <p>일정과 운영 시간은 사업주체 사정에 따라 변경될 수 있으니 방문 전 대표번호 1833-3872로 확인해 주세요.</p>
          </GuideAnswer>
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
          <GuideDetail
            tableTitle="방문 장소별 주소와 상태"
            columns={["장소", "주소", "상태"]}
            rows={[
              { label: "견본주택(모델하우스)", value: "인천광역시 서해구 청라동 87-1번지 · 10월 중 OPEN 예정", status: "예정" },
              { label: "사업 현장", value: "인천광역시 서해구 청라동 86-1번지 (청라국제도시 주상복합용지 M5BL)", status: "공개값" },
              { label: "홍보관", value: "인천광역시 서해구 중봉대로 586번길 19 홍익파크 1층 108, 109호(스타벅스 옆)", status: "공개값" },
              { label: "운영 시간", value: "방문 전 대표번호 1833-3872로 확인", status: "미정" },
            ]}
            faq={FAQ}
            links={[
              { to: "/pages/schedule", label: "분양 일정·청약 안내" },
              { to: "/pages/overview", label: "분양 사업개요" },
              { to: "/pages/location", label: "입지환경" },
              { to: "/register", label: "사전고객등록" },
            ]}
            sources={[SRC_OFFICIAL_CONTACT]}
          />
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
