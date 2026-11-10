import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { OtCommercial, OtNotice } from "@/components/ot-main";
import { canonicalLinks } from "@/lib/seo-host";

// 작업지시서 16 · 5절: 근린생활시설 안내 페이지 (피크원 B1블록 · 아크원 M5블록).
export const Route = createFileRoute("/commercial")({
  component: CommercialPage,
  head: () => ({
    meta: [
      { title: "근린생활시설 안내 | 청라 피크원 · 아크원 푸르지오" },
      { name: "description", content: "청라 피크원 푸르지오(B1블록) 53개 · 청라 아크원 푸르지오(M5블록) 43개, 근린생활시설 96개 점포 안내. 11월말 분양예정이며 분양가는 근린생활시설 분양공고로 확인하세요." },
    ],
    links: canonicalLinks("/commercial"),
  }),
});

function CommercialPage() {
  return (
    <SiteShell>
      <main className="otm-page">
        <header className="otm-page__head">
          <p className="otm-eyebrow otm-eyebrow--indigo">COMMERCIAL</p>
          <h1>청라 피크원 · 아크원 푸르지오 근린생활시설</h1>
          <p>96개 점포 · 피크원 53 · 아크원 43 · 11월말 분양예정</p>
          <a href="/register?product=commercial" className="otm-btn otm-btn--indigo">상가 사전고객등록</a>
        </header>
        <OtCommercial />
        <OtNotice />
      </main>
    </SiteShell>
  );
}
