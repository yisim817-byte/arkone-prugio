import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { ZoomButton } from "@/components/notice";

export const Route = createFileRoute("/pages/docspecial")({
  component: DocSpecialPage,
  head: () => ({ meta: [{ title: "특별공급 안내 | 청라 아크원 푸르지오" }] }),
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
