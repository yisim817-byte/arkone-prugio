import type { ReactNode } from "react";
import { balcony, deposit, prices, specialSupply, supply, types } from "@/lib/notice-facts.v1.json";

const facts = { balcony, deposit, prices, specialSupply, supply, types }; // 쓰는 항목만 가져온다(source 링크 등은 번들에 넣지 않음)

export function manwon(s: string): string {
  const m = s.match(/(\d+)억(?:\s*([0-9,]+)만원)?/);
  if (!m) return s;
  const n = Number(m[1]) * 10000 + (m[2] ? Number(m[2].replace(/,/g, "")) : 0);
  return `${n.toLocaleString("en-US")}만원`;
}

// 작업지시서 10 (2026-10-22): 입주자모집공고(주택관리번호 2026000496) 확정 내용. 금액은 쓰지 않는다.
// 표 숫자는 notice-facts.v1.json 에서만 그린다.

function Block({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return (
    <section className="seo-guide notice-block" aria-label={label}>
      <h2 className="seo-guide__subtitle">{title}</h2>
      {children}
    </section>
  );
}

function Table({ columns, rows }: { columns: string[]; rows: (string | number)[][] }) {
  return (
    <div className="seo-guide__table_wrap">
      <table className="seo-guide__table">
        <thead>
          <tr>{columns.map((c) => <th scope="col" key={c}>{c}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={String(r[0])}>
              <th scope="row">{r[0]}</th>
              {r.slice(1).map((v, i) => <td key={i}>{v}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** 작업지시서 12 · 공급금액 FAQ 답(주택형별 최저~최고). 숫자는 notice-facts.v1.json 에서만 가져온다. */
export const PRICE_FAQ_ANSWER = `주택형별 최저·최고는 ${facts.prices.rows.map((p) => `${p.type} ${manwon(p.min)}부터 ${manwon(p.max)}`).join(", ")}입니다. 동·층·호마다 다르고, 확장비와 유상옵션과 취득세는 따로입니다.`;

/** M3 · 공급금액표 (작업지시서 12 — 공고문 6~20면 주택형별 최저~최고, 발코니 확장비) */
export function NoticePrice() {
  const rows = facts.prices.rows.map((p) => [p.type, p.units, `${manwon(p.min)} ~ ${manwon(p.max)}`]);
  const balconyRow = ["확장비", ...facts.balcony.rows.map((b) => b.won)];
  return (
    <Block label="공급금액" title="주택형별 최저와 최고">
      <Table columns={["형", "세대", "최저부터 최고"]} rows={rows} />
      <div className="seo-guide__answer">
        <p>84A의 3호는 87,810만원에서 92,070만원, 5호는 83,780만원에서 87,840만원입니다.</p>
        <p>호실마다 금액이 다릅니다. 기준은 입주자모집공고 6면부터 20면의 금액표입니다.</p>
        <p>이 범위에 발코니 확장, 유상 옵션, 취득세는 없습니다. 전용 85㎡ 이하는 부가세가 없고, 103㎡ 건축비에는 부가세가 포함됩니다.</p>
        <p>이 아파트는 분양가상한제 단지입니다. 원하는 호실 금액은 1833-3872로 확인합니다.</p>
      </div>
      <h3 className="seo-guide__subtitle">발코니 확장비 · 부가세 포함, 계약 때 10%, 입주 때 90%</h3>
      <Table columns={["항목", ...facts.balcony.rows.map((b) => b.type)]} rows={[balconyRow]} />
    </Block>
  );
}

/** M4 · 납부 조건 (비율만) */
export function NoticePayment() {
  return (
    <Block label="납부 조건" title="납부 조건 (공급금액 기준 비율)">
      <div className="seo-guide__answer">
        <p>계약금 5% — 계약할 때 1,000만원, 나머지는 계약일부터 30일 안에 냅니다.</p>
        <p>중도금 60% — 여섯 번으로 나누며 이자는 나중에 내는 조건으로 금융기관 알선을 예정하고 있습니다. 정책이나 금융기관 사정으로 대출이 어려우면 계약자가 직접 냅니다.</p>
        <p>잔금 35% — 입주 지정일에 냅니다.</p>
        <p>잔금 대출은 개인 소득과 부채(DSR)에 따라 한도가 줄 수 있습니다.</p>
        <p>계약금, 중도금, 잔금은 사업주체가 알려 준 계좌로만 냅니다. 계좌번호는 공고에서 보고, 이 페이지에는 적지 않습니다.</p>
      </div>
    </Block>
  );
}

/** M5 · 청약 자격 */
export function NoticeEligibility() {
  return (
    <Block label="청약 자격 요약" title="청약 자격 요약 (입주자모집공고 기준)">
      <div className="seo-guide__answer">
        <p>신청 지역: 2026년 10월 22일 공고일 기준, 인천·서울·경기에 사는 만 19세 이상입니다. 세대주인 미성년자도 포함됩니다.</p>
        <p>같은 순위에서 경쟁하면 인천에 사는 사람 50%를 먼저 공급하고, 나머지 50%는 서울·경기입니다.</p>
        <p>1순위는 청약통장 가입 12개월이 지나고 지역·면적별 예치금을 채운 경우입니다. 세대주가 아니어도, 주택이 있어도 1순위를 신청할 수 있습니다.</p>
        <p>2순위는 청약통장이 있지만 1순위가 아닌 경우입니다.</p>
        <p>일반공급 선정: 전용 84는 가점 40%와 추첨 60%, 전용 103은 추첨 100%입니다.</p>
        <p>추첨 물량의 75%는 무주택세대구성원에게 먼저 갑니다.</p>
        <p>비규제지역이고 분양가상한제가 적용됩니다. 이 단지에 당첨되면 재당첨 제한 10년, 전매제한은 등기까지 최대 3년이며 거주의무는 없습니다.</p>
        <p>이미 재당첨 제한 중인 사람과 그 세대원도 이 단지 청약은 할 수 있습니다.</p>
        <p>청약은 한 사람이 한 건입니다. 특별공급과 일반공급은 각 한 건씩 같이 넣을 수 있고, 특별공급에 당첨되면 일반공급 선정에서는 빠집니다.</p>
      </div>
      <h3 className="seo-guide__subtitle">청약 예치금 (입주자모집공고일 현재 주민등록표상 거주지역 기준)</h3>
      <Table columns={facts.deposit.columns} rows={facts.deposit.rows} />
      <p className="seo-guide__legend">※ 자세한 자격과 예외는 입주자모집공고문이 우선합니다.</p>
    </Block>
  );
}

/** M6 · 특별공급 */
export function NoticeSpecial() {
  return (
    <Block label="특별공급" title="특별공급 배정은 공고 23~36면">
      <div className="seo-guide__answer">
        <p>특별공급 합계는 514세대입니다. 기관추천, 경제자유구역, 다자녀, 신혼부부, 노부모, 생애최초, 신생아의 주택형별 숫자는 그 면에 있습니다.</p>
        <p>통장 조건은 유형마다 다릅니다. 기관추천·경제자유구역·다자녀·신혼·노부모는 가입 6개월과 예치금, 생애최초·신생아는 가입 12개월입니다. 기관추천 중 장애인과 국가유공자는 통장 없이 신청할 수 있습니다.</p>
        <p>무주택 세대구성원에게 1세대 1주택으로 한 번만 갑니다. 노부모 부양은 무주택 세대주가 대상입니다.</p>
        <p>경제자유구역 유형은 인천 경제자유구역의 외국인투자기업 등에서 1년 넘게 일한 상용근로자입니다. 서류는 사업주체에 내고, 대상자는 인천경제자유구역청이 정합니다.</p>
        <p>소득과 자산 한도는 같은 공고 면이 우선합니다.</p>
      </div>
    </Block>
  );
}

export const PLAN_NOTE = "안내용으로 다시 그린 평면입니다. 공고와 견본주택이 우선하고, 실제 마감과 다를 수 있습니다.";

/** 작업지시서 12 · 평면 안내도(재작도 v2). 누르면 원본 PNG 를 새 창으로 연다(휴대폰 확대용). */
export function PlanFigure({ plan, withPrice = false }: { plan: "84c" | "103a"; withPrice?: boolean }) {
  const name = plan === "84c" ? "84㎡C" : "103㎡A";
  // 작업지시서 12 후속(PM 지시): 평면 그림 밑에 그 타입 공급금액 한 줄(팩트 파일 값).
  const p = facts.prices.rows.find((r) => r.type === (plan === "84c" ? "84C" : "103A"));
  const priceLine = withPrice && p ? `${name} 공급금액 ${p.min} ~ ${p.max} (동·층·호별 상이)` : "";
  const file = `/plans/plan-${plan}-redraw-v2`;
  return (
    <figure className="plan-figure">
      <a href={`${file}.png`} target="_blank" rel="noopener">
        <picture>
          <source type="image/webp" srcSet={`${file}.webp`} />
          <img src={`${file}.png`} alt={`청라 아크원 푸르지오 ${name} 평면 안내도`} width={2000} height={1250} loading="lazy" decoding="async" />
        </picture>
      </a>
      <figcaption>{PLAN_NOTE}</figcaption>
      {priceLine ? <p className="plan-figure__price">{priceLine}</p> : null}
    </figure>
  );
}

const UNIT_NOTE = "AI로 제작한 인테리어 연출 이미지입니다. 실제 평면·마감재·가구·창밖 조망과 다릅니다.";

/** 타입 연출 이미지(작업지시서 10 · 3-8). 이미지 바로 아래 글자로 연출 고지. */
export function UnitFigure({ file, alt }: { file: string; alt: string }) {
  return (
    <figure className="unit-figure">
      <img src={`/units/${file}`} alt={alt} width={1168} height={784} loading="lazy" decoding="async" />
      <figcaption>{UNIT_NOTE}</figcaption>
    </figure>
  );
}

/** M7 · 주택형 안내 (면적 단위 ㎡). children 자리는 타입 연출 이미지(커밋 3)용. */
export function NoticeTypes({ after84c, after103a, gallery }: { after84c?: ReactNode; after103a?: ReactNode; gallery?: ReactNode }) {
  const rows = facts.types.map((t) => [t.type, t.units, t.exclusive, t.residentialCommon, t.supply, t.otherCommon, t.contract]);
  return (
    <Block label="주택형 안내" title="주택형 안내 (입주자모집공고문 5면, 단위 ㎡)">
      <Table columns={["주택형", "세대수", "주거전용", "주거공용", "공급면적", "기타공용", "계약면적"]} rows={rows} />
      <div className="seo-guide__answer">
        <p>{`총 ${facts.supply.total}세대 (특별공급 ${facts.supply.special}세대 · 일반공급 ${facts.supply.general}세대) · ${facts.supply.buildings}개동 · ${facts.supply.floors} · 입주 ${facts.supply.moveIn}`}</p>
        <p>84㎡C — 4Bay 판상형, 맞통풍 구조, 2면 개방, 팬트리 수납</p>
        {after84c}
        <p>103㎡A — 알파룸을 더해 방 4개처럼 쓸 수 있는 구성, 넓은 팬트리, 별도 세탁실</p>
        {after103a}
        <p>※ 특화 내용은 현장 상품 설명 자료 기준이며 주택형·옵션 선택에 따라 다를 수 있으니 견본주택에서 확인해 주세요.</p>
        <p>견본주택에는 84A·103A 유니트가 설치되어 있습니다.</p>
        <p>학교: (가칭)청라10초 배치 예정(2031년 9월 개교 목표). 개교 전 입주하면 인근 학교에 임시 배치될 수 있고 개교 일정은 조정될 수 있습니다.</p>
        <p>※ 면적은 소수점 넷째 자리까지 표기하며 등기 면적과 차이가 있을 수 있습니다. 평면 형태와 마감은 견본주택과 입주자모집공고문으로 확인해 주세요.</p>
      </div>
      {gallery}
    </Block>
  );
}
