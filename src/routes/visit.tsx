import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { VisitForm } from "@/components/visit-form";
import { canonicalLinks, tx } from "@/lib/seo-host";
import { META } from "@/lib/i18n/en";
import { SITE_PHONE, SITE_TEL_HREF } from "@/lib/site-data";

// 작업지시서 13 · 4장: 모델하우스 방문예약 전용 페이지(사전고객등록과 분리).
export const Route = createFileRoute("/visit")({
  component: VisitPage,
  head: () => ({
    meta: [
      { title: tx("모델하우스 방문예약 | 청라 아크원 푸르지오", META.visit.title) },
      { name: "description", content: tx("청라 아크원 푸르지오 모델하우스(견본주택) 방문예약. 방문 희망 날짜를 남겨 주시면 담당자가 확인 후 방문 시간을 전화로 안내해 드립니다.", META.visit.desc) },
    ],
    links: canonicalLinks("/visit"),
  }),
});

function VisitPage() {
  return (
    <SiteShell path="/visit">
      <div className="page_content">
        <section className="page_container register-layout">
          <aside className="register-layout__summary" aria-label={tx("견본주택 안내", "Model house")}>
            <p>{tx("모델하우스 방문예약", "Model house visit request")}</p>
            <p>{tx("견본주택 위치 · 인천광역시 서해구 청라동 87-1 · GRAND OPEN 10.30(금)", "Model house · 87-1 Cheongna-dong Seohae-gu Incheon · GRAND OPEN 30 Oct")}</p>
            <p>{tx("전화 예약", "Call")} <a href={SITE_TEL_HREF}>{SITE_PHONE}</a></p>
            <div className="register-layout__schedule">
              <h2>{tx("청약 일정", "Application schedule")}</h2>
              <p>{tx("특별공급 11.02(월) · 1순위 11.03(화) · 2순위 11.04(수) · 당첨자 발표 11.10(화) · 계약 11.22(일)~11.24(화)", "Special supply 2 Nov · first rank 3 Nov · second rank 4 Nov · winners 10 Nov · contract 22-24 Nov")}</p>
            </div>
          </aside>
          <VisitForm />
        </section>
      </div>
    </SiteShell>
  );
}
