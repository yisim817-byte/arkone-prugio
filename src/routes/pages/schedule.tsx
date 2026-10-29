import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { SubNotice } from "@/components/notice";
import { canonicalLinks, faqJsonLd, isEnHost, tx } from "@/lib/seo-host";
import { GuideAnswer, GuideDetail, type GuideFaq } from "@/components/seo-guide";
import { FAQ_SCHEDULE, META, withPrice } from "@/lib/i18n/en";
import { SRC_APPLYHOME } from "@/lib/arkone-facts";
import { NoticePayment, NoticePrice, PRICE_FAQ_ANSWER } from "@/components/notice-sections";

const FAQ: GuideFaq[] = [
  {
    q: "청라 아크원 푸르지오 분양 일정은 어떻게 되나요?",
    a: "입주자모집공고는 2026.10.22(목) 게시되었습니다. 특별공급 11.02(월), 일반공급 1순위 11.03(화), 2순위 11.04(수), 당첨자 발표 11.10(화), 당첨자 서류접수 11.12(목)~11.16(월), 계약 11.22(일)~11.24(화)입니다. 일정이 바뀌면 입주자모집공고문이 우선합니다.",
  },
  {
    q: "분양가는 얼마인가요?",
    a: PRICE_FAQ_ANSWER,
  },
  {
    q: "청라 아크원 푸르지오 분양가는 언제 공개되고, 어디서 확인할 수 있나요?",
    a: "청라 아크원 푸르지오(APT) 분양가(공급금액)는 2026.10.22(목) 게시된 입주자모집공고문(주택관리번호 2026000496)의 공급금액표에 주택형·동·층·호별로 공개되어 있습니다. 공고문은 청약홈(applyhome.co.kr)에서 직접 확인하실 수 있습니다. 오피스텔은 별도 공고로 안내합니다. 조건별 금액은 대표번호 1833-3872로 상담해 주세요.",
  },
  {
    q: "사전고객등록을 하면 청약이 접수되나요?",
    a: "아닙니다. 사전고객등록은 분양 소식을 안내받기 위한 등록이며 공식 청약 신청이 아닙니다. 청약 자격과 일정은 입주자모집공고를 따르고, 청약은 공고 후 청약홈에서 진행됩니다.",
  },
  {
    q: "청약 전에 무엇을 준비해야 하나요?",
    a: "2026.10.22(목) 게시된 입주자모집공고문을 청약홈에서 확인하고, 본인의 청약통장 가입 내역, 거주지역, 주택 소유 여부 등 자격 요건을 공고 기준으로 점검하시기 바랍니다.",
  },
  {
    q: "입주는 언제인가요?",
    a: "입주는 2031년 08월 예정이며 공정에 따라 바뀔 수 있습니다. 정확한 입주일은 사업주체가 따로 알립니다.",
  },
  {
    q: "청라 아크원 푸르지오 예상 분양가나 시세 전망도 있나요?",
    a: "이 사이트는 예상 분양가·시세 전망을 안내하지 않습니다. 분양가(공급금액)는 입주자모집공고문 공급금액표 기준이며, 조건별 금액은 대표번호 1833-3872로 상담해 주세요.",
  },
  {
    q: "청라 아크원 푸르지오 월세나 전세도 안내하나요?",
    a: "이 사이트는 월세·전세 시세를 안내하지 않습니다. 분양 조건은 입주자모집공고에서 확인합니다.",
  },
  {
    q: "누가 청약할 수 있나요?",
    a: "입주자모집공고일(2026.10.22) 현재 인천광역시·서울특별시·경기도에 거주하는 만 19세 이상이면 신청할 수 있습니다. 같은 순위에서 경쟁이 있으면 인천광역시 거주자 50%를 우선 공급하고 나머지 50%는 서울특별시·경기도 거주자에게 공급합니다. 1순위는 청약통장 가입 12개월 경과와 지역별·면적별 예치금 충족이 필요합니다.",
  },
  {
    q: "전매제한·재당첨 제한·거주의무가 있나요?",
    a: "전매제한 3년(소유권이전등기일까지, 3년을 넘으면 3년), 재당첨 제한 10년(이 단지 당첨 시)이 적용되며 거주의무는 없습니다. 기존 재당첨 제한 기간 중인 분도 이 단지에 청약할 수 있습니다.",
  },
];

