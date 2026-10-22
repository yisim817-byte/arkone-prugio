import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { ZoomButton } from "@/components/notice";
import { canonicalLinks } from "@/lib/seo-host";
import { GuideAnswer, GuideDetail } from "@/components/seo-guide";
import { SRC_APPLYHOME } from "@/lib/arkone-facts";
import { imgDims } from "@/components/img";

export const Route = createFileRoute("/pages/changeinfo")({
  component: ChangeInfoPage,
  head: () => ({
    meta: [
      { title: "청라 아크원 푸르지오 청약제도 변경사항 | 청약안내" },
      { name: "description", content: "청라 아크원 푸르지오 청약 전 확인할 청약제도 변경 내용. 공급 유형·자격·청약 일정은 2026.10.22(목) 게시된 입주자모집공고 기준입니다." },
    ],
    links: canonicalLinks("/pages/changeinfo"),
  }),
});

function ChangeInfoPage() {
  const src = "/resources/img/sub/changeinfo-guide.v4.webp";
  return (
    <SiteShell path="/pages/changeinfo">
      <div className="page_content">
        <section className="page_container">
          <GuideAnswer title="청라 아크원 푸르지오 청약 전 확인할 청약제도 변경 사항">
            <p>청라 아크원 푸르지오에 적용되는 공급 유형·자격 요건·청약 일정은 2026.10.22(목) 게시된 입주자모집공고 기준으로 청약 일정·일반공급·특별공급 안내에 정리했습니다. 청라 아크원 푸르지오는 입주자모집공고 게시 2026.10.22(목) · 견본주택 GRAND OPEN 10.30(금)입니다. 세부 일정은 대표번호 1833-3872로 문의해 주세요.</p>
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
            sources={[SRC_APPLYHOME]}
          />
        </section>
      </div>
    </SiteShell>
  );
}
