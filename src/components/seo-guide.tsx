import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export type GuideRow = { label: string; value: ReactNode; status?: string };
export type GuideFaq = { q: string; a: string };
export type GuideLink = { to: string; label: string };
export type GuideSource = { label: string; href?: string; date: string };

/** 페이지 상단 요약 답변 (3~5문장). */
export function GuideAnswer({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="seo-guide seo-guide-answer" aria-label={title}>
      <h2 className="seo-guide__title">{title}</h2>
      <div className="seo-guide__answer">{children}</div>
    </section>
  );
}

export const STATUS_LEGEND =
  "상태 표기: 공개값 = 사업주체가 공개한 계획 수치(인·허가 과정에서 변경될 수 있음) · 확정 = 완료·공표된 사항 · 예정 = 일정이 안내되었으나 변경될 수 있음 · 미정 = 아직 공개되지 않음";

/** 사실 표 + 고객 Q&A + 관련 링크 + 출처·기준일. */
export function GuideDetail({
  tableTitle,
  rows,
  columns = ["항목", "내용", "상태"],
  faq,
  links,
  sources,
  children,
}: {
  tableTitle?: string;
  rows?: GuideRow[];
  columns?: [string, string, string];
  faq?: GuideFaq[];
  links?: GuideLink[];
  sources?: GuideSource[];
  children?: ReactNode;
}) {
  return (
    <section className="seo-guide seo-guide-detail">
      {rows && rows.length > 0 ? (
        <>
          {tableTitle ? <h3 className="seo-guide__subtitle">{tableTitle}</h3> : null}
          <div className="seo-guide__table_wrap">
            <table className="seo-guide__table">
              <thead>
                <tr>
                  <th scope="col">{columns[0]}</th>
                  <th scope="col">{columns[1]}</th>
                  <th scope="col">{columns[2]}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.value}</td>
                    <td>{row.status ?? ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="seo-guide__legend">{STATUS_LEGEND}</p>
        </>
      ) : null}
      {children}
      {faq && faq.length > 0 ? (
        <>
          <h3 className="seo-guide__subtitle">자주 묻는 질문</h3>
          <dl className="seo-guide__faq">
            {faq.map((item) => (
              <div key={item.q}>
                <dt>Q. {item.q}</dt>
                <dd>A. {item.a}</dd>
              </div>
            ))}
          </dl>
        </>
      ) : null}
      {links && links.length > 0 ? (
        <>
          <h3 className="seo-guide__subtitle">함께 보면 좋은 안내</h3>
          <ul className="seo-guide__links">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {sources && sources.length > 0 ? (
        <div className="seo-guide__sources">
          <strong>출처·기준일</strong>
          <ul>
            {sources.map((s) => (
              <li key={s.label}>
                {s.href ? (
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                ) : (
                  s.label
                )}{" "}
                (기준일 {s.date})
              </li>
            ))}
          </ul>
          <p>본 페이지는 홈페이지운영 휴메인코리아가 공개 자료를 정리한 분양 정보 안내이며, 시행·시공사의 공식 홈페이지가 아닙니다. 계약 전 입주자모집공고 등 사업주체 공고를 반드시 확인하시기 바랍니다.</p>
        </div>
      ) : null}
    </section>
  );
}