function scheduleFaq(): GuideFaq[] {
  return tx(FAQ, withPrice(FAQ_SCHEDULE));
}

export const Route = createFileRoute("/pages/schedule")({
  component: SchedulePage,
  head: () => ({
    meta: [
      { title: tx("청라 아크원 푸르지오 분양가·분양 일정·청약 안내", META.schedule.title) },
      {
        name: "description",
        content: tx(
          "청라 아크원 푸르지오(APT) 청약 일정·공급금액. 공고 2026.10.22 게시 · 특별공급 11.02 · 1순위 11.03 · 계약 11.22~11.24.",
          META.schedule.desc,
        ),
      },
    ],
    links: canonicalLinks("/pages/schedule"),
    scripts: faqJsonLd(scheduleFaq()),
  }),
});

function SchedulePage() {
  return (
    <SiteShell path="/pages/schedule">
      <div className="page_content">
        <section className="page_container">
          <GuideAnswer title={tx("청라 아크원 푸르지오 분양 일정·청약 안내", META.schedule.h1)}>
            {isEnHost() ? (
              <>
                <p>The apartment recruitment notice for Cheongna Ark-One Prugio was posted on 22 Oct 2026.</p>
                <p>Notice posted 22 Oct 2026. Model house grand opening is 30 Oct. Call 1833-3872 for the details.</p>
                <p>Special supply is 2 Nov. First rank is 3 Nov. Second rank is 4 Nov. Winners are announced on 10 Nov. Document submission is 12-16 Nov. Contracts are 22-24 Nov. Supply amounts are in the recruitment notice (housing management number 2026000496) by type building floor and unit. Call 1833-3872 for a specific unit. Move-in is planned for August 2031 and can change with construction.</p>
                <p>The schedule can change so read the notice on Applyhome before you apply.</p>
                <p>Source date 22 Oct 2026. Source: recruitment notice 2026000496.</p>
              </>
            ) : (
              <>
            <p>청라 아크원 푸르지오(APT) 입주자모집공고가 2026.10.22(목) 게시되었습니다.</p>
            <p>청라 아크원 푸르지오는 입주자모집공고 게시 2026.10.22(목) · 견본주택 GRAND OPEN 10.30(금)입니다. 세부 일정은 대표번호 1833-3872로 문의해 주세요.</p>
            <p>특별공급 11.02(월), 일반공급 1순위 11.03(화), 2순위 11.04(수), 당첨자 발표 11.10(화), 당첨자 서류접수 11.12(목)~11.16(월), 계약 11.22(일)~11.24(화)입니다. 분양가(공급금액)는 입주자모집공고문(주택관리번호 2026000496)의 공급금액표에 주택형·동·층·호별로 공개되어 있습니다. 주택형과 층에 따라 금액이 다르므로 원하시는 조건은 대표번호 1833-3872로 상담해 주세요. 입주는 2031년 08월 예정이며 공정에 따라 바뀔 수 있습니다.</p>
            <p>일정은 사업주체 사정에 따라 변경될 수 있으므로 청약 전 청약홈에 게시되는 공고문을 반드시 확인하시기 바랍니다.</p>
            <p>자료 기준일 2026-10-29 · 출처 입주자모집공고(주택관리번호 2026000496)</p>
              </>
            )}
          </GuideAnswer>
          <section className="seo-guide notice-schedule" aria-label={isEnHost() ? "Application schedule" : "청약 일정"}>
            <h2 className="seo-guide__subtitle">{isEnHost() ? "Apartment application schedule from the recruitment notice" : "청라 아크원 푸르지오(APT) 청약 일정 — 입주자모집공고 기준"}</h2>
            <div className="seo-guide__answer">
              {isEnHost() ? (
                <>
                  <p>Recruitment notice posted 22 Oct 2026</p>
                  <p>Special supply 2 Nov</p>
                  <p>General supply first rank 3 Nov</p>
                  <p>General supply second rank 4 Nov</p>
                  <p>Winners announced 10 Nov</p>
                  <p>Winner documents 12-16 Nov</p>
                  <p>Contracts 22-24 Nov</p>
                  <p>Model house grand opening 30 Oct at 87-1 Cheongna-dong Seohae-gu Incheon</p>
                  <p>Apply on the internet at Korea Real Estate Board Applyhome (www.applyhome.co.kr).</p>
                  <p>The schedule can change and the recruitment notice prevails.</p>
                </>
              ) : (
                <>
              <p>입주자모집공고 게시 2026.10.22(목)</p>
              <p>특별공급 11.02(월)</p>
              <p>일반공급 1순위 11.03(화)</p>
              <p>일반공급 2순위 11.04(수)</p>
              <p>당첨자 발표 11.10(화)</p>
              <p>당첨자 서류접수 11.12(목)~11.16(월)</p>
              <p>계약 11.22(일)~11.24(화)</p>
              <p>견본주택 GRAND OPEN 10.30(금) · 인천광역시 서해구 청라동 87-1</p>
              <p>청약은 한국부동산원 청약홈(www.applyhome.co.kr)에서 인터넷으로 신청합니다.</p>
              <p>※ 일정은 사업주체 사정에 따라 변경될 수 있으며, 입주자모집공고문이 우선합니다.</p>
                </>
              )}
            </div>
          </section>
          <p className="plans-link"><Link to="/pages/plans">평면도·공급금액 한눈에 보기 →</Link></p>
          <NoticePrice />
          <NoticePayment />
          <GuideDetail
            tableTitle="분양 일정 및 주요 조건 상태"
            columns={["항목", "내용", "상태"]}
            rows={[
              { label: "APT 입주자모집공고", value: "2026.10.22(목) 게시", status: "확정" },
              { label: "GRAND OPEN", value: "2026.10.30(금)", status: "확정" },
              { label: "특별공급·1순위·2순위 접수", value: "특별공급 11.02(월) · 1순위 11.03(화) · 2순위 11.04(수)", status: "확정" },
              { label: "당첨자 발표·계약", value: "당첨자 발표 11.10(화) · 당첨자 서류접수 11.12(목)~11.16(월) · 계약 11.22(일)~11.24(화)", status: "확정" },
              { label: "분양가", value: "입주자모집공고문(주택관리번호 2026000496) 공급금액표에 주택형·동·층·호별 공개 · 상담 1833-3872 (분양가상한제 적용)", status: "확정" },
              { label: "중도금·대출 등 금융 조건", value: "계약금 5% · 중도금 60%(이자후불제) · 잔금 35% (공급금액 기준 비율)", status: "확정" },
              { label: "오피스텔 공고 일정", value: "미안내", status: "미정" },
              { label: "입주 시기", value: "입주예정 2031년 08월", status: "공고 기준" },
            ]}
            faq={scheduleFaq()}
            links={[
              { to: "/pages/docnormal", label: "일반공급 청약 안내" },
              { to: "/pages/docspecial", label: "특별공급 청약 안내" },
              { to: "/pages/changeinfo", label: "변경된 청약제도" },
              { to: "/pages/contact", label: "견본주택 오시는길" },
              { to: "/pages/compare", label: "아파트·오피스텔 비교" },
              { to: "/pages/contact", label: "견본주택·홍보관 오시는길" },
              { to: "/pages/overview", label: "분양 사업개요" },
            ]}
            sources={[SRC_APPLYHOME]}
          >
            <h3 className="seo-guide__subtitle">청약 준비 체크리스트</h3>
            <ul className="seo-guide__answer">
              <li>청약홈에서 입주자모집공고문(주택관리번호 2026000496) 전문을 확인합니다.</li>
              <li>청약통장 가입 기간·납입 내역, 거주지역, 세대 구성원의 주택 소유 여부를 공고 기준으로 점검합니다.</li>
              <li>특별공급 대상 여부와 필요 서류는 공고문과 특별공급 안내를 함께 확인합니다.</li>
              <li>분양가·납부 일정 등 계약 조건은 입주자모집공고문으로 확인합니다.</li>
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
