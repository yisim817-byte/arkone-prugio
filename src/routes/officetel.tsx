import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { OtCompare, OtNotice, OtRules, OtView } from "@/components/ot-main";
import { canonicalLinks } from "@/lib/seo-host";

// 작업지시서 16 · 5절: 오피스텔 안내 페이지.
export const Route = createFileRoute("/officetel")({
  component: OfficetelPage,
  head: () => ({
    meta: [
      { title: "오피스텔 안내 | 청라 아크원 푸르지오" },
      { name: "description", content: "청라 아크원 푸르지오 오피스텔 987실 안내. 전용 105·121·136㎡, 3개 동, 최고 49층. 11월말 분양예정이며 가격·청약 조건은 오피스텔 분양공고로 확인하세요." },
    ],
    links: canonicalLinks("/officetel"),
  }),
});

function OfficetelPage() {
  return (
    <SiteShell>
      <main className="otm-page">
        <header className="otm-page__head">
          <p className="otm-eyebrow otm-eyebrow--green">OFFICETEL</p>
          <h1>청라 아크원 푸르지오 오피스텔</h1>
          <p>987실 · 전용 105 · 121 · 136㎡ · 3개 동 · 최고 49층 · 11월말 분양예정</p>
          <a href="/register?product=officetel" className="otm-btn otm-btn--green">오피스텔 사전고객등록</a>
        </header>
        <OtCompare />
        <OtView />
        <OtRules />
        <OtNotice />
      </main>
    </SiteShell>
  );
}
