import { Link } from "@tanstack/react-router";
import { SITE_PHONE, SITE_TEL_HREF } from "@/lib/site-data";

// 작업지시서 16: 메인을 오피스텔·근린생활시설 중심으로 전환 (공식 홈페이지 추종 시안).
// 문구·수치는 시안 원문이다. 가격·청약 일정 날짜는 분양공고 전이라 넣지 않는다.

const REG_OT = "/register?product=officetel";
const REG_CM = "/register?product=commercial";

function Eyebrow({ children, tone }: { children: string; tone?: "light" | "green" | "indigo" }) {
  return <p className={`otm-eyebrow${tone ? ` otm-eyebrow--${tone}` : ""}`}>{children}</p>;
}

export function OtCompare() {
  return (
    <section id="compare" className="otm otm--dark" aria-labelledby="otm-compare-title">
      <div className="otm__inner">
        <Eyebrow tone="light">SAME COMPLEX, DIFFERENT SCALE</Eyebrow>
        <h2 id="otm-compare-title" className="otm-title">
          같은 단지 안에서
          <br />
          <b>더 높게, 더 넓게</b>
        </h2>
        <div className="otm-compare">
          <div className="otm-compare__cell">
            <p className="otm-compare__label">최고층</p>
            <p className="otm-compare__num">49<span>층</span></p>
            <p className="otm-compare__ref">아파트 44층</p>
          </div>
          <div className="otm-compare__cell">
            <p className="otm-compare__label">전용면적 · 가장 작은 타입</p>
            <p className="otm-compare__num">105.85<span>㎡</span></p>
            <p className="otm-compare__ref">아파트 가장 큰 타입 103.99㎡</p>
          </div>
          <div className="otm-compare__cell">
            <p className="otm-compare__label">천장고</p>
            <p className="otm-compare__num">2.5<span>m</span></p>
            <p className="otm-compare__ref">아파트 2.4m</p>
          </div>
          <div className="otm-compare__cell">
            <p className="otm-compare__label">청약</p>
            <p className="otm-compare__num otm-compare__num--ko">청약통장 없이</p>
            <p className="otm-compare__ref">아파트는 청약통장 필요</p>
          </div>
        </div>
        <p className="otm-note otm-note--light">
          아파트 수치는 입주자모집공고(2026.10.22) 기준, 오피스텔 수치는 분양공고 전 사업자료 기준이며 공고 내용과 다를 수 있습니다. 오피스텔 청약 자격·방식은 오피스텔 분양공고로 확정됩니다.
        </p>
      </div>
    </section>
  );
}

