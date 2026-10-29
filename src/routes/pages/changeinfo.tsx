import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { ZoomButton } from "@/components/notice";
import { canonicalLinks, faqJsonLd, isEnHost, tx } from "@/lib/seo-host";
import { META } from "@/lib/i18n/en";
import { GuideAnswer, GuideDetail, type GuideFaq } from "@/components/seo-guide";
import { SRC_APPLYHOME } from "@/lib/arkone-facts";
import { imgDims } from "@/components/img";

const FAQ_KO: GuideFaq[] = [
  { q: "바뀐 청약 일정은 무엇을 기준으로 하나요?", a: "청라 아크원 푸르지오 청약 일정은 2026.10.22에 게시된 입주자모집공고 기준입니다. 특별공급은 11.02이고 1순위는 11.03이며 2순위는 11.04입니다." },
  { q: "분양가 상한제 적용 단지인가요?", a: "청라 아크원 푸르지오 아파트는 분양가 상한제가 적용됩니다. 예상 가격이나 시세는 적지 않습니다." },
  { q: "당첨 후 계약일은 언제인가요?", a: "계약은 11.22부터 11.24까지입니다. 당첨자 발표는 11.10입니다." },
  { q: "견본주택은 언제 문을 열나요?", a: "견본주택 GRAND OPEN은 10.30(금)입니다. 장소는 청라동 87-1입니다." },
  { q: "무순위 세대수나 경쟁률도 안내하나요?", a: "무순위 세대수와 경쟁률은 이 페이지에 없습니다. 입주자모집공고문과 청약홈에서 확인하세요." },
];

export const Route = createFileRoute("/pages/changeinfo")({
  component: ChangeInfoPage,
  head: () => ({
    meta: [
      { title: tx("청라 아크원 푸르지오 청약제도 변경사항 | 청약안내", META.changeinfo.title) },
      { name: "description", content: tx("청라 아크원 푸르지오 청약 전 확인할 청약제도 변경 내용. 공급 유형·자격·청약 일정은 2026.10.22(목) 게시된 입주자모집공고 기준입니다.", META.changeinfo.desc) },
    ],
    links: canonicalLinks("/pages/changeinfo"),
    scripts: isEnHost() ? [] : faqJsonLd(FAQ_KO),
  }),
});

function ChangeInfoPage() {
  const src = "/resources/img/sub/changeinfo-guide.v4.webp";
  return (
    <SiteShell path="/pages/changeinfo">
      <div className="page_content">
        <section className="page_container">
          <GuideAnswer title={tx("청라 아크원 푸르지오 청약 전 확인할 청약제도 변경 사항", META.changeinfo.h1)}>
            <p>{tx("청라 아크원 푸르지오에 적용되는 공급 유형·자격 요건·청약 일정은 2026.10.22(목) 게시된 입주자모집공고 기준으로 청약 일정·일반공급·특별공급 안내에 정리했습니다. 청라 아크원 푸르지오는 입주자모집공고 게시 2026.10.22(목) · 견본주택 GRAND OPEN 10.30(금)입니다. 세부 일정은 대표번호 1833-3872로 문의해 주세요.", "Supply type eligibility and the application schedule for Cheongna Ark-One Prugio follow the recruitment notice posted on 22 Oct 2026. The notice was posted on 22 Oct 2026 and the model house grand opening is 30 Oct. Call 1833-3872 for details.")}</p>
          </GuideAnswer>
          <figure>
            <img src={src} alt="신생아·신혼·생애최초 변경 전후를 적은 청약제도 안내문" {...imgDims(src)} data-dims="" />
          </figure>
          <ZoomButton href={src} />
          <GuideDetail
            links={[
              { to: "/pages/schedule", label: "분양 일정·청약 안내" },
              { to: "/pages/changeinfo", label: "변경된 청약제도" },
              { to: "/pages/docspecial", label: "특별공급 안내" },
              { to: "/pages/docnormal", label: "일반공급 안내" },
              { to: "/pages/overview", label: "분양 사업개요" },
            ].filter((l) => l.to !== "/pages/changeinfo")}
            sources={[{ ...SRC_APPLYHOME, date: isEnHost() ? SRC_APPLYHOME.date : "2026-10-29" }]}
            faq={isEnHost() ? undefined : FAQ_KO}
          />
        </section>
      </div>
    </SiteShell>
  );
}
