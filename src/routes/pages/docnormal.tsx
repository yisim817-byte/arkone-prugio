import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { ZoomButton } from "@/components/notice";
import { canonicalLinks } from "@/lib/seo-host"
import { isEnHost } from "@/lib/seo-host"
import { EN, EN_DOCNORM, EN_REMAIN } from "@/lib/i18n/en";
import { GuideAnswer, GuideDetail } from "@/components/seo-guide";
import { SRC_APPLYHOME } from "@/lib/arkone-facts";
import { imgDims } from "@/components/img";

export const Route = createFileRoute("/pages/docnormal")({
  component: DocNormalPage,
  head: () => ({
    meta: [
      { title: (() => { try { return isEnHost() ? EN.docnormal.title : "청라 아크원 푸르지오 일반공급 안내 | 순위·접수"; } catch { return "청라 아크원 푸르지오 일반공급 안내 | 순위·접수"; } })() },
      { name: "description", content: (() => { try { return isEnHost() ? EN.docnormal.desc : "청라 아크원 푸르지오 일반공급 안내. 공급 물량·순위별 접수일·당첨자 발표일은 입주자모집공고에서 확정되며, 청약홈 공고문 기준으로 확인하세요."; } catch { return "청라 아크원 푸르지오 일반공급 안내. 공급 물량·순위별 접수일·당첨자 발표일은 입주자모집공고에서 확정되며, 청약홈 공고문 기준으로 확인하세요."; } })() },
    ],
    links: canonicalLinks("/pages/docnormal"),
  }),
});

function DocNormalPage() {
  const en = (() => { try { return isEnHost(); } catch { return false; } })();

  const src = "/resources/img/sub/02_일반공급.v4.webp";
  return (
    <SiteShell path="/pages/docnormal">
      <div className="page_content">
        <section className="page_container">
          <GuideAnswer title={en ? EN_DOCNORM.h1 : "청라 아크원 푸르지오 일반공급 안내 요약"}>
            <p>{en ? EN_REMAIN.docnormalP : "청라 아크원 푸르지오의 일반공급 물량, 순위별 접수일, 당첨자 발표일은 입주자모집공고에서 확정되며 현재는 미정입니다. 신청 전 청약홈에 게시되는 공고문을 기준으로 확인하시기 바랍니다."}</p>
          </GuideAnswer>
            <p>특별공급은 1세대당 평생 1회로 제한됩니다. 이 단지의 청약 자격·공급 비율·일정은 입주자모집공고 게시 후 청약홈 공고문으로 확인해야 합니다.</p>
          <figure>
            <img src={src} alt="일반공급 청약 전 확인 사항 인포그래픽" {...imgDims(src)} data-dims="" />
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
