import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { canonicalLinks, faqJsonLd, tx } from "@/lib/seo-host";
import { SITE_PHONE, SITE_TEL_HREF } from "@/lib/site-data";

// ARK1120 P2: this route is the "after the general-supply calendar" view.
// It does not reuse the long A1/A2 notice body. Facts stay the posted ones.
// 청약통장 필요 여부는 이 페이지의 기존 문장에 근거가 없어 질문으로 넣지 않는다.

const FAQ_KO = [
  {
    q: "일반공급 당첨자 계약과 103㎡B 참여의향서는 어떻게 다른가요?",
    a: "일반공급 당첨 계약은 11월 22일(일)부터 24일(화)까지입니다. 103㎡B 참여의향서는 그 전인 2026년 11월 17일(화)부터 견본주택에서 받는 별도 절차이고, 선착순이 열리는 날과 방식은 미정입니다.",
  },
  {
    q: "대리 접수는 어디까지 되나요?",
    a: "대리 작성과 대리 접수는 되지 않습니다. 직원·배우자·제3자 모두 불가하고, 신청자 본인이 신분증 원본으로 1인 1건만 접수합니다.",
  },
  {
    q: "참여의향서를 내면 계약이 된 것인가요?",
    a: "아닙니다. 참여의향서 접수는 공급계약 체결이 아닙니다.",
  },
  {
    q: "선착순 일정은 어떻게 알려 주나요?",
    a: "일정과 방식은 현재 미정입니다. 정해지면 접수한 분께 문자나 전화로 따로 알립니다.",
  },
  {
    q: "당일에는 누가 들어가나요?",
    a: "진행 당일 참석은 신청자 본인이 원칙이고, 배우자에 한해 대리참석이 됩니다. 계약 명의는 본인 또는 배우자이며, 배우자 명의면 관계 서류를 냅니다.",
  },
];

const FAQ_EN = [
  {
    q: "How is a general-supply winner contract different from the 103 sqm B interest form?",
    a: "General-supply winner contracts run from 22 Nov (Sun) through 24 Nov (Tue). The 103 sqm B interest form is a separate step that opened on 17 Nov 2026 (Tue) at the model house. The first-come date and method are not set.",
  },
  {
    q: "Can someone else file the form?",
    a: "No. Staff, a spouse, or any other person cannot file it. The applicant brings the original ID and files one form in their own name.",
  },
  {
    q: "Does filing the form make a contract?",
    a: "No. Filing the interest form is not signing a supply contract.",
  },
  {
    q: "How will the first-come schedule be announced?",
    a: "The date and method are not set. When they are, people who filed are told by text or phone.",
  },
  {
    q: "Who attends on the day?",
    a: "The applicant attends. A spouse may attend instead. The contract name is the applicant or the spouse, and a spouse name needs relationship papers.",
  },
];

const DESC_KO = "청라 아크원 푸르지오 103㎡B 관심 접수는 11.17(화)부터이며 계약 종료(11.24)과 별도입니다.";
const DESC_EN = "Cheongna Ark-One Prugio 103 sqm B interest form from 17 Nov. It is not the 22-24 Nov contract.";

export const Route = createFileRoute("/103b")({
  component: B103Page,
  head: () => ({
    meta: [
      { title: tx("103㎡B 참여의향서 | 일반공급 계약 다음 접수 안내", "103 sqm B interest form after the winner contract") },
      { name: "description", content: tx(DESC_KO, DESC_EN) },
    ],
    links: [...canonicalLinks("/103b")],
    scripts: faqJsonLd(tx(FAQ_KO, FAQ_EN), "/103b"),
  }),
});

function B103Page() {
  const faq = tx(FAQ_KO, FAQ_EN);
  return (
    <SiteShell path="/103b">
      <div className="page_content">
        <section className="page_container">
          <h1 className="page-h1">{tx("103㎡B 참여의향서, 일반공급 계약 다음 단계", "103 sqm B interest form, the step after the general-supply contract")}</h1>
          <p>
            {tx(
              "순서는 일반공급 당첨자 계약(11월 22일부터 24일)과 별도로, 103㎡B 참여의향서 접수(2026년 11월 17일 화요일부터, 마감일은 없음)를 먼저 받고, 선착순 공급 일정은 나중에 안내하는 흐름입니다.",
              "The general-supply winner contract (22-24 Nov) is separate. The 103 sqm B interest form has been accepted since Tuesday 17 Nov 2026, with no closing date posted. The first-come supply date is announced later.",
            )}
          </p>
          <p>
            {tx(
              "접수는 견본주택에서 신청자 본인만 합니다. 신분증 원본이 필요하고 대리 접수는 없습니다. 이 접수는 계약서를 쓰는 단계가 아닙니다. 납부 조건은 계약금 5% · 중도금 60% 이자후불제 · 잔금 35%입니다. 문의는 1833-3872이고, 방문 시간은 이 사이트의 방문예약에서 잡습니다.",
              "Only the applicant files, at the model house, with the original ID. There is no proxy filing. Filing is not writing the contract. Payment terms are a 5% contract deposit, 60% intermediate payments with interest deferred, and a 35% balance. Call 1833-3872. Book a visit on this site.",
            )}
          </p>
          <table>
            <caption>{tx("참여의향서 요약", "Interest form, short")}</caption>
            <tbody>
              <tr>
                <th scope="row">{tx("무엇을", "What")}</th>
                <td>{tx("103㎡B 선착순에 참여하겠다는 의사. 계약금 5% · 중도금 60% 이자후불제 · 잔금 35%.", "A statement that you want to join the 103 sqm B first-come supply. Deposit 5%, intermediate 60% with interest deferred, balance 35%.")}</td>
              </tr>
              <tr>
                <th scope="row">{tx("어디서·누가", "Where and who")}</th>
                <td>{tx("견본주택, 신청자 본인. 11월 17일(화)부터. 마감일은 추후 안내.", "Model house, the applicant, from 17 Nov (Tue). No closing date yet.")}</td>
              </tr>
              <tr>
                <th scope="row">{tx("그 다음", "Then")}</th>
                <td>{tx("선착순 날과 방식은 미정. 정해지면 문자나 전화. 공급 일정은 추후 안내.", "First-come date and method are not set. Text or phone when set. Supply timing comes later.")}</td>
              </tr>
            </tbody>
          </table>
          <section aria-label={tx("자주 묻는 질문", "Questions")}>
            {faq.map((item) => (
              <article key={item.q}>
                <h2>{item.q}</h2>
                <p>{item.a}</p>
              </article>
            ))}
          </section>
          <p>
            {tx("문의", "Call")} <a href={SITE_TEL_HREF}>{SITE_PHONE}</a>
          </p>
          <p>{tx("확인 기준일 2026-11-25. 사업주체 안내가 바뀌면 그 안내가 우선합니다.", "Checked 2026-11-25. If the project entity posts a change, that notice prevails.")}</p>
        </section>
      </div>
    </SiteShell>
  );
}
