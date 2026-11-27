import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { ZoomButton } from "@/components/notice";
import { canonicalLinks, faqJsonLd, isEnHost, tx } from "@/lib/seo-host";
import { META } from "@/lib/i18n/en";
import { GuideAnswer, GuideDetail, type GuideFaq } from "@/components/seo-guide";
import { SRC_APPLYHOME } from "@/lib/arkone-facts";
import { imgDims } from "@/components/img";
import { NoticeSpecial } from "@/components/notice-sections";

const FAQ_KO: GuideFaq[] = [
  { q: "특별공급 접수는 언제인가요?", a: "청라 아크원 푸르지오 특별공급 접수일은 11월 2일입니다. 물량과 자격은 2026년 10월 22일 공고가 기준입니다." },
  { q: "특별공급에도 분양가 상한제가 적용되나요?", a: "이 아파트는 분양가 상한제 적용 단지입니다. 유형별 자격과 배정은 입주자모집공고 23면부터 36면에서 확인합니다." },
  { q: "공급금액은 공고 어디에서 보나요?", a: "아파트 금액표는 공고 6면~20면입니다. 이 페이지에 없는 호실 값은 그 표를 봅니다." },
  { q: "특별공급 당첨 뒤 계약은 언제인가요?", a: "당첨자 계약은 11월 22일부터 24일까지 진행되었습니다. 날짜가 바뀌면 공고문이 우선합니다." },
  { q: "특별공급 경쟁률은 이 페이지에 있나요?", a: "경쟁률 숫자는 올리지 않습니다. 공고와 청약홈에서 봅니다." },
];

export const Route = createFileRoute("/pages/docspecial")({
  component: DocSpecialPage,
  head: () => ({
    meta: [
      { title: tx("청라 아크원 푸르지오 특별공급 안내 | 청약 자격", META.docspecial.title) },
      { name: "description", content: tx("청라 아크원 푸르지오 특별공급 안내. 11.02(월) 접수. 자격·물량은 2026.10.22 게시 입주자모집공고와 청약홈에서 확인하세요.", META.docspecial.desc) },
    ],
    links: canonicalLinks("/pages/docspecial"),
    scripts: isEnHost() ? [] : faqJsonLd(FAQ_KO, "/pages/docspecial"),
  }),
});

function DocSpecialPage() {
  const src = "/resources/img/sub/docspecial-guide.v4.webp";
  return (
    <SiteShell path="/pages/docspecial">
      <div className="page_content">
        <section className="page_container">
          <GuideAnswer title={tx("청라 아크원 푸르지오 특별공급 안내 요약", META.docspecial.h1)}>
            <p>{tx("청라 아크원 푸르지오 특별공급 접수일은 11월 2일입니다. 유형별 물량과 자격은 2026년 10월 22일 공고가 기준이고, 신청 전에 청약홈 공고를 확인합니다.", "Special supply for Cheongna Ark-One Prugio is accepted on 2 Nov. Volumes and eligibility follow the notice posted on 22 Oct 2026. Read the Applyhome notice before you apply.")}</p>
          </GuideAnswer>
          <NoticeSpecial />
          <figure>
            <img src={src} alt="청라 아크원 푸르지오 기관추천·다자녀·신혼·생애최초 자격표가 있는 특별공급 안내문" {...imgDims(src)} data-dims="" />
          </figure>
          <ZoomButton href={src} />
          <GuideDetail
            links={[
              { to: "/pages/schedule", label: "분양 일정·청약 안내" },
              { to: "/pages/changeinfo", label: "변경된 청약제도" },
              { to: "/pages/docspecial", label: "특별공급 안내" },
              { to: "/pages/docnormal", label: "일반공급 안내" },
              { to: "/pages/overview", label: "분양 사업개요" },
            ].filter((l) => l.to !== "/pages/docspecial")}
            sources={[{ ...SRC_APPLYHOME, date: isEnHost() ? SRC_APPLYHOME.date : "2026-10-29" }]}
            faq={isEnHost() ? undefined : FAQ_KO}
          />
        </section>
      </div>
    </SiteShell>
  );
}
