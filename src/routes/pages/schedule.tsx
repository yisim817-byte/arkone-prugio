import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { SubNotice } from "@/components/notice";
import { canonicalLinks, faqJsonLd } from "@/lib/seo-host";
import { GuideAnswer, GuideDetail, type GuideFaq } from "@/components/seo-guide";
import { SRC_APPLYHOME, SRC_OFFICIAL, SRC_SCHEDULE } from "@/lib/arkone-facts";

const FAQ: GuideFaq[] = [
  {
    q: "청라 아크원 푸르지오 분양 일정은 어떻게 되나요?",
    a: "APT 입주자모집공고는 2026년 10월 15일(목) 예정, GRAND OPEN은 2026년 10월 23일(금) 예정입니다. 특별공급·1순위·2순위·당첨자 발표·계약 일정은 입주자모집공고 확정 후 안내되며 현재는 미정입니다.",
  },
  {
    q: "분양가는 얼마인가요?",
    a: "분양가는 아직 공개되지 않았습니다(미정). 사업주체는 '분양가 상한제 적용단지'로 표기하고 있으며, 실제 금액과 납부 조건은 입주자모집공고에서 확정됩니다.",
  },
  {
    q: "사전고객등록을 하면 청약이 접수되나요?",
    a: "아닙니다. 사전고객등록은 분양 소식을 안내받기 위한 등록이며 공식 청약 신청이 아닙니다. 청약 자격과 일정은 입주자모집공고를 따르고, 청약은 공고 후 청약홈에서 진행됩니다.",
  },
  {
    q: "청약 전에 무엇을 준비해야 하나요?",
    a: "입주자모집공고가 게시되면 청약홈에서 공고문을 확인하고, 본인의 청약통장 가입 내역, 거주지역, 주택 소유 여부 등 자격 요건을 공고 기준으로 점검하시기 바랍니다.",
  },
  {
    q: "입주는 언제인가요?",
    a: "입주 시기는 아직 공개되지 않았습니다(미정). 입주자모집공고에서 확인하시기 바랍니다.",
  },
];

export const Route = createFileRoute("/pages/schedule")({
  component: SchedulePage,
  head: () => ({
    meta: [
      { title: "청라 아크원 푸르지오 분양 일정·청약·분양가 안내 | 사전고객등록" },
      {
        name: "description",
        content:
          "청라 아크원 푸르지오 분양 일정: APT 입주자모집공고 2026.10.15(목) 예정, GRAND OPEN 2026.10.23(금) 예정. 청약 일정·분양가·입주 시기는 공고 전 미정. 청약 준비사항과 사전고객등록 안내.",
      },
    ],
    links: canonicalLinks("/pages/schedule"),
    scripts: faqJsonLd(FAQ),
  }),
});

function SchedulePage() {
  return (
    <SiteShell path="/pages/schedule">
      <div className="page_content">
        <section className="page_container">
          <GuideAnswer title="청라 아크원 푸르지오 분양 일정·청약 안내">
            <p>청라 아크원 푸르지오는 현재 입주자모집공고 전 단계입니다.</p>
            <p>APT 입주자모집공고는 2026년 10월 15일(목) 예정이며, GRAND OPEN은 2026년 10월 23일(금) 예정입니다.</p>
            <p>특별공급·1순위·2순위·당첨자 발표·계약 일정과 분양가, 입주 시기는 아직 공개되지 않았으며(미정) 입주자모집공고에서 확정됩니다.</p>
            <p>일정은 사업주체 사정에 따라 변경될 수 있으므로 청약 전 청약홈에 게시되는 공고문을 반드시 확인하시기 바랍니다.</p>
          </GuideAnswer>
          <GuideDetail
            tableTitle="분양 일정 및 주요 조건 상태"
            columns={["항목", "내용", "상태"]}
            rows={[
              { label: "APT 입주자모집공고", value: "2026년 10월 15일(목)", status: "예정" },
              { label: "GRAND OPEN", value: "2026년 10월 23일(금) · 사업주체 홈페이지 표기 '10월 OPEN 예정'", status: "예정" },
              { label: "특별공급·1순위·2순위 접수", value: "입주자모집공고 확정 후 안내", status: "미정" },
              { label: "당첨자 발표·계약", value: "입주자모집공고 확정 후 안내", status: "미정" },
              { label: "분양가", value: "미공개 (사업주체 표기: 분양가 상한제 적용단지)", status: "미정" },
              { label: "중도금·대출 등 금융 조건", value: "미공개", status: "미정" },
              { label: "오피스텔 공고 일정", value: "미안내", status: "미정" },
              { label: "입주 시기", value: "미공개", status: "미정" },
            ]}
            faq={FAQ}
            links={[
              { to: "/pages/changeinfo", label: "변경된 청약제도" },
              { to: "/pages/docspecial", label: "특별공급 안내" },
              { to: "/pages/docnormal", label: "일반공급 안내" },
              { to: "/pages/compare", label: "아파트·오피스텔 비교" },
              { to: "/pages/contact", label: "견본주택·홍보관 오시는길" },
              { to: "/pages/overview", label: "분양 사업개요" },
            ]}
            sources={[SRC_SCHEDULE, SRC_OFFICIAL, SRC_APPLYHOME]}
          >
            <h3 className="seo-guide__subtitle">청약 준비 체크리스트</h3>
            <ul className="seo-guide__answer">
              <li>입주자모집공고 게시 후 청약홈에서 공고문 전문을 확인합니다.</li>
              <li>청약통장 가입 기간·납입 내역, 거주지역, 세대 구성원의 주택 소유 여부를 공고 기준으로 점검합니다.</li>
              <li>특별공급 대상 여부와 필요 서류는 공고문과 특별공급 안내를 함께 확인합니다.</li>
              <li>분양가·납부 일정 등 계약 조건은 공고 확정 후 확인하며, 확정 전 정보에 의존하지 않습니다.</li>
            </ul>
            <h3 className="seo-guide__subtitle">사전고객등록 안내</h3>
            <div className="seo-guide__answer">
              <p>사전고객등록은 분양 일정과 소식을 안내받기 위한 등록이며 공식 청약 신청이 아닙니다.</p>
              <p>
                등록은 <Link to="/register">사전고객등록 페이지</Link>에서 할 수 있고, 등록 확인은 대표번호 1833-3872로 문의해
                주세요.
              </p>
            </div>
          </GuideDetail>
          <SubNotice
            items={[
              "일정은 사업주체 사정에 따라 변경될 수 있습니다.",
              "청약 자격, 공급 물량, 일정 등 세부 내용은 입주자모집공고를 기준으로 확인하시기 바랍니다.",
            ]}
          />
        </section>
      </div>
    </SiteShell>
  );
}
