import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { ZoomButton } from "@/components/notice";
import { canonicalLinks, faqJsonLd, isEnHost, tx } from "@/lib/seo-host";
import { META } from "@/lib/i18n/en";
import { GuideAnswer, GuideDetail, type GuideFaq } from "@/components/seo-guide";
import { SRC_APPLYHOME } from "@/lib/arkone-facts";
import { imgDims } from "@/components/img";
import { NoticeSpecial } from "@/components/notice-sections";

const FAQ_EN: GuideFaq[] = [
  { q: "When was special supply accepted?", a: "Special supply for Cheongna Ark-One Prugio was accepted on 2 Nov. Volumes and eligibility follow the recruitment notice posted on 22 Oct 2026." },
  { q: "Does the price cap also apply to special supply?", a: "This apartment is under the price cap. Eligibility and allocation by type are on pages 23 to 36 of the recruitment notice." },
  { q: "Where is the supply amount in the notice?", a: "The apartment supply-amount table is on pages 6 to 20 of the recruitment notice. Unit amounts that are not on this page are in that table." },
  { q: "When is the contract after a special-supply win?", a: "Winner contracts run from Sunday 22 Nov to Tuesday 24 Nov. If the schedule changes, the recruitment notice prevails." },
  { q: "Is the special-supply competition rate on this page?", a: "Competition rates are not listed. Check the recruitment notice and Applyhome." },
];

const FAQ_KO: GuideFaq[] = [
  { q: "특별공급 접수는 언제인가요?", a: "청라 아크원 푸르지오 특별공급 접수는 11.02(월)입니다. 물량과 자격은 2026.10.22에 게시된 입주자모집공고가 기준입니다." },
  { q: "특별공급에도 분양가 상한제가 적용되나요?", a: "이 아파트는 분양가 상한제 적용 단지입니다. 유형별 자격과 배정은 입주자모집공고 23면부터 36면에서 확인합니다." },
  { q: "공급금액은 공고 어디에서 보나요?", a: "아파트 공급금액표는 입주자모집공고문 6면부터 20면에 있습니다. 이 페이지에 없는 호실 금액은 그 표에서 확인합니다." },
  { q: "특별공급 당첨 뒤 계약은 언제인가요?", a: "당첨자 계약은 11.22(일)부터 11.24(화)까지입니다. 일정이 바뀌면 입주자모집공고문이 우선합니다." },
  { q: "특별공급 경쟁률은 이 페이지에 있나요?", a: "경쟁률은 적지 않습니다. 입주자모집공고문과 청약홈에서 확인하세요." },
];

export const Route = createFileRoute("/pages/docspecial")({
  component: DocSpecialPage,
  head: () => ({
    meta: [
      { title: tx("청라 아크원 푸르지오 특별공급 안내 | 청약 자격", META.docspecial.title) },
      { name: "description", content: tx("청라 아크원 푸르지오 특별공급 안내. 11.02(월) 접수. 자격·물량은 2026.10.22 게시 입주자모집공고와 청약홈에서 확인하세요.", META.docspecial.desc) },
    ],
    links: canonicalLinks("/pages/docspecial"),
    scripts: faqJsonLd(tx(FAQ_KO, FAQ_EN), "/pages/docspecial"),
  }),
});

function DocSpecialPage() {
  const src = "/resources/img/sub/docspecial-guide.v4.webp";
  return (
    <SiteShell path="/pages/docspecial">
      <div className="page_content">
        <section className="page_container">
          <GuideAnswer title={tx("청라 아크원 푸르지오 특별공급 안내 요약", META.docspecial.h1)}>
            <p>{tx("특별공급 접수는 11월 2일 월요일이었습니다. 유형별 물량과 자격의 원문은 2026년 10월 22일 목요일 공고이고, 신청 전에는 청약홈의 그 공고를 봅니다.", "Special supply was accepted on Monday 2 Nov. Volumes and eligibility are in the notice posted Thursday 22 Oct 2026. Read that Applyhome notice before you apply.")}</p>
          </GuideAnswer>
          <NoticeSpecial />
          <figure>
            <img src={src} alt="청라 아크원 푸르지오 기관추천·다자녀·신혼·생애최초 자격표가 있는 특별공급 안내문" {...imgDims(src)} data-dims="" />
          </figure>
          <ZoomButton href={src} />
          <GuideDetail
            links={[
              { to: "/pages/schedule", label: tx("분양 일정·청약 안내", "Sale schedule") },
              { to: "/pages/changeinfo", label: tx("변경된 청약제도", "Application changes") },
              { to: "/pages/docspecial", label: tx("특별공급 안내", "Special supply") },
              { to: "/pages/docnormal", label: tx("일반공급 안내", "General supply") },
              { to: "/pages/overview", label: tx("분양 사업개요", "Overview") },
            ].filter((l) => l.to !== "/pages/docspecial")}
            sources={[{ ...SRC_APPLYHOME, date: isEnHost() ? SRC_APPLYHOME.date : "2026-10-29" }]}
            faq={tx(FAQ_KO, FAQ_EN)}
          />
          <p>{tx("출처: 2026.10.22 게시 입주자모집공고(청약홈) · 확인 기준일 2026-11-21", "Source: the 22 Oct 2026 recruitment notice on Applyhome. Checked 2026-11-21.")}</p>
        </section>
      </div>
    </SiteShell>
  );
}
