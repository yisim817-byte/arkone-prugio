import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { ZoomButton } from "@/components/notice";

export const Route = createFileRoute("/pages/changeinfo")({
  component: ChangeInfoPage,
  head: () => ({
    meta: [
      { title: "변경된 청약제도 | 청라 아크원 푸르지오" },
      { name: "description", content: "변경된 청약제도 안내. 청라 아크원 푸르지오 청약 전 확인할 제도 변경 내용을 담았습니다. 세부 내용은 입주자모집공고를 확인하십시오." },
    ],
    links: [{ rel: "canonical", href: "https://www.arkone-prugio.site/pages/changeinfo" }],
  }),
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
