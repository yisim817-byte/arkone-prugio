import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { PrivacyBody } from "@/components/privacy-modal";
import { canonicalLinks } from "@/lib/seo-host";

// 작업지시서 13 · 4-6: 처리방침을 주소로도 볼 수 있게(내용은 푸터 모달과 같은 PrivacyBody).
export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "개인정보처리방침 | 청라 아크원 푸르지오" },
      { name: "robots", content: "noindex" },
    ],
    links: canonicalLinks("/privacy"),
  }),
});

function PrivacyPage() {
  return (
    <SiteShell path="/privacy">
      <div className="page_content">
        <section className="page_container privacy-page">
          <h2>개인정보처리방침</h2>
          <PrivacyBody />
        </section>
      </div>
    </SiteShell>
  );
}
