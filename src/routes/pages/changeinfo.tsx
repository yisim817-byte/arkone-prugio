import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { ZoomButton } from "@/components/notice";

export const Route = createFileRoute("/pages/changeinfo")({
  component: ChangeInfoPage,
  head: () => ({ meta: [{ title: "변경된 청약제도 | 청라 아크원 푸르지오" }] }),
});

function ChangeInfoPage() {
  const src = "/resources/img/sub/01_변경된_청약제도.v4.jpg";
  return (
    <SiteShell path="/pages/changeinfo">
      <div className="page_content">
        <section className="page_container">
          <figure>
            <img src={src} alt="변경된 청약제도 안내" />
          </figure>
          <ZoomButton href={src} />
        </section>
      </div>
    </SiteShell>
  );
}