export function OtCards() {
  return (
    <section className="otm otm--warm" aria-labelledby="otm-cards-title">
      <div className="otm__inner">
        <Eyebrow>OFFICETEL &amp; COMMERCIAL</Eyebrow>
        <h2 id="otm-cards-title" className="otm-title">
          아크원의 다음 장면,
          <br />
          <b>오피스텔과 근린생활시설</b>
        </h2>
        <div className="otm-cards">
          <article id="officetel" className="otm-card">
            <div className="otm-card__media">
              <img src="/official/soon/officetel_bg.png" alt="청라 아크원 푸르지오 오피스텔 안내 이미지(CG)" loading="lazy" />
            </div>
            <div className="otm-card__body">
              <Eyebrow tone="green">OFFICETEL</Eyebrow>
              <h3 className="otm-card__title">오피스텔 987실</h3>
              <p className="otm-card__spec">전용 105 · 121 · 136㎡ &nbsp;|&nbsp; 3개 동 &nbsp;|&nbsp; 최고 49층</p>
              <p className="otm-card__when">11월말 분양예정</p>
              <div className="otm-card__actions">
                <Link to="/officetel" className="otm-btn otm-btn--line-green">자세히 보기 →</Link>
                <a href={REG_OT} className="otm-btn otm-btn--green">사전고객등록</a>
              </div>
            </div>
          </article>
          <article className="otm-card">
            <div className="otm-card__media">
              <img src="/official/soon/commercial_bg.png" alt="청라 피크원 · 아크원 푸르지오 근린생활시설 안내 이미지(CG)" loading="lazy" />
            </div>
            <div className="otm-card__body">
              <Eyebrow tone="indigo">COMMERCIAL</Eyebrow>
              <h3 className="otm-card__title">근린생활시설 96개 점포</h3>
              <p className="otm-card__spec">피크원 53 · 아크원 43 &nbsp;|&nbsp; 브랜드타운 2,911가구</p>
              <p className="otm-card__when">11월말 분양예정</p>
              <div className="otm-card__actions">
                <Link to="/commercial" className="otm-btn otm-btn--line-indigo">자세히 보기 →</Link>
                <a href={REG_CM} className="otm-btn otm-btn--indigo">사전고객등록</a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function OtView() {
  return (
    <section id="view" className="otm otm--white" aria-labelledby="otm-view-title">
      <div className="otm__inner otm-split">
        <div className="otm-slot" role="img" aria-label="공식 단지배치도 자리">
          공식 단지배치도 자리
          <br />
          (분양안내 p.3 · 원본 확보 후 교체)
        </div>
        <div className="otm-split__copy">
          <Eyebrow>LOCATION &amp; VIEW</Eyebrow>
          <h2 id="otm-view-title" className="otm-title otm-title--sm">
            단지 서쪽 앞줄,
            <br />
            <b>최고 49층의 자리</b>
          </h2>
          <p className="otm-lead">오피스텔 3개 동은 배치도 기준 단지 서쪽 앞줄에 놓입니다. 일부 호실에서 서해 조망을 기대할 수 있습니다.</p>
          <p className="otm-note">
            조망은 동·층·호실마다 다르며 주변 개발로 바뀔 수 있습니다. 단지 서측 약 1km 내 발전소·청라자원순환센터가 있고, 서측은 수도권제2순환고속도로와 인접합니다.
          </p>
        </div>
      </div>
    </section>
  );
}

const RULES: [string, string, string][] = [
  ["01", "청약통장 없이 신청", "청약 자격·방식은 오피스텔 분양공고로 확정됩니다."],
  ["02", "아파트 청약 때 주택 수에 미포함", "아파트 청약의 무주택 판정 기준입니다. 세금의 주택 수와는 다릅니다."],
  ["03", "비규제지역, 법정 전매제한 대상 아님", "단, 사용승인 전 2명 이상에게 나눠 전매할 수 없습니다."],
  ["04", "세금과 대출은 따로 확인", "취득세 4.6%. 주거용으로 쓰면 세금에서 주택 수에 포함될 수 있고, 잔금 대출은 DSR이 적용됩니다."],
];

export function OtRules() {
  return (
    <section className="otm otm--mint" aria-labelledby="otm-rules-title">
      <div className="otm__inner">
        <Eyebrow tone="green">BEFORE YOU APPLY</Eyebrow>
        <h2 id="otm-rules-title" className="otm-title otm-title--sm">
          오피스텔,
          <br />
          <b>아파트와 다른 네 가지</b>
        </h2>
        <ol className="otm-rules">
          {RULES.map(([n, t, d]) => (
            <li key={n} className="otm-rules__item">
              <span className="otm-rules__no">{n}</span>
              <strong>{t}</strong>
              <p>{d}</p>
            </li>
          ))}
        </ol>
        <p className="otm-note otm-note--mint">
          법령 일반 기준이며 개인별로 다를 수 있습니다. 세금은 세무 상담을 권장합니다. 오피스텔 분양가는 오피스텔 분양공고로 안내합니다.
        </p>
      </div>
    </section>
  );
}

export function OtCommercial() {
  return (
    <section id="commercial" className="otm otm--white" aria-labelledby="otm-cm-title">
      <div className="otm__inner">
        <div className="otm-split otm-split--rev">
          <div className="otm-split__copy">
            <Eyebrow tone="indigo">COMMERCIAL</Eyebrow>
            <h2 id="otm-cm-title" className="otm-title otm-title--sm">
              피크원 · 아크원,
              <br />
              <b>96개 점포</b>
            </h2>
            <p className="otm-lead">
              청라 피크원 푸르지오(B1블록)와 청라 아크원 푸르지오(M5블록)의 근린생활시설을 함께 안내합니다. 피크원 53개, 아크원 43개 점포로 계획되어 있습니다.
            </p>
            <a href={REG_CM} className="otm-btn otm-btn--indigo">상가 사전고객등록</a>
          </div>
          <div className="otm-card__media otm-card__media--tall">
            <img src="/official/soon/commercial_bg.png" alt="근린생활시설 안내 이미지(CG)" loading="lazy" />
          </div>
        </div>
        <div className="otm-stats">
          <div className="otm-stats__cell">
            <p className="otm-stats__label">청라 피크원 푸르지오 · B1블록</p>
            <p className="otm-stats__num">53<span>개</span></p>
            <p className="otm-stats__ref">1층 29 · 2층 24</p>
          </div>
          <div className="otm-stats__cell">
            <p className="otm-stats__label">청라 아크원 푸르지오 · M5블록</p>
            <p className="otm-stats__num">43<span>개</span></p>
            <p className="otm-stats__ref">1층 18 · 2층 25</p>
          </div>
          <div className="otm-stats__cell">
            <p className="otm-stats__label">세대 수 대비 점포 수</p>
            <p className="otm-stats__num">3.3<span>%</span></p>
            <p className="otm-stats__ref">96개 점포 ÷ 2,911가구 · 아크원 단지 기준 약 2.3%</p>
          </div>
        </div>
        <p className="otm-note">
          3.3%는 96개 점포 ÷ 2,911가구(피크원 오피스텔 1,056실 + 아크원 1,855세대), 2.3%는 43개 점포 ÷ 1,855세대로 계산한 값이며 매출·수익을 뜻하지 않습니다. 피크원(B1블록)과 아크원(M5블록)은 서로 다른 사업장이며 점포·가격·계약 조건은 블록별로 다릅니다. 점포 수는 분양 전 계획 기준이며, 분양가는 근린생활시설 분양공고로 안내합니다.
        </p>
      </div>
    </section>
  );
}

export function OtRegister() {
  return (
    <section id="register" className="otm otm--green" aria-labelledby="otm-reg-title">
      <div className="otm__inner">
        <Eyebrow tone="light">REGISTER</Eyebrow>
        <h2 id="otm-reg-title" className="otm-title otm-title--sm">
          분양 소식을 먼저 받는
          <br />
          <b>사전고객등록</b>
        </h2>
        <div className="otm-reg">
          <div className="otm-reg__card">
            <h3>오피스텔 사전고객등록</h3>
            <p>사전고객등록 후 오피스텔 계약 시 백화점 상품권 50만원</p>
            <small>등록만으로는 지급되지 않습니다. 이 홈페이지 등록분만 인정됩니다.</small>
            <a href={REG_OT} className="otm-btn otm-btn--white">오피스텔 등록하기 →</a>
          </div>
          <div className="otm-reg__card">
            <h3>상가 사전고객등록</h3>
            <p>사전고객등록 후 상가 계약 시 백화점 상품권 50만원</p>
            <small>피크원 · 아크원 근린생활시설 분양 소식을 안내해 드립니다. 사전고객등록은 분양 신청·계약이 아닙니다.</small>
            <a href={REG_CM} className="otm-btn otm-btn--white">상가 등록하기 →</a>
          </div>
        </div>
        <p className="otm-reg__tel">
          고객등록 확인은 대표번호(<a href={SITE_TEL_HREF}>{SITE_PHONE}</a>)
        </p>
      </div>
    </section>
  );
}

export function OtAptStrip() {
  return (
    <section className="otm otm--warm otm--slim" aria-label="아파트 안내">
      <div className="otm__inner otm-apt">
        <Eyebrow>APARTMENT</Eyebrow>
        <Link to="/pages/schedule" className="otm-apt__link">
          <span><b>아파트 계약</b> 11.22(일) ~ 11.24(화)</span>
          <span aria-hidden="true">→</span>
        </Link>
        <a href={SITE_TEL_HREF} className="otm-apt__link">
          <span><b>103㎡B 선착순 안내</b> {SITE_PHONE}</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}

export function OtNotice() {
  return (
    <section className="otm-foot" aria-label="유의사항">
      <div className="otm__inner">
        <p>※ 사전고객등록은 청약·계약 신청이 아닙니다. 가격·평면·청약 조건은 각 분양공고로 확인하시기 바랍니다.</p>
        <p>※ CG·이미지는 이해를 돕기 위한 것으로 실제와 다를 수 있으며, 일정은 사업주체 사정에 따라 변경될 수 있습니다.</p>
      </div>
    </section>
  );
}

export function OtMain() {
  return (
    <>
      <OtCompare />
      <OtCards />
      <OtView />
      <OtRules />
      <OtCommercial />
      <OtRegister />
      <OtAptStrip />
      <OtNotice />
    </>
  );
}
