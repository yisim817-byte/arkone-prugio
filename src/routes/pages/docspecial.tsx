import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { ZoomButton } from "@/components/notice";

export const Route = createFileRoute("/pages/docspecial")({
  component: DocSpecialPage,
  head: () => ({
    meta: [
      { title: "특별공급 안내 | 청라 아크원 푸르지오" },
      { name: "description", content: "청라 아크원 푸르지오 특별공급 안내. 신청 자격 등 세부 내용은 입주자모집공고를 기준으로 확인하십시오." },
    ],
    links: [{ rel: "canonical", href: "https://www.arkone-prugio.site/pages/docspecial" }],
  }),
});

function DocSpecialPage() {
  const src = "/resources/img/sub/03_특별공급.v4.jpg";
  return (
    <SiteShell path="/pages/docspecial">
      <div className="page_content">
        <section className="page_container">
          <figure>
            <img src={src} alt="특별공급 안내" />
          </figure>
          <ZoomButton href={src} />
        </section>
      </div>
    </SiteShell>
  );
}
