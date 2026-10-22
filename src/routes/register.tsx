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
      <div className="page_content">
        <section className="page_container register-layout">
          <aside className="register-layout__summary" aria-label="이벤트 및 일정 안내">
            <p>APT 사전고객등록 후 청약 당첨 및 지급 조건 충족 시 백화점 상품권 30만원 (롯데·현대·신세계 중 선택)</p>
            <p>오피스텔 사전등록은 APT 이벤트와 별도로 접수됩니다.</p>
            <a href="/#event-terms">유의사항 보기</a>
            <div className="register-layout__schedule">
              <h2>모집 일정</h2>
              <p>입주자모집공고 게시 2026.10.22(목) · 견본주택 GRAND OPEN 10.30(금) · 세부 일정 문의 1833-3872</p>
              <p>특별공급 11.02(월) · 1순위 11.03(화) · 2순위 11.04(수) · 당첨자 발표 11.10(화) · 계약 11.22(일)~11.24(화)</p>
            </div>
          </aside>
          <RegisterForm />
        </section>
      </div>
    </SiteShell>
  );
}
