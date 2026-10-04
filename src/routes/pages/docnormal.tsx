import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { ZoomButton } from "@/components/notice";
import { canonicalLinks } from "@/lib/seo-host";
import { GuideAnswer, GuideDetail } from "@/components/seo-guide";
import { SRC_APPLYHOME } from "@/lib/arkone-facts";

export const Route = createFileRoute("/pages/docnormal")({
  component: DocNormalPage,
  head: () => ({
    meta: [
      { title: "일반공급 안내 | 청라 아크원 푸르지오" },
      { name: "description", content: "청라 아크원 푸르지오 일반공급 안내. 신청 자격 등 세부 내용은 입주자모집공고를 기준으로 확인하십시오." },
    ],
    links: canonicalLinks("/pages/docnormal"),
  }),
});

function DocNormalPage() {
  const src = "/resources/img/sub/02_일반공급.v4.jpg";
  return (
    <SiteShell path="/pages/docnormal">
      <div className="page_content">
        <section className="page_container">
          <GuideAnswer title="일반공급 안내 요약">
            <p>청라 아크원 푸르지오의 일반공급 물량, 순위별 접수일, 당첨자 발표일은 입주자모집공고에서 확정되며 현재는 미정입니다. 신청 전 청약홈에 게시되는 공고문을 기준으로 확인하시기 바랍니다.</p>
          </GuideAnswer>
          <figure>
            <img src={src} alt="일반공급 안내" />
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
