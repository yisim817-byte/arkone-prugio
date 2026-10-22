import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { ZoomButton } from "@/components/notice";
import { canonicalLinks } from "@/lib/seo-host";
import { GuideAnswer, GuideDetail } from "@/components/seo-guide";
import { SRC_APPLYHOME } from "@/lib/arkone-facts";
import { imgDims } from "@/components/img";
import { NoticeSpecial } from "@/components/notice-sections";

export const Route = createFileRoute("/pages/docspecial")({
  component: DocSpecialPage,
  head: () => ({
    meta: [
      { title: "청라 아크원 푸르지오 특별공급 안내 | 청약 자격" },
      { name: "description", content: "청라 아크원 푸르지오 특별공급 안내. 특별공급 11.02(월) 접수. 유형별 공급 물량·신청 자격은 2026.10.22(목) 게시된 입주자모집공고 기준이며, 청약홈 공고문으로 확인하세요." },
    ],
    links: canonicalLinks("/pages/docspecial"),
  }),
});

function DocSpecialPage() {
  const src = "/resources/img/sub/docspecial-guide.v4.webp";
  return (
    <SiteShell path="/pages/docspecial">
      <div className="page_content">
        <section className="page_container">
          <GuideAnswer title="청라 아크원 푸르지오 특별공급 안내 요약">
            <p>청라 아크원 푸르지오 특별공급은 11.02(월) 접수입니다. 유형별 공급 물량과 자격은 2026.10.22(목) 게시된 입주자모집공고 기준이며, 신청 전 청약홈 공고문을 확인하시기 바랍니다.</p>
          </GuideAnswer>
          <NoticeSpecial />
          <figure>
            <img src={src} alt="기관추천·다자녀·신혼·생애최초 자격표가 있는 특별공급 안내문" {...imgDims(src)} data-dims="" />
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
            sources={[SRC_APPLYHOME]}
          />
        </section>
      </div>
    </SiteShell>
  );
}
