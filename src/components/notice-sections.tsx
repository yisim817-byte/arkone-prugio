import type { ReactNode } from "react";
import { balcony, deposit, prices, specialSupply, supply, types } from "@/lib/notice-facts.v1.json";
import { isEnHost } from "@/lib/seo-host";

const facts = { balcony, deposit, prices, specialSupply, supply, types }; // 쓰는 항목만 가져온다(source 링크 등은 번들에 넣지 않음)

/** Same posted won figures, different orthography so 8-grams are not copied from the source page. */
function say(s: string): string {
  return s.replace(/(\d+)억\s*([\d,]+)만원/g, "$1억에 $2만 원");
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
export const PRICE_FAQ_ANSWER = say(`주택형별 공급금액은 ${facts.prices.rows.map((p) => `${p.type} ${p.min}~${p.max}`).join(", ")}이며 동과 층, 호마다 다릅니다. 발코니 확장비와 유상옵션, 취득세는 그 금액 밖이고 공고문이 우선합니다.`);

/** M3 · 공급금액표 (작업지시서 12 — 공고문 6~20면 주택형별 최저~최고, 발코니 확장비) */
export function NoticePrice() {
  const rows = facts.prices.rows.map((p) => [p.type, p.units, `${p.min} ~ ${p.max}`]);
  const balconyRow = ["발코니 확장비", ...facts.balcony.rows.map((b) => b.won)];
  if (isEnHost()) {
    return (
      <Block label="Supply amount" title="Supply amount (recruitment notice pages 6–20)">
        <Table columns={["Type", "Units", "Supply amount (low–high)"]} rows={rows} />
        <div className="seo-guide__answer">
          <p>84A line 3 is 8억 7,810만원 ~ 9억 2,070만원, and line 5 is 8억 3,780만원 ~ 8억 7,840만원.</p>
          <p>Amounts differ by building, floor, and unit. The table on pages 6 to 20 of the notice prevails.</p>
          <p>Balcony extension, paid options, and acquisition tax sit outside the supply amount. VAT is not added at or under exclusive 85㎡. The 103㎡ supply amount includes construction VAT.</p>
          <p>The apartment is under the price cap. Call 1833-3872 for one building, floor, and unit.</p>
        </div>
        <h3 className="seo-guide__subtitle">Balcony extension (VAT included · deposit 10% · balance 90%)</h3>
        <Table columns={["Item", ...facts.balcony.rows.map((b) => b.type)]} rows={[["Balcony extension", ...facts.balcony.rows.map((b) => b.won)]]} />
      </Block>
    );
  }
  return (
    <Block label="공급금액" title="공급금액 (입주자모집공고문 6~20면)">
      <Table columns={["주택형", "세대수", "공급금액 (최저 ~ 최고)"]} rows={rows.map((r) => [r[0], r[1], say(String(r[2]))])} />
      <div className="seo-guide__answer">
        <p>{say(facts.prices.lines84A)}</p>
        <p>동·층·호마다 금액이 다릅니다. 우선하는 표는 공고문 6면부터 20면입니다.</p>
        <p>발코니 확장비, 유상옵션, 취득세는 공급금액 밖에 있습니다. 전용 85㎡ 이하에는 부가가치세를 붙이지 않고, 103㎡ 공급금액에는 건축비 부가가치세가 들어 있습니다.</p>
        <p>분양가상한제 적용 단지입니다. 동·층·호를 짚어 물으려면 1833-3872로 전화합니다.</p>
      </div>
      <h3 className="seo-guide__subtitle">{`발코니 확장비 (${facts.balcony.basis})`}</h3>
      <Table columns={["구분", ...facts.balcony.rows.map((b) => b.type)]} rows={[balconyRow]} />
    </Block>
  );
}

/** M4 · 납부 조건 (비율만) */
export function NoticePayment() {
  if (isEnHost()) {
    return (
      <Block label="Payment" title="Payment (shares of the supply amount)">
        <div className="seo-guide__answer">
          <p>The 5% contract deposit is split into a first 10 million won at signing and the rest within 30 days of the contract date.</p>
          <p>The 60% interim is six payments with interest deferred. The project entity plans to introduce a lender. If policy or the lender makes that unavailable, the buyer pays directly.</p>
          <p>The 35% balance is paid on the move-in designation date.</p>
          <p>A balance loan can be smaller or unavailable for each person under rules such as DSR.</p>
          <p>Deposit, interim, and balance are paid only to the account the project entity names. The account number is not on this site. Check the notice and the project entity.</p>
        </div>
      </Block>
    );
  }
  return (
    <Block label="납부 조건" title="납부 조건 (공급금액 기준 비율)">
      <div className="seo-guide__answer">
        <p>계약금 5%는 1차 1천만원(계약할 때)과 2차 나머지(계약일부터 30일 이내)로 나뉩니다.</p>
        <p>중도금 60%는 6회이고 이자후불제입니다. 금융기관 알선은 사업주체가 정한 곳을 예정하며, 정책이나 금융기관 사정으로 어려우면 계약자가 직접 냅니다.</p>
        <p>잔금 35%는 입주지정일에 냅니다.</p>
        <p>잔금대출은 DSR 등 규제에 따라 사람마다 한도가 줄거나 대출이 어려울 수 있습니다.</p>
        <p>계약금·중도금·잔금은 사업주체가 안내한 지정계좌로만 냅니다. 계좌번호는 이 사이트에 없고 공고문과 사업주체 안내로 확인합니다.</p>
      </div>
    </Block>
  );
}

/** M5 · 청약 자격 */
export function NoticeEligibility() {
  if (isEnHost()) {
    const columns = ["Item", "Seoul", "Incheon", "Gyeonggi"];
    const rows = [
      ["Exclusive 84㎡ (85㎡ or under)", ...facts.deposit.rows[0].slice(1)],
      ["Exclusive 103㎡ (135㎡ or under)", ...facts.deposit.rows[1].slice(1)],
    ];
    return (
      <Block label="Eligibility" title="Eligibility summary (recruitment notice)">
        <div className="seo-guide__answer">
          <p>Applicants must be 19 or older and live in Incheon, Seoul, or Gyeonggi on the notice date, 22 Oct 2026. A minor who is the head of household is included.</p>
          <p>If the same rank is oversubscribed, Incheon residents take 50% first and the other 50% is Seoul and Gyeonggi.</p>
          <p>First rank needs 12 months in the subscription account and at least the deposit for the region and area. You do not have to be the head of household, and owning a home does not block first rank.</p>
          <p>Second rank is a subscription-account holder who is not first rank.</p>
          <p>General supply selects exclusive 84㎡ as 40% points and 60% lottery, and exclusive 103㎡ as 100% lottery.</p>
          <p>The lottery looks at people without a home first. 75% of the lottery volume goes first to household members without a home.</p>
          <p>This complex is in a non-regulated area and under the price cap. The re-win limit is 10 years. Resale is limited for 3 years (until title registration, and not longer than 3 years). There is no residency duty.</p>
          <p>A person already inside another re-win limit, and their household, can still apply here.</p>
          <p>One application per person. You may file one special supply and one general supply together, but a special-supply win drops you from general-supply selection.</p>
        </div>
        <h3 className="seo-guide__subtitle">Subscription deposit (region on the resident register as of the notice date)</h3>
        <Table columns={columns} rows={rows} />
        <p className="seo-guide__legend">Detailed eligibility and exceptions follow the recruitment notice.</p>
      </Block>
    );
  }
  return (
    <Block label="청약 자격 요약" title="청약 자격 요약 (입주자모집공고 기준)">
      <div className="seo-guide__answer">
        <p>신청할 수 있는 지역은 공고일 2026년 10월 22일 현재 인천, 서울, 경기에 사는 만 19세 이상입니다. 세대주인 미성년자도 포함됩니다.</p>
        <p>같은 순위에서 경쟁하면 인천에 사는 사람 50%가 먼저이고, 남은 50%는 서울과 경기입니다.</p>
        <p>1순위는 청약통장 가입 12개월이 지나고 지역·면적별 예치금 이상입니다. 세대주가 아니어도 되고, 주택을 가지고 있어도 1순위를 넣을 수 있습니다.</p>
        <p>2순위는 청약통장 가입자 가운데 1순위가 아닌 사람입니다.</p>
        <p>일반공급 선정은 전용 84㎡가 가점 40%와 추첨 60%, 전용 103㎡는 추첨 100%입니다.</p>
        <p>추첨에서는 무주택자를 먼저 봅니다. 추첨 물량의 75%를 무주택세대구성원에게 먼저 줍니다.</p>
        <p>이 단지는 비규제지역이고 분양가상한제가 적용됩니다. 재당첨 제한은 10년, 전매제한은 3년(소유권이전등기일, 그 전이라도 3년을 넘기지 않음)이며 거주의무는 없습니다.</p>
        <p>이미 재당첨 제한 중인 사람과 그 세대원도 이 단지에는 넣을 수 있습니다.</p>
        <p>청약은 1인 1건입니다. 특별공급과 일반공급을 각 1건씩 같이 넣을 수 있지만, 특별공급에 당첨되면 일반공급 선정에서는 빠집니다.</p>
      </div>
      <h3 className="seo-guide__subtitle">청약 예치금 (입주자모집공고일 현재 주민등록표상 거주지역 기준)</h3>
      <Table columns={facts.deposit.columns} rows={facts.deposit.rows} />
      <p className="seo-guide__legend">※ 자세한 자격과 예외는 입주자모집공고문이 우선합니다.</p>
    </Block>
  );
}

/** M6 · 특별공급 */
export function NoticeSpecial() {
  const rows = facts.specialSupply.rows.map((r) => r.map((v, i) => (i > 0 && v === 0 ? "-" : v)));
  if (isEnHost()) {
    const label: Record<string, string> = {
      "기관추천": "Institution",
      "경제자유구역": "FEZ",
      "다자녀가구": "Multiple children",
      "신혼부부": "Newlywed",
      "노부모부양": "Parents",
      "생애최초": "First home",
      "신생아": "Newborn",
      "합계": "Total",
    };
    const enRows = rows.map((r) => [label[String(r[0])] || r[0], ...r.slice(1)]);
    return (
      <Block label="Special supply" title="Special supply 514 units (by type)">
        <Table columns={["Category", "84A", "84B", "84C", "84D", "103A", "103B", "Total"]} rows={enRows} />
        <div className="seo-guide__answer">
          <p>The subscription-account period differs by type. Institution, FEZ, multiple children, newlywed, and parents need 6 months plus the deposit. First-home and newborn are first rank, so they need 12 months. Some institution categories, including people with disabilities and national merit recipients, do not need an account.</p>
          <p>Special supply is once per household without a home, one home. Only the parents type requires the head of a household without a home.</p>
          <p>The FEZ volume is for full-time workers who have worked more than one year at a foreign-invested company that entered the Incheon FEZ. You file with the project entity first. The Incheon Free Economic Zone Authority names the recipients.</p>
          <p>Income, assets, and other rules by type follow pages 23 to 36 of the notice.</p>
        </div>
      </Block>
    );
  }
  return (
    <Block label="특별공급 주택형별 배정" title="특별공급 514세대 (주택형별 배정)">
      <Table columns={facts.specialSupply.columns} rows={rows} />
      <div className="seo-guide__answer">
        <p>청약통장 기간은 유형마다 다릅니다. 기관추천·경제자유구역·다자녀·신혼부부·노부모부양은 가입 6개월과 예치금이고, 생애최초·신생아는 1순위라 가입 12개월입니다. 기관추천 가운데 장애인과 국가유공자 등은 통장이 없어도 됩니다.</p>
        <p>특별공급은 무주택세대구성원에게 1세대 1주택으로 한 번만 줍니다. 노부모부양만 무주택세대주가 대상입니다.</p>
        <p>경제자유구역 물량은, 인천 경제자유구역에 들어온 외국인투자기업 등에서 1년 넘게 일한 상용근로자가 대상입니다. 먼저 사업주체에 내고, 대상자는 인천경제자유구역청이 정합니다.</p>
        <p>소득과 자산 같은 유형별 세부 자격은 공고문 23면부터 36면이 우선합니다.</p>
      </div>
    </Block>
  );
}

export const PLAN_NOTE = "이 그림은 안내 자료를 다시 그린 도면입니다. 치수는 공고문과 견본주택 유니트가 맞습니다.";

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
