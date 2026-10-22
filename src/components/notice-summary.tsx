import { Link } from "@tanstack/react-router";
import { prices, supply } from "@/lib/notice-facts.v1.json";
import { NOTICE_URL } from "@/components/phase-band";
import { PLAN_NOTE } from "@/components/notice-sections";

// 작업지시서 12 · 4-1 홈 「입주자모집공고 요약」(이벤트 카드 아래). 금액·세대수는 notice-facts.v1.json 에서만 가져온다.
const PLANS = [
  { plan: "84c", name: "84㎡C" },
  { plan: "103a", name: "103㎡A" },
] as const;

export function NoticeSummary() {
  return (
    <section className="notice-summary" aria-labelledby="notice-summary-title">
      <div className="notice-summary__inner">
        <h2 id="notice-summary-title">입주자모집공고 요약 · 2026.10.22 게시 (주택관리번호 2026000496)</h2>
        <dl className="notice-summary__list">
          <div><dt>일정</dt><dd>특별공급 11.02(월) · 1순위 11.03(화) · 2순위 11.04(수) · 당첨자 발표 11.10(화) · 서류접수 11.12(목)~11.16(월) · 계약 11.22(일)~11.24(화) · 견본주택 GRAND OPEN 10.30(금)</dd></div>
          <div><dt>공급</dt><dd>{`총 ${supply.total}세대 (특별공급 ${supply.special} · 일반공급 ${supply.general}) · ${supply.buildings}개동 · ${supply.floors} · 입주예정 2031년 08월`}</dd></div>
          <div>
            <dt>금액</dt>
            <dd>
              <div className="notice-summary__table_wrap">
                <table className="notice-summary__table">
                  <thead><tr><th scope="col">주택형</th><th scope="col">세대수</th><th scope="col">공급금액 (최저 ~ 최고)</th></tr></thead>
                  <tbody>
                    {prices.rows.map((p) => (
                      <tr key={p.type}><th scope="row">{p.type}</th><td>{p.units}</td><td>{`${p.min} ~ ${p.max}`}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="notice-summary__note">※ 공급금액은 동·층·호별로 다르며, 입주자모집공고문 6~20면 공급금액표가 우선합니다.</p>
            </dd>
          </div>
          <div><dt>청약</dt><dd>인천광역시 거주자 50% 우선 · 1순위 청약통장 12개월 + 예치금 · 84㎡ 가점제 40%·추첨제 60% / 103㎡ 추첨제 100% · 재당첨 제한 10년 · 전매제한 3년 · 거주의무 없음</dd></div>
          <div><dt>납부</dt><dd>계약금 5% · 중도금 60%(이자후불제) · 잔금 35%</dd></div>
          <div>
            <dt>평면</dt>
            <dd className="notice-summary__plans">
              {PLANS.map(({ plan, name }) => (
                <Link key={plan} to="/pages/compare" className="notice-summary__plan">
                  <picture>
                    <source type="image/webp" srcSet={`/plans/plan-${plan}-redraw-v2.webp`} />
                    <img src={`/plans/plan-${plan}-redraw-v2.png`} alt={`청라 아크원 푸르지오 ${name} 평면 안내도`} width={2000} height={1250} loading="lazy" decoding="async" />
                  </picture>
                  <span>{`${name} 평면 보기`}</span>
                </Link>
              ))}
              <p className="notice-summary__note notice-summary__plan_note">{PLAN_NOTE}</p>
            </dd>
          </div>
        </dl>
        <div className="notice-summary__actions">
          <Link className="notice-summary__button" to="/pages/schedule">청약 일정·공급금액 보기</Link>
          <a className="notice-summary__button notice-summary__button--line" href={NOTICE_URL} target="_blank" rel="noopener">입주자모집공고 원문(청약홈)</a>
        </div>
      </div>
    </section>
  );
}
