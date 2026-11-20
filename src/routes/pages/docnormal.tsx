import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { ZoomButton } from "@/components/notice";
import { canonicalLinks, faqJsonLd, isEnHost, tx } from "@/lib/seo-host";
import { META } from "@/lib/i18n/en";
import { GuideAnswer, GuideDetail, type GuideFaq } from "@/components/seo-guide";
import { SRC_APPLYHOME } from "@/lib/arkone-facts";
import { imgDims } from "@/components/img";
import { NoticeEligibility } from "@/components/notice-sections";

const FAQ_KO: GuideFaq[] = [
  { q: "일반공급 1순위와 2순위는 언제 받나요?", a: "1순위 접수는 11.03(화)이고 2순위 접수는 11.04(수)입니다. 당첨자 발표는 11.10(화)에 있었습니다. 결과는 청약홈에서 확인할 수 있습니다." },
  { q: "일반공급 계약 기간은 어떻게 되나요?", a: "계약은 11.22(일)부터 11.24(화)까지입니다. 서류 접수는 11.12(목)부터 11.16(월)까지입니다." },
  { q: "입주 예정 시기는 언제인가요?", a: "입주 예정은 2031년 08월입니다. 공정에 따라 바뀔 수 있습니다." },
  { q: "전매제한과 거주의무는 어떻게 되나요?", a: "전매제한은 3년이고 재당첨 제한은 10년입니다. 거주의무는 없습니다." },
  { q: "청약통장 예치금 액수는 어디에 있나요?", a: "예치 기준액은 입주자모집공고에 있습니다. 이 안내에서 빠지거나 다른 숫자는 공고문과 청약홈에서 확인합니다." },
];

const FAQ_EN: GuideFaq[] = [
  { q: "When were general-supply ranks accepted?", a: "First rank was 3 Nov and second rank was 4 Nov. Winners were announced on 10 Nov. Check Applyhome for the result." },
  { q: "When is the general-supply contract?", a: "Contracts run from 22 Nov through 24 Nov. Documents were 12 Nov through 16 Nov." },
  { q: "When is move-in planned?", a: "Move-in is planned for August 2031 and can change with construction." },
  { q: "Is there a resale limit or an occupancy duty?", a: "Resale is limited for 3 years and re-winning is limited for 10 years. There is no occupancy duty." },
  { q: "Where is the savings deposit amount?", a: "The deposit standard is in the recruitment notice. This page does not add a different number." },
];

export const Route = createFileRoute("/pages/docnormal")({
  component: DocNormalPage,
  head: () => ({
    meta: [
      { title: tx("청라 아크원 푸르지오 일반공급 안내 | 순위·접수", META.docnormal.title) },
      { name: "description", content: tx("청라 아크원 푸르지오 일반공급 안내. 1순위 11.03(화) · 2순위 11.04(수) · 당첨자 발표 11.10(화). 2026.10.22 공고 기준.", META.docnormal.desc) },
    ],
    links: canonicalLinks("/pages/docnormal"),
    scripts: faqJsonLd(tx(FAQ_KO, FAQ_EN), "/pages/docnormal"),
  }),
});

function DocNormalPage() {
  const src = "/resources/img/sub/02_일반공급.v4.webp";
  return (
    <SiteShell path="/pages/docnormal">
      <div className="page_content">
        <section className="page_container">
          <GuideAnswer title={tx("청라 아크원 푸르지오 일반공급 안내 요약", META.docnormal.h1)}>
            <p>{tx("일반공급 페이지는 순위 접수만 다룹니다. 1순위는 11월 3일, 2순위는 11월 4일에 받았고 당첨 발표는 11월 10일에 끝났습니다. 결과는 청약홈에서 봅니다. 원문은 2026년 10월 22일 목요일 공고입니다.", "This page is only the general-supply ranks. First rank was 3 Nov, second rank was 4 Nov, and winners were announced on 10 Nov. Read the notice posted on 22 Oct 2026.")}</p>
          </GuideAnswer>
          <NoticeEligibility />
            <p>일반공급 안내에서는 특별공급의 평생 1회 제한을 다시 풀지 않습니다. 자격과 공급 비율의 원문은 2026년 10월 22일 목요일에 청약홈에 올라간 공고입니다.</p>
          <figure>
            <img src={src} alt="청라 아크원 푸르지오 청약 전 확인사항과 예치금액 표를 담은 일반공급 안내문" {...imgDims(src)} data-dims="" />
          </figure>
          <ZoomButton href={src} />
          <GuideDetail
            links={[
              { to: "/pages/schedule", label: "분양 일정·청약 안내" },
              { to: "/pages/changeinfo", label: "변경된 청약제도" },
              { to: "/pages/docspecial", label: "특별공급 안내" },
              { to: "/pages/docnormal", label: "일반공급 안내" },
              { to: "/pages/overview", label: "분양 사업개요" },
            ].filter((l) => l.to !== "/pages/docnormal")}
            sources={[{ ...SRC_APPLYHOME, date: isEnHost() ? SRC_APPLYHOME.date : "2026-10-29" }]}
            faq={tx(FAQ_KO, FAQ_EN)}
          />
          <p>{tx("출처: 청약홈에 게시된 입주자모집공고(2026.10.22) · 확인 기준일 2026-11-25", "Source: recruitment notice posted on Applyhome on 22 Oct 2026. Checked 2026-11-25.")}</p>
        </section>
      </div>
    </SiteShell>
  );
}
