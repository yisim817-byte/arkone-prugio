import { Link } from "@tanstack/react-router";
import { prices, supply } from "@/lib/notice-facts.v1.json";
import { NOTICE_URL } from "@/components/phase-band";
import { PLAN_NOTE } from "@/components/notice-sections";
import { isEnHost } from "@/lib/seo-host";

// 작업지시서 12 · 4-1 홈 「입주자모집공고 요약」(이벤트 카드 아래). 금액·세대수는 notice-facts.v1.json 에서만 가져온다.
const PLANS = [
  { plan: "84c", name: "84㎡C" },
  { plan: "103a", name: "103㎡A" },
] as const;

export function NoticeSummary() {
  const en = isEnHost();
  return (
    <section className="notice-summary" aria-labelledby="notice-summary-title">
      <div className="notice-summary__inner">
        <h2 id="notice-summary-title">
          {en
            ? "Recruitment notice summary · posted 22 Oct 2026 (housing management no. 2026000496)"
            : "입주자모집공고 요약 · 2026.10.22 게시 (주택관리번호 2026000496)"}
        </h2>
        <dl className="notice-summary__list">
          <div>
            <dt>{en ? "Schedule" : "일정"}</dt>
            <dd>
              {en
                ? "Special supply was 2 Nov, first rank 3 Nov, second rank 4 Nov, the winner announcement 10 Nov, documents 12 to 16 Nov, and contracts 22 to 24 Nov. The model house stays open until a separate notice."
                : "특별공급은 11월 2일, 1순위는 11월 3일, 2순위는 11월 4일, 발표는 11월 10일, 서류는 11월 12일부터 16일, 계약은 11월 22일부터 24일입니다. 견본주택은 별도 공지 전까지 열립니다."}
            </dd>
          </div>
          <div>
            <dt>{en ? "Supply" : "공급"}</dt>
            <dd>
              {en
                ? `Total ${supply.total} units (special ${supply.special} · general ${supply.general}) · ${supply.buildings} buildings · B5 to 44F · move-in planned August 2031`
                : `총 ${supply.total}세대 (특별공급 ${supply.special} · 일반공급 ${supply.general}) · ${supply.buildings}개동 · ${supply.floors} · 입주예정 2031년 08월`}
            </dd>
          </div>
          <div>
            <dt>{en ? "Amount" : "금액"}</dt>
            <dd>
              <div className="notice-summary__table_wrap">
                <table className="notice-summary__table">
                  <thead>
                    <tr>
                      <th scope="col">{en ? "Type" : "주택형"}</th>
                      <th scope="col">{en ? "Units" : "세대수"}</th>
                      <th scope="col">{en ? "Supply amount (low–high)" : "공급금액 (최저 ~ 최고)"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prices.rows.map((p) => (
                      <tr key={p.type}><th scope="row">{p.type}</th><td>{p.units}</td><td>{`${p.min} ~ ${p.max}`}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="notice-summary__note">
                {en
                  ? "Supply amounts differ by building, floor, and unit. The table on pages 6 to 20 of the recruitment notice prevails."
                  : "※ 공급금액은 동·층·호별로 다르며, 입주자모집공고문 6~20면 공급금액표가 우선합니다."}
              </p>
            </dd>
          </div>
          <div>
            <dt>{en ? "Subscription" : "청약"}</dt>
            <dd>
              {en
                ? "Incheon residents have 50% priority · first rank needs 12 months in the subscription account plus the deposit · 84㎡ is 40% points and 60% lottery / 103㎡ is 100% lottery · re-win limit 10 years · resale limit 3 years · no residency duty"
                : "인천광역시 거주자 50% 우선 · 1순위 청약통장 12개월 + 예치금 · 84㎡ 가점제 40%·추첨제 60% / 103㎡ 추첨제 100% · 재당첨 제한 10년 · 전매제한 3년 · 거주의무 없음"}
            </dd>
          </div>
          <div>
            <dt>{en ? "Payment" : "납부"}</dt>
            <dd>{en ? "Contract deposit 5% · interim 60% (interest deferred) · balance 35%" : "계약금 5% · 중도금 60%(이자후불제) · 잔금 35%"}</dd>
          </div>
          <div>
            <dt>{en ? "Plans" : "평면"}</dt>
            <dd className="notice-summary__plans">
              {PLANS.map(({ plan, name }) => (
                <Link key={plan} to="/pages/plans" className="notice-summary__plan">
                  <picture>
                    <source type="image/webp" srcSet={`/plans/plan-${plan}-redraw-v2.webp`} />
                    <img src={`/plans/plan-${plan}-redraw-v2.png`} alt={en ? `Redrawn plan of type ${name}` : `청라 아크원 푸르지오 ${name} 평면 안내도`} width={2000} height={1250} loading="lazy" decoding="async" />
                  </picture>
                  <span>{en ? `${name} plan` : `${name} 평면 보기`}</span>
                </Link>
              ))}
              <p className="notice-summary__note notice-summary__plan_note">
                {en ? "This drawing is redrawn from the guide. Dimensions follow the notice and the model-house unit." : PLAN_NOTE}
              </p>
            </dd>
          </div>
        </dl>
        <div className="notice-summary__actions">
          <Link className="notice-summary__button" to="/pages/plans">{en ? "See plans and amounts" : "평면도·공급금액 보기"}</Link>
          <Link className="notice-summary__button notice-summary__button--line" to="/pages/schedule">{en ? "See the schedule and amounts" : "청약 일정·공급금액 보기"}</Link>
          <a className="notice-summary__button notice-summary__button--line" href={NOTICE_URL} target="_blank" rel="noopener">{en ? "Recruitment notice (Applyhome)" : "입주자모집공고 원문(청약홈)"}</a>
        </div>
      </div>
    </section>
  );
}