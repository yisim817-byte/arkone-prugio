import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { NoticePrice, PlanFigure } from "@/components/notice-sections";
import { canonicalLinks } from "@/lib/seo-host";

// PM 지시(2026-10-22): 평면도·공급금액을 메뉴에서 바로 찾을 수 있게 전용 페이지로 모은다(내용은 /pages/compare·/pages/schedule 와 같은 컴포넌트).
export const Route = createFileRoute("/pages/plans")({
  component: PlansPage,
  head: () => ({
    meta: [
      { title: "청라 아크원 푸르지오 평면도·공급금액 | 84㎡C·103㎡A" },
      { name: "description", content: "청라 아크원 푸르지오 84㎡C·103㎡A 평면도와 주택형별 공급금액(입주자모집공고문 기준)." },
    ],
    links: canonicalLinks("/pages/plans"),
  }),
});

function PlansPage() {
  return (
    <SiteShell path="/pages/plans">
      <div className="page_content">
        <section className="page_container plans-page">
          <h2 className="seo-guide__subtitle">평면도 (84㎡C · 103㎡A)</h2>
          <PlanFigure plan="84c" withPrice />
          <PlanFigure plan="103a" withPrice />
          <NoticePrice />
          <p className="plans-page__more">
            주택형별 면적은 <Link to="/pages/compare">아파트·오피스텔 비교</Link>, 청약 일정은 <Link to="/pages/schedule">분양 일정·청약 안내</Link>에서 볼 수 있습니다.
          </p>
        </section>
      </div>
    </SiteShell>
  );
}
