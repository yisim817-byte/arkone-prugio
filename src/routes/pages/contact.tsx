import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { SubNotice } from "@/components/notice";
import { canonicalLinks, faqJsonLd, isEnHost, tx } from "@/lib/seo-host";
import { GuideAnswer, GuideDetail, type GuideFaq } from "@/components/seo-guide";
import { FAQ_CONTACT, META } from "@/lib/i18n/en";
import { imgDims } from "@/components/img";

const FAQ: GuideFaq[] = [
  {
    q: "청라 아크원 푸르지오 모델하우스(견본주택)는 어디에 있나요?",
    a: "위치는 페이지의 모델하우스 약도를 참고해 주시고, 방문 전 대표번호로 예약해 주세요.",
  },
  {
    q: "모델하우스는 언제 여나요?",
    a: "견본주택은 별도 공지 시까지 운영합니다. 견본주택에는 84A·103A 유니트가 설치되어 있습니다. 방문 전 대표번호 1833-3872로 확인해 주세요.",
  },
  {
    q: "방문 전에 무엇을 확인하면 좋을까요?",
    a: "방문 전 대표번호로 예약해 주시고, 청약 자격과 일정은 2026.10.22(목) 게시된 입주자모집공고문(청약홈)을 기준으로 확인하시기 바랍니다.",
  },
];

function contactFaq(): GuideFaq[] {
  return tx(FAQ, FAQ_CONTACT);
}

export const Route = createFileRoute("/pages/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: tx("청라 아크원 푸르지오 모델하우스(견본주택) 방문 | 오시는길", META.contact.title) },
      { name: "description", content: tx("청라 아크원 푸르지오 모델하우스(견본주택) 방문. 별도 공지 시까지 운영 · 대표번호 1833-3872.", META.contact.desc) },
    ],
    links: canonicalLinks("/pages/contact"),
    scripts: faqJsonLd(contactFaq(), "/pages/contact"),
  }),
});

function ContactPage() {
  return (
    <SiteShell path="/pages/contact">
      <div className="page_content">
        <section className="page_container">
          <GuideAnswer title={tx("청라 아크원 푸르지오 모델하우스(견본주택) 안내", META.contact.h1)}>
            {isEnHost() ? (
              <>
                <p>The model house is open until further notice. The recruitment notice was posted on 22 Oct 2026. Call 1833-3872 for the details.</p>
                <p>Cheongna Ark-One Prugio has Apt 868 units and officetel 987 rooms. Contracts run from 22 to 24 Nov 2026.</p>
                <p>Source: <a href="https://www.applyhome.co.kr" target="_blank" rel="noopener noreferrer">Applyhome</a> recruitment notice (posted 22 Oct 2026) · checked 2026-10-29</p>
                <p>See the model house map on this page and call 1833-3872 before you visit.</p>
                <p>Hours can change. Call 1833-3872 before you visit.</p>
              </>
            ) : (
              <>
            <p>청라 아크원 푸르지오 견본주택(모델하우스)은 별도 공지 시까지 운영합니다(입주자모집공고 2026.10.22(목) 게시). 세부 일정은 대표번호 1833-3872로 문의해 주세요.</p>
            <p>단지는 아파트 868세대와 오피스텔 987실입니다. 계약은 2026년 11월 22일부터 24일까지입니다.</p>
            <p>출처: <a href="https://www.applyhome.co.kr" target="_blank" rel="noopener noreferrer">청약홈</a> 입주자모집공고(2026.10.22 게시) · 확인 기준일 2026-10-29</p>
            <p>위치는 페이지의 모델하우스 약도를 참고해 주시고, 방문 전 대표번호로 예약해 주세요.</p>
            <p>일정과 운영 시간은 사업주체 사정에 따라 변경될 수 있으니 방문 전 대표번호 1833-3872로 확인해 주세요.</p>
              </>
            )}
          </GuideAnswer>
          <div className="contact_map">
            <div className="contact_map__box">
              <figure className="contact_map__image">
                <img src="/resources/img/sub/contact_map_img_1.v4.jpg" alt="청라 아크원 푸르지오 모델하우스 약도" {...imgDims("/resources/img/sub/contact_map_img_1.v4.jpg")} data-dims="" />
              </figure>
              <div className="contact_map__locations">
                <article className="contact_location">
                  <div>
                    <h2>{tx("모델하우스(견본주택)", "Model house")}</h2>
                    <p>방문 전 대표번호로 예약해 주세요</p>
                  </div>
                </article>
              </div>
            </div>
          </div>
          <GuideDetail
            tableTitle="방문 안내"
            columns={["항목", "안내", "상태"]}
            rows={[
              { label: "운영 시간", value: "방문 전 대표번호 1833-3872로 확인", status: "미정" },
            ]}
            faq={contactFaq()}
            links={[
              { to: "/pages/schedule", label: "분양 일정·청약 안내" },
              { to: "/pages/overview", label: "분양 사업개요" },
              { to: "/pages/location", label: "입지환경" },
              { to: "/register", label: "사전고객등록" },
            ]}
          />
          <SubNotice
            items={[
              "※ 방문 전 대표번호로 예약해 주세요.",
            ]}
          />
        </section>
      </div>
    </SiteShell>
  );
}
