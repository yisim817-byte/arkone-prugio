import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { canonicalLinks, faqJsonLd } from "@/lib/seo-host";
import { SITE_PHONE } from "@/lib/site-data";
import { B103Notice, B103_FAQ } from "@/components/b103-notice";

// 작업지시서 17 (2026-11-13): 103㎡B 선착순 공급 참여의향서 접수 안내. 주소는 7개 도메인 공통 /103b.
export const Route = createFileRoute("/103b")({
  component: B103Page,
  head: () => ({
    meta: [
      { title: "청라 아크원 푸르지오 103㎡B 선착순 공급 참여의향서 접수" },
      {
        name: "description",
        content:
          "청라 아크원 푸르지오 103㎡B 선착순 공급 참여의향서는 11.17(화)부터 견본주택에서 신청자 본인이 접수합니다. 공급계약이 아니며 일정·방식은 미정입니다.",
      },
    ],
    links: [...canonicalLinks("/103b"), { rel: "stylesheet", href: "/b103.css" }],
    scripts: faqJsonLd([...B103_FAQ], "/103b"),
  }),
});

function B103Page() {
  return (
    <SiteShell path="/103b">
      <div className="page_content">
        <B103Notice phone={SITE_PHONE} plansHref="/pages/plans" contactHref="/pages/contact" visitHref="/visit" />
      </div>
    </SiteShell>
  );
}
