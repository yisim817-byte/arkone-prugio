import { Link } from "@tanstack/react-router";
import { prices } from "@/lib/notice-facts.v1.json";
import { PLAN_NOTE } from "@/components/notice-sections";

// PM 지시(2026-10-22): 홈 히어로 바로 아래 「평면도 · 공급금액」 배너 → /pages/plans. 금액은 팩트 파일에서 면적대별 최저·최고만 고른다.
function range(prefix: string) {
  const rows = prices.rows.filter((r) => r.type.startsWith(prefix));
  const lo = rows.reduce((a, b) => (b.minWon < a.minWon ? b : a));
  const hi = rows.reduce((a, b) => (b.maxWon > a.maxWon ? b : a));
  return `${lo.min} ~ ${hi.max}`;
}

export function PlansBanner() {
  return (
    <section className="plans-banner" aria-labelledby="plans-banner-title">
      <Link to="/pages/plans" className="plans-banner__inner">
        <div className="plans-banner__copy">
          <h2 id="plans-banner-title">평면도 · 공급금액</h2>
          <p className="plans-banner__sub">84㎡C · 103㎡A 평면도와 주택형별 공급금액 (입주자모집공고 기준)</p>
          <p className="plans-banner__price">
            <span>{`84㎡ ${range("84")}`}</span>
            <span>{`103㎡ ${range("103")}`}</span>
          </p>
          <p className="plans-banner__cond">동·층·호별 상이, 발코니 확장 등 별도</p>
          <span className="plans-banner__button">평면도·공급금액 보기 →</span>
        </div>
        <div className="plans-banner__thumbs">
          {(["84c", "103a"] as const).map((p) => (
            <picture key={p}>
              <source type="image/webp" srcSet={`/plans/plan-${p}-redraw-v2.webp`} />
              <img src={`/plans/plan-${p}-redraw-v2.png`} alt={`청라 아크원 푸르지오 ${p === "84c" ? "84㎡C" : "103㎡A"} 평면 안내도`} width={2000} height={1250} loading="lazy" decoding="async" />
            </picture>
          ))}
          <p className="plans-banner__note">{PLAN_NOTE}</p>
        </div>
      </Link>
    </section>
  );
}
