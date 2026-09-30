import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { ZoomButton } from "@/components/notice";
import { canonicalLinks } from "@/lib/seo-host";
import { GuideAnswer, GuideDetail } from "@/components/seo-guide";
import { SRC_APPLYHOME, SRC_SCHEDULE } from "@/lib/arkone-facts";

export const Route = createFileRoute("/pages/changeinfo")({
  component: ChangeInfoPage,
  head: () => ({
    meta: [
      { title: "변경된 청약제도 | 청라 아크원 푸르지오" },
      { name: "description", content: "변경된 청약제도 안내. 청라 아크원 푸르지오 청약 전 확인할 제도 변경 내용을 담았습니다. 세부 내용은 입주자모집공고를 확인하십시오." },
    ],
    links: canonicalLinks("/pages/changeinfo"),
  }),
});

function ChangeInfoPage() {
  const src = "/resources/img/sub/01_변경된_청약제도.v4.jpg";
  return (
    <SiteShell path="/pages/changeinfo">
      <div className="page_content">
        <section className="page_container">
          <GuideAnswer title="청약 전 확인할 청약제도 변경 사항">
            <p>이 페이지는 청약 전에 확인할 청약제도 변경 사항을 한 장의 안내 이미지로 정리한 것입니다. 이미지를 누르거나 '크게보기'로 확대해 보실 수 있습니다.</p>
            <p>청라 아크원 푸르지오에 적용되는 공급 유형, 자격 요건, 청약 일정은 입주자모집공고에서 확정되며 현재는 미정입니다. APT 입주자모집공고는 2026년 10월 15일(목) 예정입니다.</p>
          </GuideAnswer>
          <figure>
            <img src={src} alt="변경된 청약제도 안내" />
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
            sources={[SRC_APPLYHOME, SRC_SCHEDULE]}
          />
        </section>
      </div>
    </SiteShell>
  );
}
