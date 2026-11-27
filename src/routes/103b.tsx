import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { canonicalLinks, faqJsonLd } from "@/lib/seo-host";
import { SITE_PHONE } from "@/lib/site-data";
import { B103Notice, B103_FAQ } from "@/components/b103-notice";

export const Route = createFileRoute("/103b")({
  component: B103Page,
  head: () => ({
    meta: [
      { title: "청라 아크원 푸르지오 아파트 청약 이후 103㎡B 흐름" },
      {
        name: "description",
        content:
          "청라 아크원 푸르지오 아파트 계약은 끝났습니다. 103㎡B는 11월 28일 선착순 예정, 오피스텔 청약은 12월 7일입니다.",
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
