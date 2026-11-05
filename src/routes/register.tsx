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
        <RegisterForm />
      </div>
    </SiteShell>
  );
}
