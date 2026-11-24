import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { SiteShell } from "@/components/site-shell";
import { RegisterForm } from "@/components/register-form";
import { canonicalLinks } from "@/lib/seo-host";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
  head: () => ({
    meta: [
      { title: "APT 사전고객등록 | 청라 아크원 푸르지오" },
      { name: "description", content: "청라 아크원 푸르지오 APT 사전고객등록. 이름·연락처·생년월일 6자리 입력과 개인정보 수집 동의 후 안내를 받을 수 있습니다." },
    ],
    links: canonicalLinks("/register"),
  }),
});

function RegisterPage() {
  // 작업지시서 13 · 4-1: 옛 방문예약 주소(/register?visit=1, #visit)는 방문예약 전용 페이지로 보낸다.
  useEffect(() => {
    if (new URLSearchParams(location.search).get("visit") === "1" || location.hash === "#visit") location.replace("/visit");
  }, []);
  return (
    <SiteShell path="/register">
      <div className="page_content reg-page">
        <section className="page_container register-layout">
          <aside className="register-layout__summary" aria-label="이벤트 및 일정 안내">
            {/* PM 지시(2026-11-18): 고객등록란에 견본주택 방문 사전 예약제 안내 */}
            <div id="visit-rule-note" role="note" aria-label="견본주택 방문예약 안내" style={{ margin: "0 0 20px", padding: "18px 20px", border: "1px solid #a8834a", borderRadius: 10, background: "#faf6ee", color: "#1d2a26", lineHeight: 1.6 }}>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: "#a8834a" }}>견본주택 방문 안내</p>
              <p style={{ margin: "4px 0 6px", fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em" }}>오시기 전에, 예약 먼저.</p>
              <p style={{ margin: 0, fontSize: 14 }}>청라 아크원 푸르지오 견본주택은 사전 예약제로 운영합니다. 사전고객등록만으로는 방문예약이 되지 않으니, 방문하실 분은 방문예약을 따로 신청해 주세요.</p>
              <p style={{ margin: "6px 0 0", fontSize: 13, fontWeight: 700 }}>예약 없이 방문하시면 입장·상담이 제한될 수 있습니다.</p>
              <p style={{ margin: "12px 0 0", fontSize: 14, fontWeight: 700 }}><a href="/visit" style={{ color: "#004b45", textDecoration: "underline" }}>방문예약 하기 ›</a> <span aria-hidden="true">·</span> <a href="tel:18333872" style={{ color: "#004b45", textDecoration: "underline" }}>전화 예약 1833-3872</a></p>
            </div>
            <p className="prereg-deadline" style={{ color: "#a8834a", fontWeight: 700, letterSpacing: "-0.01em" }}>오피스텔 상시 접수</p>
            <div className="register-layout__schedule">
              <h2>모집 일정</h2>
              <p>입주자모집공고 게시 2026.10.22(목) · 견본주택 별도 공지 시까지 운영 · 세부 일정 문의 1833-3872</p>
              <p>특별공급 11.02(월) · 1순위 11.03(화) · 2순위 11.04(수) · 당첨자 발표 11.10(화) · 계약 11.22(일)~11.24(화)</p>
            </div>
          </aside>
          <RegisterForm />
        </section>
      </div>
    </SiteShell>
  );
}
