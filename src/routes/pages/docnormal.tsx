import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { ZoomButton } from "@/components/notice";
import { canonicalLinks } from "@/lib/seo-host";
import { GuideAnswer, GuideDetail } from "@/components/seo-guide";
import { SRC_APPLYHOME } from "@/lib/arkone-facts";
import { imgDims } from "@/components/img";
import { NoticeEligibility } from "@/components/notice-sections";

export const Route = createFileRoute("/pages/docnormal")({
  component: DocNormalPage,
  head: () => ({
    meta: [
      { title: "청라 아크원 푸르지오 일반공급 안내 | 순위·접수" },
      { name: "description", content: "청라 아크원 푸르지오 일반공급 안내. 1순위 11.03(화) · 2순위 11.04(수) · 당첨자 발표 11.10(화). 2026.10.22(목) 게시된 입주자모집공고 기준이며, 청약홈 공고문으로 확인하세요." },
    ],
    links: canonicalLinks("/pages/docnormal"),
  }),
});

function DocNormalPage() {
  const src = "/resources/img/sub/02_일반공급.v4.webp";
  return (
    <SiteShell path="/pages/docnormal">
      <div className="page_content">
        <section className="page_container">
          <GuideAnswer title="청라 아크원 푸르지오 일반공급 안내 요약">
            <p>청라 아크원 푸르지오 일반공급은 1순위 11.03(화), 2순위 11.04(수) 접수이며 당첨자 발표는 11.10(화)입니다. 2026.10.22(목) 게시된 입주자모집공고 기준이며, 신청 전 청약홈 공고문을 확인하시기 바랍니다.</p>
          </GuideAnswer>
          <NoticeEligibility />
            <p>특별공급은 1세대당 평생 1회로 제한됩니다. 이 단지의 청약 자격·공급 비율·일정은 2026.10.22(목) 게시된 입주자모집공고문(청약홈)으로 확인할 수 있습니다.</p>
          <figure>
            <img src={src} alt="청약 전 확인사항과 예치금액 표를 담은 일반공급 안내문" {...imgDims(src)} data-dims="" />
          </figure>
          <ZoomButton href={src} />
          <GuideDetail
            links={[
              { to: "/pages/schedule", label: "분양 일정·청약 안내" },
              { to: "/pages/changeinfo", label: "변경된 청약제도" },
              { to: "/pages/docspecial", label: "특별공급 안내" },
              { to: "/pages/docnormal", label: "일반공급 안내" },
              { to: "/pages/overview", label: "분양 사업개요" },
            ].filter((l) => l.to !== "/pages/docnormal")}
            sources={[SRC_APPLYHOME]}
          />
        </section>
      </div>
    </SiteShell>
  );
}
