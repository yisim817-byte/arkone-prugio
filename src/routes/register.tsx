import { createFileRoute } from "@tanstack/react-router";
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
  return (
    <SiteShell path="/register">
      <div className="page_content">
        <section className="page_container register-layout">
          <aside className="register-layout__summary" aria-label="이벤트 및 일정 안내">
            <p>APT 사전고객등록 후 청약 당첨 및 MGM 인정조건 충족 시 백화점 상품권 30만원 (롯데·현대·신세계 중 선택)</p>
            <p>오피스텔 사전등록은 APT 이벤트와 별도로 접수됩니다.</p>
            <a href="/#event-terms">유의사항 보기</a>
            <div className="register-layout__schedule">
              <h2>모집 일정</h2>
              <p>10월 중 OPEN 예정 · 세부 일정 문의 1833-3872</p>
              <p>특별공급·1순위·2순위·당첨자 발표·계약 일정은 입주자모집공고 확정 후 안내드립니다.</p>
            </div>
          </aside>
          <RegisterForm />
        </section>
      </div>
    </SiteShell>
  );
}
