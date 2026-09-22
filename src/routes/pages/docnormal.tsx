import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { ZoomButton } from "@/components/notice";

export const Route = createFileRoute("/pages/docnormal")({
  component: DocNormalPage,
  head: () => ({ meta: [{ title: "일반공급 안내 | 청라 아크원 푸르지오" }] }),
});

function DocNormalPage() {
  const src = "/resources/img/sub/02_일반공급.v4.jpg";
  return (
    <SiteShell path="/pages/docnormal">
      <div className="page_content">
        <section className="page_container">
          <figure>
            <img src={src} alt="일반공급 안내" />
          </figure>
          <ZoomButton href={src} />
        </section>
      </div>
    </SiteShell>
  );
}
