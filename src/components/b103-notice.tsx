// v111 Q3: A3 /103b 는 「아파트 청약 이후 흐름」만 적는다. A1 근거 원문과 문장을 맞추지 않는다.
export const B103_ASOF = "2026.11.25";
export const B103_H1 = "청라 아크원 푸르지오 아파트 청약 이후 103㎡B 진행 순서";
export const B103_LEAD = "일반공급 당첨자 계약은 2026년 11월 22일부터 24일 사이에 진행된 뒤 끝났습니다. 아파트에서 이어서 보는 절차는 103㎡B 타입입니다. 희망자는 11월 17일 화요일부터 견본주택에 본인이 와서 참여의향서를 냅니다. 선착순은 11월 28일 토요일에 열릴 예정이고, 그날 시각은 의향서를 낸 분에게만 따로 알립니다. 의향서를 냈다고 공급계약이 된 것은 아닙니다. 오피스텔 청약은 이 절차와 별개로 12월 7일 월요일입니다.";
export const B103_KEYS: ReadonlyArray<readonly [string, string, string]> = [
  ["끝난 일정", "당첨자 계약 종료", "11월 22일~24일"],
  ["다음 아파트", "103㎡B 선착순", "11월 28일 토 예정"],
  ["별도 상품", "오피스텔 청약", "12월 7일 월"],
];
export const B103_ROWS: ReadonlyArray<readonly [string, ReadonlyArray<string>]> = [
  ["1. 계약", ["일반공급 당첨자 계약은 이미 끝났습니다."]],
  ["2. 의향서", ["11월 17일 화요일부터 견본주택에서 본인 접수"]],
  ["3. 선착순", ["11월 28일 토요일 예정 · 시각은 접수자에게 개별 안내"]],
  ["4. 오피스텔", ["청약 12월 7일 월요일 · 아파트 절차와 다릅니다."]],
];
export const B103_STEPS: ReadonlyArray<readonly [string, string, string]> = [
  ["1", "계약 종료 확인", "11월 22일~24일 일정은 지났습니다"],
  ["2", "의향서", "견본주택 · 본인 · 11월 17일부터"],
  ["3", "11월 28일", "선착순 예정 · 시각은 개별 안내"],
  ["4", "12월 7일", "오피스텔 청약 · 별도"],
];
export const B103_FACTS: ReadonlyArray<readonly [string, string]> = [
  ["지금 아파트", "당첨자 계약은 종료"],
  ["103㎡B", "선착순은 11월 28일 토요일 예정"],
  ["의향서", "공급계약이 아닙니다"],
  ["오피스텔", "청약일 12월 7일 월요일"],
  ["전화", "1833-3872"],
];
export const B103_FAQ: ReadonlyArray<{ q: string; a: string }> = [
  { q: "일반공급 계약이 끝난 뒤 103㎡B는 어떤 순서인가요?", a: "당첨자 계약이 끝난 뒤 아파트에서 이어지는 절차는 103㎡B 선착순입니다. 먼저 참여의향서를 내고, 선착순은 11월 28일 토요일에 진행될 예정입니다." },
  { q: "참여의향서와 11월 28일 선착순은 어떤 관계인가요?", a: "의향서는 11월 17일 화요일부터 견본주택에서 본인이 냅니다. 11월 28일 선착순의 세부 시각은 그 접수 고객에게 개별 안내합니다." },
  { q: "오피스텔 청약 12월 7일은 103㎡B와 같은 절차인가요?", a: "아닙니다. 오피스텔 청약은 12월 7일 월요일이고, 103㎡B 선착순과는 별도 절차입니다." },
  { q: "참여의향서를 접수했다고 공급계약이 된 것인가요?", a: "아닙니다. 참여의향서 접수는 공급계약이 아닙니다." },
  { q: "선착순 당일 세부 시간은 어디서 확인하나요?", a: "세부 시간은 참여의향서를 접수한 고객에게 개별 안내합니다. 대표번호는 1833-3872입니다." },
];
export const B103_NOTES: ReadonlyArray<string> = [
  "위 순서는 2026.11.25 안내와 입주자모집공고(2026.10.22)를 기준으로 2026-11-27에 확인했습니다.",
  "선착순 결과와 잔여 세대는 이 페이지에 적지 않습니다.",
];

type Props = { phone: string; plansHref: string; contactHref: string; visitHref: string };

export function B103Notice({ phone, plansHref, contactHref, visitHref }: Props) {
  const digits = phone.replace(/\D/g, "");
  return (
    <article className="b103" id="b103" data-b103-asof={B103_ASOF}>
      <header className="b103-head">
        <p className="b103-eyebrow">APT · 청약 이후</p>
        <h1 className="b103-title">{B103_H1}</h1>
        <p className="b103-asof">{B103_ASOF} 안내 기준</p>
        <p className="b103-lead">{B103_LEAD}</p>
      </header>
      <ul className="b103-keys">
        {B103_KEYS.map(([k, v, s]) => (
          <li key={k}><span className="b103-keys__k">{k}</span><strong className="b103-keys__v">{v}</strong><span className="b103-keys__s">{s}</span></li>
        ))}
      </ul>
      <section className="b103-sec" aria-labelledby="b103-rule">
        <h2 className="b103-h2" id="b103-rule">아파트 청약 이후 흐름</h2>
        <div className="b103-tablewrap">
          <table className="b103-table">
            <thead><tr><th scope="col">순서</th><th scope="col">내용</th></tr></thead>
            <tbody>
              {B103_ROWS.map(([k, lines]) => (
                <tr key={k}><th scope="row">{k}</th><td>{lines.map((l) => (<span key={l}>{l}</span>))}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="b103-sec" aria-labelledby="b103-step">
        <h2 className="b103-h2" id="b103-step">이어 보는 순서</h2>
        <ol className="b103-steps">
          {B103_STEPS.map(([n, t, s]) => (<li key={n}><span className="b103-steps__n">{n}</span><strong>{t}</strong><span>{s}</span></li>))}
        </ol>
      </section>
      <section className="b103-sec" aria-labelledby="b103-fact">
        <h2 className="b103-h2" id="b103-fact">이 페이지에서 말하는 범위</h2>
        <dl className="b103-facts">
          {B103_FACTS.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
        </dl>
        <p className="b103-links"><a href={plansHref}>평면 안내 보기 ›</a><a href={contactHref}>견본주택 위치 보기 ›</a></p>
      </section>
      <section className="b103-sec" aria-labelledby="b103-faq">
        <h2 className="b103-h2" id="b103-faq">자주 묻는 질문</h2>
        <div className="b103-faq">
          {B103_FAQ.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
        </div>
      </section>
      <section className="b103-cta" aria-label="문의">
        <p className="b103-cta__t">순서 문의</p>
        <a className="b103-cta__tel" href={`tel:${digits}`}>{phone}</a>
        <a className="b103-cta__visit" href={visitHref}>견본주택 방문 예약 ›</a>
      </section>
      <ul className="b103-notes">
        {B103_NOTES.map((n) => (<li key={n}>※ {n}</li>))}
      </ul>
      <p className="b103-asof">출처: 2026.11.25 안내 · 입주자모집공고(2026.10.22) · 확인 기준일 2026-11-27</p>
    </article>
  );
}
