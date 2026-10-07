import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { SubNotice } from "@/components/notice";
import { canonicalLinks, faqJsonLd } from "@/lib/seo-host";
import { GuideAnswer, GuideDetail, type GuideFaq } from "@/components/seo-guide";
import { SRC_APPLYHOME, SRC_OFFICIAL, SRC_OFFICIAL_PREMIUM } from "@/lib/arkone-facts";

const FAQ: GuideFaq[] = [
  {
    q: "청라 아크원 푸르지오 오피스텔은 몇 실이고 면적은 어떻게 되나요?",
    a: "오피스텔은 총 987실이며 전용 105㎡, 121㎡, 136㎡ 세 가지로 공개되어 있습니다. 타입별 실수와 평면도는 아직 공개되지 않았습니다(미정).",
  },
  {
    q: "평면도는 어디서 볼 수 있나요?",
    a: "현재 사업주체가 공개한 평면도는 없습니다(미정). 평면도와 타입별 구성은 입주자모집공고 및 견본주택 개관 시 공개될 예정입니다.",
  },
  {
    q: "아파트와 오피스텔 청약 일정은 같은가요?",
    a: "청라 아크원 푸르지오는 10월 중 OPEN 예정이며, 아파트와 오피스텔의 세부 일정은 대표번호 1833-3872로 문의해 주세요. 각각의 공고문을 기준으로 확인해야 합니다.",
  },
  {
    q: "분양가 상한제는 오피스텔에도 적용되나요?",
    a: "사업주체는 단지를 '분양가 상한제 적용단지'로, 프리미엄 안내에서 '분양가 상한제 공급 아파트'로 표기하고 있습니다. 오피스텔의 분양가와 적용 기준은 공개되지 않았으므로 공고에서 확인하시기 바랍니다.",
  },
];

export const Route = createFileRoute("/pages/compare")({
  component: ComparePage,
  head: () => ({
    meta: [
      { title: "청라 아크원 푸르지오 아파트·오피스텔 비교 | 전용면적·평면도 안내" },
      {
        name: "description",
        content:
          "청라 아크원 푸르지오 아파트 868세대(전용 84·103㎡)와 오피스텔 987실(전용 105·121·136㎡)의 면적·주차·공고 일정·평면도 공개 여부 비교.",
      },
    ],
    links: canonicalLinks("/pages/compare"),
    scripts: faqJsonLd(FAQ),
  }),
});

function ComparePage() {
  return (
    <SiteShell path="/pages/compare">
      <div className="page_content">
        <section className="page_container">
          <GuideAnswer title="청라 아크원 푸르지오 아파트·오피스텔 한눈에 비교">
            <p>청라 아크원 푸르지오는 한 단지 안에 아파트 868세대와 오피스텔 987실을 함께 공급하는 주거복합 단지입니다.</p>
            <p>아파트는 전용 84㎡·103㎡, 오피스텔은 전용 105㎡·121㎡·136㎡로 공개되어 있으며, 오피스텔에는 멀티 발코니가 안내되어 있습니다.</p>
            <p>주차대수는 총 3,124대 중 아파트 1,389대, 오피스텔 1,695대로 공개되어 있습니다.</p>
            <p>아파트 타입별 세대수는 84A 248세대, 84B·84C·84D·103A·103B 각 124세대로 총 868세대입니다(분양 자료 기준). 오피스텔 타입별 실수, 평면도, 분양가는 아직 공개되지 않았으며(미정), 입주자모집공고에서 확정됩니다.</p>
          </GuideAnswer>
          <GuideDetail
            tableTitle="아파트(APT)와 오피스텔(OT) 비교"
            columns={["구분", "아파트(APT) · 오피스텔(OT)", "상태"]}
            rows={[
              { label: "공급 규모", value: "APT 868세대 · OT 987실 (총 1,855세대·실)", status: "공개값" },
              { label: "전용면적", value: "APT 84㎡, 103㎡ · OT 105㎡, 121㎡, 136㎡", status: "공개값" },
              { label: "연면적", value: "APT 173,952.7508㎡ · OT 245,645.4826㎡", status: "공개값" },
              { label: "주차대수", value: "APT 1,389대 · OT 1,695대 (총 3,124대 중, 상업시설 40대 별도)", status: "공개값" },
              { label: "공간 특화", value: "OT: 다양한 공간 활용의 멀티 발코니 (사업주체 프리미엄 안내)", status: "공개값" },
              { label: "APT 타입별 세대수", value: "84A 248 · 84B 124 · 84C 124 · 84D 124 · 103A 124 · 103B 124 (총 868세대)", status: "분양 자료 기준" },
              { label: "OT 타입별 실수 · 평면도", value: "OT 타입별 실수 미공개 · APT·OT 평면도 미공개", status: "미정" },
              { label: "상업시설", value: "피크원 53·아크원 43, 총 96개 점포 · 지상 1~2층 (1층 47 · 2층 49)", status: "분양 자료 기준" },
              { label: "분양가", value: "APT·OT 모두 미공개 (사업주체 표기: 분양가 상한제 적용단지)", status: "미정" },
              { label: "공고 일정", value: "10월 중 OPEN 예정 · 세부 일정 문의 1833-3872", status: "예정" },
              { label: "입주 시기", value: "2031년 입주 예정", status: "예정" },
            ]}
            faq={FAQ}
            links={[
              { to: "/pages/overview", label: "분양 사업개요" },
              { to: "/pages/schedule", label: "분양 일정·청약 안내" },
              { to: "/pages/premium", label: "프리미엄" },
              { to: "/pages/contact", label: "견본주택·홍보관 오시는길" },
              { to: "/register", label: "사전고객등록" },
            ]}
            sources={[SRC_OFFICIAL, SRC_OFFICIAL_PREMIUM, SRC_APPLYHOME]}
          />
          <SubNotice
            items={[
              "본 페이지의 수치는 사업주체 공개 사업개요 및 분양 자료 기준이며 인·허가 과정상 변경될 수 있으니 계약 시 주요 내용을 반드시 확인하시기 바랍니다.",
              "평면도, 오피스텔 타입별 실수, 분양가 등 공개되지 않은 항목은 입주자모집공고를 기준으로 확인하시기 바랍니다.",
            ]}
          />
        </section>
      </div>
    </SiteShell>
  );
}
